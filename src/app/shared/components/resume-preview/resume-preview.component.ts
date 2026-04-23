import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OptimizationResult } from '../../../core/models/resume.models';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent {
  @Input({ required: true }) result: OptimizationResult | null = null;
  @Input() fullscreen = false;
}
