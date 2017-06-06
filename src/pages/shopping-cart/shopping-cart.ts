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

	signature = '';
  	isDrawing = false;
 
  	@ViewChild(SignaturePad) signaturePad: SignaturePad;
  	public signaturePadOptions: any = { // Check out https://github.com/szimek/signature_pad
	    'minWidth': 2,
	    'canvasWidth': 400,
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
    	// this.signaturePad.clear()
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
