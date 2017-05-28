import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { File } from '@ionic-native/file';
/*
  Generated class for the TsiDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TsiDataServiceProvider {

  public startImgFileName = "";
  public rootPath = "";

  constructor(public http: Http, public file: File) {
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

}
