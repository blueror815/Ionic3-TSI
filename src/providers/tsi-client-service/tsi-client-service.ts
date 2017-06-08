import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiEmailServiceProvider } from '../tsi-email-service/tsi-email-service';
import { TsiParserServiceProvider } from '../tsi-parser-service/tsi-parser-service';
import { TsiConnectionServiceProvider } from '../tsi-connection-service/tsi-connection-service';

/*
  Generated class for the TsiClientServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiClientServiceProvider {


  constructor() {
    console.log('Hello TsiClientServiceProvider Provider');
  
  }

}
