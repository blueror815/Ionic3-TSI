import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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


  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataService: TsiDataServiceProvider) {
		this.customerUnits = this.dataService.getCustomerBusinessUnit();
		this.select_unit = this.customerUnits[0];
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad KundenPage');
  	}

  	onCreateClient() {
  		let newClientModal = this.modalCtrl.create('CreateClientModalPage');

  		newClientModal.onDidDismiss(data => { // callback to get data from config modal, it is called when config modal is dismissed
	     	console.log(data);
	   	});

	   	newClientModal.present();
  	}

    public refreshGUI() {
		
	}
}
