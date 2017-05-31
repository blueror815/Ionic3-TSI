import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';


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


  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataService: TsiDataServiceProvider) {
  		this.tab1 = 'StartPage';
    	this.tab2 = 'KundenPage';
      	this.tab6 = 'InfoPage';
      	this.tab7 = 'InternPage';
		
		if (this.dataService.startImgFileName.length == 0) {
			this.presentConfigModal();
		}
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MainTabPage');
  	}

  	presentConfigModal = () => {
  		let configModal = this.modalCtrl.create('ConfigModalPage');

  		configModal.onDidDismiss(data => { // callback to get data from config modal, it is called when config modal is dismissed
	     	console.log(data);

			this.navCtrl.setRoot(this.navCtrl.getActive().component);
	   	});

  		// configModal.present();
  	}
}
