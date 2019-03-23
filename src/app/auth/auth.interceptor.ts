import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpEvent, HttpHandler, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
// import 'rxjs/add/operator/do';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'true') {
            return next.handle(req.clone());
        }
        if (localStorage.getItem('token') !== null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', btoa(unescape(encodeURIComponent(localStorage.getItem('token')))))
            });
            return next.handle(clonedreq).pipe(tap(
                succ => { },
                err => {
                    if (err.status === 401) {
                        // localStorage.removeItem('token');
                        // localStorage.removeItem('username');
                        // localStorage.removeItem('role');
                        // localStorage.removeItem('checkInValid');
                        // localStorage.removeItem('checkIn');
                        // localStorage.removeItem('checkOut');
                        // this.router.navigate(['/login']);
                    }
                }
            ));

        } else {
            return next.handle(req.clone());
            // this.router.navigate(['/login']);
        }
    }
}
