import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { TsiConstants } from '../../utils/TsiConstants';
import { TsiConnectionServiceProvider } from '../tsi-connection-service/tsi-connection-service';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiEmailServiceProvider } from '../tsi-email-service/tsi-email-service';
import { TsiParserConfigNames } from '../../parser/TsiParserConfigNames';
import { TsiParserServiceProvider } from '../tsi-parser-service/tsi-parser-service';

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
                public emailService : TsiEmailServiceProvider, public parserService: TsiParserServiceProvider) {
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

    public writeSyncFile(disableScreen) {

        let syncTxt = '';
        for (let i = 0;i < this.syncFileTimesLocal.entries.length;i ++) {
            syncTxt = syncTxt + this.syncFileTimesLocal.entries[i].key + "|" + this.syncFileTimesLocal.entries[i].value + "\n";
        }

        console.log('Sync Text', syncTxt);

        this.file.checkFile(this.getDataStoragePath(), "sync.dat").then((res) => {
            if (!res) {
                    this.file.writeFile(this.getDataStoragePath(), "sync.dat", syncTxt).then((res) => {
                        console.log('sync text', JSON.stringify(res));
    
                    }, (err) => {
                        console.log('sync text', JSON.stringify(err));
                        
                    })
                }
                else {
                    this.file.writeExistingFile(this.getDataStoragePath(), "sync.dat", syncTxt).then((res) => {
                        console.log('sync text', JSON.stringify(res));
                        
                    }, (err) => {
                        console.log('sync text', JSON.stringify(err));
                        
                    })
                } 

            }, (err) => {
                console.log('SyncFile', JSON.stringify(err));

                this.file.writeFile(this.getDataStoragePath(), "sync.dat", syncTxt).then((res) => {
                    console.log('sync text', JSON.stringify(res));
                    
                }, (err) => {
                    console.log('sync text', JSON.stringify(err));
                    
                })
        });
        
    }

    public readCatalogTabHeadersFile() {
    	// just to be sure
        return new Promise((resolve) => {
            this.parseFile(this.getCatalogTabHeadersFilename(), TsiParserConfigNames.PARSER_CONFIG_CATALOG_TAB_HEADERS, false,  TsiConstants.READ_LOCAL_FILETIMES_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public readLocalFileTimes(disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getSynchronizationFilename(), TsiParserConfigNames.PARSER_CONFIG_SYNCFILE, disableScreen,  TsiConstants.READ_LOCAL_FILETIMES_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public getAllCustomerFolders(disableScreen)
    {
        //this.execute( new GetCustomerFolderTask( TSI_ClientService.getDataService().getStatusTextView(),  disableScreen ) );
    }

    public readServerFileTimes(disableScreen)
    {
        //this.execute( new ReadServerFileTimesTask( TSI_ClientService.getDataService().getStatusTextView(), disableScreen ) );
        return new Promise((resolve) => {
            this.connectionService.readServerFiles(this.dataService, this).then((res) => {
                resolve();
            });
        });
    }

    public startAllParseTasks(disableScreen)
    {
        return new Promise((resolve) => {
            resolve();
        });
        //this.execute( new StartAllParseTasksTask( TSI_ClientService.getDataService().getStatusTextView(), disableScreen ) );
    }

    public readShoppingCarts(disableScreen)
    {
        //this.execute( new ReadShoppingCartsTask( TSI_ClientService.getDataService().getStatusTextView(), disableScreen ) );
    }

    public downloadOutlatedFiles(disableScreen) {
        return new Promise((resolve) => {
            this.connectionService.downloadOutdatedFiles(this.dataService, this).then((res) => {
                resolve();
            });
        });
    }

    private parseFile(filePath, parseConfig, disableScreen, priority)
    {
    
        let pathArray = filePath.split('/');

        let filename  = pathArray.pop();
  
        return new Promise((resolve) => {
            this.parserService.parse(filePath.replace(filename, ''), filename, parseConfig).then((res) => {
                resolve();
            }, (err) => {
                resolve();
            })
        }); 
    }

    public readExpendituresFile( disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getExpendituresFilename(), TsiParserConfigNames.PARSER_CONFIG_EXPENDITURES, disableScreen, TsiConstants.PARSE_EXPENDITURES_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public readExpenditureSuggestionsFile( disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getExpenditureSuggestionsFilename(), TsiParserConfigNames.PARSER_CONFIG_EXPENDITURE_SUGGESTIONS, disableScreen, TsiConstants.PARSE_EXPENDITURE_SUGGESTION_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public readLicenceNumberSuggestionsFile( disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getLicenceNumberSuggestionFilename(), TsiParserConfigNames.PARSER_CONFIG_LICENCE_NUMBER_SUGGESTIONS, disableScreen, TsiConstants.PARSE_DEFAULT_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public readLicenceNumberFile( disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getLicenceNumberFilename(), TsiParserConfigNames.PARSER_CONFIG_LICENCE_NUMBER, disableScreen, TsiConstants.PARSE_DEFAULT_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public readExpandituresConfFile( disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getInternExpendituresConfFilename(), TsiParserConfigNames.PARSER_CONFIG_EXPANDITURES_EMAIL, disableScreen, TsiConstants.PARSE_DEFAULT_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public readKmConfFile( disableScreen)
    {
        return new Promise((resolve) => {
            this.parseFile(this.getInternKmConfFilename(), TsiParserConfigNames.PARSER_CONFIG_KM_EMAIL, disableScreen, TsiConstants.PARSE_DEFAULT_PRIORITY).then((res) => {
                resolve();
            });
        });
    }

    public putServerSyncTime(filename, time) {
        this.syncFileTimesServer[filename] = time;
        console.log('syncFileTimesServer', JSON.stringify(this.syncFileTimesServer));
    }

    public putLocalSyncTime(filename, time) {
        this.syncFileTimesLocal[filename] = time;
        console.log('syncFileTimesLocal', JSON.stringify(this.syncFileTimesLocal));
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
        let result = [];

        let filenames = times.entries;
        for (let i = 0;i < filenames.length;i ++) {
            result.push(filenames[i].key);
        }

        console.log('Times and Results', JSON.stringify(times));
        console.log('Times and Results', JSON.stringify(result));

        return result;
    }

    public getLocalSyncTime(filename) {
        let time = this.syncFileTimesLocal.get(filename);
        if (time) {
            return time;
        }
        else {
            return '-1';
        }
    }

    public getServerSyncTime(filename) {
        let time = this.syncFileTimesServer.get(filename);
        if (time) {
            return time;
        }
        else {
            return '-1';
        }
    }


}
