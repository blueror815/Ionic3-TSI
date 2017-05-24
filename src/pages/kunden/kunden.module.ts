import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KundenPage } from './kunden';

@NgModule({
  declarations: [
    KundenPage,
  ],
  imports: [
    IonicPageModule.forChild(KundenPage),
  ],
  exports: [
    KundenPage
  ]
})
export class KundenPageModule {}
