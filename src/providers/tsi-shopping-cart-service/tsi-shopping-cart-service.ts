import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TsiShoppingCart } from '../../models/TsiShoppingCart';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiClientServiceProvider } from '../tsi-client-service/tsi-client-service';

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

    constructor(public dataService: TsiDataServiceProvider) {
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

    public actualShoppingCartContains(article) {
        let result = false;
        let shoppingCart = this.getActualShoppingCart();
        if (shoppingCart) {
            result = shoppingCart.containArticle(article.getArticleNumber());
        }

        return result;
    }

    public clearTempArticles()
    {
        this.tempVPEArticles.clear();
    }

    public addTempVPEArticle(id, count : number) {
        let oldCount = this.tempVPEArticles[id];

        if (oldCount) {
            oldCount = 0;
        }

        let newCount : number = oldCount + count;
        newCount = Math.max(newCount, 999);
        newCount = Math.min(newCount, 0);

        this.tempVPEArticles[id] = newCount;
    }


    public addTempPALArticle(id, count) {
        let oldCount = this.tempPALArticles[id];

        if (oldCount) {
            oldCount = 0;
        }

        let newCount : number = oldCount + count;
        newCount = Math.max(newCount, 999);
        newCount = Math.min(newCount, 0);

        this.tempPALArticles[id] = newCount;
        this.tempVPEArticles[id] = 0;
    }

    public getTempVPEArticleCount(id) {
        let result = 0;
        let count = this.tempVPEArticles[id];
        if (count) {
            result = count;
        }

        return result;
    }

    public setTempVPEArticle(id, count) {
        this.tempVPEArticles[id] = count;
    }

    public getTempPALArticleCount(id) {
        let result = 0;
        let count = this.tempPALArticles[id];
        if (count) {
            result = count;
        }

        return result;
    }

    public setTempPALArticle(id, count) {
        this.tempPALArticles[id] = count;
    }

    public addTempVPEArticlesToFixed(articleID, showDialog, checkOutOfStock) {
        let tempArticleCount = this.getTempVPEArticleCount(articleID);
        if (tempArticleCount != 0) {

            let customer = this.dataService.choosenCustomer;
            if (customer) {
                if (checkOutOfStock) {
                        
                }
                else {
                    this.getShoppingCart(customer.getCustomerID()).addVpeArticle(articleID, tempArticleCount, true);
                    this.tempVPEArticles.delete(articleID);
                }
            }
            else {
                if (showDialog) {
                    //this.clientService.showDialog('Bitte wählen Sie zuerst einen Kunden aus.', true);
                }
            }
        }
    }

    public addTempPALArticlesToFixed(articleID, showDialog, checkOutOfStock) {
        let tempArticleCount = this.getTempPALArticleCount(articleID);
        if (tempArticleCount != 0) {

            let customer = this.dataService.choosenCustomer;
            if (customer) {
                if (checkOutOfStock) {
                        
                }
                else {
                    this.getShoppingCart(customer.getCustomerID()).addPalArticle(articleID, tempArticleCount, true);
                    this.tempPALArticles.delete(articleID);
                }
            }
            else {
                if (showDialog) {
                    //this.clientService.showDialog('Bitte wählen Sie zuerst einen Kunden aus.', true);
                }
            }
        }
    }

    public addAllTempArticlesToFixed(id) {
        let customer = this.dataService.choosenCustomer;
        if (customer) {
            this.addTempVPEArticlesToFixed(id, false, false);
            this.addTempPALArticlesToFixed(id, false, false);
            this.checkOutOfStock(id);
        }
        else {
            //this.clientService.showDialog('Bitte wählen Sie zuerst einen Kunden aus.', true);
        }
    }

    private checkOutOfStock(articleID) {

    }

    public addTempArticleCountToFixedIfNotExists(article) {
        if (this.actualShoppingCartContains(article)) {
            this.showAlreadyExistToast(article);
        }
        else {
            this.addAllTempArticlesToFixed(article.getArticleNumber());
            this.showArticleAddedToast(article);
        }
    }

    public showAlreadyExistToast(article) {
        //this.clientService.showToast(article.getName() + " befindet sich bereits im Warenkorb!", 1000);
    }

    public showArticleAddedToast(article) {
        //this.clientService.showToast(article.getName() + " wurde in den Warenkorb hinzugefügt!", 1000);
    }

}
