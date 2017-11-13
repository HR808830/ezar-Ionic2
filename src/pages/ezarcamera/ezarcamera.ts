import { Component } from '@angular/core';
import { Platform, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { Gallary } from '../gallary/gallary';

/**
 * Generated class for the Photos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ezarcamera',
  templateUrl: 'ezarcamera.html',
})
export class EzarCamera {
  public ezarSave;
  public reverseCameraTimestamp = Date.now();
  public MYImages = [];
  constructor(public platform: Platform, public navCtrl: NavController,private sanitizer:DomSanitizer) 
  { 
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      var win: any = window;
      if (win.ezar) {
            var ezar: any = win.ezar;
            this.ezarSave=ezar;
            ezar.initializeVideoOverlay(
                function() {
                 ezar.getBackCamera().start();
                },
                  function(err) {
                alert('unable to init ezar: ' + err);
            });
      } else {
        alert('Unable to detect the ezAR plugin');
      }
    });
  }

  reverseCamera(){
    if (Date.now() - this.reverseCameraTimestamp < 1500) return;

    var camera = this.ezarSave.getActiveCamera();
    if (!camera) {
      return; //no camera running; do nothing
    }
    var newCamera = camera;
    if (camera.getPosition() == "BACK" && this.ezarSave.hasFrontCamera()) { 
          newCamera = this.ezarSave.getFrontCamera();
    } else  if (camera.getPosition() == "FRONT" && this.ezarSave.hasBackCamera()) { 
          newCamera = this.ezarSave.getBackCamera();
    }
    if (newCamera) {
      newCamera.start();
    }
  }

  takePhotos(){
    this.platform.ready().then(() => {
      this.saveCameraImg().then(success => {
         this.MYImages.push({"name":this.sanitizer.bypassSecurityTrustUrl(success),"base64":success});
      }, (error) => {
            alert(error);
      });
    });
  }
  saveCameraImg(): Promise<any>{
    return new Promise(function(resolve,reject){
      var win: any = window;
      var ezar: any = win.ezar;
    
      //get snapshot & revcamera buttons to hide/show
      var snapshotBtn = document.getElementById("snapshot");
      var revCameraBtn = document.getElementById("revcamera");
      
      var inclWebView = true;    // include/exclude webView content on top of cameraView
      var inclCameraBtns = true; // show/hide snapshot & revcamera btns

      if (inclWebView && !inclCameraBtns) {
          revCameraBtn.classList.add("hide");
          snapshotBtn.classList.add("hide");              
      }
      ezar.snapshot(
        function(base64EncodedImage) {
          resolve(base64EncodedImage);
        },
        function(error) {
          alert("ezar snapshot failed");
        },
        {"saveToPhotoGallery": true,
         "encoding": ezar.ImageEncoding.PNG,
         "includeWebView": false,
         "includeCameraView": true
       }
      ); 
    });
  }
  removePhoto=function (image) {
    for (var i = 0; i < this.MYImages.length; i++) {
      if(this.MYImages[i] === image ) {
        this.MYImages.splice(i,1);
      }
    }
  }

  previewImage(base64){
    this.navCtrl.push(Gallary,{base64Data:base64});
  }
}
