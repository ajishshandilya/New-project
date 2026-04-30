import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the primary navigation items', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;

    expect(component.navItems).toEqual([
      { label: 'Home', path: '/', exact: true },
      { label: 'About Us', path: '/about-us' },
      { label: 'Products', path: '/products' },
      { label: 'Dealer Locator', path: '/dealer-locator' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact Us', path: '/contact-us' }
    ]);
  });

  it('should toggle and close the mobile menu', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;

    expect(component.isMenuOpen).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should render navigation links and update the expanded state', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector<HTMLButtonElement>('.menu-toggle');
    const nav = compiled.querySelector<HTMLElement>('.primary-nav');
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.primary-nav a'));

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(nav?.classList.contains('is-open')).toBeFalse();
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Home',
      'About Us',
      'Products',
      'Dealer Locator',
      'Blog',
      'Contact Us'
    ]);

    toggle?.click();
    fixture.detectChanges();

    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    expect(nav?.classList.contains('is-open')).toBeTrue();
  });
});
