import { TsiSortableObj } from './TsiSortableObj';
import { TsiArticle } from './TsiArticle';

export class TsiOrder extends TsiSortableObj {

    protected addAllAttributeIndexSynonyms() {
        this.addAttributeIndexSynonym( "ARTIKELNR.", 2 );
        this.addAttributeIndexSynonym( "BESTELLTE MENGE", 3 );
        this.addAttributeIndexSynonym( "ARTIKELNAME", 6 );
    }

    constructor() {
        super(7);
    }

    public  getBillCounter()
    {
        return this.getAttribute( 0 );
    }

    public  setBillCounter( billCounter)
    {
        this.setAttribute( 0, billCounter );
    }

    public  getFakturDate()
    {
        return this.getAttribute( 1 );
    }

    public  setFakturDate( fakturDate)
    {
        this.setAttribute( 1, fakturDate );
    }

    public  getArticleID()
    {
        return this.getAttribute( 2 );
    }

    public  setArticleID( articleID)
    {
        this.setAttribute( 2, articleID );
        //let article = TSI_ClientService.getDataService().getArticle( articleID );
        let article = new TsiArticle();
        if (article != null)
            this.setAttribute( 6, article.getName() );
    }

    public  getVpe_size()
    {
        return this.getAttribute( 3 );
    }

    public  setVpe_size( vpe_size)
    {
        this.setAttribute( 3, vpe_size );
    }

    public  getPrice()
    {
        return this.getAttribute( 4 );
    }

    public  setPrice( price)
    {
        this.setAttribute( 4, price );
    }

    public  getPal_size()
    {
        return this.getAttribute( 5 );
    }

    public  setPal_size( pal_size)
    {
        this.setAttribute( 5, pal_size );
    }

}