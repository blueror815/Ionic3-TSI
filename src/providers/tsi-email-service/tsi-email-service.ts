import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TsiEmailServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiEmailServiceProvider {

  public username = "";
  public password = "";
  public from     = "";

  public host     = "www.tsi.de";
  public port     = "25";

  public subject  = "";
  public recipient = "";

  constructor() {
    console.log('Hello TsiEmailServiceProvider Provider');
  }

}
