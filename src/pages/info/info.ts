import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-info',
	templateUrl: 'info.html',
})
export class InfoPage {

	public items = []; 
  	public is_active = false;
	public img_uri:string = "assets/images/not_avalible.png";
	public artikedb: string = "03.04.2017, 02:00 Uhr";
	public kundendb: string = "03.04.2017, 02:00 Uhr";
	public kategorydb: string = "03.04.2017, 02:00 Uhr";
	public orderdb: string = "03.04.2017, 02:00 Uhr";
	public katalogdb: string = "03.04.2017, 02:00 Uhr";
	

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InfoPage');
	}
}
