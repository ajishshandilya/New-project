import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';

describe('BlogPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BlogPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
