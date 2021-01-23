import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {delay} from 'rxjs/operators';
import {OxumAuthService} from './oxum-auth.service';
import {OAUTHMETHOD} from './oxum-login.enums';

@Component({
    selector: 'oxum-login-page',
    templateUrl: './oxum-login-page.component.html',
    styleUrls: ['./oxum-login-page.component.less'],
})
export class OxumLoginPageComponent implements OnInit {
    public OAUTHMETHOD = OAUTHMETHOD;
    @Input() loginUrl: string = '';
    @Input() enableSignInWithGoogle: boolean | undefined;
    @Input() logoPath: string = 'assets/logo.png';
    public buttonLabel = 'Login';
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });
    public loading = false;
    public error: boolean = false;

    public get disabled(): boolean {
        return !this.loginForm.valid;
    }

    constructor(public authService: OxumAuthService) {
    }

    ngOnInit(): void {
        if (!this.loginUrl) {
            console.error('Error: No login url found');
        }
    }

    private toggleLoading(): void {
        this.loading = !this.loading;
        this.buttonLabel = (this.loading) ? 'Please wait...' : 'Login';
    }

    public submit(): void {
        if (this.loginForm.valid) {
            const username = this.loginForm.value.username;
            const password = this.loginForm.value.password;
            this.toggleLoading();
            this.authService.login(this.loginUrl, username, password)
                .pipe(delay(2000))
                .subscribe(
                    (token) => {
                        console.log('logged in', token);
                    },
                    () => {
                        this.error = true;
                        this.toggleLoading();
                    },
                );
        }
    }
}
