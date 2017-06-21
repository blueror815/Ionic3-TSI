import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiCustomerCatalog } from '../models/TsiCustomerCatalog';

export class TsiCustomerCatalogLineProcessor extends TsiAbstractLineProcessor<TsiCustomerCatalog> {

    private customerID;

    constructor(public dataService: TsiDataServiceProvider) {
        super();
    }

    public parse(line: string, sourceFileName: string) {
        let lineItems = line.split( "|" );

        this.customerID = lineItems[0];
        let articleID = lineItems[1];

        let article = this.dataService.getArticle(articleID);
        if (article == null) {
            article = this.dataService.createDummyArticle(articleID);
        }

        let result = this.dataService.getCustomerCatalog(this.customerID);
        if (result == null) {
            result = new TsiCustomerCatalog();
        }

        result.addArticle(article);

        return result;
    }

    public process(lineResult: TsiCustomerCatalog) {
        this.dataService.putCustomerCatalog(this.customerID, lineResult);
    }

}