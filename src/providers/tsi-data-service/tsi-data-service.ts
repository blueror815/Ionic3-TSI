import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
/*
  Generated class for the TsiDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiDataServiceProvider {

  public startImgFileName = "";
  public rootPath = "";
  public customerFolder = "";
  public customerBusinessUnit = [];

  public  static SHOPPING_CART_FILE_TYPE_ORDERS = 0;
  public  static  SHOPPING_CART_FILE_TYPE_DATA = 1;
  public  static  SHOPPING_CART_FILE_TYPE_IMAGE = 2;
  public  static  NOT_AVAILABLE = "D";
  public  infoTabFlag = false;

  public customerFolders = [];
  public  preventCodeScanning = false;
  public  showCatalogDetailView = false;
  public  catalogDetailViewArticleCount = 1;
  public  serverImageList = null;

  public allCategories : Map<string, TsiCategory> = null;
  public mainCategories : Map<string, TsiCategory> = null;
  public articlesViaID : Map<string, TsiArticle> = null;
  public articlesViaIDTmp : Map<string, TsiArticle> = null;
  public articlesViaEANVPE : Map<string, TsiArticle> = null;
  public articlesViaEANVKE : Map<string, TsiArticle> = null;
  public customers : Map<string, TsiCustomer> = null;
  public customersCatalogs : Map<string, TsiCustomerCatalog> = null;

  // KundenID , AuftragsID, BestellungsID
  public  orders : Map<string, Map<string, TsiOrder>> = null;
  public categoryArticles : Map<TsiCategory, Map<string, TsiArticle>> = null;

    // Vectors for Reading the NewCustomerConf File
    public accountType  : TsiConfigEntry[] = null;
    public accountLanguage  : TsiConfigEntry[] = null;
    public accountContactLanguage  : TsiConfigEntry[] = null;
    public accountContactGender  : TsiConfigEntry[] = null;
    public accountNewsletter  : TsiConfigEntry[] = null;
    public accountUseMail  : TsiConfigEntry[] = null;
    public accountPayments  : TsiConfigEntry[] = null;
    public accountPricegroup  : TsiConfigEntry[] = null;
    public accountCountry  : TsiConfigEntry[] = null;
    public accountShippingType  : TsiConfigEntry[] = null;

    public top50Articles  : TsiArticle[] = null;
    public refundfreeArticles : TsiArticle[] = null;
    public refundArticles : TsiArticle[] = null;
    public newcomerArticles : TsiArticle[] = null;
    public specialArticles : TsiArticle[] = null;
    public discontinuedLineArticles : TsiArticle[] = null;
    public postenArticles : TsiArticle[] = null;
    public customerArticles : TsiArticle[] = null;
    public seasonArticles : TsiArticle[] = null;
    public halalArticles : TsiArticle[] = null;
    public rabattArticles : TsiArticle[] = null;

    public expenditureEntries : TsiExpenditure[] = null;
    public expenditureSuggestion : string[] = null;
    public licenceNumberSuggestions : string[] = null;
    public catalogTabHeaders : string[] = null;
    public expenditureEmail;
    public kmEmail;

    public  mainTabHost = null;
    public  tvStatus = null;
    public  llStatus = null;
    public  ivInvalidate = null;

    public  indexOfCatlogTabTab;
    public  choosenCategory : TsiCategory = null;
    public  choosenViewPagerCategory : TsiCategory = null;
    public  choosenSubCategory : TsiCategory = null;
    public  selectedCustomer : TsiCustomer = null;

    public  choosenCustomer : TsiCustomer = null;
    public  choosenOrder : TsiOrder = null;
    public  choosenArticle : TsiArticle = null;
    public  selectedArticle : TsiArticle = null;
    public  choosenShoppingCartEntry : TsiShoppingCartEntry = null;
    public  choosenOrderSuggestionType = null;
    public  lastSelectedBundle : TsiArticleBundle = null;

    public  latitude = 0.0;
    public  longitude = 0.0;
    public  zip = null;

    public  bmpSign : Blob;

    public sortAttributes: Map<any, string>;

    // public Hashtable<Class<?>, ESortType> sortTypes;
    // public Hashtable<Class<?>, Comparator<TSI_SortableObject>> sortComparators;

  constructor(public http: Http, public file: File, public connectionService: TsiConnectionServiceProvider,public emailService: TsiEmailServiceProvider) {
    console.log('Hello TsiDataServiceProvider Provider');
  }

  public getRootStoragePath() : Promise<any> {
	  return new Promise((resolve) => {
		this.file.createDir(this.file.documentsDirectory, "TSI", false).then((res) => {
			console.log('RootStoragePath Success=> ', JSON.stringify(res));
			this.rootPath = this.file.documentsDirectory + "TSI/";
			resolve(res.nativeURL);
		}, (err) => {
			console.log('RootStoragePath Error => ', JSON.stringify(err));
			resolve(this.file.documentsDirectory + "TSI/");
		});
	  });
  }

  public getDataStoragePath() : Promise<any> {

	  return new Promise((resolve) => {
		  this.getRootStoragePath().then((res) => {
			this.file.createDir(res, "Data", false).then((res) => {
			console.log('DataStoragePath Success=> ', JSON.stringify(res));
			resolve(res.nativeURL);
			}, (err) => {
				console.log('DataStoragePath Error => ', JSON.stringify(err));
				resolve(this.file.documentsDirectory + "TSI/Data/")
			})
		 });
		
	  });
  }

  public getGraphicsStoragePath() : Promise<any> {

	  return new Promise((resolve) => {
		  this.getDataStoragePath().then((res) => {
			this.file.createDir(res, "Graphics", false).then((res) => {
			console.log('GraphicStoragePath Success=> ', JSON.stringify(res));
			resolve(res.nativeURL);
			}, (err) => {
				resolve(this.file.documentsDirectory + "TSI/Data/Graphics/")
			})
		 });
		
	  });
  }

  public getLocalImageList() : Promise<any> {
	let images = [];

  	return new Promise((resolve) => {
			this.getGraphicsStoragePath().then((res) => {
					this.file.listDir(this.file.documentsDirectory + "TSI/Data/", "Graphics").then((res) => {

							console.log('LocalImageFiles => ', JSON.stringify(res));

							if (res && res.length > 0) {
									for (let img of res) {
											if (img.name != "." && img.name != "..") {
													images.push(img);
											}
									} 
							}
						
						resolve(images);
					}, (err) => {
						resolve(images);
					})
			});
  		
  	})
  }

  public readConfigFile() : Promise<any> {

	  console.log("Config Bat file");

	  return new Promise((resolve, reject) => {
		this.file.checkFile(this.file.documentsDirectory + "TSI/", "config.dat").then((res) => {
				if (res) {
					this.file.readAsText(this.file.documentsDirectory + "TSI/", "config.dat").then((res) => {
						console.log("Config Bat file", res);

						resolve(true);
					}, (err) => {
						reject(err);
					});
				}
				else {
					resolve(false);
				}		
			}, (err) => {
				console.log("Config Bat file", JSON.stringify(err));
				reject(err);
			})
	  });
  }

  public writeConfigFile() : Promise<any> {

		let configText = TsiConstants.CUSTOMER_FOLDER_KEY + "|" + this.customerFolder + "\n" +
										 TsiConstants.START_PIC_KEY + "|" + this.startImgFileName + "\n" +
										 TsiConstants.FTP_USERNAME + "|" + this.connectionService.username + "\n" +
										 TsiConstants.FTP_PASSWORD + "|" + this.connectionService.password + "\n" +
										 TsiConstants.EMAIL_SERVER_KEY + "|" + this.emailService.host + "\n" +
										 TsiConstants.EMAIL_PORT_KEY + "|" + this.emailService.port + "\n" +
										 TsiConstants.EMAIL_USERNAME_KEY + "|" + this.emailService.username + "\n" +
										 TsiConstants.EMAIL_PASSWORD_KEY + "|" + this.emailService.password + "\n" +
										 TsiConstants.EMAIL_RECIPIENT_KEY + "|" + this.emailService.recipient + "\n" +
										 TsiConstants.EMAIL_FROM_KEY + "|" + this.emailService.from + "\n";

	    console.log('config text', configText);

		return new Promise((resolve, reject) => {
				this.file.checkFile(this.file.documentsDirectory + "TSI/", "config.dat").then((res) => {
					console.log('checkFile', JSON.stringify(res));
						if (!res) {
								this.file.writeFile(this.file.documentsDirectory + "TSI/", "config.dat", configText).then((res) => {
									console.log('config text', JSON.stringify(res));
									resolve(res);
								}, (err) => {
									console.log('config text', JSON.stringify(err));
										reject(err);
								})
						}
						else {
							this.file.writeExistingFile(this.file.documentsDirectory + "TSI/", "config.dat", configText).then((res) => {
								console.log('config text', JSON.stringify(res));
									resolve({});
							}, (err) => {
									console.log('config text', JSON.stringify(err));
									reject(err);
							})
						} 

			  }, (err) => {
				  console.log('checkFile', JSON.stringify(err));
				  this.file.writeFile(this.file.documentsDirectory + "TSI/", "config.dat", configText).then((res) => {
						console.log('config text', JSON.stringify(res));
						resolve(res);
				}, (err) => {
					console.log('config text', JSON.stringify(err));
						reject(err);
				})
			  })

		})
  }

  public getCustomerBusinessUnit() {
	  this.customerBusinessUnit = ["Alle", "SLE - SELH", "VEN - VENDING", "LEH - REWE", "APO - APOTHEKEN"];
	  return this.customerBusinessUnit;
  }

  public getCustomerOnlyBusinessUnit() {
	  this.customerBusinessUnit = ["SLE - SELH", "VEN - VENDING", "LEH - REWE", "APO - APOTHEKEN"];
	  return this.customerBusinessUnit;
  }

  public getArticle(articleID){
        let article = this.articlesViaID.get(articleID);
        if (this.choosenCustomer != null && article != null) {
            if (!article.getUnit().equalsIgnoreCase(this.choosenCustomer.getInfo()))
                article = this.articlesViaIDTmp.get( articleID );
        }
        if (article == null)
            article = this.articlesViaEANVPE.get( articleID );
        if (article == null)
            article = this.articlesViaEANVKE.get( articleID );
        return article;
  }

  public putArticle(article){

        // All Articles
        if (this.articlesViaID.get(article.getArticleNumber()) != null)
        {
            this.articlesViaIDTmp.set( article.getArticleNumber(), this.articlesViaID.get(article.getArticleNumber()));
            this.articlesViaID.set( article.getArticleNumber(), article );
        }
        else {
            this.articlesViaID.set( article.getArticleNumber(), article );
        }
        this.articlesViaEANVPE.set( article.getGTIN_VPE(), article );
        this.articlesViaEANVKE.set( article.getGTIN_VKE(), article );

        // Only Category
        let categoryId = article.getCategory();

        let category : TsiCategory = this.allCategories.get(categoryId);

        if (category == null)
            return;

        let articlesOfCategory = this.categoryArticles.get(category);
        if (articlesOfCategory == null)
        {
            articlesOfCategory = new Map<string, TsiArticle>();
            this.categoryArticles.set( category, articlesOfCategory );
        }
        articlesOfCategory.set( article.getArticleNumber() + article.getUnit(), article );

        // Main Category
        /*
         * TSI_Category mainCategory = this.mainCategories.get( categoryId.substring( 0, 1 ) ); articlesOfCategory = this.categoryArticles.get( mainCategory ); if (articlesOfCategory == null) {
         * articlesOfCategory = new Hashtable<String, TSI_Article>(); this.categoryArticles.put( mainCategory, articlesOfCategory ); } articlesOfCategory.put( article.getArticleNumber(), article );
         */

        // Top50
        if (article.getTop_50_pos().length() > 0)
            this.top50Articles.push(article);

        // refund
        if (parseFloat( article.getDpg_refund_je_vke() ) > 0)
            this.refundArticles.push( article );
        else
            // refundfree
            if (article.getCategory().charAt( 0 ) == '5')
                this.refundfreeArticles.push( article );

        // newcomer
        if (article.getNew_comer().equals( "N" ))
            this.newcomerArticles.push( article );

        // special
        if (article.getSeason_article().equals( "SAI" ))
            this.specialArticles.push( article );

        // discontinued line
        if (article.getDiscontinued_line().equals( "A" ))
            this.discontinuedLineArticles.push( article );

        // posten
        if (article.getPosten_article().equals( "P" ))
            this.postenArticles.push( article );

        // season
        if (article.getReservationDate() != null)
            if (TsiUtil.checkReservationDate( article ))
                this.seasonArticles.push( article );

        // halal
        if (article.getHalal() != null && article.getHalal().equals( "H" )) {
            this.halalArticles.push(article);
        }

        // rabatt
        if ((article.getRebate1() != null && article.getRebate1().length() != 0 && parseFloat(article.getRebate1()) > 0) || (article.getRebate2() != null && article.getRebate2().length() != 0 && parseFloat(article.getRebate2()) > 0)) {
            this.rabattArticles.push(article);
        }
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

    public putMainCategory(mainCategoryID, category)
    {
        if (this.mainCategories.get( mainCategoryID ) == null)
        {
            this.mainCategories.set( mainCategoryID, category );
            this.allCategories.set( category.getId(), category );
        }
    }

    public putSubCategory(mainCategoryID, category)
    {
        let mainCategory = this.mainCategories.get(mainCategoryID);
        if (mainCategory.getChild( category.getId() ) == null)
        {
            mainCategory.addChild( category );
            this.allCategories.set( category.getId(), category );
        }
    }

}
