import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SalesAreaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sales-area',
  templateUrl: 'sales-area.html',
})
export class SalesAreaPage {

	public deliver_time = "00:00";
	public to = "23.59";
  	
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SalesAreaPage');
  	}
}
