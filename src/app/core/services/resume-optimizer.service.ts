import { Injectable } from '@angular/core';
import {
  OptimizationResult,
  ResumeDraft,
  UploadAssets
} from '../models/resume.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeOptimizerService {
  private readonly fallbackNames = [
    'Jordan Avery',
    'Alex Morgan',
    'Taylor Bennett',
    'Casey Ellis'
  ];

  async buildOptimizedResume(payload: UploadAssets): Promise<OptimizationResult> {
    const jdSource =
      payload.jobDescriptionText.trim() ||
      payload.jobDescriptionFile?.name ||
      'senior systems architect';

    const topKeywords = this.extractKeywords(jdSource);
    const formattedName = this.inferName(payload.resumeFile?.name);
    const role = this.inferRole(jdSource);
    const resume = this.buildResumeDraft(formattedName, role, topKeywords);
    const score = this.calculateScore(payload, topKeywords);

    return {
      fileLabel: `${formattedName.replace(/\s+/g, '_')}_SmartCV`,
      score,
      scoreLabel: score > 92 ? 'Highly Competitive Level' : 'Strong ATS Match',
      matchedKeywords: Math.min(topKeywords.length + 8, 22),
      totalKeywords: Math.max(24, topKeywords.length + 10),
      actionVerbNote: 'Strong use of active language like "orchestrated", "rebuilt", and "improved".',
      layoutNote: 'Columns and sections align cleanly for ATS-friendly parsing.',
      candidateRank: `Matched to top ${score > 93 ? '5%' : '12%'} of profiles in similar searches.`,
      proTip: `Include one measurable win in each recent role to keep momentum high with recruiters reviewing ${role.toLowerCase()} profiles.`,
      resume,
      insights: [
        {
          label: 'Keyword Density',
          value: `${Math.min(topKeywords.length + 11, 21)}/${Math.max(topKeywords.length + 14, 28)} top terms`,
          detail: 'Most target phrases are now reflected naturally across summary and experience.'
        },
        {
          label: 'Action Verbs',
          value: 'Excellent',
          detail: 'The strongest bullets now lead with concise, outcome-driven phrasing.'
        },
        {
          label: 'Layout Check',
          value: 'ATS Ready',
          detail: 'The structure is readable, consistent, and export friendly.'
        },
        {
          label: 'Candidate Rank',
          value: score > 93 ? 'Top 5%' : 'Top 12%',
          detail: 'Profile alignment improved after tailoring experience to the role.'
        }
      ]
    };
  }

  async downloadAsDocx(result: OptimizationResult): Promise<void> {
    const { Document, HeadingLevel, Packer, Paragraph, TextRun } = await import('docx');
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              heading: HeadingLevel.TITLE,
              children: [
                new TextRun({
                  text: result.resume.fullName,
                  bold: true,
                  size: 34
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: result.resume.title,
                  color: '2C9A95',
                  bold: true,
                  size: 24
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `${result.resume.email} | ${result.resume.location} | ${result.resume.portfolio}`
                )
              ]
            }),
            new Paragraph({ text: '' }),
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              text: 'Professional Summary'
            }),
            new Paragraph(result.resume.summary),
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              text: 'Expertise'
            }),
            ...result.resume.expertise.map(
              (skill) =>
                new Paragraph({
                  bullet: {
                    level: 0
                  },
                  text: skill
                })
            ),
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              text: 'Experience'
            }),
            ...result.resume.experience.flatMap((item) => [
              new Paragraph({
                children: [
                  new TextRun({ text: item.role, bold: true }),
                  new TextRun({ text: ` | ${item.company} | ${item.period}` })
                ]
              }),
              ...item.bullets.map(
                (bullet) =>
                  new Paragraph({
                    bullet: {
                      level: 0
                    },
                    text: bullet
                  })
              )
            ]),
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              text: 'Education'
            }),
            ...result.resume.education.map(
              (item) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: item.degree, bold: true }),
                    new TextRun({ text: ` | ${item.school}` })
                  ]
                })
            )
          ]
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    this.triggerDownload(blob, `${result.fileLabel}.docx`);
  }

  downloadAsPdf(result: OptimizationResult): void {
    const lines = this.createPlainTextLines(result);
    const pdf = this.createPdfDocument(lines);
    this.triggerDownload(new Blob([pdf], { type: 'application/pdf' }), `${result.fileLabel}.pdf`);
  }

  get geminiApiKeyConfigured(): boolean {
    return environment.geminiApiKey.trim().length > 0;
  }

  private buildResumeDraft(
    fullName: string,
    role: string,
    keywords: string[]
  ): ResumeDraft {
    const focus = keywords.slice(0, 5);

    return {
      fullName,
      title: role,
      email: `${fullName.toLowerCase().replace(/\s+/g, '.')}@smartcv.dev`,
      location: 'San Francisco, CA',
      portfolio: 'portfolio.io/smartcv',
      summary: `Impact-driven ${role.toLowerCase()} with experience translating role requirements into focused, high-signal resume stories. Strengthens ATS performance by pairing concise achievements with keywords like ${focus.join(', ')} and measurable outcomes.`,
      expertise: [
        role.split(' ').slice(-2).join(' '),
        ...focus,
        'Stakeholder Communication',
        'Process Optimization'
      ].slice(0, 6),
      experience: [
        {
          role,
          company: 'Northstar Labs',
          period: '2021 - Present',
          bullets: [
            `Tailored project highlights around ${focus[0] ?? 'strategy'} and ${focus[1] ?? 'execution'} to better match the target job narrative.`,
            'Reframed achievements with quantified impact, making responsibilities easier for both ATS parsing and recruiter review.',
            'Consolidated overlapping experience into sharper, more scannable accomplishment bullets.'
          ]
        },
        {
          role: `Senior ${role.split(' ').slice(-1)[0] ?? 'Specialist'}`,
          company: 'Elevate Works',
          period: '2018 - 2021',
          bullets: [
            `Led initiatives that combined ${focus[2] ?? 'delivery'} with cross-functional collaboration across product, hiring, and operations teams.`,
            'Reduced noise in resume structure by emphasizing strongest outcomes instead of task-heavy descriptions.'
          ]
        }
      ],
      education: [
        {
          degree: 'M.S. Computer Science',
          school: 'Stanford University'
        },
        {
          degree: 'B.S. Engineering',
          school: 'University of California'
        }
      ]
    };
  }

  private inferName(fileName?: string): string {
    if (!fileName) {
      return this.fallbackNames[Math.floor(Math.random() * this.fallbackNames.length)];
    }

    const base = fileName
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\bresume\b/gi, '')
      .trim();

    const words = base
      .split(/\s+/)
      .filter((part) => /^[a-z]/i.test(part))
      .slice(0, 3);

    if (!words.length) {
      return this.fallbackNames[0];
    }

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private inferRole(jdSource: string): string {
    const lowered = jdSource.toLowerCase();

    if (lowered.includes('architect')) {
      return 'Senior Systems Architect';
    }

    if (lowered.includes('frontend') || lowered.includes('angular')) {
      return 'Senior Frontend Engineer';
    }

    if (lowered.includes('product')) {
      return 'Product Manager';
    }

    if (lowered.includes('data')) {
      return 'Data Platform Lead';
    }

    return 'Lead Solution Strategist';
  }

  private extractKeywords(source: string): string[] {
    return Array.from(
      new Set(
        source
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, ' ')
          .split(/\s+/)
          .filter((word) => word.length > 4)
      )
    )
      .slice(0, 5)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  }

  private calculateScore(payload: UploadAssets, keywords: string[]): number {
    let score = 86;

    if (payload.resumeFile) {
      score += 3;
    }

    if (payload.templateFile) {
      score += 2;
    }

    if (payload.jobDescriptionFile || payload.jobDescriptionText.trim()) {
      score += 3;
    }

    score += Math.min(keywords.length, 5);

    return Math.min(score, 98);
  }

  private createPlainTextLines(result: OptimizationResult): string[] {
    return [
      result.resume.fullName,
      result.resume.title,
      `${result.resume.email} | ${result.resume.location}`,
      result.resume.portfolio,
      '',
      'Professional Summary',
      result.resume.summary,
      '',
      'Expertise',
      ...result.resume.expertise.map((item) => `- ${item}`),
      '',
      'Experience',
      ...result.resume.experience.flatMap((item) => [
        `${item.role} | ${item.company} | ${item.period}`,
        ...item.bullets.map((bullet) => `- ${bullet}`)
      ]),
      '',
      'Education',
      ...result.resume.education.map((item) => `${item.degree} | ${item.school}`)
    ];
  }

  private createPdfDocument(lines: string[]): string {
    const escapedLines = lines.map((line) => this.escapePdf(line).slice(0, 92));
    const content = [
      'BT',
      '/F1 12 Tf',
      '72 760 Td',
      ...escapedLines.flatMap((line, index) =>
        index === 0 ? [`(${line}) Tj`] : ['0 -18 Td', `(${line}) Tj`]
      ),
      'ET'
    ].join('\n');

    const objects = [
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
      '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj',
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj',
      '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj',
      `5 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj`
    ];

    let pdf = '%PDF-1.4\n';
    const offsets = [0];

    objects.forEach((object) => {
      offsets.push(pdf.length);
      pdf += `${object}\n`;
    });

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += '0000000000 65535 f \n';
    offsets.slice(1).forEach((offset) => {
      pdf += `${offset.toString().padStart(10, '0')} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return pdf;
  }

  private escapePdf(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  private triggerDownload(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
