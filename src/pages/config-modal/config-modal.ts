import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the ConfigModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  	selector: 'page-config-modal',
  	templateUrl: 'config-modal.html',
})
export class ConfigModalPage {

	  public img_url = "assets/images/wrong.png";
	  public img_background_url = "assets/images/not_avalible.png";
    public is_checked: boolean = false;
    public server_address: string = "80.228.110.31";
    public server_name: string = "test sever";
    public password: string = "testpassword";
    public select_value: string = "female";
    public benutzername: string = "80.228.110.31";
    public user_password: string = "testuserpassword";
    public absender_email: string = "user@email.com";
    public empfanger_email: string = "user@afm.com";
    public email_server: string = "192.149.22.1";
    public email_port: number = 22;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public dialogs: Dialogs, public imagePicker: ImagePicker) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ConfigModalPage');
  	}

  	onCheck = () => {
  		if(!this.is_checked) {
  			this.img_url = "assets/images/right.png";
  			this.is_checked = true;
  		} else {
  			this.img_url = "assets/images/wrong.png";
  			this.is_checked = false;
  		}
  	}

    openGallery = () => {
      this.imagePicker.getPictures({}).then((results) => {
        this.dialogs.alert(results[0]);
        this.img_background_url = results[0];
      }, (err) => {

      });
    }

  	dismiss() { // call this function to pass modal data to main tab.
	   let data = { 'foo': 'bar' };
	   this.viewCtrl.dismiss(data);
	}
}
