import { Component, Input } from '@angular/core';

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

 	constructor() {
 		console.log('Hello IonProductCellComponent Component');
 		this.text = 'Hello World';
 	}

 	public goDetail(id: any) {
 		console.log("Passed id is...", id);
 	}
 }
