import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { File } from '@ionic-native/file';
import { TsiConnectionServiceProvider } from '../tsi-connection-service/tsi-connection-service';
import { TsiEmailServiceProvider } from '../tsi-email-service/tsi-email-service';
import { TsiConstants } from '../../utils/TsiConstants';
import { TsiCategory } from '../../models/TsiCategory';
import { TsiArticle } from '../../models/TsiArticle';
import { TsiCustomer } from '../../models/TsiCustomer';
import { TsiCustomerCatalog } from '../../models/TsiCustomerCatalog';
import { TsiOrder } from '../../models/TsiOrder';
import { TsiConfigEntry } from '../../models/TsiConfigEntry';
import { TsiArticleBundle } from '../../models/TsiArticleBundle';
import { TsiShoppingCartEntry } from '../../models/TsiShoppingCartEntry';
import { TsiExpenditure } from '../../models/TsiExpenditure';
import { TsiUtil } from '../../utils/TsiUtil';
import { TsiRawOrder } from '../../models/TsiRawOrder';
import { Tabs } from 'ionic-angular/navigation/nav-interfaces';


@Injectable()
export class TsiDataServiceProvider {

    public startImgFileName ;
    public rootPath ;
    public customerFolder ;
    public customerBusinessUnit;

    public  static SHOPPING_CART_FILE_TYPE_ORDERS = 0;
    public  static  SHOPPING_CART_FILE_TYPE_DATA = 1;
    public  static  SHOPPING_CART_FILE_TYPE_IMAGE = 2;
    public  static  NOT_AVAILABLE = "D";
    public  infoTabFlag = false;

    public  customerFolders;
    public  preventCodeScanning = false;
    public  showCatalogDetailView = false;
    public  catalogDetailViewArticleCount = 1;
    public  serverImageList;

    public allCategories : Map<string, TsiCategory>;
    public mainCategories : Map<string, TsiCategory>;
    public articlesViaID : Map<string, TsiArticle>;
    public articlesViaIDTmp : Map<string, TsiArticle>;
    public articlesViaEANVPE : Map<string, TsiArticle>;
    public articlesViaEANVKE : Map<string, TsiArticle>;
    public customers : Map<string, TsiCustomer>;
    public customersCatalogs : Map<string, TsiCustomerCatalog>;

    // KundenID , AuftragsID, BestellungsID
    public orders : Map<string, Map<string, Map<string, TsiOrder>>>;
    public categoryArticles :Map<TsiCategory, Map<string, TsiArticle>>;

    // Vectors for Reading the NewCustomerConf File
    public accountType  : TsiConfigEntry[];
    public accountLanguage  : TsiConfigEntry[];
    public accountContactLanguage  : TsiConfigEntry[];
    public accountContactGender  : TsiConfigEntry[];
    public accountNewsletter  : TsiConfigEntry[];
    public accountUseMail  : TsiConfigEntry[];
    public accountPayments  : TsiConfigEntry[];
    public accountPricegroup  : TsiConfigEntry[];
    public accountCountry  : TsiConfigEntry[];
    public accountShippingType  : TsiConfigEntry[];

    public top50Articles  : TsiArticle[];
    public refundfreeArticles : TsiArticle[];
    public refundArticles : TsiArticle[];
    public newcomerArticles : TsiArticle[];
    public specialArticles : TsiArticle[];
    public discontinuedLineArticles : TsiArticle[];
    public postenArticles : TsiArticle[];
    public customerArticles : TsiArticle[];
    public seasonArticles : TsiArticle[];
    public halalArticles : TsiArticle[];
    public rabattArticles : TsiArticle[];

    public expenditureEntries : TsiExpenditure[];
    public expenditureSuggestion;
    public licenceNumberSuggestions;
    public catalogTabHeaders;
    public expenditureEmail;
    public kmEmail;
    public  tvStatus;
    public  llStatus;
    public  ivInvalidate;

    public  indexOfCatlogTabTab;
    public  choosenCategory : TsiCategory;
    public  choosenViewPagerCategory : TsiCategory;
    public  choosenSubCategory : TsiCategory;
    public  selectedCustomer : TsiCustomer;

