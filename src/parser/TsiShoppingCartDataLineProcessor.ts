import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiShoppingCartLineResult } from './TsiShoppingCartLineResult';
import { TsiRawOrder } from '../models/TsiRawOrder';
import { TsiShoppingCartServiceProvider } from '../providers/tsi-shopping-cart-service/tsi-shopping-cart-service';

export class TsiShoppingCartDataLineProcessor extends TsiAbstractLineProcessor<TsiShoppingCartLineResult> {

    constructor(public dataService: TsiDataServiceProvider, public shoppingService: TsiShoppingCartServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let result = new TsiRawOrder();
        let lineItems = line.split( "|" );
        
        let index = 0;
        result.customerID = lineItems[index++];
        result.billCounter = lineItems[index++];
        result.billID = lineItems[index++];
        result.position = lineItems[index++];
        result.fakturDate = lineItems[index++];
        result.articleID = lineItems[index++];
        result.vpe_size = lineItems[index++];
        result.price = lineItems[index++];
        lineItems = null;
        return result;
    }

    public process(lineResult: TsiShoppingCartLineResult) {
        let cart = this.shoppingService.getShoppingCart( this.dataService.choosenCustomer.getCustomerID() );

        if (lineResult.info != null)
            cart.setInfoText( lineResult.info );
        
        if (lineResult.date != 0)
            cart.setDate( lineResult.date );
    }

}