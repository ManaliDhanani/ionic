import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestoreProductService, Product } from '../firestore-products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudinaryService } from '../cloudinary.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {

  @Input() product: Product = { name: '', description: '', price: 0, imageUrl: '' };
  selectedFile?: File;

  constructor(private productService: FirestoreProductService, private fb: FormBuilder, private cloudinaryService: CloudinaryService) { }

  ngOnInit(): void { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // this.product.imageUrl = this.selectedFile;
  }

  async onSubmit() {
    console.log("onSubmit called");
    try {
      if (this.selectedFile) {
        const imageUrl = await this.cloudinaryService.uploadImage(this.selectedFile);
        console.log("imageUrl:", imageUrl);
        this.product.imageUrl = imageUrl;
      }

      if (this.product.id) {
        await this.productService.updateProduct(this.product.id, this.product);
      } else {
        console.log("this.product:", this.product);
        await this.productService.addProduct(this.product);
      }

      this.product = { name: '', description: '', price: 0, imageUrl: '' };
      this.selectedFile = undefined;
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

}
