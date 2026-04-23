import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

type UploadType = 'resume' | 'jobDescription' | 'template';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent {
  readonly state = inject(AppStateService);
  private readonly router = inject(Router);

  readonly steps = ['Upload', 'Analyze', 'Optimize'];

  async analyze(): Promise<void> {
    if (!this.state.canAnalyze() || this.state.progress().running) {
      return;
    }

    await this.state.startOptimization();
    await this.router.navigateByUrl('/results');
  }

  onFileSelected(event: Event, type: UploadType): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (type === 'resume') {
      this.state.setResumeFile(file);
    } else if (type === 'jobDescription') {
      this.state.setJobDescriptionFile(file);
    } else {
      this.state.setTemplateFile(file);
    }

    input.value = '';
  }

  removeFile(type: UploadType): void {
    if (type === 'resume') {
      this.state.setResumeFile(null);
    } else if (type === 'jobDescription') {
      this.state.setJobDescriptionFile(null);
    } else {
      this.state.setTemplateFile(null);
    }
  }

  updateJobDescriptionText(value: string): void {
    this.state.setJobDescriptionText(value);
  }
}
