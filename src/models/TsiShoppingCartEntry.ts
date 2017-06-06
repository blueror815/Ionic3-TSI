import { TsiSortableObj } from './TsiSortableObj';
import { TsiArticle } from './TsiArticle';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';

export class TsiShoppingCartEntry extends TsiSortableObj {
    

    protected addAllAttributeIndexSynonyms() {
        this.addAttributeIndexSynonym( "ARTIKELNR.", 0 );
        this.addAttributeIndexSynonym( "ARTIKELNAME", 1 );
        this.addAttributeIndexSynonym( "MENGE", 2 );
        this.addAttributeIndexSynonym( "EINHEIT", 3 );
        this.addAttributeIndexSynonym( "INDEX", 6 );
    }

    constructor(articleID: string, public dataService: TsiDataServiceProvider) {
        super(7);
        this.setArticleID(articleID);
    }

    public  getArticleID()
    {
        return this.getAttribute( 0 );
    }

    public  setArticleID( articleID)
    {
        this.setAttribute( 0, articleID );
        this.updateData();
    }

    public  getName()
    {
        return this.getAttribute( 1 );
    }

    public  setName( name)
    {
        this.setAttribute( 1, name );
    }

    public  getOverallCount()
    {
        return this.getAttribute( 2 );
    }

    public  setOverallCount( overallCount)
    {
        this.setAttribute( 2, overallCount );
    }

    public  getVPECount()
    {
        let result = 0;
        let sVPECount = this.getAttribute( 4 );
        if (sVPECount != null)
            result = parseInt(sVPECount);
        return result;
    }

    public  getPALCount()
    {
        let result = 0;
        let sVPECount = this.getAttribute( 5 );
        if (sVPECount != null)
            result = parseInt(sVPECount);
        return result;
    }

    public  setVPECount(vpeCount)
    {
        this.setAttribute( 4, vpeCount.toString());
        this.updateData();
    }

    public  setPALCount( palCount)
    {
        this.setAttribute( 5, palCount.toString());
        this.updateData();
    }

    public  setContent( content)
    {
        this.setAttribute( 3, content );
    }

    public  getContent()
    {
        return this.getAttribute( 3 );
    }
    
    public  addPALCount( count)
    {
        let oldCount = this.getPALCount();
        let newCount = null;

        if (oldCount != null)
            newCount = oldCount + count;
        else
            newCount = count;

        newCount = Math.max( 0, newCount );

        this.setPALCount( newCount );
        this.updateData();
    }


    public  addVPECount( count)
    {
        let oldCount = this.getVPECount();
        let newCount = null;

        if (oldCount != null)
            newCount = oldCount + count;
        else
            newCount = count;

        newCount = Math.max( 0, newCount );

        this.setVPECount( newCount );
    }

    private  updateData()
    {
        let article = this.dataService.getArticle(this.getArticleID());
        
        this.setName( article.getName() );
        this.setContent( article.getContent() );

        let vpe_je_Pal = parseInt( article.getVpe_je_pal() );
        let vpecount = this.getVPECount();
        let palcount = this.getPALCount();
        let allcount = vpecount + (palcount * vpe_je_Pal);

        this.setOverallCount( allcount.toString());
    }
    
    public  getIndex()
    {
        let index = 0;
        let ArticleIn = this.getAttribute( 6 );
        if (ArticleIn != null)
            index = parseInt( ArticleIn );
        return index;
    }
    
    public  setIndex( ArticleIn)
    {
        this.setAttribute( 6, ArticleIn.toString());
        this.updateData();
    }

}