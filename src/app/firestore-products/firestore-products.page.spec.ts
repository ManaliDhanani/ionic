import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirestoreProductsPage } from './firestore-products.page';

describe('FirestoreProductsPage', () => {
  let component: FirestoreProductsPage;
  let fixture: ComponentFixture<FirestoreProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestoreProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
