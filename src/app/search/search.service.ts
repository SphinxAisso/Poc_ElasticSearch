import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

export interface Config {
    num_dossier: string;
    origine: string;
    id_agent: string;
    statut: string;
    type: string;
    personne: string;
}

@Injectable()
export class SearchService {
    private timerElastic: string;
    private timerAS400: string;
    value: string;
    configUrlAS400 = 'assets/response_AS400_API.json'; // 172.31.11.174/apiperf/dossiers/as400
    configUrlElastic = 'assets/response_Elastic_API.json'; // 172.31.11.174/apiperf/elastic/dossiers
    tab: string[];

    constructor(private http: HttpClient) {
    }

    encodeQueryData(data) {
        let params = '';
        if (data) {
            params = data.split(';');
            const ret = [];
            -+
                params.map((d, index) => ret.push(params[index]));
            return ret.join('&');
        }
        return '';
    }

    getElasticResponse(query): Observable<HttpResponse<Config>> {
        const begin = Date.now();
        let req = this.encodeQueryData(query);
        console.log(req);
        return this.http.get<Config>(
            `${this.configUrlElastic}?${req}`, {observe: 'response'})
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

    getAS400Response(query): Observable<HttpResponse<Config>> {
        const begin = Date.now();
        let req = this.encodeQueryData(query);
        return this.http.get<Config>(
            `${this.configUrlAS400}?${req}`, {observe: 'response'})
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