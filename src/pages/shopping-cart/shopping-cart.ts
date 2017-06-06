import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  	selector: 'page-shopping-cart',
  		templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
	@ViewChild(SignaturePad) signaturePad: SignaturePad;

	public signature = '';
  	public isDrawing = false;
 	public is_active = false;
 	public price: string = "0.00";
 	public amount = 0;
 	public prize: string = "0.00";
 	public qty_vpe = "000";
 	public qty_pal = "000";

  	public signaturePadOptions: any = { // Check out https://github.com/szimek/signature_pad
	    'minWidth': 2,
	    'canvasWidth': 380,
	    'canvasHeight': 200,
	    'backgroundColor': '#f6fbff',
	    'penColor': '#666a73'
  	};

  	constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  	}

  	ionViewDidLoad() {
  		console.log("this signature pad", this.signaturePad);
    	console.log('ionViewDidLoad ShoppingCartPage');
  	}

  	ionViewDidEnter() {
    	this.signaturePad.clear()
    // this.storage.get('savedSignature').then((data) => {
    //   this.signature = data;
    // });
  	}
 
  	drawComplete() {
    	this.isDrawing = false;
  	}
 
  	drawStart() {
    	this.isDrawing = true;
  	}
 
  	savePad() {
    	this.signature = this.signaturePad.toDataURL();
    	// this.storage.set('savedSignature', this.signature);
    	this.signaturePad.clear();
    	let toast = this.toastCtrl.create({
      		message: 'New Signature saved.',
      		duration: 3000
    	});
    	toast.present();
  	}
 
  	clearPad() {
    	this.signaturePad.clear();
  	}
}
