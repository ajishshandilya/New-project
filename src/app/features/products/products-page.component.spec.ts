import { TestBed } from '@angular/core/testing';
import { ProductsPageComponent } from './products-page.component';

describe('ProductsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductsPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose multiple products', () => {
    const fixture = TestBed.createComponent(ProductsPageComponent);
    expect(fixture.componentInstance.products.length).toBeGreaterThan(5);
  });
});
