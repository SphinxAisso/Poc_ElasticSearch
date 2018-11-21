import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class SearchService {
    private timerElastic: string;
    private timerAS400: string;
    value: string;
    tab: string[];

    constructor(private http: HttpClient) {
    }

    encodeQueryData(data) {
        if (data) {
            let params = data.split(';');
            console.log(params);
            const ret = [];
            params.map((d, index) => ret.push(params[index]));
            return ret.join('&');
        }
        return '';
    }

    getElasticResponse(query): Observable<HttpResponse<any>> {
        const configUrlElastic = '/apiperf/welcome';
        const begin = Date.now();
        let req = this.encodeQueryData(query);
        console.log(req);
        return this.http.get<any>(
            `${configUrlElastic}?${req}`, {observe: 'response'})
            .pipe(
                tap( // Log the result or error
                    data => console.log(data),
                    error => console.log('Error! ', error),
                    () => {
                        console.log('finished !');
                        const end = Date.now();
                        this.timerElastic = (end - begin) / 1000 + "secs";
                        console.log(this.timerElastic);
                    }
                )
            );
    }

    getAS400Response(query): Observable<HttpResponse<any>> {
        const configUrlAS400 = '/apiperf/dossiers/as400';
        const begin = Date.now();
        let req = this.encodeQueryData(query);
        return this.http.get<any>(
            `${configUrlAS400}?${req}`, {observe: 'response'})
            .pipe(
                tap( // Log the result or error
                    data => console.log(data),
                    error => console.log('Error! ', error),
                    () => {
                        console.log('finished !');
                        const end = Date.now();
                        this.timerAS400 = (end - begin) / 1000 + "secs";
                        console.log(this.timerAS400);
                    }
                )
            );
    }

    getTimeElastic() {
        return this.timerElastic;
    }

    getTimeAS400() {
        return this.timerAS400;
    }


}