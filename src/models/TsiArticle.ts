import { TsiSortableObj } from './TsiSortableObj';

export class TsiArticle extends TsiSortableObj {
    
    protected addAllAttributeIndexSynonyms() {
        this.addAttributeIndexSynonym( "ARTIKELNUMMER", 0 );
        this.addAttributeIndexSynonym( "ARTIKELNAME", 1 );
        this.addAttributeIndexSynonym( "EINHEIT", 4 );
    }

    private avaliable = true;
    private newReservationDate = "";

    constructor() {
        super(36);
    }

    public getArticleNumber()
    {
        return this.getAttribute( 0 );
    }

    public setArticleNumber(articleNumber)
    {    
        this.setAttribute( 0, articleNumber );
    }

    public  getName()
    {
        return this.getAttribute( 1 );
    }

    public  setName( name)
    {
        this.setAttribute( 1, name );
    }

    public  getGTIN_VPE()
    {
        return this.getAttribute( 2 );
    }

    public  setGTIN_VPE( gTIN_VPE)
    {
        this.setAttribute( 2, gTIN_VPE );
    }

    public  getGTIN_VKE()
    {
        return this.getAttribute( 3 );
    }

    public  setGTIN_VKE( gTIN_VKE)
    {
        this.setAttribute( 3, gTIN_VKE );
    }

    public  getContent()
    {
        return this.getAttribute( 4 );
    }

    public setContent( content)
    {
        this.setAttribute( 4, content );
    }

    public getVke_je_vpe()
    {
        return this.getAttribute( 5 );
    }

    public setVke_je_vpe( vke_je_vpe)
    {
        this.setAttribute( 5, vke_je_vpe );
    }

    public  getVke_je_pal()
    {
        return this.getAttribute( 6 );
    }

    public  setVke_je_pal( vke_je_pal)
    {
        this.setAttribute( 6, vke_je_pal );
    }

    public  getVpe_je_pal()
    {
        return this.getAttribute( 7 );
    }

    public  setVpe_je_pal( vpe_je_pal)
    {
        this.setAttribute( 7, vpe_je_pal );
    }

    public  getVpe_je_lage()
    {
        return this.getAttribute( 8 );
    }

    public  setVpe_je_lage( vpe_je_lage)
    {
        this.setAttribute( 8, vpe_je_lage );
    }

    public  getVpe_mind()
    {
        return this.getAttribute( 9 );
    }

    public  setVpe_mind( vpe_mind)
    {
        this.setAttribute( 9, vpe_mind );
    }

    public  getVpe_price()
    {
        return this.getAttribute( 10 );
    }

    public  setVpe_price( vpe_price)
    {
        this.setAttribute( 10, vpe_price );
    }

    public  getVke_price()
    {
        return this.getAttribute( 11 );
    }

    public  setVke_price( vke_price)
    {
        this.setAttribute( 11, vke_price );
    }

    public  getLvp_je_vke()
    {
        return this.getAttribute( 12 );
    }

    public  setLvp_je_vke( lvp_je_vke)
    {
        this.setAttribute( 12, lvp_je_vke );
    }

    public  getDpg_refund_je_vke()
    {
        return this.getAttribute( 13 );
    }

    public  setDpg_refund_je_vke( dpg_refund_je_vke)
    {
        this.setAttribute( 13, dpg_refund_je_vke );
    }

    public  getTop_50_pos()
    {
        return this.getAttribute( 14 );
    }

    public  setTop_50_pos( top_50_pos)
    {
        this.setAttribute( 14, top_50_pos );
    }

    public  getSeason_article()
    {
        return this.getAttribute( 15 );
    }

    public  setSeason_article( season_article)
    {
        this.setAttribute( 15, season_article );
    }

    public  getDiscontinued_line()
    {
        return this.getAttribute( 16 );
    }

    public  setDiscontinued_line( discontinued_line)
    {
        this.setAttribute( 16, discontinued_line );
    }

    public  getPosten_article()
    {
        return this.getAttribute( 17 );
    }

