import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DealerLocatorPageComponent } from './dealer-locator-page.component';

describe('DealerLocatorPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerLocatorPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DealerLocatorPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
