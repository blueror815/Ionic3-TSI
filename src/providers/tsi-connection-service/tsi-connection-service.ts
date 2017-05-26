import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Ftp } from '../../../plugins/cordova-plugin-ftp/types/ftp';

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

  constructor(public http: Http) {
    console.log('Hello TsiConnectionServiceProvider Provider');
  }

  public checkFTP(server: string, username: string, password: string) : boolean {
  	var isConnect = true;

  	Ftp.connect(server, username, password).then((response) => {
         
         console.log("Ftp resposne :", response);

         Ftp.ls('').then((success) => {
            console.log("Ftp ls success :", "");
            console.log("Ftp ls :", JSON.stringify(success));
          }, (error) => {
            console.log("Ftp ls error :", "");
            console.log("Ftp ls :", JSON.stringify(error));
        });
         
         isConnect = true;
            
      }, (error) => {

         console.log("Ftp error :", error);
         
         isConnect = false;
    });

    return isConnect;
  }

  public getFtpFiles(url : string) {

  	console.log("Ftp get files :", url);

  	Ftp.ls('').then((success) => {
	  		console.log("Ftp ls success :", "");
			  console.log("Ftp ls :", JSON.stringify(success));
	  	}, (error) => {
	  		console.log("Ftp ls error :", "");
	  		console.log("Ftp ls :", JSON.stringify(error));
	  });
  }

}
