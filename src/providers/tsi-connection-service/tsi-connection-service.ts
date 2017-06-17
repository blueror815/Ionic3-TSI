import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Ftp } from '../../../plugins/cordova-plugin-ftp/types/ftp';
import { File } from '@ionic-native/file';
import { TsiSyncDataServiceProvider } from '../tsi-sync-data-service/tsi-sync-data-service';
import { TsiDataServiceProvider } from '../tsi-data-service/tsi-data-service';
import { TsiAbstractLineProcessor } from '../../parser/TsiAbstractLineProcessor';
/*
  Generated class for the TsiConnectionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiConnectionServiceProvider {

  public server : string = "80.228.113.30";
  public username : string;
  public password : string;

  constructor(public file: File) {
    console.log('Hello TsiConnectionServiceProvider Provider');
  }

  public checkFTP(server: string, username: string, password: string) : Promise<any> {

    return new Promise((resolve) => {
        Ftp.connect(server, username, password).then((response) => {
             
             console.log("Ftp resposne :", response);

             resolve(true);
                
          }, (error) => {

             console.log("Ftp error :", error);
             
             resolve(false);
        });
    });
  }

  public getFtpFiles(url : string) : Promise<any> {

    let files = [];

    return new Promise((resolve) => {
        Ftp.ls('/').then((fileList) => {
        
        if (fileList && fileList.length > 0) {

            let rx = new RegExp(/[A-Z][0-9][0-9]|/);

            for (let i = 0; i < fileList.length; i++) {

                if (fileList[i].name) {
                    // code...
                    let foldername = fileList[i].name;

                    if (foldername.match(rx) && foldername.match(rx)[0] != '') {
                        files.push(foldername);
                    }
                }
            }
        }

        console.log("Ftp get files :", files);
            
        resolve(files);

        }, (error) => {

            console.log("Ftp ls :", JSON.stringify(error));

            resolve(files);
        });
    });
  }

  public donwloadServerImage(localPath, filename) : Promise<any> {

    let path = "/Grafiken/" + filename;
    return new Promise((resolve, reject) => {
          
        let localFilePath = localPath.replace("file://", "") + filename;
        Ftp.download(localFilePath, path).then((res) => {
                console.log("Download Success :", res);
                resolve(res);
        }, (err) => {
            reject(err);    
        })    
    });
          
  }

  public getImageCount(url : string) : Promise<any> {
    let imgList = [];

    return new Promise((resolve) => {
        Ftp.ls(url).then((fileList) => {

            console.log("Ftp server image file:", fileList);
            if (fileList && fileList.length > 0) {
                for (let img of fileList) {
                    if (img.name != "." && img.name != "..") {
                        imgList.push(img);
                    }
                } 
            }
            
            resolve(imgList);  
        }, (error) => {
            resolve(imgList);
        })
    });
  }

  public readServerFiles(dataService, syncService) {
    let files = [];
    console.log('ReadServer Files');

    return new Promise((resolve) => {
            this.checkFTP(this.server, this.username, this.password).then((res) => {
            if(res) {
                Ftp.ls('/').then((fileList) => {
                    console.log('FileList', JSON.stringify(fileList));
                    if (fileList && fileList.length > 0) {

                        let rx = new RegExp(dataService.customerFolder + '|Artikel|Kategorien|News');

                        let index = 0;
                        for (let i = 0; i < fileList.length; i++) {
                            // code...
                            let foldername = fileList[i].name;
                            
                            if (foldername.match(rx) && foldername.match(rx)[0] != '') {
                                Ftp.ls('/' + foldername + '/').then((files) => {
                                    console.log("Ftp get Index :", index);
                                    console.log("Ftp get files :", JSON.stringify(files) );
                                    for (let file of files) {
                                        console.log('Ftp File', JSON.stringify(file));

                                        if (file.name != '.' && file.name != '..') {
                                            syncService.putServerSyncTime(foldername + '/' + file.name, file.modifiedDate);
                                        }
                                        
                                    }

                                    index ++;
                                }, (err) => {
                                    console.log("Ftp get files :", JSON.stringify(err));
                                    index ++;
                                }); 
                            }
                            else {
                                index ++;
                            }

                            console.log("Ftp get Index :", index);
                            
                        }

                        if (index == fileList.length) {
                            resolve();
                        }
                        // let index = 0;
                        // while (index < fileList.length) {
                        //     if (fileList[index].name) {
                        //         // code...
                        //         let foldername = fileList[index].name;

                        //         if (foldername.match(rx) && foldername.match(rx)[0] != '') {
                        //             Ftp.ls(foldername + '/').then((files) => {
                        //                 console.log("Ftp get files :", JSON.stringify(files));
                        //                 for (let file of files) {
                        //                     console.log('Ftp File', JSON.stringify(file));

                        //                     if (file.name != '.' && file.name != '..') {
                        //                         syncService.putServerSyncTime(foldername + '/' + file.name, file.modifiedDate);
                        //                     }
                        //                 }

                        //                 index ++;

                        //             }, (err) => {
                        //                 index ++;
                        //             }); 
                        //         }
                        //         else {
                        //             index ++;
                        //         }
                        //     }
                        //     else {
                        //         index ++;
                        //     }
                        // }
                    }
                    else {
                        resolve();
                    }
                
                }, (error) => {

                    console.log("Ftp ls :", JSON.stringify(error));
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    });
    
    
    
  }

  public downloadOutdatedFiles(dataService: TsiDataServiceProvider, syncService: TsiSyncDataServiceProvider) {
    let serverFilenames = syncService.getServerFilenames();
    console.log('ServerFilenames', JSON.stringify(serverFilenames));

    return new Promise((resolve) => {
        if (serverFilenames) {

            let index = 0;

            for (let serverFile of serverFilenames) {
                let filename = serverFile.split('/').pop();
                let path = serverFile.replace(filename, '');

                let rx = new RegExp(dataService.customerFolder + '|Artikel|Kategorien|News');

                if (path.match(rx) && path.match(rx)[0] != '') {
                    let localtime = Date.parse(syncService.getLocalSyncTime(serverFile));
                    let servertime = Date.parse(syncService.getServerSyncTime(serverFile));

                    if (localtime < servertime) {
                        this.downloadFile(syncService.getDataStoragePath(), serverFile, filename).then((res) => {
                            syncService.putLocalSyncTime(serverFile, syncService.getServerSyncTime(serverFile));
                        });
                    }
                }
            }

            resolve ();

            // while (index < serverFilenames.length) {

            //     let serverFile = serverFilenames[index];
            //     let filename = serverFile.split('/').pop();
            //     let path = serverFile.replace(filename, '');

            //     let rx = new RegExp(dataService.customerFolder + '|Artikel|Kategorien|News');

            //     if (path.match(rx) && path.match(rx)[0] != '') {
            //         let localtime = Date.parse(syncService.getLocalSyncTime(serverFile));
            //         let servertime = Date.parse(syncService.getServerSyncTime(serverFile));

            //         if (localtime < servertime) {
            //             this.downloadFile(syncService.getDataStoragePath(), serverFile, filename).then((res) => {
            //                 syncService.putLocalSyncTime(serverFile, syncService.getServerSyncTime(serverFile));
            //                 index ++;
            //             });
            //         }
            //         else {
            //             index ++;
            //         }
            //     }
            //     else {
            //         index ++;
            //     }
            // }
        }
        else {
            resolve();
        }
    });
    
  }


  public downloadFile(localpath, serverPath, filename) {

     let localFilePath = localpath.replace("file://", "") + filename;
     
     return new Promise((resolve) => {
        Ftp.download(localFilePath, serverPath).then((res) => {
            console.log("Download Success :", res);
            resolve();
        }, (err) => {
            resolve();    
        })  
     })
       
  }


}

