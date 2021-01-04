import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Message} from 'primeng/api';
import {Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {OxumAuthService} from './oxum-auth.service';

export class OxumAuthInterceptor implements HttpInterceptor {
    public statusMessage$ = new Subject<Message>();

    constructor(private authService: OxumAuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<boolean>> {
        return next.handle(req).pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
                if (httpErrorResponse.status === 403) {
                    this.authService.logout('').subscribe(() => {
                        const message = 'You have been disconnected by the server \'cause you don\'t have access to this resource';
                        console.error(message);
                        this.statusMessage$.next(
                            {
                                severity: 'error',
                                summary: 'Forbidden access',
                                detail: message,
                                life: 6000,
                            }
                        );
                    });
                }
                return next.handle(req);
            }));
    }
}
