# Oxum Login Page

This is a simple library to display a login page with Google Sign in

## Get started

```
npm install oxum-login-page --save
```

## Import the module and run "initialize" method

```js
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.initialize(config), //Config should to be a OxumLoginPageConfig object
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
```

where `config` is an instance of the object OxumLoginPageConfig.

## Setup style

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

@Input **logoPath**: string = (optional) Path to the logo, by default 'assets/logo.png';

@Input **loginUrl**: string = (optional) Url to call after the user is logged.;

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

## Enable Firebase Auth

You can enable the Firebase Auth to login with your firebase account.

First, install Firebase:

```bash
ng add @angular/fire
```

Then add the Firebase config to environments variable. Open /src/environments/environment.ts and add your Firebase
configuration. You can find your project configuration in the Firebase Console:

```ts
export const environment = {
    production: false,
    firebase: {
        apiKey: '<your-key>',
        authDomain: '<your-project-authdomain>',
        databaseURL: '<your-database-URL>',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>',
        messagingSenderId: '<your-messaging-sender-id>',
        appId: '<your-app-id>',
        measurementId: '<your-measurement-id>'
    }
};
```

Next, add you configuration in your Angular module:

```js
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        OxumLoginPageModule.initialize({
            //...
            firebase: environement.firebase
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
```

With those last step the Firebase auth is set up.
**Important**: Using the Firebase auth will replace the default (user, password) authentication method.

## Auth Interceptor

Oxum Login Page provides an interceptor that will disconnect the user for each http 403 response. Here is an example to
set up this interceptor:

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
