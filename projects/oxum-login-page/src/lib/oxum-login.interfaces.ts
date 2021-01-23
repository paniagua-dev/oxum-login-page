import {SocialUser} from 'angularx-social-login';

export interface iToken {
    text: string;
    id: string;
    socialUser: SocialUser;
}

export interface OxumLoginPageConfig {
    googleClientId: string;
    firebase?: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    }
}
