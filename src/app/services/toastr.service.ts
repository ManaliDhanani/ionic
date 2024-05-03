import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(
        public toastr: ToastController
    ){}

    async successToast(msg: string){
        const toast = await this.toastr.create({
            message: msg,
            duration: 3000,
            position: 'top',
            positionAnchor: 'header',
            cssClass: 'success-toast',
            buttons: [
                {
                side: 'end',
                icon: 'close',
                role: 'cancel',
                }
            ]
        });
        toast.present();
    }

    async errorToast(msg: string){
        const toast = await this.toastr.create({
            message: msg,
            duration: 3000,
            position: 'top',
            positionAnchor: 'header',
            cssClass: 'error-toast',
            buttons: [
                {
                side: 'end',
                icon: 'close',
                role: 'cancel',
                }
            ]
        });
        toast.present();
    }
}