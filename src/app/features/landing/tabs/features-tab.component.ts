import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-tab.component.html',
  styleUrls: ['./features-tab.component.scss']
})
export class FeaturesTabComponent {
  readonly featureCards = [
    'Resume-to-JD keyword mapping',
    'Template-aware exports',
    'ATS scoring with recruiter hints',
    'Guided upload workflow'
  ];
}
