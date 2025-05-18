import { Component, OnInit } from '@angular/core';
import { FirestoreProductService, Product } from '../firestore-products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {

  products: Product[] = [];
  selectedProduct: Product = { name: '', description: '', price: 0, imageUrl: '' };

  constructor(private productService: FirestoreProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsPaginated().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }

}
