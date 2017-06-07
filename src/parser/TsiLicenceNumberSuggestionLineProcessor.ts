import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';

export class TsiLicenceNumberSuggestionLineProcessor extends TsiAbstractLineProcessor<string> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearLicenceNumberSuggestions();
    }

    public parse(line: string, sourceFileName: string) {
        return line;
    }

    public process(lineResult: string) {
        this.dataService.addLicenceNumberSuggestions(lineResult);
    }

}