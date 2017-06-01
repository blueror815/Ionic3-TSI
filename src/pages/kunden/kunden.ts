import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';

/**
 * Generated class for the KundenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  	selector: 'page-kunden',
  	templateUrl: 'kunden.html',
})
export class KundenPage {

	public select_unit : string = "";
	public customerUnits = [];

  	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider) {
		this.customerUnits = this.dataService.getCustomerBusinessUnit();
		this.select_unit = this.customerUnits[0];
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad KundenPage');
  	}

}
