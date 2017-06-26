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
	public detail = {name: '', customerID: '', phone: '', fax: '', email: '', lastVisit: '', lastRG: '', 
					   rgValue: '', creditLimit: '', creditLimitAvailable: '' , orderQuantity: '', orderBlock: ''};

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

	onSelectCustomer = (index, element) => {

		element.style.backgroundColor = 'blue';

		console.log("Index" , index);
		this.dataService.selectedCustomer = this.dataService.getCustomersAsVector(this.customer, TsiUtil.nUnitIndex)[index];

		console.log("Selected Customer", JSON.stringify(this.dataService.selectedCustomer));
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

			item.name = mCustomer.getName() + '\n\n' + mCustomer.getStreet() + '\n' + mCustomer.getZip() + ' ' + mCustomer.getCity();
			item.priority = mCustomer.getAbc();
			let lastVisit = '';
			if (mCustomer.getDateLastVisit() == '00000000') {
				lastVisit = ' nicht vorhanden';
			}
			else {
				lastVisit = TsiUtil.parseAndFormatDate(mCustomer.getDateLastVisit(), 'dd.MM.yyyy');
			}

			item.lastVisit = lastVisit;
			item.customerGroup = mCustomer.getAfi();
			item.location = mCustomer.getCity();

			this.items.push(item);
		}

		this.detail = {name: '', customerID: '', phone: '', fax: '', email: '', lastVisit: '', lastRG: '', 
					   rgValue: '', creditLimit: '', creditLimitAvailable: '' , orderQuantity: '', orderBlock: ''};

		if (this.dataService.selectedCustomer) {
			
			let pairCustomers = this.generateCustomer(this.dataService.selectedCustomer);
			if (pairCustomers) {
				this.detail.name = 'Name = ' + pairCustomers[0];
				this.detail.customerID = 'Kundennummer = ' + pairCustomers[1];
				this.detail.phone = 'Telefon = ' + pairCustomers[2];
				this.detail.fax = 'Fax = ' + pairCustomers[3];
				this.detail.email = 'E-Mail = ' + pairCustomers[4];
				this.detail.lastVisit = 'letzter Besuch = ' + pairCustomers[5];
				this.detail.lastRG = 'Datum letzte Rechnung = ' + pairCustomers[6];
				this.detail.rgValue = 'Betrag letzte Rechnung = ' + pairCustomers[7];
				this.detail.creditLimit = 'Kreditlimit = ' + pairCustomers[8];
				this.detail.creditLimitAvailable = 'Limit verfügbarName = ' + pairCustomers[9];
				this.detail.orderQuantity = 'Mindestauftragsmenge = ' + pairCustomers[10];
				if (pairCustomers[11]) {
					this.detail.orderBlock = 'AufragsSperre = ' + pairCustomers[11];
				}

				console.log("Detail", JSON.stringify(this.detail));
			}
		}
		
	}

	public showChoosenCustomer(customer) {
		this.refreshGUI();
	}

	public generateCustomer(customer: TsiCustomer) {
		console.log('TsiCustomer', JSON.stringify(customer));

		let result = [];

		result.push(customer.getName());
		result.push(customer.getCustomerID());
		result.push(customer.getPhoneNumber());
		result.push(customer.getFaxNumber());
		result.push(customer.getEmail());

		console.log('Generate Customer 1 ====>', JSON.stringify(result));

		let lastVisit = '';
		if (customer.getDateLastVisit() == '00000000') {
			lastVisit = ' nicht vorhanden';
		}
		else {
			lastVisit = TsiUtil.parseAndFormatDate(customer.getDateLastVisit(), 'dd.MM.yyyy');
		}

		result.push(lastVisit);

		console.log('Generate Customer 2 ====>', JSON.stringify(result));

		let lastRG = '';
		if (customer.getDateLastRG() == '00000000') {
			lastRG = ' nicht vorhanden';
		}
		else {
			lastRG = TsiUtil.parseAndFormatDate(customer.getDateLastRG(), 'dd.MM.yyyy');
		}

		result.push(lastRG);

		console.log('Generate Customer 3 ===>', JSON.stringify(result));

        result.push(TsiUtil.formatMoney(customer.getValueLastRG(), 3));
        result.push(TsiUtil.formatMoney(customer.getCreditLimit(), 3));
        result.push(TsiUtil.formatMoney(customer.getCreditLimitAvailable(), 3));
        result.push(customer.getMinOrderQuantity());
        if (customer.getOrderBlock().length > 0)
            result.push(customer.getOrderBlock());

		console.log('Generate Customer 4 ===>', JSON.stringify(result));

        return result;
	}
}
