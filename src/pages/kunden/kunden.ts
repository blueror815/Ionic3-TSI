import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';
import { TsiClientServiceProvider } from '../../providers/tsi-client-service/tsi-client-service';
import { TsiShoppingCartServiceProvider } from '../../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiCustomer } from '../../models/TsiCustomer';
import { TsiUtil } from '../../utils/TsiUtil';

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


  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataService: TsiDataServiceProvider,
	  			public clientService: TsiClientServiceProvider, public shoppingService: TsiShoppingCartServiceProvider, public dialog: Dialogs) {
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

	onSetCustomer() {
		let selectedCustomer = this.dataService.selectedCustomer;

		if (selectedCustomer != null) {
			if (this.dataService.choosenCustomer != null && this.dataService.choosenCustomer != this.dataService.selectedCustomer) {
				let shoppingCart = this.shoppingService.getActualShoppingCart();

				if (Object.keys(shoppingCart).length > 0) {
					this.dialog.confirm("Möchten Sie den aktuellen Warenkorb übernehmen?", "", ['Ja', 'Nein']).then((res) => {
						if (res == 0) {
							let newShoppingCart = this.shoppingService.getShoppingCart(selectedCustomer.getCustomerID());
							newShoppingCart.setEntriesFromVector(shoppingCart.getEntriesAsVector());
							this.shoppingService.setShoppingCart(selectedCustomer.getCustomerID(), newShoppingCart);
							this.showChoosenCustomer(selectedCustomer);
						} 
						else {
							this.shoppingService.clearTempArticles();
							this.showChoosenCustomer(selectedCustomer);
						}
					});
				}
				else {
					this.showChoosenCustomer(selectedCustomer);
				}
			}
			else {
				this.showChoosenCustomer(selectedCustomer);
			}
		}
		else {
			this.clientService.showDialog("Sie haben noch keinen Kunden selektiert!", false);
		}
	}

	onPresentCatalog() {
		let customer = this.dataService.choosenCustomer;
		if (customer != null) {

		}
		else {
			this.clientService.showDialog("Bitte wählen Sie zuerst einen Kunden aus.", true);
		}
	}

    public refreshGUI() {

	}

	public showChoosenCustomer(customer) {
		
	}

	public generateCustomer(customer: TsiCustomer) {
		let result = [];
		result.push(new Map(['Name', customer.getName()]));
		result.push(new Map(['Kundennummer', customer.getCustomerID()]));
		result.push(new Map(['Telefon', customer.getPhoneNumber()]));
		result.push(new Map(['Fax', customer.getFaxNumber()]));
		result.push(new Map(['E-Mail', customer.getEmail()]));

		let lastVisit = '';
		if (customer.getDateLastVisit() == '00000000') {
			lastVisit = ' nicht vorhanden';
		}
		else {
			lastVisit = TsiUtil.parseAndFormatDate(customer.getDateLastVisit(), 'dd.MM.yyyy');
		}

		//result.push(new Map(['letzter Besuch', lastVisit]));

	}
}
