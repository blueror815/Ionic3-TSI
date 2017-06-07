import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';

export class TsiExpenditureSuggestionLineProcessor extends TsiAbstractLineProcessor<string> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearExpenditureSuggestions();
    }

    public parse(line: string, sourceFileName: string) {
        return line;
    }

    public process(lineResult: string) {
        this.dataService.addExpenditureSuggestions( lineResult );
        //this.dataService.putArticle(article);
    }

}