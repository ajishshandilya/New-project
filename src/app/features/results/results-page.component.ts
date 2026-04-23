import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';
import { ResumePreviewComponent } from '../../shared/components/resume-preview/resume-preview.component';

@Component({
  selector: 'app-results-page',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent],
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {
  readonly state = inject(AppStateService);
  private readonly router = inject(Router);

  isFullscreen = false;

  ngOnInit(): void {
    if (!this.state.result()) {
      void this.router.navigateByUrl('/upload');
    }
  }

  async download(format: 'pdf' | 'docx'): Promise<void> {
    await this.state.download(format);
    await this.router.navigateByUrl('/success');
  }
}
