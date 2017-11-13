import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EzarCamera } from '../pages/ezarcamera/ezarcamera';
import { Page1 } from '../pages/page1/page1';
import { Gallary } from '../pages/gallary/gallary';

@NgModule({
  declarations: [
    MyApp,
    EzarCamera,
    Page1,
    Gallary
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EzarCamera,
    Page1,
    Gallary
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}
