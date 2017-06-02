import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateClientModalPage } from './create-client-modal';

@NgModule({
  declarations: [
    CreateClientModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateClientModalPage),
  ],
  exports: [
    CreateClientModalPage
  ]
})
export class CreateClientModalPageModule {}
