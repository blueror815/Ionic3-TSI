import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { TsiConstants } from '../../utils/TsiConstants';
import { TsiConnectionServiceProvider } from '../tsi-connection-service/tsi-connection-service';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiEmailServiceProvider } from '../tsi-email-service/tsi-email-service';

/*
  Generated class for the TsiSyncDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiSyncDataServiceProvider {

    public rootPath;

    constructor(public file: File, public connectionService : TsiConnectionServiceProvider, public dataService : TsiDataServiceProvider,
                public emailService : TsiEmailServiceProvider) {
        console.log('Hello TsiSyncDataServiceProvider Provider');
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

   public readConfigFile() {

        console.log("Calling read config file.");

        return new Promise((resolve, reject) => {

            this.file.checkFile(this.file.documentsDirectory + "TSI/", "config.dat").then((res) => {

                console.log("Checking Config file response", res);

                if (res) {
                    this.file.readAsText(this.file.documentsDirectory + "TSI/", "config.dat").then((res) => {
                        console.log("Config Bat file", res);

                        resolve(true);
                    }, (err) => {
                        console.log("error for checking file", err);
                        reject(err);
                    });
                } else {
                    resolve(false);
                }		
            }, (err) => {
                console.log("Config Bat file", JSON.stringify(err));
                reject(err);
            })
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
}
