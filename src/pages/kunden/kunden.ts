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
	public customer : string = "";
	public customerUnits = [];
	public items = [];
	public item = {name: '', priority: '', lastVisit: '', customerGroup: '', location: ''};

  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataService: TsiDataServiceProvider,
	  			public clientService: TsiClientServiceProvider, public shoppingService: TsiShoppingCartServiceProvider, public dialog: Dialogs) {
		
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad KundenPage');

		//this.dataService.putCustomer(this.dataService.selectedCustomer);
		//this.onSetCustomer();

		this.customerUnits = this.dataService.getCustomerBusinessUnit();
		this.select_unit = this.customerUnits[0];
		this.refreshGUI();
  	}

  	onCreateClient() {
  		let newClientModal = this.modalCtrl.create('CreateClientModalPage');

  		newClientModal.onDidDismiss(data => { // callback to get data from config modal, it is called when config modal is dismissed
	     	console.log(data);
	   	});

	   	newClientModal.present();
  	}
	
	onCustomerUnitChange = (customerUnit) => {
		this.select_unit = customerUnit;
		TsiUtil.nUnitIndex = this.customerUnits.indexOf(customerUnit);
		this.refreshGUI();
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
		let customers = this.dataService.getCustomersAsVector(this.customer, TsiUtil.nUnitIndex);
		//console.log('Customers', JSON.stringify(customers));

		this.items = [];

		for (let mCustomer of customers) {

			let item = {name: '', priority: '', lastVisit: '', customerGroup: '', location: ''};

			item.name = mCustomer.getName();
			item.priority = mCustomer.getAbc();
			item.lastVisit = '';
			item.customerGroup = mCustomer.getAfi();
			item.location = mCustomer.getCity();

			console.log("----->item<----",  item)
			this.items.push(item);
		}

		
		if (this.dataService.selectedCustomer != null) {
			// for (let mCustomer of customers) {
			// 	let item : any;
			// 	item.name = mCustomer.getName();
			// 	item.priority = mCustomer.getAbc();
			// 	item.lastVisit = '';
			// 	item.customerGroup = mCustomer.getAfi();
			// 	item.location = mCustomer.getCity();

			// 	this.items.push(item);
			// }
		}
		
	}

	public showChoosenCustomer(customer) {
		this.refreshGUI();
	}

	public generateCustomer(customer: TsiCustomer) {
		let result = [];

		result.push(new Map([['Name', customer.getName()]]));
		result.push(new Map([['Kundennummer', customer.getCustomerID()]]));
		result.push(new Map([['Telefon', customer.getPhoneNumber()]]));
		result.push(new Map([['Fax', customer.getFaxNumber()]]));
		result.push(new Map([['E-Mail', customer.getEmail()]]));

		let lastVisit = '';
		if (customer.getDateLastVisit() == '00000000') {
			lastVisit = ' nicht vorhanden';
		}
		else {
			lastVisit = TsiUtil.parseAndFormatDate(customer.getDateLastVisit(), 'dd.MM.yyyy');
		}

		result.push(new Map([['letzter Besuch', lastVisit]]));

		let lastRG = '';
		if (customer.getDateLastRG() == '00000000') {
			lastRG = ' nicht vorhanden';
		}
		else {
			lastRG = TsiUtil.parseAndFormatDate(customer.getDateLastRG(), 'dd.MM.yyyy');
		}

		result.push(new Map([["Datum letzte Rechnung", lastRG]]));
        result.push(new Map([["Betrag letzte Rechnung", TsiUtil.formatMoney(customer.getValueLastRG(), 3)]]));
        result.push(new Map([["Kreditlimit", TsiUtil.formatMoney(customer.getCreditLimit(), 3)]]));
        result.push(new Map([["Limit verfügbar", TsiUtil.formatMoney(customer.getCreditLimitAvailable(), 3)]]));
        result.push(new Map([["Mindestauftragsmenge", customer.getMinOrderQuantity()]]));
        if (customer.getOrderBlock().length > 0)
            result.push( new Map([["AufragsSperre", customer.getOrderBlock()]]));

        return result;
	}
}
