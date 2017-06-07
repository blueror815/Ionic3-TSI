import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TsiShoppingCart } from '../../models/TsiShoppingCart';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';

/*
  Generated class for the TsiShoppingCartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiShoppingCartServiceProvider {

  private tempVPEArticles : Map<string, number> = null;
  private tempPALArticles : Map<string, number> = null;
  private shoppingCarts : Map<string, TsiShoppingCart> = null;

  constructor(public http: Http, public dataService: TsiDataServiceProvider, public file: File) {
    console.log('Hello TsiShoppingCartServiceProvider Provider');
  }

    public getShoppingCart(customerID)
    {
        let result = null;
        if (customerID != null)
        {
            result = this.shoppingCarts.get( customerID );
            if (result == null)
            {
                result = new TsiShoppingCart(customerID, this.dataService);
                result.setCreationDate( new Date().getTime() );
                this.shoppingCarts.set( customerID, result );
            }
        }
        return result;
    }
    
    public setShoppingCart( customerID, shoppingCart)
    {
        this.shoppingCarts.set( customerID, shoppingCart );
    }

}
