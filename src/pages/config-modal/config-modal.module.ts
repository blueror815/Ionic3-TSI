import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigModalPage } from './config-modal';

@NgModule({
  declarations: [
    ConfigModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigModalPage),
  ],
  exports: [
    ConfigModalPage
  ]
})
export class ConfigModalPageModule {}
