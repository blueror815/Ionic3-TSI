import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiRawOrder } from '../models/TsiRawOrder';
import { TsiCustomer } from '../models/TsiCustomer';

export class TsiOrderLineProcessor extends TsiAbstractLineProcessor<TsiRawOrder> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let result = new TsiRawOrder();
        let lineItems = line.split( "\\|" );
        
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

    public process(lineResult: TsiRawOrder) {
        this.dataService.putOrder( lineResult );
        lineResult = null;
    }

}