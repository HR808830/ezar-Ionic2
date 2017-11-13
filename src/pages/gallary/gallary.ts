import { Component } from '@angular/core';
import { Platform,NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {DomSanitizer} from '@angular/platform-browser';

/*
  Generated class for the Page3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gallary',
  templateUrl: 'gallary.html'
})
export class Gallary {
  public image;
  public base64;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer:DomSanitizer) 
  {
    var url = navParams.data.base64Data;
    var splitUrl=url.split('\n');
    this.base64 ='';
    for(var i=0; i<splitUrl.length;i++){
      this.base64 +=splitUrl[i]; 
    }
    this.image=this.sanitizer.bypassSecurityTrustUrl(this.base64);
  }
  
}
