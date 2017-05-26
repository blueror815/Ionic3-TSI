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

  constructor(public http: Http, public file: File) {
    console.log('Hello TsiDataServiceProvider Provider');
  }

  public getDataStoragePath() {
  	console.log('FileStoragePath => ', this.file.documentsDirectory);

  	this.file.createDir(this.file.documentsDirectory, "Data", false).then((res) => {
  		console.log('DataStoragePath => ', res);

  	}, (err) => {
  		console.log('DataStoragePath => ', err);
  	})

  	return this.file.documentsDirectory + "Data/";
  }

  public getGraphicsStoragePath() {
  	this.file.createDir(this.getDataStoragePath(), "Graphics", false).then((res) => {
  		console.log('GraphicsStoragePath => ', res);

  	}, (err) => {
  		console.log('GraphicsStoragePath => ', err);
  	})

  	return this.getDataStoragePath() + "Graphics/";
  }

  public getLocalImageList() : Promise<any> {

  	this.getGraphicsStoragePath();
  	
  	let images = [];
  	return new Promise((resolve) => {
  		this.file.listDir(this.getDataStoragePath(), "Graphics").then((res) => {

  			console.log('LocalImageFiles => ', res);
  			images = res;
  			resolve(images);
  		}, (err) => {
  			resolve(images);
  		})
  	})
  }

}
