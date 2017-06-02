import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  	selector: 'page-create-client-modal',
  	templateUrl: 'create-client-modal.html',
})
export class CreateClientModalPage {

	rootPage: any = 'SalesAreaPage';

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public viewCtrl: ViewController
	) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreateClientModalPage');
  	}

  	onClickMore() {

  	}

  	onModalDismiss() {
  		this.viewCtrl.dismiss();
  	}

  	setCategory(category) {
  		switch (category) {
	      	case 'sales_area':
		        this.rootPage = 'SalesAreaPage';
		        break;
	      	case 'name':
		        this.rootPage = 'NamePage';
		        break;
	      	case 'communication':
		        this.rootPage = 'CommunicationPage';
		        break;
		    case 'date':
		    	this.rootPage = 'DatePage'
		    	break;
		    case 'contact_person':
		    	this.rootPage = 'ContactPersonPage'
		    	break;
	    }
  	}
}
