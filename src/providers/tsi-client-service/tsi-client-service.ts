import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';
import { TsiSyncDataServiceProvider } from '../tsi-sync-data-service/tsi-sync-data-service';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the TsiClientServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiClientServiceProvider {

  constructor(public dataService : TsiDataServiceProvider, public syncService: TsiSyncDataServiceProvider, public dialog : Dialogs, 
              public loading: LoadingController) {
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

  public async updateConfiguration(disableScreen) {

    return new Promise(async (resolve) => {
      let loader = this.loading.create({
        content: ""
      });

      loader.present();
      await this.syncService.readLocalFileTimes(disableScreen, loader);
      await this.syncService.readServerFileTimes(disableScreen, loader);
      await this.syncService.downloadOutlatedFiles(disableScreen, loader);
      await this.syncService.startAllParseTasks(disableScreen, loader);
      await this.syncService.writeSyncFile(disableScreen, loader);

      if (disableScreen)
          await this.syncService.readShoppingCarts(disableScreen, loader);
      
      await this.syncService.readExpenditureSuggestionsFile(disableScreen, loader);
      await this.syncService.readExpendituresFile(disableScreen, loader);
      await this.syncService.readLicenceNumberSuggestionsFile(disableScreen, loader);
      await this.syncService.readLicenceNumberFile(disableScreen, loader);
      await this.syncService.readExpandituresConfFile(disableScreen, loader);
      await this.syncService.readKmConfFile(disableScreen, loader);
      
      loader.dismiss();

      resolve ();
    });

    

  }

  public showNoInternetDialog() {
     this.showDialog('Keine Internetverbindung verfügbar!', false);
  }




}
