import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternPage } from './intern';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    InternPage,
  ],
  imports: [
    IonicPageModule.forChild(InternPage),
    Ng2SmartTableModule
  ],
  exports: [
    InternPage
  ]
})
export class InternPageModule {}
