import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { Dialogs } from '@ionic-native/dialogs';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';
import { TsiSyncDataServiceProvider } from '../tsi-sync-data-service/tsi-sync-data-service';

/*
  Generated class for the TsiClientServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiClientServiceProvider {

  constructor(public dataService : TsiDataServiceProvider, public syncService: TsiSyncDataServiceProvider, public dialog : Dialogs) {
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
        this.syncService.readLocalFileTimes( disableScreen );
        //this.syncService.readServerFileTimes( disableScreen );
        //this.syncService.downloadOutdatedFilesTask( disableScreen );
        
        this.syncService.startAllParseTasks(disableScreen );
        
        //this.syncService.writeSnycFile( disableScreen );
        
        if (disableScreen)
            this.syncService.readShoppingCarts( disableScreen );
        
        this.syncService.readExpenditureSuggestionsFile( disableScreen );
        this.syncService.readExpendituresFile(  disableScreen );
        this.syncService.readLicenceNumberSuggestionsFile( disableScreen );
        this.syncService.readLicenceNumberFile(  disableScreen );
        this.syncService.readExpandituresConfFile( disableScreen );
        this.syncService.readKmConfFile( disableScreen );

  }

  public showNoInternetDialog() {
     this.showDialog('Keine Internetverbindung verfügbar!', false);
  }




}
