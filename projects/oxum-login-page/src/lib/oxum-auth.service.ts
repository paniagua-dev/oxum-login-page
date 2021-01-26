import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {FIREBASE_OPTIONS, FirebaseOptions} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import firebase from 'firebase';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TOKEN} from './oxum-login.enums';
import {iToken} from './oxum-login.interfaces';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class OxumAuthService {
    public isLogged$ = new BehaviorSubject<boolean>(!!this.token);
    private socialAuthenticated: boolean = false;

    public set socialUser(socialUser: SocialUser) {
        window.sessionStorage.setItem(TOKEN.socialUser, JSON.stringify(socialUser));
    }

    public get socialUser(): SocialUser {
        return JSON.parse(<string>window.sessionStorage.getItem(TOKEN.socialUser));
    }

    public get token(): string | null {
        if (this.socialAuthenticated) {
            this.refreshToken();
        }
        return window.sessionStorage.getItem(TOKEN.name);
    }

    public set token(token: string | null) {
        (token) && window.sessionStorage.setItem(TOKEN.name, token);
    }

    constructor(
        private http: HttpClient,
        private socialAuthService: SocialAuthService,
        private angularFireAuth: AngularFireAuth,
        @Inject(FIREBASE_OPTIONS) private firebaseOptions: FirebaseOptions,
    ) {
    }

    private loginIn(): void {
        this.isLogged$.next(true);
        console.log('successfully login in');
    }

    login(url: string, username: string, password: string): Observable<iToken | UserCredential> {
        return (!!this.firebaseOptions) ?
            from(this.angularFireAuth.signInWithEmailAndPassword(username, password)).pipe(tap(async (token) => {
                this.loginIn();
                this.socialUser = <SocialUser>{
                    email: username,
                    photoUrl: '',
                };
                if (token.user) {
                    this.token = await token.user?.getIdToken();
                }
            })) :
            this.http.post<iToken>(url, {
                username,
                password,
            }).pipe(tap((token) => {
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
            if (this.socialAuthenticated) {
                this.signOutWithGoogle();
            }
            this.isLogged$.next(false);
        }));
    }

    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser) => {
            this.socialUser = socialUser;
            this.token = socialUser.idToken;
            this.loginIn();
            this.socialAuthenticated = true;
        });
    }

    refreshToken(): void {
        this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    private signOutWithGoogle(): void {
        this.socialAuthService.signOut().then(() => {
            this.socialAuthenticated = false;
        });
    }
}
