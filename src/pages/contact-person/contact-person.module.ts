import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPersonPage } from './contact-person';

@NgModule({
  declarations: [
    ContactPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPersonPage),
  ],
  exports: [
    ContactPersonPage
  ]
})
export class ContactPersonPageModule {}
