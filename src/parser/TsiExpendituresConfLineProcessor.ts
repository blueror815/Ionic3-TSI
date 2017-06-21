import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiConstants } from '../utils/TsiConstants';

export class TsiExpendituresConfLineProcessor extends TsiAbstractLineProcessor<string> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let lineItems = line.split( "|" );
        if (lineItems[0] == TsiConstants.EMAIL_INTERN_ECPENDITURES_KEY)
            this.dataService.expenditureEmail = lineItems[1];
        return null;
    }

    public process(lineResult: string) {
    }

}