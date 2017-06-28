import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-product-detail',
 	templateUrl: 'product-detail.html',
 })
 export class ProductDetailPage {

 	public no_article: number = 1;
 	public product: Object;

 	constructor(public navCtrl: NavController, public navParams: NavParams) {

 		this.product = this.navParams.get('product');
 		console.log("Product. ", this.product);
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad ProductDetailPage');
 	}

	onBack() {
		this.navCtrl.pop();
	}

 }
