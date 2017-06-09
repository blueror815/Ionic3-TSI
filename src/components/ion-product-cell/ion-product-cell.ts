import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the IonProductCellComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
 @Component({
 	selector: 'ion-product-cell',
 	templateUrl: 'ion-product-cell.html'
 })
 export class IonProductCellComponent {

 	text: string;
 	_product: any;
 	
 	@Input()
 	get product(){
	    return this._product
	}
	set product(val: any){
	    this._product = val
	}

 	constructor(public navCtrl: NavController) {
 		console.log('Hello IonProductCellComponent Component');
 	}

 	public goDetail(id: any) {
 		console.log("Passed id is...", id);
 		this.navCtrl.push(
 			'ProductDetailPage', {
 				product: this._product
 			}
 		)
 	}
 }
