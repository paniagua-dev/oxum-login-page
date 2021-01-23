import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {OxumAuthService, OxumLoginPageModule} from 'oxum-login-page';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.initialize({
            googleClientId: '677087240243-o1r8f8isbd1c01uingt7ib4tssuisvm0.apps.googleusercontent.com',
            firebase: environment.firebase,
        }),
    ],
    providers: [OxumAuthService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
