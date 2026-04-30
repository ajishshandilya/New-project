import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);

    expect(fixture.componentInstance.year).toBe(new Date().getFullYear());
  });

  it('should render footer navigation links', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.footer-links a'));

    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Home',
      'About Us',
      'Products',
      'Dealer Locator',
      'Blog',
      'Contact Us'
    ]);
  });

  it('should render contact details and copyright year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const contact = compiled.querySelector<HTMLElement>('.footer-contact');
    const phone = compiled.querySelector<HTMLAnchorElement>('a[href="tel:+919718481692"]');
    const email = compiled.querySelector<HTMLAnchorElement>('a[href="mailto:info@synthx.in"]');

    expect(contact?.textContent).toContain('SJR Palazza City');
    expect(phone?.textContent).toContain('+91 9718481692');
    expect(email?.textContent).toContain('info@synthx.in');
    expect(contact?.textContent).toContain(`${new Date().getFullYear()} Synthx Lubricants`);
  });
});
