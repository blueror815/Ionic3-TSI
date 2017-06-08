import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogPage } from './catalog';
import { IonProductCellComponentModule } from '../../components/ion-product-cell/ion-product-cell.module';

@NgModule({
  declarations: [
    CatalogPage,
  ],
  imports: [
  	IonProductCellComponentModule,
    IonicPageModule.forChild(CatalogPage)
  ],
  exports: [
    CatalogPage
  ]
})
export class CatalogPageModule {}
