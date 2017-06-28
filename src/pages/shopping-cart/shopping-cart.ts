import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiShoppingCartServiceProvider } from '../../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';
import { TsiUtil } from '../../utils/TsiUtil';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  	selector: 'page-shopping-cart',
  		templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
	@ViewChild(SignaturePad) signaturePad: SignaturePad;

	public customerName = 'Bitte wählen Sie einen Kunden aus!';
	public signature = '';
  	public isDrawing = false;
 	public is_active = false;
 	public overAllPrice = "Gesamtpreis Auftrag: 0,00 Euro    VPE Menge: 0";
 	public positionPrice = "Positionspreis: 0,00 Euro";
	public info = "";
 	public qty_vpe = "000";
 	public qty_pal = "000";
	public meeting_time = "";

	public articles = [];

  	public signaturePadOptions: any = { // Check out https://github.com/szimek/signature_pad
	    'minWidth': 2,
	    'canvasWidth': 380,
	    'canvasHeight': 200,
	    'backgroundColor': '#f6fbff',
	    'penColor': '#666a73'
  	};

  	constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, 
	  			public dataService: TsiDataServiceProvider, public dialog: Dialogs, public shoppingService: TsiShoppingCartServiceProvider) {
  	}

  	ionViewDidLoad() {
  		console.log("this signature pad", this.signaturePad);
    	console.log('ionViewDidLoad ShoppingCartPage');

		this.refreshGUI();
  	}

  	ionViewDidEnter() {
    	this.signaturePad.clear()
    // this.storage.get('savedSignature').then((data) => {
    //   this.signature = data;
    // });
  	}
 
  	drawComplete() {
    	this.isDrawing = false;
  	}
 
  	drawStart() {
    	this.isDrawing = true;
  	}

	onSelectArticle = (i, event) => {

	}
 
  	// savePad() {
    // 	this.signature = this.signaturePad.toDataURL();
    // 	// this.storage.set('savedSignature', this.signature);
    // 	this.signaturePad.clear();
    // 	let toast = this.toastCtrl.create({
    //   		message: 'New Signature saved.',
    //   		duration: 3000
    // 	});
    // 	toast.present();
  	// }
 
  	clearPad() {
    	this.signaturePad.clear();
  	}

	onChangeVPE() {
		let entry = this.dataService.choosenShoppingCartEntry;
		entry.setVPECount(parseInt(this.qty_vpe));
		this.updateView();
	}

	onChangePAL() {
		let entry = this.dataService.choosenShoppingCartEntry;
		entry.setPALCount(parseInt(this.qty_pal));
		this.updateView();
	}

	onVPESub() {
		let entry = this.dataService.choosenShoppingCartEntry;
		if (entry) {
			this.manipulateArticleCountAndCheckZero(-1, 0);
		}
	}

	onVPEAdd() {
		let entry = this.dataService.choosenShoppingCartEntry;
		if (entry) {
			entry.addVPECount(1);
			this.refreshGUI();
		}
	}

	onPALSub() {
		let entry = this.dataService.choosenShoppingCartEntry;
		if (entry) {
			this.manipulateArticleCountAndCheckZero(0, -1);
		}
	}

	onPALAdd() {
		let entry = this.dataService.choosenShoppingCartEntry;
		if (entry) {
			entry.addPALCount(1);
			this.refreshGUI();
		}
	}

	onShowInfo() {
		let shoppingCartEntry = this.dataService.choosenShoppingCartEntry;
		if (shoppingCartEntry) {
			let article = this.dataService.getArticle(shoppingCartEntry.getArticleID());
			if (article) {
				this.dataService.choosenArticle = article;
				this.dataService.getTabHostOfMainScreen().select(5, {});
			}
		}
	}

	onChangeInfo() {
		if (this.shoppingService.getActualShoppingCart()) {
			this.shoppingService.getActualShoppingCart().setInfoText(this.info);
		}
	}

	onChangeDate() {

	}

	private manipulateArticleCountAndCheckZero(vpeCount, palCount) {
		let entry = this.dataService.choosenShoppingCartEntry;

		if (entry.getVPECount() + vpeCount == 0 && entry.getPALCount() + palCount == 0) {
			this.dialog.confirm("Soll dieser Artikel aus dem Warenkorb gelöscht werden?", "", ['Ja', 'Nein']).then((res) => {
				if (res == 0) {
					this.shoppingService.getActualShoppingCart().removeArticle(entry.getArticleID());
					this.refreshGUI();
				} 
				else {
					this.refreshGUI();
				}
			});
		}
		else {
			entry.addVPECount(vpeCount);
			entry.addPALCount(palCount);
			this.refreshGUI();
		}
	}

	updateView() {
		let shoppingCart = this.shoppingService.getActualShoppingCart();
		if (shoppingCart) {
			let entries = shoppingCart.getEntriesAsVector();
			
			this.articles = [];
			for (let entry of entries) {
				let article = {index: '', name: '', id: '', count: '', unit: ''};

				if (entry) {
					article.name = entry.getName();
					article.unit = entry.getContent();
				}
				else {
					article.name = "???????????????";
					article.unit = "???????????????";
				}

				article.count = entry.getOverallCount();
				article.id = entry.getArticleID();
				article.index = entry.getIndex().toString();

				this.articles.push(article);
			}

			this.overAllPrice = "Gesamtpreis Auftrag: " + TsiUtil.formatMoney( shoppingCart.calculateOverallPrice(), 3 ) + "        Auftragsmenge: " + shoppingCart.getOrderQuantity() + " ( min. "
                    + this.dataService.choosenCustomer.getMinOrderQuantity() + ")";

			let choosenEntry = this.dataService.choosenShoppingCartEntry;
			if (choosenEntry) {
				let article = this.dataService.getArticle(choosenEntry.getArticleID());
				let articleCount = this.shoppingService.getActualShoppingCart().getOverallCount(article);
				let rebate = 0;

				if (article.getRebate1().length > 0) {
					rebate += parseFloat(article.getRebate1());
				}

				if (article.getRebate2().length > 0) {
					rebate += parseFloat(article.getRebate2());
				}

				this.positionPrice = "Positionspreis: " + TsiUtil.formatMoney((parseFloat( article.getVpe_price()) - parseFloat( article.getVpe_price()) * rebate / 100) * articleCount, 3 );
			}
			else {
				this.positionPrice = "Positionspreis: ---";
			}

		}
		else {
			this.articles = [];
			this.info = '';
			this.qty_vpe = '---';
			this.qty_pal = '---';
			this.meeting_time = TsiUtil.formatDate(shoppingCart.getDate(), 'dd.MM.yyyy');
		}
	}

	onShoppingCartSave() {

	}

	onSendOrder() {

	}

	public refreshGUI() {
		let customer = this.dataService.choosenCustomer;
		if (customer) {
			this.customerName = customer.getName();
		}
		else {
			this.customerName = 'Bitte wählen Sie einen Kunden aus!';
			
		}

		if (customer) {
			this.updateView();
		}
	}
}
