import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';

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
	
  	constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: TsiDataServiceProvider) {
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

}
