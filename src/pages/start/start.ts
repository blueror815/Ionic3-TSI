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

	public background_img: string = "";
	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider) {
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StartPage');
	
	}

	ionViewWillEnter() {
		console.log("StartImage :", this.dataService.startImgFileName);
		this.background_img = this.dataService.startImgFileName;
	}
}
