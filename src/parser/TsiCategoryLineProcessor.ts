import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiCategory } from '../models/TsiCategory';

export class TsiCategoryLineProcessor extends TsiAbstractLineProcessor<TsiCategory> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearArticleCategories();
    }

    public parse(line: string, sourceFileName: string) {
        return line;
    }

    public process(lineResult: TsiCategory) {
        let article = lineResult;
        //this.dataService.putArticle(article);
    }

}