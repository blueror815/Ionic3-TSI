import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the InternPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-intern',
	templateUrl: 'intern.html',
})
export class InternPage {
	public items = [];

	public empfanger_email = "";
	public license         = "";
	public kilometer       = "";
	public date            = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, public dialogs : Dialogs) {
	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InternPage');
	}

	onRemoveAllKm = () => {
		this.dialogs.confirm("Löschen?", "Wollen Sie wirklich alle Einträge löschen?", ["Ja", "Nein"]).then((buttonIndex) => {
			switch (buttonIndex) {
				case 1:
					break;
				case 2:
					break;
			}
		});
	}

	onRemoveAllExp = () => {
		this.dialogs.confirm("Löschen?", "Wollen Sie wirklich alle Einträge löschen?", ["Ja", "Nein"]).then((buttonIndex) => {
			switch (buttonIndex) {
				case 1:
					this.license   = "";
					this.kilometer = "";
					this.date      = "";
					break;
				case 2:
					break;
			}
		});
	}
}
