import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';
import { TsiSyncDataServiceProvider } from '../../providers/tsi-sync-data-service/tsi-sync-data-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiOrder } from '../../models/TsiOrder';
import { TsiShoppingCartServiceProvider } from '../../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';

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

	public items = [];
	
  	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider, 
	  			public syncService: TsiSyncDataServiceProvider,public shoppingService: TsiShoppingCartServiceProvider,
				public dialog: Dialogs, public toastCtrl: ToastController) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AuftragPage');

		this.items = [];

		let articles = this.dataService.getArticlesAsVector('', null);

		console.log('Articles =>', JSON.stringify(articles));

		for (let article of articles) {
			let item = {articleID : '', articleName: ''};
			item.articleID = article.getArticleNumber();
			item.articleName = article.getName();

			this.items.push(item);
		}

  	}

	public refreshGUI() {
		
	}

	onOrderArticleImage() {
		let article = this.dataService.choosenArticle;
		if (article) {
			this.img_url = this.syncService.getGraphicsStoragePath() + article.getImageURL();

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
