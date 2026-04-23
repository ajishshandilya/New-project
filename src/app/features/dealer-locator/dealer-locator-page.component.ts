import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dealer-locator-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dealer-locator-page.component.html',
  styleUrls: ['./dealer-locator-page.component.scss']
})
export class DealerLocatorPageComponent {}
