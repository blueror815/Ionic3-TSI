import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePage } from '../date/date';
import { NamePage } from '../name/name';

/**
 * Generated class for the CommunicationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-communication',
  templateUrl: 'communication.html',
})
export class CommunicationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunicationPage');
  }

  onNextTab() {
    console.log('Change Root');
    //this.navCtrl.setRoot(DatePage);
    this.navCtrl.parent.rootPage = 'DatePage';
  }

  onPrevTab() {
    console.log('Change Root');
    //this.navCtrl.setRoot(NamePage);
    this.navCtrl.parent.rootPage = 'NamePage';
  }

}
