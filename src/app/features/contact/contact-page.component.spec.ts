import { TestBed } from '@angular/core/testing';
import { ContactPageComponent } from './contact-page.component';

describe('ContactPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render contact email', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('info@synthx.in');
  });
});