    public  setPosten_article( posten_article)
    {
        this.setAttribute( 17, posten_article );
    }

    public  getNew_comer()
    {
        return this.getAttribute( 18 );
    }

    public  setNew_comer( new_comer)
    {
        this.setAttribute( 18, new_comer );
    }

    public  getOut_of_stock()
    {
        return this.getAttribute( 19 );
    }

    public  setOut_of_stock( out_of_stock)
    {
        this.setAttribute( 19, out_of_stock );
    }

    public  getDate_availability()
    {
        return this.getAttribute( 20 );
    }

    public  setDate_availability( date_availability)
    {
        this.setAttribute( 20, date_availability );
    }

    public  getRlz_customer_month()
    {
        return this.getAttribute( 21 );
    }

    public  setRlz_customer_month( rlz_customer_month)
    {
        this.setAttribute( 21, rlz_customer_month );
    }

    public  getMhd_customer_month()
    {
        return this.getAttribute( 22 );
    }

    public  setMhd_customer_month( mhd_customer_month)
    {
        this.setAttribute( 22, mhd_customer_month );
    }

    public  getCalculation_factor()
    {
        return this.getAttribute( 23 );
    }

    public  setCalculation_factor( calculation_factor)
    {
        this.setAttribute( 23, calculation_factor );
    }

    public  getCategory()
    {
        return this.getAttribute( 24 );
    }

    public  setCategory( category)
    {
        this.setAttribute( 24, category );
    }

    public getImageURL()
    {
     return this.getArticleNumber() + ".jpg";
    }
    
    public  setAvalible(avalible)
    {
        this.avaliable = avalible;
    }

    public isAvalible()
    {
        return this.avaliable;
    }
    
    public  getPal_price()
    {
     return this.getAttribute( 25 );
    }
    
    public  setPal_price( pal_price)
    {
        this.setAttribute( 25, pal_price );
    }
    
    public  getVpe_price_je_pal()
    {
     return this.getAttribute( 26 );
    }
    
    public  setVpe_price_je_pal( vpe_price_je_pal)
    {
     this.setAttribute( 26, vpe_price_je_pal );
    }
    
    public  getVke_price_je_pal()
    {
     return this.getAttribute( 27 );
    }
    
    public  setVke_price_je_pal( vke_price_je_pal)
    {
     this.setAttribute( 27, vke_price_je_pal );
    }
    
    public  getStorage_use()
    {
     return this.getAttribute( 28 );
    }
    
    public  setStorage_use( storage_use)
    {
     this.setAttribute( 28, storage_use);
    }
    
    public  getOldest_mhd()
    {
     return this.getAttribute( 29 );
    }
    
    public  setOldest_mhd( oldest_mhd)
    {
     this.setAttribute( 29, oldest_mhd);
    }
    
    public  getReservationDate()
    {
        return this.getAttribute( 30 );
    }
    
    public  setReservationDate( date)
    {
        this.setAttribute( 30, date);
    }
    
    public  getHalal()
    {
        return this.getAttribute( 31 );
    }
    
    public setHalal(halal)
    {
        this.setAttribute( 31, halal);
    }

    public getAtk()
    {
        return this.getAttribute( 32 );
    }

    public setAtk(atk)
    {
        this.setAttribute( 32, atk);
    }

    public  getUnit()
    {
        return this.getAttribute( 33 );
    }

    public  setUnit( unit)
    {
        this.setAttribute( 33, unit);
    }

    public  getRebate1()
    {
        if (this.getAttribute( 34 ) != null)
            return this.getAttribute( 34 );
        else
            return "";
    }

    public  setRebate1( rabatt)
    {
        this.setAttribute( 34, rabatt);
    }

    public  getRebate2()
    {
        if (this.getAttribute( 35 ) != null)
            return this.getAttribute( 35 );
        else
            return "";
    }

    public  setRebate2( rabatt)
    {
        this.setAttribute( 35, rabatt);
    }
    
    public  getNewReservationDate()
    {
        return this.newReservationDate;
    }
    
    public  setNewReservationDate(date)
    {
        this.newReservationDate = date;
    }
}