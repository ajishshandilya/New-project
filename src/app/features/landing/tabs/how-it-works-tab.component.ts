import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works-tab.component.html',
  styleUrls: ['./how-it-works-tab.component.scss']
})
export class HowItWorksTabComponent {
  readonly steps = [
    {
      title: 'Upload',
      detail: 'Share your current resume, paste or upload the job description, and add your target docx template.',
      count: '01'
    },
    {
      title: 'Optimize',
      detail: 'SmartCV compares role keywords, rewrites weak bullets, and strengthens ATS readability.',
      count: '02'
    },
    {
      title: 'Download',
      detail: 'Review the refreshed resume, check the new ATS score, then export as PDF or Docx.',
      count: '03'
    }
  ];
}
