import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiExpenditure } from '../models/TsiExpenditure';

export class TsiExpendituresLineProcessor extends TsiAbstractLineProcessor<TsiExpenditure> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearExpenditureEntries();
    }

    public parse(line: string, sourceFileName: string) {
        let result = new TsiExpenditure(null, null, null, null);
        let lineItems = line.split( "\\;" );
        
        let index = 0;
        result.setRecordID( lineItems[index++] );
        result.setValue( lineItems[index++] );
        result.setDate( lineItems[index++] );
        result.setInformation( lineItems[index++] );
        lineItems = null;
        
        return result;
    }

    public process(lineResult: TsiExpenditure) {
        this.dataService.addExpenditureEntry(lineResult);
    }

}