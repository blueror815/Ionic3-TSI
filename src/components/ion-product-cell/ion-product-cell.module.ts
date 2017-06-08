import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonProductCellComponent } from './ion-product-cell';

@NgModule({
  declarations: [
    IonProductCellComponent,
  ],
  imports: [
    IonicPageModule.forChild(IonProductCellComponent),
  ],
  exports: [
    IonProductCellComponent
  ]
})
export class IonProductCellComponentModule {}
