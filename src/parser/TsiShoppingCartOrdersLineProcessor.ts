import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';

export class TsiShoppingCartOrdersLineProcessor extends TsiAbstractLineProcessor<string> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearArticleCategories();
    }

    public parse(line: string, sourceFileName: string) {
        return line;
    }

    public process(lineResult: string) {
        let article = lineResult;
        //this.dataService.putArticle(article);
    }

}