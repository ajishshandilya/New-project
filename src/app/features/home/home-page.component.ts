import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Highlight {
  title: string;
  copy: string;
}

interface FeaturedProduct {
  name: string;
  category: string;
  copy: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  readonly highlights: Highlight[] = [
    {
      title: 'Thermal stability that stays composed',
      copy: 'Advanced base oils and additive chemistry help maintain viscosity under punishing heat.'
    },
    {
      title: 'Wear control for heavy-load operation',
      copy: 'Built to support vehicles, transmissions, bearings, chains, and hydraulic systems across duty cycles.'
    },
    {
      title: 'Reliable protection from workshop to fleet',
      copy: 'A practical range for passenger cars, bikes, commercial vehicles, and industrial equipment.'
    }
  ];

  readonly featuredProducts: FeaturedProduct[] = [
    {
      name: 'Car Engine Oil',
      category: 'Fleet-grade multigrade',
      copy: 'Designed for off-highway, commercial, and mixed gasoline-diesel applications.'
    },
    {
      name: 'Gear Oil',
      category: 'Transmission performance',
      copy: 'Supports rust protection, low-temperature flow, and high-load gearbox endurance.'
    },
    {
      name: 'Hydraulic Oil',
      category: 'Industrial hydraulic systems',
      copy: 'Made for severe machine-tool, mould, press, compressor, and servo applications.'
    },
    {
      name: '4T 20W-40 API SN JASO MA-2',
      category: 'Motorcycle range',
      copy: 'Triple-action protection for engine, clutch, and gears with quick pick-up performance.'
    }
  ];
}
