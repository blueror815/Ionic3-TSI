import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';
import { Dialogs } from '@ionic-native/dialogs';

import { Ftp } from '../../plugins/cordova-plugin-ftp/types/ftp';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
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
    Ftp,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
