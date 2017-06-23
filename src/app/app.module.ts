import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { Dialogs } from '@ionic-native/dialogs';
import { File } from '@ionic-native/file';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpModule } from '@angular/http';

import { Ftp } from '../../plugins/cordova-plugin-ftp/types/ftp';

import { MyApp } from './app.component';
import { TsiClientServiceProvider } from '../providers/tsi-client-service/tsi-client-service';
import { TsiConnectionServiceProvider } from '../providers/tsi-connection-service/tsi-connection-service';
import { TsiCheckInternetServiceProvider } from '../providers/tsi-check-internet-service/tsi-check-internet-service';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiEmailServiceProvider } from '../providers/tsi-email-service/tsi-email-service';
import { TsiHistoryServiceProvider } from '../providers/tsi-history-service/tsi-history-service';
import { TsiLocationServiceProvider } from '../providers/tsi-location-service/tsi-location-service';
import { TsiParserServiceProvider } from '../providers/tsi-parser-service/tsi-parser-service';
import { TsiShoppingCartServiceProvider } from '../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';
import { TsiSyncDataServiceProvider } from '../providers/tsi-sync-data-service/tsi-sync-data-service';
// import { IonProductCellComponent } from '../components/ion-product-cell/ion-product-cell';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    MyApp,
    // IonProductCellComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp , {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'top',
      pageTransition: 'wp-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Dialogs,
    File,
    DatePipe,
    Ftp,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TsiClientServiceProvider,
    TsiConnectionServiceProvider,
    TsiCheckInternetServiceProvider,
    TsiDataServiceProvider,
    TsiEmailServiceProvider,
    TsiHistoryServiceProvider,
    TsiEmailServiceProvider,
    TsiLocationServiceProvider,
    TsiParserServiceProvider,
    TsiShoppingCartServiceProvider,
    TsiSyncDataServiceProvider,
    SignaturePadModule
  ]
})
export class AppModule {}
