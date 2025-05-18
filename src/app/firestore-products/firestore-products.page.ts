import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-firestore-products',
  templateUrl: './firestore-products.page.html',
  styleUrls: ['./firestore-products.page.scss'],
})
export class FirestoreProductsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
