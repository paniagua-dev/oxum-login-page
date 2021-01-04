import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {OxumAuthService, OxumLoginPageModule} from 'oxum-login-page';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.forRoot('677087240243-o1r8f8isbd1c01uingt7ib4tssuisvm0.apps.googleusercontent.com'),
    ],
    providers: [OxumAuthService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