    public  choosenCustomer : TsiCustomer;
    public  choosenOrder : TsiOrder;
    public  choosenArticle : TsiArticle;
    public  selectedArticle : TsiArticle;
    public  choosenShoppingCartEntry : TsiShoppingCartEntry;
    public  choosenOrderSuggestionType;
    public  lastSelectedBundle : TsiArticleBundle;

    public  latitude = 0.0;
    public  longitude = 0.0;
    public  zip;

    public  internKm;
    public  internLicence;
    public  internDate;

    public  bmpSign : Blob;

    public sortAttributes: Map<any, string>;

    public mainTabHost: Tabs;

    // public Hashtable<Class<?>, ESortType> sortTypes;
    // public Hashtable<Class<?>, Comparator<TSI_SortableObject>> sortComparators;

    constructor(public file: File, public connectionService: TsiConnectionServiceProvider,public emailService: TsiEmailServiceProvider) {
        console.log('Hello TsiDataServiceProvider Provider');

        this.categoryArticles = new Map<TsiCategory, Map<string, TsiArticle>>();
        this.customers = new Map<string, TsiCustomer>();
        this.allCategories = new Map<string, TsiCategory>();
        this.mainCategories = new Map<string, TsiCategory>();
        this.articlesViaID = new Map<string, TsiArticle>();
        this.articlesViaIDTmp = new Map<string, TsiArticle>();
        this.articlesViaEANVPE = new Map<string, TsiArticle>();
        this.articlesViaEANVKE = new Map<string, TsiArticle>();
        
        this.customersCatalogs = new Map<string, TsiCustomerCatalog>();

        // KundenID , AuftragsID, BestellungsID
        this.orders = new Map<string, Map<string, Map<string, TsiOrder>>>();
        
        this.accountType = [];
        this.accountLanguage = [];
        this.accountContactLanguage = [];
        this.accountContactGender = [];
        this.accountNewsletter = [];
        this.accountUseMail = [];
        this.accountPayments = [];
        this.accountPricegroup = [];
        this.accountCountry = [];
        this.accountShippingType = [];

        this.top50Articles = [];
        this.refundfreeArticles = [];
        this.refundArticles = [];
        this.newcomerArticles = [];
        this.specialArticles = [];
        this.discontinuedLineArticles = [];
        this.postenArticles = [];
        this.customerArticles = [];
        this.seasonArticles  = [];
        this.halalArticles  = [];
        this.rabattArticles = [];

        this.expenditureEntries = [];
    }

    public getCustomer(id) {
        let result = this.customers[id];
        let temp = id;

        console.log('Result and Temp', JSON.stringify(result) + temp);

        while (result == null && temp.charAt( 0 ) == '0')
        {
            temp = temp.substring( 1 );
            result = this.customers[temp];
        }

        if (result == null)
        {
            result = new TsiCustomer();
            result.setCustomerID( "N9900" );
            result.setDateLastVisit( "00000000" );
            result.setDateLastRG( "00000000" );
            result.setOrderBlock( "" );
            result.setFormatCode( "" );
            result.setMinOrderQuantity( "0" );
            this.putCustomer(result);
        }

        console.log('Result', JSON.stringify(result));
        return result;
    }

    public getCustomerBusinessUnit() {
        this.customerBusinessUnit = ["Alle", "SLE - SELH", "VEN - VENDING", "LEH - REWE", "APO - APOTHEKEN"];
        return this.customerBusinessUnit;
    }

    public getCustomerOnlyBusinessUnit() {
        this.customerBusinessUnit = ["SLE - SELH", "VEN - VENDING", "LEH - REWE", "APO - APOTHEKEN"];
        return this.customerBusinessUnit;
    }

    public setChoosenCustomerViaID(choosenCustomerID) {
        let customer = this.getCustomer(choosenCustomerID);
        this.selectedCustomer = customer;
        this.choosenCustomer = customer;
    }

