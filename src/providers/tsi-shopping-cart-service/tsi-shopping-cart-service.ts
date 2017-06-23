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

    private tempVPEArticles : Map<string, number>;
    private tempPALArticles : Map<string, number>;
    private shoppingCarts : Map<string, TsiShoppingCart> ;

    constructor(public http: Http, public dataService: TsiDataServiceProvider) {
        console.log('Hello TsiShoppingCartServiceProvider Provider');
        this.tempPALArticles = new Map();
        this.tempVPEArticles = new Map();
        this.shoppingCarts = new Map();
    }

    public getShoppingCart(customerID)
    {
        let result = null;
        if (customerID != null)
        {
            result = this.shoppingCarts[customerID];
            if (result == null)
            {
                result = new TsiShoppingCart(customerID, this.dataService);
                result.setCreationDate( new Date().getTime() );
                this.shoppingCarts[customerID] = result;
            }
        }
        return result;
    }

    public setShoppingCart( customerID, shoppingCart)
    {
        this.shoppingCarts.set( customerID, shoppingCart );
    }

    public shoppingCartExists(customerID) {
        return this.shoppingCarts[customerID.toString()] != null && Object.keys(this.shoppingCarts[customerID.toString()]).length > 0;
    }

    public getActualShoppingCart() {
        let result = null;
        let customer = this.dataService.choosenCustomer;
        if (customer != null)
            result = this.getShoppingCart(customer.getCustomerID());

        return result;
    }

    public clearTempArticles()
    {
        this.tempVPEArticles.clear();
    }

}
