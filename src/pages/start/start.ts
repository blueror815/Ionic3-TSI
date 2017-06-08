import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';
import { TsiParserServiceProvider } from '../../providers/tsi-parser-service/tsi-parser-service';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, 
				public dataService: TsiDataServiceProvider, public parserService:TsiParserServiceProvider) {
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StartPage');
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
		console.log("StartImage :", this.dataService.startImgFileName);

		setTimeout(() => {
			this.parserService.parse(this.dataService.file.documentsDirectory + "TSI/", "config.dat", TsiParserConfigNames.PARSER_CONFIG_CONF).then((res) => {
				console.log("StartImage :", this.dataService.startImgFileName);
				this.background_img = this.dataService.startImgFileName;
			}, (err) => {
				this.presentConfigModal();
			})
		}, 1000);
	}
}
