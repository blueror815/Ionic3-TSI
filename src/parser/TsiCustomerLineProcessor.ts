import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiCustomer } from '../models/TsiCustomer';

export class TsiCustomerLineProcessor extends TsiAbstractLineProcessor<TsiCustomer> {

    private index = 0;

    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        this.index = 0;
        let result = new TsiCustomer();
        let lineItems = line.split( "|" );
        
        result.setName( this.nextString(lineItems) );
        result.setCity_short( this.nextString(lineItems)  );
        result.setStreet( this.nextString(lineItems)  );
        result.setCustomerID( this.nextString(lineItems)  );
        result.setZip( this.nextString(lineItems)  );
        result.setCity( this.nextString(lineItems)  );
        result.setOrderBlock( this.nextString(lineItems)  );
        result.setAbc( this.nextString(lineItems)  );
        result.setAfi( this.nextString(lineItems)  );
        result.setDateLastVisit( this.nextString(lineItems)  );
        result.setFormatCode( this.nextString(lineItems)  );
        result.setCodeAG( this.nextString(lineItems)  );
        result.setCodeWE( this.nextString(lineItems)  );
        result.setInfo( this.nextString(lineItems)  );
        result.setMinOrderQuantity( this.nextString(lineItems)  );
        result.setPhoneNumber( this.nextString(lineItems)  );
        result.setEmail( this.nextString(lineItems)  );
        result.setLastBill( this.nextString(lineItems)  );
        result.setDateLastRG( this.nextString(lineItems)  );
        result.setValueLastRG( this.nextString(lineItems)  );
        result.setLimitCustomer( this.nextString(lineItems)  );
        result.setLimitClass( this.nextString(lineItems)  );
        result.setCreditLimit( this.nextString(lineItems)  );
        result.setCreditLWimitAvailable( this.nextString(lineItems)  );
        return result;
    }

    private nextString(lineItems : string[]) {
        let result = '';
        if (lineItems.length > this.index) {
            result = lineItems[this.index ++];
        }

        return result;
    }

    public process(lineResult: TsiCustomer) {
        this.dataService.putCustomer(lineResult);
    }

}