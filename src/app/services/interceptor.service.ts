import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable()
export class I1 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = '172.31.11.174/apiperf';
        const modified = req.clone({setHeaders: {'Custom-Header-1': '1'}, url:  url + req.url});
        return next.handle(modified);
    }
}
