import { TsiAbstractLineProcessor } from './TsiAbstractLineProcessor';
import { TsiArticle } from '../models/TsiArticle';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';

export class TsiArticleLineProcessor extends TsiAbstractLineProcessor<TsiArticle> {

    constructor(public dataService: TsiDataServiceProvider) {
        super();

        this.dataService.clearArticleCategories();
    }

    public parse(line: string, sourceFileName: string) {
        let result = new TsiArticle();

        let lineItems = line.split('|');

        result.setArticleNumber( lineItems[0] );

        if (lineItems[0] == "404170")
        {
            console.log('','');
        }

        result.setGTIN_VPE( lineItems[1] );
        result.setGTIN_VKE( lineItems[2] );
        result.setName( lineItems[3] );
        result.setContent( lineItems[4] );
        result.setVke_je_vpe( lineItems[5] );
        result.setVpe_je_lage( lineItems[6] );
        result.setVpe_je_pal( lineItems[7] );
        result.setVke_je_pal( lineItems[8] );
        result.setVpe_mind( lineItems[9] );
        result.setVpe_price( lineItems[10] );
        result.setVke_price( lineItems[11] );
        result.setLvp_je_vke( lineItems[12] );
        result.setDpg_refund_je_vke( lineItems[13] );
        result.setTop_50_pos( lineItems[14] );
        result.setSeason_article( lineItems[15] );
        result.setDiscontinued_line( lineItems[16] );
        result.setPosten_article( lineItems[17] );
        result.setNew_comer( lineItems[18] );
        result.setOut_of_stock( lineItems[19] );
        result.setDate_availability( lineItems[20] );
        result.setCategory( lineItems[21] );
        result.setRlz_customer_month( lineItems[22] );
        result.setMhd_customer_month( lineItems[23] );
        result.setCalculation_factor( lineItems[24] );
        result.setPal_price( lineItems[25] );
        result.setVpe_price_je_pal( lineItems[26] );
        result.setVke_price_je_pal( lineItems[27] );
        result.setStorage_use( lineItems[28] );
        result.setOldest_mhd( lineItems[29] );
        result.setReservationDate( lineItems[30] );
        result.setHalal( lineItems[31] );
        result.setAtk( lineItems[32] );
        result.setUnit( lineItems[33] );
        result.setRebate1( lineItems[34] );
        result.setRebate2( lineItems[35] );

        return result;
    }

    public process(lineResult: TsiArticle) {
        let article = lineResult;
        console.log('Article =>', JSON.stringify(article));
        this.dataService.putArticle(article);
    }

}