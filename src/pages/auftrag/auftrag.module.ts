import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuftragPage } from './auftrag';

@NgModule({
  declarations: [
    AuftragPage,
  ],
  imports: [
    IonicPageModule.forChild(AuftragPage),
  ],
  exports: [
    AuftragPage
  ]
})
export class AuftragPageModule {}
