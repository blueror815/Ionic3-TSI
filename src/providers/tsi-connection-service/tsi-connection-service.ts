import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Ftp } from '../../../plugins/cordova-plugin-ftp/types/ftp';
import { File } from '@ionic-native/file';
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

  constructor(public http: Http, public file: File) {
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

}

