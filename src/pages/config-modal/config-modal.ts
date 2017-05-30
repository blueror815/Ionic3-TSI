import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Dialogs } from '@ionic-native/dialogs';

import {TsiConnectionServiceProvider} from '../../providers/tsi-connection-service/tsi-connection-service';
import { TsiDataServiceProvider } from '../../providers/tsi-data-service/tsi-data-service';

/**
 * Generated class for the ConfigModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  	selector: 'page-config-modal',
  	templateUrl: 'config-modal.html'
    
})

export class ConfigModalPage {

	  public img_url = "assets/images/wrong.png";
	  public img_background_url = "assets/images/not_avalible.png";
    public is_checked: boolean = false;
    public ftp_address: string = "80.228.113.30";
    public ftp_username: string = "Tablet_Test";
    public ftp_password: string = "test2016";

    public select_folder: string;
    public folders: any;
    public imgCount: string = "0/0";

    public user_name: string = "80.228.110.31";
    public user_password: string = "testuserpassword";
    public absender_email: string = "user@email.com";
    public empfanger_email: string = "user@afm.com";
    public email_server: string = "192.149.22.1";
    public email_port: number = 22;

    public download_running : boolean = false;
    public download_end : boolean = false;
    public download_index = 0;
    public server_images = [];

  	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public dialogs: Dialogs, public imagePicker: ImagePicker, 
      public connectionService : TsiConnectionServiceProvider,public dataService: TsiDataServiceProvider, public loadingCtrl: LoadingController) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ConfigModalPage');
  	}

  	onCheck = () => {

    let loader = this.loadingCtrl.create({
      content: "Checke FTP-Server..."
    });

    loader.present();
    
    this.connectionService.checkFTP(this.ftp_address, this.ftp_username, this.ftp_password).then((res) => {

          this.is_checked = res;
          
          if (this.is_checked) {
            // code...
            this.img_url = "assets/images/right.png";

            this.connectionService.server = this.ftp_address;
            this.connectionService.username = this.ftp_username;
            this.connectionService.password = this.ftp_password;

            let serverImgCnt = 0;
            let localImgCnt = 0;

            this.connectionService.getFtpFiles('').then((fileList) => {
              
                this.folders = fileList;

                console.log('Folders :' , this.folders);

                if (this.folders && this.folders.length > 0) {
                  // code...
                  this.select_folder = this.folders[0];
                }

                this.connectionService.getImageCount('/Grafiken/').then((res) => {

                  if (res && res.length >0) {
                    // code...

                    this.server_images = res;
                    serverImgCnt = this.server_images.length;

                    console.log("Server Image count :", serverImgCnt);
                  }

                  this.dataService.getLocalImageList().then((res) => {
                    loader.dismiss();

                    if (res && res.length >0) {
                      // code...
                      localImgCnt = res.length;

                      console.log("Local Image Count :", localImgCnt);
                    }

                    this.imgCount = localImgCnt + "/" + serverImgCnt;

                  });

                  

                });
                
            });
          }
          else {
            this.img_url = "assets/images/wrong.png";
            loader.dismiss();
          }
        } 
      )

      
    }

    onImageDownload = (element) => {
      if (this.download_running) {
        // code...
        this.download_running = false;
        element.textContent = "BILDER HERUNTERLADEN";
      }
      else {
        this.download_running = true;
        element.textContent = "Herunterladen abbrechen";

        this.getMissingImages().then((res) => {
          this.downloadAllServerImages(element, res);
        });
      }
    }

    public downloadAllServerImages(element, files) {
      let filename = files[this.download_index].name;
      console.log("FileObject", JSON.stringify(files[this.download_index]));
      console.log("Filename ", filename);

      this.connectionService.donwloadServerImage(this.dataService.file.documentsDirectory + "TSI/Data/Graphics/", filename).then(
        (res) => {
          this.download_index ++;
          let localImgCnt = this.server_images.length - files.length + this.download_index + 1;
          this.imgCount = localImgCnt + "/" + this.server_images.length; 
          
          if(this.download_index == files.length) {
            element.disabled = true;
            element.textContent = "Alle Bilder heruntergeladen";
            this.download_end = true;
            return;
          }
          else {
            if (!this.download_running) {
              return;
            }
            this.downloadAllServerImages(element,files);
          }
        }, (err) => {

        }
      )
    }

    public getMissingImages() : Promise <any> {
     
     let missing_images = [];
     return new Promise((resolve) => {
       this.dataService.getLocalImageList().then((res) => {
        
          let local_images = res;

          for (let serverImage of this.server_images) {
            if (!this.stringArrayContainsString(local_images, serverImage)) {
              missing_images.push(serverImage);
            }
          }

          resolve(missing_images);
        });
     }); 
    }

    public stringArrayContainsString(array , value) :boolean {
      
      for (let localImage of array) {
        if (value.name == localImage.name) {
            return true;
        }
      }

      return false;
    }

    onOpenGallery = () => {
      
      let options = {
        maximumImagesCount : 1,
        width : 80,
        height : 80,
        quality : 80
      };

      this.imagePicker.getPictures(options).then((results) => {
        this.img_background_url = results[0];
      }, (err) => {

      });
    }

  	dismiss() { // call this function to pass modal data to main tab.
        this.dataService.startImgFileName = this.img_background_url;
        // if (this.validateAllConfiguration().length > 0) {
        //   this.dialogs.alert(this.validateAllConfiguration());
        // }
        // else {

        //   let data = { 'startImage': this.dataService.startImgFileName };
	      //   this.viewCtrl.dismiss(data);
        // }
	   
        let data = { 'startImage': this.dataService.startImgFileName };
	      this.viewCtrl.dismiss(data);
	  }

    private validateAllConfiguration() {
      let msg = "";

      if(!this.is_checked) {
        msg = "Bitte stellen zu erst den FTP korrekt ein und checken Sie ihn auf Verfügbarkeit";
      }
      else {
        if(this.dataService.startImgFileName.length == 0) {
          msg = "Bitte wählen Sie zuerst ein Hintergrund Bild aus.";
        }
        else if(!this.download_end) {
          msg = "Bitte laden Sie erst alle Bilder herunter.";
        }
        else {
          if (this.user_name.length == 0 || this.user_password.length == 0 || this.email_server.length == 0 || 
            this.empfanger_email.length == 0 ||this.absender_email.length == 0 || this.email_port > 0) {
            msg = "Bitte geben Sie alle E-Mail Informationen ein.";
          }
        }
      }

      return msg;
    }
}
