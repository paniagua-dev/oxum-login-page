import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

interface iToken {
    text: string;
    id: string;
    socialUser: SocialUser;
}

enum TOKEN {
    name = 'token',
    socialUser = 'socialUser',
}

@Injectable()
export class OxumAuthService {
    public isLogged$ = new BehaviorSubject<boolean>(!!this.token);
    private gAuthenticated: boolean = false;

    public set socialUser(socialUser: SocialUser) {
        window.sessionStorage.setItem(TOKEN.socialUser, JSON.stringify(socialUser));
    }

    public get socialUser(): SocialUser {
        return JSON.parse(<string>window.sessionStorage.getItem(TOKEN.socialUser));
    }

    public get token(): string | null {
        if (this.gAuthenticated) {
            this.refreshToken();
        }
        return window.sessionStorage.getItem(TOKEN.name);
    }

    public set token(token: string | null) {
        (token) && window.sessionStorage.setItem(TOKEN.name, token);
    }

    constructor(private http: HttpClient, private authService: SocialAuthService) {
    }

    private loginIn(): void {
        this.isLogged$.next(true);
        console.log('successfully login in');
    }

    login(url: string, username: string, password: string): Observable<iToken> {
        return this.http.post<iToken>(url, {username, password}).pipe(tap((token) => {
            this.token = token.id;
            this.socialUser = token.socialUser;
            this.loginIn();
        }));
    }

    logout(url?: string): Observable<any> {
        const obs = (url) ? this.http.post<Observable<any>>(url, {logout: true}) : of<any>(url);
        return obs.pipe(tap(() => {
            sessionStorage.removeItem(TOKEN.name);
            sessionStorage.removeItem(TOKEN.socialUser);
            if (this.gAuthenticated) {
                this.signOutWithGoogle();
            }
            this.isLogged$.next(false);
        }));
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser) => {
            this.socialUser = socialUser;
            this.token = socialUser.idToken;
            this.loginIn();
            this.gAuthenticated = true;
        });
    }


    refreshToken(): void {
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    private signOutWithGoogle(): void {
        this.authService.signOut().then(() => {
            this.gAuthenticated = false;
        });
    }
}
