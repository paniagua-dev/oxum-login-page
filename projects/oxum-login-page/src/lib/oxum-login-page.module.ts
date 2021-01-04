import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {OxumLoginPageComponent} from './oxum-login-page.component';

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
    ],
    providers: [],
    exports: [OxumLoginPageComponent],
})
export class OxumLoginPageModule {
    static forRoot(googleClientId: string): ModuleWithProviders<OxumLoginPageModule> {
        return {
            ngModule: OxumLoginPageModule,
            providers: [
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: GoogleLoginProvider.PROVIDER_ID,
                                provider: new GoogleLoginProvider(googleClientId),
                            },
                        ],
                    } as SocialAuthServiceConfig,
                },
            ],
        };
    }
}
