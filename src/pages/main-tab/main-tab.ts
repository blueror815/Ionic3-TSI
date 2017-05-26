import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  	selector: 'page-main-tab',
  	templateUrl: 'main-tab.html',
})
export class MainTabPage {

	tab1: any;
  	tab2: any;
  	tab3: any;
  	tab4: any;
  	tab5: any;
  	tab6: any;
  	tab7: any;


  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  		this.tab1 = 'KundenPage';
    	this.tab2 = 'StartPage';
      this.tab6 = 'InfoPage';
      this.tab7 = 'InternPage';

    	this.presentConfigModal();
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MainTabPage');
  	}

  	presentConfigModal = () => {
  		let configModal = this.modalCtrl.create('ConfigModalPage');

  		configModal.onDidDismiss(data => { // callback to get data from config modal, it is called when config modal is dismissed
	     	console.log(data);
	   	});

  		configModal.present();
  	}
}
