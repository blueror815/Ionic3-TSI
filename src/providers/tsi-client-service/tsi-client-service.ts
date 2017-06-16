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

  constructor(public dataService : TsiDataServiceProvider, public syncService: TsiSyncDataServiceProvider, public dialog : Dialogs, public loading: LoadingController) {
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

    let loader = this.loading.create({
      content: ""
    });

    loader.present();


    return new Promise((resolve) => {
        this.syncService.readLocalFileTimes(disableScreen, loader).then((res) => {

          console.log('Client Service readLocalFileTimes');

          this.syncService.readServerFileTimes(disableScreen, loader).then((res) => {
            console.log('Client Service readServerFileTimes');
            this.syncService.downloadOutlatedFiles(disableScreen, loader).then((res) => {

              console.log('Client Service readLocalFileTimes');
              this.syncService.startAllParseTasks(disableScreen, loader).then((res) => {

                console.log('Client Service startAllParseTasks');
                this.syncService.writeSyncFile(disableScreen, loader).then((res) => {

                  console.log('Client Service writeSyncFile');
                  if (disableScreen) {
                    this.syncService.readShoppingCarts(disableScreen, loader).then((res) => {

                      console.log('Client Service readShoppingCarts');
                      this.syncService.readExpenditureSuggestionsFile(disableScreen, loader).then((res) => {

                        console.log('Client Service readExpenditureSuggestionsFile');
                        this.syncService.readExpendituresFile(disableScreen, loader).then((res) => {

                          console.log('Client Service readExpendituresFile');
                          this.syncService.readLicenceNumberSuggestionsFile(disableScreen, loader).then((res) => {

                            console.log('Client Service readLicenceNumberSuggestionsFile');
                            this.syncService.readLicenceNumberFile(disableScreen, loader).then((res) => {

                              console.log('Client Service readLicenceNumberFile');
                              this.syncService.readExpandituresConfFile(disableScreen, loader).then((res) => {

                                console.log('Client Service readExpandituresConfFile');
                                this.syncService.readKmConfFile(disableScreen, loader).then((res) => {

                                  console.log('Client Service readKmConfFile');
                                  loader.dismiss();
                                  resolve();
                                });    
                              });    
                            });    
                          });
                        });    
                      });
                    });
                  }
                  else {
                    this.syncService.readExpenditureSuggestionsFile(disableScreen, loader).then((res) => {
                      this.syncService.readExpendituresFile(disableScreen, loader).then((res) => {
                          this.syncService.readLicenceNumberSuggestionsFile(disableScreen, loader).then((res) => {
                            this.syncService.readLicenceNumberFile(disableScreen, loader).then((res) => {
                              this.syncService.readExpandituresConfFile(disableScreen, loader).then((res) => {
                                this.syncService.readKmConfFile(disableScreen, loader).then((res) => {
                                  loader.dismiss();
                                  resolve();
                                });    
                              });    
                            });    
                          });
                      });    
                    });
                  }
                });  
              });
          });
          })
          
        });
    })    
        // this.syncService.readServerFileTimes( disableScreen );
        // this.syncService.downloadOutlatedFiles( disableScreen );
        
        // this.syncService.startAllParseTasks(disableScreen );
        
        // this.syncService.writeSyncFile(disableScreen );
        
        // if (disableScreen)
        //     this.syncService.readShoppingCarts( disableScreen );
        
        // this.syncService.readExpenditureSuggestionsFile( disableScreen );
        // this.syncService.readExpendituresFile( disableScreen );
        // this.syncService.readLicenceNumberSuggestionsFile( disableScreen );
        // this.syncService.readLicenceNumberFile(  disableScreen );
        // this.syncService.readExpandituresConfFile( disableScreen );
        // this.syncService.readKmConfFile( disableScreen );

  }

  public showNoInternetDialog() {
     this.showDialog('Keine Internetverbindung verfügbar!', false);
  }




}
