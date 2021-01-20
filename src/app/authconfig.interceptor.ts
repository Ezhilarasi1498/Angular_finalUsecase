import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { UserDataService } from 'src/app/user-data.service';
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private userDataService: UserDataService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userDataService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}