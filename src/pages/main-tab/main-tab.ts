import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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


  	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider) {
  		this.tab1 = 'StartPage';
    	this.tab2 = 'KundenPage';
		this.tab3 = 'AuftragPage';
        this.tab4 = 'CatalogPage';
    	this.tab5 = 'ShoppingCartPage';
      	this.tab6 = 'InfoPage';
      	this.tab7 = 'InternPage';
	}

    ionViewWillEnter() {
        
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MainTabPage');
  	}

}
