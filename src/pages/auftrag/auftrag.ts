import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';
import { TsiSyncDataServiceProvider } from '../../providers/tsi-sync-data-service/tsi-sync-data-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiOrder } from '../../models/TsiOrder';
import { TsiShoppingCartServiceProvider } from '../../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';
import { TsiUtil } from '../../utils/TsiUtil';

/**
 * Generated class for the AuftragPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auftrag',
  templateUrl: 'auftrag.html',
})
export class AuftragPage {

	public img_url: string = "assets/images/not_avalible.png";

	public articles = [];
	public orders = [];
	public articleFilter = '';
	private scrollToArticle = false;
	public edtVPE = '---';
	public edtPAL = '---';
	
  	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider, 
	  			public syncService: TsiSyncDataServiceProvider,public shoppingService: TsiShoppingCartServiceProvider,
				public dialog: Dialogs, public toastCtrl: ToastController) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AuftragPage');

		this.articles = [];

		let articles = this.dataService.getArticlesAsVector('', null);

		console.log('Articles =>', JSON.stringify(articles));

		for (let article of articles) {
			let item = {articleID : '', articleName: ''};
			item.articleID = article.getArticleNumber();
			item.articleName = article.getName();

			this.articles.push(item);
		}

		this.orders = [];

		if (this.dataService.choosenCustomer) {
			this.orders = this.dataService.getLastAvailableOrders(this.dataService.choosenCustomer.getCustomerID());
		}

  	}

	public refreshGUI() {
		let article = this.dataService.choosenArticle;
		
		this.articles = [];

		let articles = this.dataService.getArticlesAsVector(this.articleFilter, null);

		console.log('Articles =>', JSON.stringify(articles));

		for (let article of articles) {
			let item = {articleID : '', articleName: ''};
			item.articleID = article.getArticleNumber();
			item.articleName = article.getName();

			this.articles.push(item);
		}

		if (article) {
			this.img_url = article.getImageURL();
			let count = this.shoppingService.getTempVPEArticleCount(article.getArticleNumber());
			let palCount = this.shoppingService.getTempPALArticleCount(article.getArticleNumber());
			this.edtVPE = count.toString();
			this.edtPAL = palCount.toString();
		}
		else {
			this.edtVPE = '---';
			this.edtPAL = '---';
		}

		if (this.scrollToArticle) {
			let index = articles.indexOf(article);

			this.scrollToArticle = false;
		}

		let customer = this.dataService.choosenCustomer;
		if (customer) {
			let orders = this.dataService.getLastAvailableOrders(customer.getCustomerID());

			if (orders != null && orders.length > 0) {
				this.orders = this.dataService.getSuggestionOrders(customer.getCustomerID(), this.dataService.choosenOrderSuggestionType);
			}
			else {
				this.orders = [];
			}
		}
	}

	onSelectArticle = (index, element) => {
		let articles = this.dataService.getArticlesAsVector('', null);
		this.dataService.choosenArticle = articles[index];
		this.refreshGUI();
	}

	onSelectOrder = (index, element) => {
		let orderID = TsiUtil.getIdOfOrderName(this.orders[index]);
		this.dataService.choosenOrderSuggestionType = orderID;
		this.refreshGUI();
	}

	onOrderArticleImage() {
		let article = this.dataService.choosenArticle;
		if (article) {
			//this.img_url = this.syncService.getGraphicsStoragePath() + article.getImageURL();

		}
	}

	onOrderAddAllSuggestionArticles() {
		this.dialog.confirm("Letzte Rechnung/Vorschläge komplett übernehemen?", "", ['Ja', 'Nein']).then((res) => {
			if (res == 0) {
				let orderIDs = this.dataService.getLastAvailableOrders(this.dataService.choosenCustomer.getCustomerID());
				if (orderIDs != null && orderIDs.length > 0) {
					let customer = this.dataService.choosenCustomer;
					let orders = this.dataService.getSuggestionOrders(customer.getCustomerID(), this.dataService.choosenOrderSuggestionType);

					for (let order of orders) {
						this.addOrder(order);
					}

					let toast =	this.toastCtrl.create({
						message: "Artikel wurden erfolgreich hinzugefügt",
						duration: 1000,
						position: 'bottom'
					});
					toast.present();
				}
			} 
			else {
				
			}
		});
	}

	private addOrder(order : TsiOrder) {
		let articleID = order.getArticleID();
		let articleCount = parseInt(order.getVpe_size());

		if (this.dataService.getArticle(articleID)) {
			this.shoppingService.addTempVPEArticle(articleID, articleCount);
			this.shoppingService.addTempVPEArticlesToFixed(articleID, false, true);
		}
		else {
		 	let toast =	this.toastCtrl.create({
				message: "Artikel mit ID " + articleID + " konnte nicht hinzugefügt werde da er nicht in der Datenbank registriert ist.",
				duration: 1000,
				position: 'bottom'
			});
			toast.present();
		}
	}

	onOrderAddSuggestionArticle() {
		let order = this.dataService.choosenOrder;
		if (order) {
			this.addOrder(order);
			let toast =	this.toastCtrl.create({
				message: "Artikel wurden erfolgreich hinzugefügt",
				duration: 1000,
				position: 'bottom'
			});
			toast.present();
		}
	}

	onOrderShowInfo() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.dataService.getTabHostOfMainScreen().select(5, {});
		}
	}

	onOrderVPESub() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.shoppingService.addTempVPEArticle(article.getArticleNumber(), -1);
			this.refreshGUI();
		}
	}

	onOrderVPEAdd() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.shoppingService.addTempVPEArticle(article.getArticleNumber(), 1);
			this.refreshGUI();
		}
	}

	onOrderPALSub() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.shoppingService.addTempPALArticle(article.getArticleNumber(), -1);
			this.refreshGUI();
		}
	}

	onOrderPALAdd() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.shoppingService.addTempPALArticle(article.getArticleNumber(), 1);
			this.refreshGUI();
		}
	}

	onOrderAddToCart() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.shoppingService.addTempArticleCountToFixedIfNotExists(article);
		}
	}

}
