import { Injectable } from '@angular/core';
import { Firestore, collection, query, orderBy, startAfter, limit, getDocs, where, addDoc, doc, updateDoc, deleteDoc, Query } from '@angular/fire/firestore';
import { collectionData, docData } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { map } from 'rxjs';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    imageUrl: any;
    createdAt?: any;
}

@Injectable({ providedIn: 'root' })
export class FirestoreProductService {
  
    constructor(private afs: AngularFirestore) {}

  async addProduct(product: Product) {
    console.log(product);
    // return this.afs.collection<Product>('products').add(product);
    await addDoc(collection(db, "products"), product);
  }

  updateProduct(id: string, data: Partial<Product>) {
    return this.afs.collection('products').doc(id).update(data);
  }

  deleteProduct(id: string) {
    return this.afs.collection('products').doc(id).delete();
  }

  getLastVisibleDoc(searchTerm = '', lastName: string) {
    let queryFn: any;
    if (searchTerm) {
      queryFn = this.afs.collection<Product>('products', ref =>
        ref
          .where('name', '>=', searchTerm)
          .where('name', '<=', searchTerm + '\uf8ff')
          .orderBy('name')
          .limit(1)
      );
    } else {
      queryFn = this.afs.collection<Product>('products', ref =>
        ref.orderBy('name').limit(1)
      );
    }
  
    return queryFn.get().toPromise().then(snapshot => snapshot.docs[0]);
  }
  
    getTotalCount(searchTerm = ''): Promise<number> {
        let ref: any = this.afs.collection<Product>('products').ref;
    
        if (searchTerm) {
        ref = ref
            .where('name', '>=', searchTerm)
            .where('name', '<=', searchTerm + '\uf8ff');
        }
    
        return ref.get().then(snapshot => snapshot.size);
    }

  getProductsPaginated(searchTerm = '', lastDoc: any = null, pageSize = 5) {
    let queryFn: any = (ref: any) => {
      let q = ref.orderBy('name').limit(pageSize);
      if (searchTerm) {
        q = ref
          .where('name', '>=', searchTerm)
          .where('name', '<=', searchTerm + '\uf8ff')
          .orderBy('name')
          .limit(pageSize);
      }
      if (lastDoc) {
        q = q.startAfter(lastDoc);
      }
      return q;
    };
    return this.afs.collection<Product>('products', queryFn).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

}
