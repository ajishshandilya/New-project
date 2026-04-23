import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;

  readonly navItems: NavItem[] = [
    { label: 'Home', path: '/', exact: true },
    { label: 'About Us', path: '/about-us' },
    { label: 'Products', path: '/products' },
    { label: 'Dealer Locator', path: '/dealer-locator' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Us', path: '/contact-us' }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
