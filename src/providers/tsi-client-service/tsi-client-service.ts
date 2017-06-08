import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiParserServiceProvider } from '../tsi-parser-service/tsi-parser-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';

/*
  Generated class for the TsiClientServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiClientServiceProvider {

  constructor(public dataService : TsiDataServiceProvider, public parserService : TsiParserServiceProvider, public dialog : Dialogs) {
    console.log('Hello TsiClientServiceProvider Provider');
  
  }

  public showDialog(message, showCustomerScreen) {
    this.dataService.preventCodeScanning = showCustomerScreen;

    this.dialog.alert(message, '', 'OK').then((res) => {
      this.dataService.preventCodeScanning = false;
      if (showCustomerScreen) {

      }
    });
  }

  public updateConfiguration(disableScreen) {
     this.parserService.parse(this.dataService.file.documentsDirectory + "TSI/Data/", "sync.dat", TsiParserConfigNames.PARSER_CONFIG_SYNCFILE).then((res) => {}, (err) => {});

  }

  public showNoInternetDialog() {
     this.showDialog('Keine Internetverbindung verfügbar!', false);
  }




}
