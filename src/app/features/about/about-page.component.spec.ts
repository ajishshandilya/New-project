import { TestBed } from '@angular/core/testing';
import { AboutPageComponent } from './about-page.component';

describe('AboutPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should mention Synthx in the heading', () => {
    const fixture = TestBed.createComponent(AboutPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Driven by passion');
  });
});
