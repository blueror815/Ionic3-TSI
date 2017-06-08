import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonProductCellComponent } from '../../components/ion-product-cell/ion-product-cell';
import { PRODUCTS } from '../../data/product';

/**
 * Generated class for the CatalogPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-catalog',
 	templateUrl: 'catalog.html',
 })
 export class CatalogPage {

 	@ViewChild(IonProductCellComponent) ionProductCell: IonProductCellComponent;

 	public selected_tab: string = "total";
 	public products = PRODUCTS;

 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad CatalogPage');
 	}

 	public viewDetail(id: any) {
 		this.ionProductCell.goDetail(id);
 	}
 }
