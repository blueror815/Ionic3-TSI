import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';

/**
 * Generated class for the StartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

	public background_img: string = "assets/images/wrong.png";
	public left_items = [
		'NV',
		'Gewurze',
		'Nahrmittel',
		'Feinkost',
		'Instant, Tee, Subungsittel',
		'Alkoholfreie Getranke/ Getr.zubereitung',
		'Alkoholische Getranke',
		'Subwaren und Geback',
		'Non Food',
		'Vending-Fullprodukte',
		'RABATT'
	]
	public right_title = 'Waschen im';
	public right_item = "CLENTI FLUSSIGN";

	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider) {
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StartPage');
	
	}

	ionViewWillEnter() {
		console.log("StartImage :", this.dataService.startImgFileName);
		// this.background_img = this.dataService.startImgFileName;
	}
}