    public getArticle(articleID){
        let article = this.articlesViaID[articleID];
        if (this.choosenCustomer != null && article != null) {
            if (article.getUnit().toUpperCase() != this.choosenCustomer.getInfo().toUpperCase())
                article = this.articlesViaIDTmp[articleID];
        }
        if (article == null)
            article = this.articlesViaEANVPE[articleID];
        if (article == null)
            article = this.articlesViaEANVKE[articleID];

        //console.log('Article', JSON.stringify(article));
        return article;
    }

      public putArticle(article){

        // All Articles
        if (this.articlesViaID[article.getArticleNumber()] != null)
        {
            // this.articlesViaIDTmp.set( article.getArticleNumber(), this.articlesViaID.get(article.getArticleNumber()));
            // this.articlesViaID.set( article.getArticleNumber(), article );
            this.articlesViaIDTmp[article.getArticleNumber()] = this.articlesViaID[article.getArticleNumber()];
            this.articlesViaID[article.getArticleNumber()] = article;
        }
        else {
            // this.articlesViaID.set( article.getArticleNumber(), article );
            this.articlesViaID[article.getArticleNumber()] = article;
        }

        // this.articlesViaEANVPE.set( article.getGTIN_VPE(), article );
        // this.articlesViaEANVKE.set( article.getGTIN_VKE(), article );
        this.articlesViaEANVPE[article.getGTIN_VPE()] = article;
        this.articlesViaEANVKE[article.getGTIN_VKE()] = article;


        // Only Category
        let categoryId = article.getCategory();

        let category = this.allCategories[categoryId];

        if (category == null)
            return;

        let articlesOfCategory = this.categoryArticles[category];

        if (articlesOfCategory == null) {
            articlesOfCategory = new Map<string, TsiArticle>();
            //this.categoryArticles.set( category, articlesOfCategory );
            this.categoryArticles[category] = articlesOfCategory;
        }

        //articlesOfCategory.set( article.getArticleNumber() + article.getUnit(), article );
        articlesOfCategory[article.getArticleNumber() + article.getUnit()] = article;

        // Main Category
        /*
         * TSI_Category mainCategory = this.mainCategories.get( categoryId.substring( 0, 1 ) ); articlesOfCategory = this.categoryArticles.get( mainCategory ); if (articlesOfCategory == null) {
         * articlesOfCategory = new Hashtable<String, TSI_Article>(); this.categoryArticles.put( mainCategory, articlesOfCategory ); } articlesOfCategory.put( article.getArticleNumber(), article );
         */

        // Top50
        if (article.getTop_50_pos().length > 0)
            this.top50Articles.push(article);

        // refund
        if (parseFloat( article.getDpg_refund_je_vke() ) > 0)
            this.refundArticles.push( article );
        else
            // refundfree
            if (article.getCategory().charAt( 0 ) == '5')
                this.refundfreeArticles.push( article );

        // newcomer
        if (article.getNew_comer() == "N")
            this.newcomerArticles.push( article );

        // special
        if (article.getSeason_article() == "SAI")
            this.specialArticles.push( article );

        // discontinued line
        if (article.getDiscontinued_line() == "A")
            this.discontinuedLineArticles.push( article );

        // posten
        if (article.getPosten_article() == "P")
            this.postenArticles.push( article );

        // season
        if (article.getReservationDate() != null)
            if (TsiUtil.checkReservationDate( article ))
                this.seasonArticles.push( article );

        // halal
        if (article.getHalal() != null && article.getHalal() == "H") {
            this.halalArticles.push(article);
        }

        // rabatt
        if ((article.getRebate1() != null && article.getRebate1().length != 0 && parseFloat(article.getRebate1()) > 0) || (article.getRebate2() != null && article.getRebate2().length != 0 && parseFloat(article.getRebate2()) > 0)) {
            this.rabattArticles.push(article);
        }
    }

    public putCustomer(customer)
    {
        //this.customers.set(customer.getCustomerID(), customer);
        this.customers[customer.getCustomerID()] = customer;
    }

    public putCustomerCatalog( customerID,  customer)
    {
        //this.customersCatalogs.set( customerID, customer );
        this.customersCatalogs[customerID] = customer;
    }

    public getCustomerCatalog(customerID)
    {
        //return this.customersCatalogs.get(customerID);
        return this.customersCatalogs[customerID];
    }

