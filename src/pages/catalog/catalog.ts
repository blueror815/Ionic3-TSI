import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonProductCellComponent } from '../../components/ion-product-cell/ion-product-cell';
import { PRODUCTS } from '../../data/product';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';

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
	public buttons = [];
 	public products = PRODUCTS;

 	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider) {
		 
 	}

 	ionViewDidLoad() {
 		
 	}

	ionViewWillEnter() {
		console.log('Catalog Headers', JSON.stringify(this.dataService.catalogTabHeaders));
		this.buttons = this.dataService.catalogTabHeaders;
		if (this.buttons) {
			this.selected_tab = this.buttons[0];
		}
	}

 	// public viewDetail = (id: any) => {
 	// 	console.log("Product id is. ", id);
 	// 	this.ionProductCell.goDetail(id);
 	// }

 	public getProducts = (...params) =>  {
 		// get all products according to the main and sub cateogry here...
 		
 		console.log("Category for getting total products is. ", params);
 	}
 }
