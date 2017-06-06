import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
    SignaturePadModule
  ],
  exports: [
    ShoppingCartPage
  ]
})
export class ShoppingCartPageModule {}
