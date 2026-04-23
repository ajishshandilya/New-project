import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

type SharePlatform = 'facebook' | 'twitter' | 'whatsapp' | 'linkedin' | 'instagram';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {
  readonly state = inject(AppStateService);
  private readonly router = inject(Router);

  showShareOptions = false;
  shareStatus = '';

  ngOnInit(): void {
    if (!this.state.result()) {
      void this.router.navigateByUrl('/upload');
    }
  }

  async startNewOptimization(): Promise<void> {
    this.state.resetForNewOptimization();
    await this.router.navigateByUrl('/how-it-works');
  }

  async share(platform: SharePlatform): Promise<void> {
    const appUrl = `${window.location.origin}/how-it-works`;
    const text = encodeURIComponent('Try SmartCV to tailor your resume faster.');
    const encodedUrl = encodeURIComponent(appUrl);

    const urls: Record<Exclude<SharePlatform, 'instagram'>, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };

    if (platform === 'instagram') {
      await navigator.clipboard.writeText(appUrl);
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
      this.shareStatus = 'App link copied. Paste it into Instagram after the site opens.';
      return;
    }

    window.open(urls[platform], '_blank', 'noopener,noreferrer');
    this.shareStatus = `Sharing window opened for ${platform === 'twitter' ? 'X' : platform}.`;
  }
}
