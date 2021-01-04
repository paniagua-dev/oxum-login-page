# Oxum Login Page

This is a simple library to display a login page with Google Sign in

## Get started
```
npm install oxum-login-page --save
```

## Import the module and run forRoot method
```js
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.forRoot('[yourGoogleKey].apps.googleusercontent.com'),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
```
where `[yourGoogleKey]` is the key of your Google Api Oauth. See https://developers.google.com/identity/protocols/oauth2

## Enable Auth Service
Then, in your main module import as provider the OxumAuth Service:

```js
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.forRoot('[yourGoogleKey].apps.googleusercontent.com'),
    ],
    providers: [OxumAuthService], // Here the OxumAuthService
    bootstrap: [AppComponent],
})
export class AppModule {
}
```

## Enable style
Oxum Login Page use Primeng to works. If you want to enable the style, please add next lines in your angular.json:

```json
"styles": [
  "node_modules/primeicons/primeicons.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeflex/primeflex.css",
],
``` 
## Inputs

Here you have the list of options:

```ts
@Input logoPath: string = "(optional) Path to the logo, by default 'assets/logo.png'";
@Input loginUrl: string = "(optional) Url to call after the user is logged.";
@Input enableSignInWithGoogle: boolean = "(optional) Enable the button sign in with Google";
```
Example:

```html
<main class="p-d-flex p-flex-column">
    <oxum-login-page [enableSignInWithGoogle]="true"></oxum-login-page>
</main>
```
## Auth Service methods
The auth service can inform you when a user is logged in. For that you can listen the BehaviourSubject `isLogged$`
```ts
@Component({
    selector: 'app-root',
    ...
})
export class AppComponent implements OnInit {
    logged$ = this.auth.isLogged$;
    constructor(public auth: OxumAuthService) {
    }
}

```

```html
<main class="p-d-flex p-flex-column">
    <ng-container *ngIf="logged$ | async; else loginTemplate">
        <h1>Connected</h1>
    </ng-container>
    <ng-template #loginTemplate>
        <oxum-login-page></oxum-login-page>
    </ng-template>
</main>
```

## Auth Interceptor
Oxum Login Page provides an interceptor that will disconnect the user for each http 403 response.
Here is an example to set up this interceptor:

```ts
//imports

export const AuthInterceptorFactory = (authService: OxumAuthService) => {
    return new OxumAuthInterceptor(authService);
};

@NgModule({
    declarations: [
        AppComponent, 
        //...
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.forRoot('[YourKey].apps.googleusercontent.com'),
        //...
    ],
    providers: [
        //...
        OxumAuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: OxumAuthInterceptor,
            multi: true,
            deps: [OxumAuthService],
        },
        {
            provide: OxumAuthInterceptor,
            useFactory: AuthInterceptorFactory,
            deps: [
                OxumAuthService,
            ],
        },
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}

```
