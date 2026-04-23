import { Injectable, computed, signal } from '@angular/core';
import {
  OptimizationResult,
  UploadAssets,
  WorkflowProgress
} from '../models/resume.models';
import { ResumeOptimizerService } from './resume-optimizer.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly initialAssets: UploadAssets = {
    resumeFile: null,
    jobDescriptionText: '',
    jobDescriptionFile: null,
    templateFile: null
  };

  private readonly initialProgress: WorkflowProgress = {
    activeStep: 1,
    percent: 8,
    message: 'Upload your source resume, the target job description, and your preferred template.',
    running: false,
    complete: false
  };

  private readonly assetsState = signal<UploadAssets>({ ...this.initialAssets });
  private readonly progressState = signal<WorkflowProgress>({ ...this.initialProgress });
  private readonly resultState = signal<OptimizationResult | null>(null);
  private readonly lastDownloadState = signal<'pdf' | 'docx' | null>(null);

  readonly uploadAssets = this.assetsState.asReadonly();
  readonly progress = this.progressState.asReadonly();
  readonly result = this.resultState.asReadonly();
  readonly lastDownload = this.lastDownloadState.asReadonly();
  readonly canAnalyze = computed(() => {
    const state = this.assetsState();

    return Boolean(
      state.resumeFile &&
        state.templateFile &&
        (state.jobDescriptionFile || state.jobDescriptionText.trim())
    );
  });

  constructor(private readonly optimizer: ResumeOptimizerService) {}

  setResumeFile(file: File | null): void {
    this.assetsState.update((state) => ({
      ...state,
      resumeFile: file
    }));
  }

  setJobDescriptionText(text: string): void {
    this.assetsState.update((state) => ({
      ...state,
      jobDescriptionText: text
    }));
  }

  setJobDescriptionFile(file: File | null): void {
    this.assetsState.update((state) => ({
      ...state,
      jobDescriptionFile: file
    }));
  }

  setTemplateFile(file: File | null): void {
    this.assetsState.update((state) => ({
      ...state,
      templateFile: file
    }));
  }

  async startOptimization(): Promise<void> {
    if (!this.canAnalyze() || this.progressState().running) {
      return;
    }

    this.lastDownloadState.set(null);
    this.resultState.set(null);

    this.progressState.set({
      activeStep: 1,
      percent: 22,
      message: 'Uploading and validating resume, job description, and template files.',
      running: true,
      complete: false
    });

    await this.pause(600);
    this.progressState.set({
      activeStep: 2,
      percent: 58,
      message: 'Analyzing target keywords, role expectations, and ATS formatting risks.',
      running: true,
      complete: false
    });

    await this.pause(1200);
    this.progressState.set({
      activeStep: 3,
      percent: 84,
      message: 'Optimizing the resume against the JD and rebuilding it with your chosen template.',
      running: true,
      complete: false
    });

    const result = await this.optimizer.buildOptimizedResume(this.assetsState());
    this.resultState.set(result);

    await this.pause(700);
    this.progressState.set({
      activeStep: 3,
      percent: 100,
      message: 'Optimization complete. Your ATS-ready resume is ready to review.',
      running: false,
      complete: true
    });
  }

  async download(format: 'pdf' | 'docx'): Promise<void> {
    const result = this.resultState();

    if (!result) {
      return;
    }

    if (format === 'pdf') {
      this.optimizer.downloadAsPdf(result);
    } else {
      await this.optimizer.downloadAsDocx(result);
    }

    this.lastDownloadState.set(format);
  }

  resetForNewOptimization(): void {
    this.assetsState.set({ ...this.initialAssets });
    this.progressState.set({ ...this.initialProgress });
    this.resultState.set(null);
    this.lastDownloadState.set(null);
  }

  private pause(duration: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, duration));
  }
}