	public clearArticleCategories()
    {
        this.top50Articles = [];
        this.refundArticles = [];
        this.refundfreeArticles = [];
        this.newcomerArticles = [];
        this.specialArticles = [];
        this.seasonArticles = [];
        this.discontinuedLineArticles = [];
        this.postenArticles = [];
        this.customerArticles = [];
        this.halalArticles = [];
        this.rabattArticles = [];
    }

    public addExpenditureEntry(expenditure)
    {
        let index = 0;
        if (this.expenditureEntries.length > 1)
        {
            let lastExpenditure = this.expenditureEntries[this.expenditureEntries.length - 2];
            index = parseInt( lastExpenditure.getRecordID());
            index++;
        }
        expenditure.setRecordID( index.toString() );
        this.addExpenditureSuggestions( expenditure.getInformation() );
        this.expenditureEntries.push( expenditure );
    }

    public clearExpenditureEntries()
    {
        this.expenditureEntries = [];
        this.expenditureEntries.push( new TsiExpenditure( "-1", null, null, null ) );
    }

    public addExpenditureSuggestions(suggestion)
    {
        if (this.expenditureSuggestion.indexOf(suggestion) > -1)
        {
            if (this.expenditureSuggestion.length > 500)
                this.expenditureSuggestion.splice(0, 1);
            this.expenditureSuggestion.push(suggestion);
        }
    }

    public clearExpenditureSuggestions()
    {
        this.expenditureSuggestion = [];
    }

    public addLicenceNumberSuggestions (suggestion)
    {
        if (this.licenceNumberSuggestions.indexOf( suggestion ) > -1)
        {
            if (this.licenceNumberSuggestions.length > 100)
                this.licenceNumberSuggestions.splice(0, 1);
            this.licenceNumberSuggestions.push( suggestion );
        }
    }

    public clearLicenceNumberSuggestions()
    {
        this.licenceNumberSuggestions = [];
    }

    public putMainCategory(mainCategoryID, category)
    {
        if (this.mainCategories[mainCategoryID] == null)
        {
            // this.mainCategories.set( mainCategoryID, category );
            // this.allCategories.set( category.getId(), category );
            this.mainCategories[mainCategoryID] = category;
            this.allCategories[category.getId()] = category;
        }

        //console.log('Main Category', JSON.stringify(this.mainCategories));
    }

    public putSubCategory(mainCategoryID, category)
    {
        let mainCategory = this.mainCategories[mainCategoryID];
        if (mainCategory.getChild(category.getId()) == null)
        {
            mainCategory.addChild(category);
            //this.allCategories.set( category.getId(), category );
            this.allCategories[category.getId()] = category;
        }
    }

    public createDummyArticle(articleID) {
        let result = new TsiArticle();
        result.setArticleNumber(articleID);
        result.setOut_of_stock(TsiDataServiceProvider.NOT_AVAILABLE);
        return result;
    }

    public putOrder(rawOrder : TsiRawOrder)
    {
        let ordersOfCustomer = this.orders[rawOrder.customerID];
        if (ordersOfCustomer == null)
            ordersOfCustomer = new Map<string, Map<string, TsiOrder>>();
        
        let orderList = ordersOfCustomer[rawOrder.billCounter];
        if (orderList == null)
            orderList = new Map<string, TsiOrder>();
        
        let order = orderList[rawOrder.position];
        if (order == null)
            order = new TsiOrder();

        order.setArticleID( rawOrder.articleID);
        order.setBillCounter( rawOrder.billCounter);
        order.setFakturDate( rawOrder.fakturDate );
        order.setPrice( rawOrder.price );
        order.setVpe_size( rawOrder.vpe_size);

        // orderList.set( rawOrder.position, order );
        // ordersOfCustomer.set( rawOrder.billCounter, orderList );
        // this.orders.set( rawOrder.customerID, ordersOfCustomer );
        orderList[rawOrder.position] = order;
        ordersOfCustomer[rawOrder.billCounter] = orderList;
        this.orders[rawOrder.customerID] = ordersOfCustomer;
    }

    public clearCatalogTabHeaders() {
        this.catalogTabHeaders = [];
    }

