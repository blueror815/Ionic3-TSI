import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TsiShoppingCartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiShoppingCartServiceProvider {

  constructor(public http: Http) {
    console.log('Hello TsiShoppingCartServiceProvider Provider');
  }

}
