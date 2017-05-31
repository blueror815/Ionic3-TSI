import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	public select: string = "alie";

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad KundenPage');
  	}

}
