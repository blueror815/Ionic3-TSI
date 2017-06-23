import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiCategory } from '../models/TsiCategory';

export class TsiCategoryLineProcessor extends TsiAbstractLineProcessor<TsiCategory> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

    }

    public parse(line: string, sourceFileName: string) {
        let result = new TsiCategory('', '');
        let lineItems = line.split("|");

        console.log('Category LineItems', JSON.stringify(lineItems));

        if (lineItems.length < 2) {
            return null;
        }
        else {
            result.id = lineItems[0];
            result.name = lineItems[1];
            return result;
        }
    }

    public process(lineResult: TsiCategory) {
        let id = lineResult.id;

        console.log('Category ID', id);

        let mainCatID = id.substring(0,1);

        let intID = parseInt(id.substring(1));

        if(intID != 0) {
            this.dataService.putSubCategory(mainCatID, lineResult);
        }
        else {
            this.dataService.putMainCategory(mainCatID, lineResult);
        }
    }

}