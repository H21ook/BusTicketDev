import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserMethodsPageModule } from './pages/user-methods/user-methods.module';
import { HttpModule } from '@angular/http';
import { FIREBASE_CONFIG } from './firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Facebook } from "@ionic-native/facebook/ngx";
import { WeatherPageModule } from './pages/weather/weather.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { StopListPageModule } from './pages/stop-list/stop-list.module';
import { DistinationStopListPageModule } from './pages/distination-stop-list/distination-stop-list.module';

library.add(fas, fab, far);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    UserMethodsPageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    StopListPageModule,
    DistinationStopListPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    HTTP,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
