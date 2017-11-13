import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EzarCamera } from '../ezarcamera/ezarcamera';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  constructor(public navCtrl: NavController) {}
  
  login() {
    this.navCtrl.push(EzarCamera,{})
  }

}
