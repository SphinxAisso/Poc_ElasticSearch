import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

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

    value: string;
    configUrlAS400 = 'assets/response_AS400_API.json';
    configUrlElastic = 'assets/response_Elastic_API.json';
    tab: string[];

    constructor(private http: HttpClient) {
    }

    encodeQueryData(data) {
        let params = '';
        if (data) {
            params = data.split(';');
            const ret = [];
            params.map((d, index) => ret.push(params[index]));
            return ret.join('&');
        }
        return '';
    }

    getElasticResponse(query): Observable<HttpResponse<Config>> {
        let req = this.encodeQueryData(query);
        console.log(req);
        return this.http.get<Config>(
            `${this.configUrlElastic}?${req}`, {observe: 'response'});
    }

    getAS400Response(query): Observable<HttpResponse<Config>> {
        let req = this.encodeQueryData(query);
        return this.http.get<Config>(
            `${this.configUrlAS400}?${req}`, {observe: 'response'});
    }
}