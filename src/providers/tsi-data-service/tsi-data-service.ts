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
  private customerFolders = [];
  private  preventCodeScanning = false;
  private  showCatalogDetailView = false;
  private  catalogDetailViewArticleCount = 1;
  private  serverImageList = null;

  private allCategories : Map<string, TsiCategory> = null;
  private mainCategories : Map<string, TsiCategory> = null;
  private articlesViaID : Map<string, TsiArticle> = null;
  private articlesViaIDTmp : Map<string, TsiArticle> = null;
  private articlesViaEANVPE : Map<string, TsiArticle> = null;
  private articlesViaEANVKE : Map<string, TsiArticle> = null;
  private customers : Map<string, TsiCustomer> = null;
  private customersCatalogs : Map<string, TsiCustomerCatalog> = null;

  // KundenID , AuftragsID, BestellungsID
  private  orders : Map<string, Map<string, TsiOrder>> = null;
  private categoryArticles : Map<string, Map<string, TsiArticle>> = null;

    // Vectors for Reading the NewCustomerConf File
    private accountType  : [TsiConfigEntry] = null;
    private accountLanguage  : [TsiConfigEntry] = null;
    private accountContactLanguage  : [TsiConfigEntry] = null;
    private accountContactGender  : [TsiConfigEntry] = null;
    private accountNewsletter  : [TsiConfigEntry] = null;
    private accountUseMail  : [TsiConfigEntry] = null;
    private accountPayments  : [TsiConfigEntry] = null;
    private accountPricegroup  : [TsiConfigEntry] = null;
    private accountCountry  : [TsiConfigEntry] = null;
    private accountShippingType  : [TsiConfigEntry] = null;

    private top50Articles  : [TsiArticle] = null;
    private refundfreeArticles : [TsiArticle] = null;
    private refundArticles : [TsiArticle] = null;
    private newcomerArticles : [TsiArticle] = null;
    private specialArticles : [TsiArticle] = null;
    private discontinuedLineArticles : [TsiArticle] = null;
    private postenArticles : [TsiArticle] = null;
    private customerArticles : [TsiArticle] = null;
    private seasonArticles : [TsiArticle] = null;
    private halalArticles : [TsiArticle] = null;
    private rabattArticles : [TsiArticle] = null;

    private expenditureEntries : [TsiExpenditure] = null;
    private expenditureSuggestion : [string]= null;
    private licenceNumberSuggestions : [string] = null;
    private catalogTabHeaders : [string] = null;
    private expenditureEmail;
    private kmEmail;

    private  mainTabHost = null;
    private  tvStatus = null;
    private  llStatus = null;
    private  ivInvalidate = null;

    private  indexOfCatlogTabTab;
    private  choosenCategory : TsiCategory = null;
    private  choosenViewPagerCategory : TsiCategory = null;
    private  choosenSubCategory : TsiCategory = null;
    private  selectedCustomer : TsiCustomer = null;

    private  choosenCustomer : TsiCustomer = null;
    private  choosenOrder : TsiOrder = null;
    private  choosenArticle : TsiArticle = null;
    private  selectedArticle : TsiArticle = null;
    private  choosenShoppingCartEntry : TsiShoppingCartEntry = null;
    private  choosenOrderSuggestionType = null;
    private  lastSelectedBundle : TsiArticleBundle = null;

    private  latitude = 0.0;
    private  longitude = 0.0;
    private  zip = null;

    private  bmpSign : Blob;

    private sortAttributes: Map<any, string>;

    // private Hashtable<Class<?>, ESortType> sortTypes;
    // private Hashtable<Class<?>, Comparator<TSI_SortableObject>> sortComparators;

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

}