    public clearAccountVectors() {
        this.accountType = [];
        this.accountLanguage = [];
        this.accountContactLanguage = [];
        this.accountContactGender = [];
        this.accountNewsletter = [];
        this.accountUseMail = [];
        this.accountPayments = [];
        this.accountPricegroup = [];
        this.accountCountry = [];
        this.accountShippingType = [];
    }

    private catalogViewIndex;

    public setCatalogViewIndex(index) {
        this.catalogViewIndex = index;
    }

    private indexOfCatalogTabTab;

    public setIndexOfCatalogTabTab(index) {
        this.indexOfCatlogTabTab = index;
    }

    public setTabHostOfMainScreen(mainTab) {
        this.mainTabHost = mainTab;
    }

    public getTabHostOfMainScreen() {
        return this.mainTabHost;
    }

    public getCustomersAsVector(filter, index) {
        let result = [];
        

        for (let key of Object.keys(this.customers))
        {
            if (filter == null || filter.length == 0)
            {
                if (index == 0) {
                    result.push(this.customers[key]);
                }
                else {
                    let info = TsiUtil.getArticleUnit();
                    let customer = this.customers[key];
                    if (customer.getInfo().toUpperCase() == info.toUpperCase()) {
                        result.push(customer);
                    }
                }
            }
            else
            {
                let customer = this.customers[key];
                let filterUC = filter.toUpperCase();
                if (customer.getName().toUpperCase().contains(filterUC) || customer.getCity().toUpperCase().contains(filterUC) || customer.getAbc().toUpperCase().contains(filterUC)
                        || customer.getDateLastVisit().toUpperCase().contains(filterUC) || customer.getStreet().toUpperCase().contains(filterUC)
                        || customer.getZip().toUpperCase().contains(filterUC) || customer.getCustomerID().toUpperCase().contains(filter))
                {

                    if (index == 0) {
                        result.push(customer);
                    }
                    else {
                        let info = TsiUtil.getArticleUnit();
                        if (customer.getInfo() == info) {
                            result.push(customer);
                        }
                    }
                }
            }
        }

        //Collections.sort( result, getSortCompartor( TSI_Customer.class ) );

        console.log('Customers Result', JSON.stringify(result));
        return result;
    }

    public getMainCategoriesAsVector() {
        let result = [];

        for (let key of Object.keys(this.mainCategories)) {
            result.push(this.mainCategories[key]);
        }

        return result;
    }

    public getArticlesAsVector(filter, choosenCategory : TsiCategory) {
        let result = [];

        if (choosenCategory) {
            this.addArticlesOfCategoryToVector(result, choosenCategory, filter);

            for(let key of Object.keys(choosenCategory.getChilds())) {
                this.addArticlesOfCategoryToVector(result, choosenCategory.getChilds()[key], filter);
            }
        }
        else {
            let categories = this.getMainCategoriesAsVector();
            for (let category of categories) {
                result.push(this.getArticlesAsVector(filter, category));
            }
        }

        let searchedArticles = [];

        let unit = '';
        if (this.choosenCustomer) {
            unit = this.choosenCustomer.getInfo();
        }
        else {
            unit = TsiUtil.getArticleUnit();
        }

        if (unit.length == 0) {
            return result;
        }
        else {
            for (let article of result) {
                if (article.getUnit().toLowerCase() == unit.toLowerCase()) {
                    searchedArticles.push(article);
                }
            }

            return searchedArticles;
        }
    }

    public addArticlesOfCategoryToVector(articles, category, filter) {
        let articlesOfCategory = this.categoryArticles[category];

        let articlesOfCategoryVector = [];
        if (articlesOfCategory) {
            for (let key of Object.keys(articlesOfCategory)) {
                let article = articlesOfCategory[key];

                let nameLC = article.getName().toLowerCase();
                let numberLC = article.getArticleNumber().toLowerCase();

                if (filter == null || filter.length == 0 || numberLC.contains(filter.toLowerCase()) || nameLC.contains(filter.toLowerCase())) {
                    articlesOfCategoryVector.push(article);
                }
            }
        }

        articles.push(articlesOfCategoryVector);
    }

}
