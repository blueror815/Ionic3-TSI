import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AuftragPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auftrag',
  templateUrl: 'auftrag.html',
})
export class AuftragPage {

	public img_url: string = "assets/images/not_avalible.png";
	
  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AuftragPage');
  	}

}
