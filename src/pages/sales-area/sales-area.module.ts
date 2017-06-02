import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesAreaPage } from './sales-area';

@NgModule({
  declarations: [
    SalesAreaPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesAreaPage),
  ],
  exports: [
    SalesAreaPage
  ]
})
export class SalesAreaPageModule {}
