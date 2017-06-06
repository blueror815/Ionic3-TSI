import { TsiShoppingCartEntry } from './TsiShoppingCartEntry';
import { TsiDataServiceProvider } from '../providers/tsi-data-service/tsi-data-service';
import { TsiUtil } from '../utils/TsiUtil';

export class TsiShoppingCart {
    private  customerID;
    private  infoText;
    private  date;
    private  creationDate;

    private  filename;
    private  modified;
    private  saved;

    private  indexCounter = 0;

    public   entrys : Map<String, TsiShoppingCartEntry>;

    constructor (customerID : string, public dataService: TsiDataServiceProvider) {
        this.customerID = customerID;
        this.entrys = new Map<string, TsiShoppingCartEntry>();
    }

    public setEntriesFromVector(entries : [TsiShoppingCartEntry])
    {
        for(let i=0; i<entries.length; i++)
        {
            this.entrys.set( entries[i].getArticleID(), entries[i]);
        }
    }

    public  addVpeArticle( id,  count,  write)
    {
        this.modified = true;

        let entry = this.entrys.get(id);
        if (entry == null)
        {
            entry = new TsiShoppingCartEntry(id, this.dataService);
            this.entrys.set( id, entry );
        }
        this.indexCounter += 1;
        entry.setIndex(this.indexCounter);
        entry.addVPECount( count );
        if (write)
            this.writeCart();
    }

    public  addPalArticle( id,  count,  write)
    {
        this.modified = true;

        let entry = this.entrys.get( id );
        if (entry == null)
        {
            entry = new TsiShoppingCartEntry( id, this.dataService );
            this.entrys.set( id, entry );
        }
        this.indexCounter += 1;
        entry.setIndex( this.indexCounter );

        entry.addPALCount( count );
        if (write)
            this.writeCart();
    }

    public  clearVpeArticles()
    {
        this.entrys.clear();
        this.indexCounter = 0;
    }

    public  getVpeArticleCount( id)
    {
        let result = 0;
        let entry = this.entrys.get( id );
        if (entry != null)
        {
            let count = entry.getVPECount();
            if (count != null)
                result = count;
        }
        return result;
    }

    public  getPalArticleCount( id)
    {
        let result = 0;
        let entry = this.entrys.get( id );
        if (entry != null)
        {
            let count = entry.getPALCount();
            if (count != null)
                result = count;
        }
        return result;
    }

    public contains( articleNumber)
    {
        return this.entrys.has(articleNumber);
    }

    public  getCustomerID()
    {
        return this.customerID;
    }

    public  setCustomerID( customerID)
    {
        this.modified = true;
        this.customerID = customerID;
    }

    public  getInfoText()
    {
        return this.infoText;
    }

    public  setInfoText( infoText)
    {
        this.infoText = infoText;
    }

    public getDate()
    {
        return this.date;
    }

    public  setDate(date)
    {
        this.modified = true;
        this.date = date;
    }

    public getCreationDate()
    {
        return this.creationDate;
    }

    public  setCreationDate( date)
    {
        this.creationDate = date;
    }

    public  getFilename()
    {
        return this.filename;
    }

    public  setFilename( filename)
    {
        this.filename = filename;
    }

    public isSaved()
    {
        return this.saved;
    }

    public  setSaved(saved)
    {
        this.saved = saved;
    }

    public isModified()
    {
        return this.modified;
    }

    public calculateOverallPrice()
    {
        let overallPrice = 0.0;
        for (let articleID in this.entrys.keys)
        {
            let article = this.dataService.getArticle( articleID );
            if (article != null && !TsiUtil.checkReservationDate( article ))
            {
                let count = this.getVpeArticleCount( articleID );
                let palcount = this.getPalArticleCount( articleID );
                let vpe_je_Pal = parseInt( article.getVpe_je_pal() );
                let allcount = count + (palcount * vpe_je_Pal);
                let rebate = 0;
                if (article.getRebate1().length() > 0)
                    rebate += parseFloat(article.getRebate1());
                if (article.getRebate2().length() > 0)
                    rebate += parseFloat(article.getRebate2());

                overallPrice += (parseFloat( article.getVpe_price()) - parseFloat( article.getVpe_price() ) * rebate / 100) * allcount;
            }
        }
        return overallPrice;
    }

    public  removeArticle( articleNumber)
    {
        let entry = this.entrys.delete(articleNumber);
        // let removedindex = entry.getIndex();
        // for (Entry<, TSI_ShoppingCartEntry> entrie : entrys.entrySet())
        // {
        //      index = entrie.getValue().getIndex();
        //     if (index > removedindex)
        //     {
        //         index -= 1;
        //         entrie.getValue().setIndex( index );
        //     }
        // }
        this.indexCounter -= 1;
        // Über alle übrigegebliebene Entries iterieren und alle Index um ein verinergern derren index > removedindex ist
        // indexCounter um eins veringern damit zukünfitg hinzugefügte Artikel den richtigne Index bekommen
        this.writeCart();
    }

    public getOrderQuantity()
    {
        let overallOrderQuantity = 0;
        for (let articleID in this.entrys.keys)
        {
            let article = this.dataService.getArticle( articleID );
            let calculationFactor = parseInt( article.getCalculation_factor() );
            if (article != null && !TsiUtil.checkReservationDate( article ))
            {
                overallOrderQuantity += this.getOverallVPECount( article ) * calculationFactor;
            }
        }
        return overallOrderQuantity;
    }

    public  getOverallVPECount(article)
    {
        let overallVPECount = 0;
        if (article != null)
        {
             let vpecount = this.getVpeArticleCount( article.getArticleNumber() );
             let palcount = this.getPalArticleCount( article.getArticleNumber() );
             let vpe_je_Pal = parseInt( article.getVpe_je_pal() );
             let allcount = (vpecount + (palcount * vpe_je_Pal));
             overallVPECount += allcount;
        }
        return overallVPECount;
    }

    public writeCart()
    {
        // final TSI_ShoppingCart shoppingCart = TSI_ClientService.getShoppingCartService().getShoppingCart( customerID );
        // TSI_ClientService.getShoppingCartService().writeShoppingCart( shoppingCart, null, new ServerClientTaskStateChangedListener()
        // {
        //     @Override
        //     public  stateChanged(ServerClientTaskStateChangedEvent matooiClientTaskStateChangedEvent)
        //     {
        //         if (matooiClientTaskStateChangedEvent.getNewState() == ServerClientTaskStateChangedEvent.STATE_DONE)
        //         {
        //             try
        //             {
        //                  successfully = () matooiClientTaskStateChangedEvent.getTask().get();
        //                 if (successfully != null)
        //                 {
        //                     shoppingCart.setSaved( true );
        //                 }
        //             }
        //             catch (ExecutionException e)
        //             {
        //                 e.prStackTrace();
        //             }
        //             catch (InterruptedException e)
        //             {
        //                 e.printStackTrace();
        //             }
        //         }
        //     }
        // } );
        // TSI_ClientService.getShoppingCartService().setShoppingCart( customerID, shoppingCart );
    }
}