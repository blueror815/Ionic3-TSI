import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';

export class TsiLicenceNumberLineProcessor extends TsiAbstractLineProcessor<string> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let lineItems = line.split( ";" );
        
        let index = 0;
        this.dataService.internLicence = lineItems[index++];
        this.dataService.internKm = lineItems[index++];
        this.dataService.internDate = lineItems[index++];
        
        return line;
    }

    public process(lineResult: string) {
    }

}