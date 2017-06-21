import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { TsiConstants } from '../../utils/TsiConstants';
import { TsiConnectionServiceProvider } from '../tsi-connection-service/tsi-connection-service';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiEmailServiceProvider } from '../tsi-email-service/tsi-email-service';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';
import { TsiParserServiceProvider } from '../tsi-parser-service/tsi-parser-service';
import { TsiShoppingCartServiceProvider } from '../tsi-shopping-cart-service/tsi-shopping-cart-service';

/*
  Generated class for the TsiSyncDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiSyncDataServiceProvider {

    public rootPath;
    public syncFileTimesLocal : Map<string, string>;
    public syncFileTimesServer : Map<string, string>;

    constructor(public file: File, public connectionService : TsiConnectionServiceProvider, public dataService : TsiDataServiceProvider,
                public emailService : TsiEmailServiceProvider, public parserService: TsiParserServiceProvider,public shoppingService: TsiShoppingCartServiceProvider, 
                public zone: NgZone) {
        console.log('Hello TsiSyncDataServiceProvider Provider');
        this.syncFileTimesLocal = new Map<string, string>();
        this.syncFileTimesServer = new Map<string, string>();
    }

    public getRootStoragePath() {
        return this.file.documentsDirectory + "TSI/";
    }

    public getDataStoragePath() {
        return this.getRootStoragePath() + "Data/";
    }

    public getGraphicsStoragePath() {
        return this.getDataStoragePath() + "Graphics/";
    }

    public setGraphicsStoragePath() {
        return new Promise((resolve) => {

            this.file.checkDir(this.getDataStoragePath(), "Graphics").then((res) => {
                console.log('StoragePath Error => ', res);
                if (res) {
                    resolve(true);
                }
                else {
                    this.file.createDir(this.file.documentsDirectory, "TSI", false).then((res) => {
                        console.log('Create StoragePath Success=> ', JSON.stringify(res));
                        resolve(true);
                    }, (err) => {
                        console.log('Create StoragePath Error => ', JSON.stringify(err));
                        resolve(false);
                    });
                }
            }, (err) => {
                console.log('StoragePath Error => ', JSON.stringify(err));

                this.file.createDir(this.file.documentsDirectory, "TSI", false).then((res) => {

                    this.file.createDir(this.getRootStoragePath(), "Data", false).then((res) => {
                        this.file.createDir(this.getDataStoragePath(), "Graphics", false).then((res) => {
                            resolve(true);
                        }, (err) => {
                            console.log('Create StoragePath Error => ', JSON.stringify(err));
                            resolve(false);
                        });
                        
                    }, (err) => {
                        console.log('Create StoragePath Error => ', JSON.stringify(err));
                        resolve(false);
                    });
                }, (err) => {
                    
                    console.log('Create StoragePath Error => ', JSON.stringify(err));
                    resolve(false);
                });
            });
        });
    }

    public getLocalImageList() : Promise<any> {
        let images = [];

        return new Promise((resolve) => {
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

        })
    }

    public readConfigFile() {

        console.log("Calling read config file.");

        return new Promise((resolve, reject) => {

            this.file.readAsText(this.getRootStoragePath(), "config.dat").then((res) => {
                console.log("Config Bat file", res);

                resolve(true);
            }, (err) => {
                console.log("error for checking file", err);
                reject(err);
            });
        });
    }

    public writeConfigFile() : Promise<any> {

        let configText = TsiConstants.CUSTOMER_FOLDER_KEY + "|" + this.dataService.customerFolder + "\n" +
                            TsiConstants.START_PIC_KEY + "|" + this.dataService.startImgFileName + "\n" +
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
            this.file.checkFile(this.getRootStoragePath(), "config.dat").then((res) => {
                console.log('checkFile', JSON.stringify(res));

                if (!res) {
                    this.file.writeFile(this.getRootStoragePath(), "config.dat", configText).then((res) => {
                        console.log('config text', JSON.stringify(res));
                        resolve(res);
                    }, (err) => {
                        console.log('config text', JSON.stringify(err));
                        reject(err);
                    })
                }
                else {
                    this.file.writeExistingFile(this.getRootStoragePath(), "config.dat", configText).then((res) => {
                        console.log('config text', JSON.stringify(res));
                        resolve({});
                    }, (err) => {
                        console.log('config text', JSON.stringify(err));
                        reject(err);
                    })
                } 

            }, (err) => {
                console.log('checkFile', JSON.stringify(err));

                this.file.writeFile(this.getRootStoragePath(), "config.dat", configText).then((res) => {
                    console.log('config text', JSON.stringify(res));
                    resolve(res);
                }, (err) => {
                    console.log('config text', JSON.stringify(err));
                    reject(err);
                })
            })

        })
    }

    public async writeSyncFile(disableScreen, loader) {

        let syncTxt = '';
    
        for (let key of Object.keys(this.syncFileTimesServer)) {
            syncTxt = syncTxt + key + "|" + this.syncFileTimesServer[key.toString()] + "\n";
        }

        console.log('Sync Text', syncTxt);

        return new Promise ((resolve) => {
            this.file.checkFile(this.getDataStoragePath(), "sync.dat").then(async (res) => {
                if (!res) {
                        await this.file.writeFile(this.getDataStoragePath(), "sync.dat", syncTxt).then((res) => {
                            console.log('sync text', JSON.stringify(res));
                            
                        }, (err) => {
                            console.log('sync text', JSON.stringify(err));
                            
                        })
                    }
                    else {
                        await this.file.writeExistingFile(this.getDataStoragePath(), "sync.dat", syncTxt).then((res) => {
                            console.log('sync text', JSON.stringify(res));
                            
                        }, (err) => {
                            console.log('sync text', JSON.stringify(err));
                            
                        })
                    }

                    resolve(); 

                }, async (err) => {
                    console.log('SyncFile', JSON.stringify(err));

                    await this.file.writeFile(this.getDataStoragePath(), "sync.dat", syncTxt).then((res) => {
                        console.log('sync text', JSON.stringify(res));
                        
                    }, (err) => {
                        console.log('sync text', JSON.stringify(err));
                        
                })

                resolve();
            });
        }) 
        
    }

    public async readCatalogTabHeadersFile() {
    	// just to be sure
       await this.parseFile(this.getCatalogTabHeadersFilename(), TsiParserConfigNames.PARSER_CONFIG_CATALOG_TAB_HEADERS, false, null, TsiConstants.READ_LOCAL_FILETIMES_PRIORITY);
    }

    public async readLocalFileTimes(disableScreen, loader)
    {
       await this.parseFile(this.getSynchronizationFilename(), TsiParserConfigNames.PARSER_CONFIG_SYNCFILE, disableScreen, loader,  TsiConstants.READ_LOCAL_FILETIMES_PRIORITY);
    }

    public getAllCustomerFolders(disableScreen, loader)
    {
        //this.execute( new GetCustomerFolderTask( TSI_ClientService.getDataService().getStatusTextView(),  disableScreen, loader ) );
    }

    public async readServerFileTimes(disableScreen, loader)
    {
        this.zone.run(() => {
            loader.setContent("Schaue, ob neue Daten vorliegen...");
        });

        await this.connectionService.readServerFiles(this.dataService, this);
    }

    public async startAllParseTasks(disableScreen, loader)
    {
        this.zone.run(() => {
            loader.setContent("Füge Aufgaben hinzu...");
        });

        let filenames = this.getLocalFilenames();
        
        console.log('Start All Parse Tasks', JSON.stringify(filenames));

        return new Promise(async (resolve) => {
            for (let filename of filenames) {
                let mFilename = filename.split('/').pop();
                let path = filename.replace(mFilename, '');

                let rx = new RegExp(this.dataService.customerFolder + '|Artikel|Kategorien');

                if (path.match(rx) && path.match(rx)[0] != '') {
                    await this.startTask(this.getDataStoragePath() + mFilename, disableScreen, loader);
                }
            }

            resolve();
        })

        
    }

    public async readShoppingCarts(disableScreen, loader)
    {
        this.zone.run(() => {
            loader.setContent('Lade gespeicherte Warenkörbe...');
        });

        let path = this.getShoppingCartPath();
        return new Promise((resolve) => {
            this.file.listDir(this.getDataStoragePath(), "carts").then(async (res) => {

                console.log('Local Carts Files => ', JSON.stringify(res));

                if (res && res.length > 0) {
                    for (let img of res) {
                        if (img.name != "." && img.name != "..") {
                            let filename = img.name;

                            let customerID = filename.substring(0, filename.lastIndexOf('.')).split('_')[1];

                            console.log('CustomerID', customerID + filename);
                            this.dataService.setChoosenCustomerViaID(customerID);

                            if (this.shoppingService.shoppingCartExists(this.dataService.choosenCustomer.getCustomerID())) {
                                if (filename.substring(filename.lastIndexOf('.')) == '.dat') {
                                    await this.parseFile(this.getShoppingCartPath() + filename, TsiParserConfigNames.PARSER_CONFIG_SHOPPING_CART_DATA, false, loader, TsiConstants.READ_SERVER_FILETIMES_PRIORITY);
                                }

                                if (filename.substring(filename.lastIndexOf('.')) == '.txt') {
                                    await this.parseFile(this.getShoppingCartPath() + filename, TsiParserConfigNames.PARSER_CONFIG_SHOPPING_CART_ORDERS, false, loader, TsiConstants.READ_SERVER_FILETIMES_PRIORITY);
                                }
                            }
                        }
                    } 
                }

                resolve();
            }, (err) => {
                resolve();
            })

        })

    }

    public async downloadOutlatedFiles(disableScreen, loader) {
        
        await this.connectionService.downloadOutdatedFiles(this.dataService, this);
    }

    private parseFile(filePath, parseConfig, disableScreen, loader, priority)
    {
        let pathArray = filePath.split('/');
        let filename  = pathArray.pop();
        
        this.zone.run(() => {
            loader.setContent('Analysiere Datei ' + filename + '...');
        });

        return new Promise((resolve) => {
            this.parserService.parse(filePath.replace(filename, ''), filename, parseConfig).then((res) => {
                resolve();
            }, (err) => {
                resolve();
            })

        }); 
    }

    public async readExpendituresFile(disableScreen, loader)
    {
        await this.parseFile(this.getExpendituresFilename(), TsiParserConfigNames.PARSER_CONFIG_EXPENDITURES, disableScreen, loader, TsiConstants.PARSE_EXPENDITURES_PRIORITY);
    }

    public async readExpenditureSuggestionsFile(disableScreen, loader)
    {
        await this.parseFile(this.getExpenditureSuggestionsFilename(), TsiParserConfigNames.PARSER_CONFIG_EXPENDITURE_SUGGESTIONS, disableScreen, loader, TsiConstants.PARSE_EXPENDITURE_SUGGESTION_PRIORITY);
    }

    public async readLicenceNumberSuggestionsFile(disableScreen, loader)
    {
        await this.parseFile(this.getLicenceNumberSuggestionFilename(), TsiParserConfigNames.PARSER_CONFIG_LICENCE_NUMBER_SUGGESTIONS, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
    }

    public async readLicenceNumberFile(disableScreen, loader)
    {
        await this.parseFile(this.getLicenceNumberFilename(), TsiParserConfigNames.PARSER_CONFIG_LICENCE_NUMBER, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
    }

    public async readExpandituresConfFile(disableScreen, loader)
    {
        await this.parseFile(this.getInternExpendituresConfFilename(), TsiParserConfigNames.PARSER_CONFIG_EXPANDITURES_EMAIL, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
    }

    public async readKmConfFile( disableScreen, loader)
    {
        await this.parseFile(this.getInternKmConfFilename(), TsiParserConfigNames.PARSER_CONFIG_KM_EMAIL, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
    }

    public putServerSyncTime(filename, time) {
        this.syncFileTimesServer[filename] = time;
        console.log('syncFileTimesServer', JSON.stringify(this.syncFileTimesServer));
    }

    public putLocalSyncTime(filename, time) {
        this.syncFileTimesLocal[filename] = time;
        console.log('syncFileTimesLocal', JSON.stringify(this.syncFileTimesLocal));
    }

    public startTask(filename, disableScreen, loader) {
        
        console.log('Start Task', filename);

        return new Promise (async (resolve) => {
            if (filename.match( ".*KundenDB.PSV" ))
            {
                console.log('Start Task', ".*KundenDB.PSV");   
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_CUSTOMER, disableScreen, loader, TsiConstants.PARSE_CUSTOMER_PRIORITY);
                
            }
            else if (filename.match( ".*ArtikelDB.PSV" ))
            {
                console.log('Start Task', ".*ArtikelDB.PSV");
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_ARTICLE, disableScreen, loader, TsiConstants.PARSE_ARTICLE_PRIORITY);
            }
            else if (filename.match( ".*KategorieDB.PSV" ))
            {
                console.log('Start Task', ".*KategorieDB.PSV");
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_CATEGORY, disableScreen, loader, TsiConstants.PARSE_CATEGORY_PRIORITY);
            }
            else if (filename.match( ".*OrdersDB.PSV" ))
            {
                console.log('Start Task', ".*OrdersDB.PSV");
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_ORDER, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
            }
            else if (filename.match( ".*KatalogDB.PSV" ))
            {
                console.log('Start Task', ".*KatalogDB.PSV");
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_CUSTOMER_CATALOG, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
            }
            else if(filename.match( ".*CatalogTabLabels.txt" ))
            {
                console.log('Start Task', ".*CatalogTabLabels.txt");
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_CATALOG_TAB_HEADERS, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
            }
            else if(filename.match(".*Configmaske.txt"))
            {
                console.log('Start Task', ".*Configmaske.txt");
                await this.parseFile(filename, TsiParserConfigNames.PARSER_CONFIG_NEW_CUSTOMER_CONF, disableScreen, loader, TsiConstants.PARSE_DEFAULT_PRIORITY);
            }
            else {
                console.log('Start Task');
                
            }

            resolve();
        });
    }

    public getInternStoragePath()
    {
        return this.getRootStoragePath() + "Intern/";
    }

    public getConfFilename()
    {
        return this.getRootStoragePath() + "conf.dat";
    }

    public getExpendituresFilename()
    {
        return this.getInternStoragePath() + "expanditures.dat";
    }

    public getExpenditureSuggestionsFilename()
    {
        return this.getInternStoragePath() + "expanditureSuggestion.dat";
    }

    public getLicenceNumberSuggestionFilename()
    {
        return this.getInternStoragePath() + "licenceNumberSuggestion.dat";
    }

    public getLicenceNumberFilename()
    {
        return this.getInternStoragePath() + "licenceNumber.dat";
    }

    public getTempExcelFileName()
    {
        return this.getInternStoragePath() + "tempExcelFile.xls";
    }

    public getInternExpendituresConfFilename()
    {
        return this.getInternStoragePath() + "internexpendituresconf.dat";
    }

    public getInternKmConfFilename()
    {
        return this.getInternStoragePath() + "internkmconf.dat";
    }

    public getCategoryFilename()
    {
        return this.getDataStoragePath() + "Kategorien/KategorieDB.PSV";
    }

    public getArticleFilename()
    {
        return this.getDataStoragePath() + "Artikel/ArtikelDB.PSV";
    }

    public getCustomerCatalogFilename()
    {
        return this.getDataStoragePath() + "Artikel/KatalogDB.PSV";
    }

    public getCatalogTabHeadersFilename()
    {
        return this.getDataStoragePath() + "Artikel/CatalogTabLabels.txt";
    }

    public getNewsFilename()
    {
        return this.getDataStoragePath() + "News/news.html";
    }

    public getCustomerFilename(fullFilename)
    {
        return this.getDataStoragePath() + fullFilename;
    }

    public getImageFilename(name)
    {
        return this.getGraphicsStoragePath() + name;
    }

    public getSynchronizationFilename()
    {
        return this.getDataStoragePath() + "sync.dat";
    }

    public getOrderFilename(folder)
    {
        return this.getDataStoragePath() + folder + "/ordersdb.psv";
    }

    public getShoppingCartPath() {
        return this.getDataStoragePath() + 'carts/';
    }

    public getFilenameWithVersion(filename)
    {
        let result = "";
        
        return result;
    }

    public getServerFilenames() {
        return this.getFilenames(this.syncFileTimesServer);
    }

    public getLocalFilenames() {
        return this.getFilenames(this.syncFileTimesLocal);
    }

    public getFilenames(times : Map<string, string>) {

        return Object.keys(times);
    }

    public getLocalSyncTime(filename) {
        let time = this.syncFileTimesLocal[filename.toString()];
        if (time) {
            let timeArray = time.split(' ');
            let dateArray = timeArray[0].split('-');

            let stamp = Date.UTC(dateArray[0], dateArray[1], dateArray[2]);
            console.log('Time', stamp);

            return stamp;
        }
        else {
            return '-1';
        }
    }

    public getServerSyncTime(filename) {
        let time = this.syncFileTimesServer[filename.toString()];

        if (time) {
            let timeArray = time.split(' ');
            let dateArray = timeArray[0].split('-');

            let stamp = Date.UTC(dateArray[0], dateArray[1], dateArray[2]);
            console.log('Time', stamp);

            return stamp;
        }
        else {
            return '-1';
        }
    }


}
