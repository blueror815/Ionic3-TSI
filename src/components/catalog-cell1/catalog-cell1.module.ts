import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogCell1Component } from './catalog-cell1';

@NgModule({
  declarations: [
    CatalogCell1Component,
  ],
  imports: [
    IonicPageModule.forChild(CatalogCell1Component),
  ],
  exports: [
    CatalogCell1Component
  ]
})
export class CatalogCell1ComponentModule {}
