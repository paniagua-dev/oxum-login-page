import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ReactiveFormsModule} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {OxumLoginPageComponent} from './oxum-login-page.component';
import {OxumLoginPageConfig} from './oxum-login.interfaces';

@NgModule({
    declarations: [OxumLoginPageComponent],
    imports: [
        CardModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        AvatarModule,
        HttpClientModule,
        CommonModule,
        MessageModule,
        MessagesModule,
        SocialLoginModule,
        AngularFireAuthModule,
        AngularFireModule,
    ],
    providers: [],
    exports: [OxumLoginPageComponent],
})
export class OxumLoginPageModule {
    static initialize(config: OxumLoginPageConfig): ModuleWithProviders<OxumLoginPageModule> {
        return {
            ngModule: OxumLoginPageModule,
            providers: [
                {
                    provide: FIREBASE_OPTIONS,
                    useValue: config.firebase || false,
                },
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: GoogleLoginProvider.PROVIDER_ID,
                                provider: new GoogleLoginProvider(config.googleClientId),
                            },
                        ],
                    } as SocialAuthServiceConfig,
                },
            ],
        };
    }
}
