import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';
import { TsiParserServiceProvider } from '../../providers/tsi-parser-service/tsi-parser-service';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';
import { TsiClientServiceProvider } from '../../providers/tsi-client-service/tsi-client-service';
import { Tabs } from "ionic-angular/navigation/nav-interfaces";

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
	];

	public categories = [];
	public right_title = 'Waschen im';
	public right_item = "CLENTI FLUSSIGN";

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
				public dataService: TsiDataServiceProvider, public parserService:TsiParserServiceProvider,
				public clientService: TsiClientServiceProvider) {
		this.dataService.mainTabHost = this.navCtrl.parent;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StartPage');
		setTimeout(() => {
			this.parserService.parse(this.dataService.file.documentsDirectory + "TSI/", "config.dat", TsiParserConfigNames.PARSER_CONFIG_CONF).then(async (res) => {
				console.log("StartImage :", this.dataService.startImgFileName);
				this.background_img = this.dataService.startImgFileName;

				this.dataService.clearCatalogTabHeaders();
				this.dataService.clearAccountVectors();
				await this.clientService.updateConfiguration(true);
				
				this.updateCategories();
			}, (err) => {
				this.presentConfigModal();
			})
		}, 2000);

	}

	private updateCategories() {
		let categories = this.dataService.mainCategories;
		
		this.left_items = [];
		
		this.right_item = '';
		this.right_title = '';

		for (let key of Object.keys(categories)) {
			this.categories.push(categories[key]);
			this.left_items.push(categories[key].name); 
		}


		if (this.left_items.length > 0) {
			this.left_items.push('RABATT');
		}

		console.log('Start Categories', JSON.stringify(categories));
	}

	presentConfigModal = () => {
  		let configModal = this.modalCtrl.create('ConfigModalPage');

  		configModal.onDidDismiss(data => { // callback to get data from config modal, it is called when config modal is dismissed
	     	console.log(data);

			this.navCtrl.setRoot(this.navCtrl.getActive().component);
	   	});

  	    configModal.present();
  	}

	ionViewWillEnter() {

	}

	onCategorySelect = (element, i) => {

		if (element.value == 'RABATT') {
			this.dataService.setCatalogViewIndex(11);
		}
		else {
			this.dataService.setIndexOfCatalogTabTab(0);
			this.dataService.choosenCategory = this.categories[i];
		}
		
		//var tabs : Tabs = this.navCtrl.parent;
		this.dataService.mainTabHost.select(3, {});
	}
}
