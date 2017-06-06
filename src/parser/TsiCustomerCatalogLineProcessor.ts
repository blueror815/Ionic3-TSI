import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiCustomerCatalog } from '../models/TsiCustomerCatalog';

export class TsiCustomerCatalogLineProcessor extends TsiAbstractLineProcessor<TsiCustomerCatalog> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearArticleCategories();
    }

    public parse(line: string, sourceFileName: string) {
        return line;
    }

    public process(lineResult: TsiCustomerCatalog) {
        let article = lineResult;
        //this.dataService.putArticle(article);
    }

}