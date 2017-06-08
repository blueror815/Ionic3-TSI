import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogPage } from './catalog';

@NgModule({
  declarations: [
    CatalogPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogPage),
  ],
  exports: [
    CatalogPage
  ]
})
export class CatalogPageModule {}
