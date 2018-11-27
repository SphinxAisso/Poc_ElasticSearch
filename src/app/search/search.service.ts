import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class SearchService {
    value: string;
    tab: string[];

    constructor(private http: HttpClient) {
    }

    encodeQueryData(data) {
        if (data) {
            const params = data.split(';');
            console.log(params);
            const ret = [];
            params.map((d, index) => ret.push(params[index]));
            const query = ret.join('&');
            const regex1 = /[^id_agent=].*&/gi;
            const id_a = query.match(regex1);
            const res = id_a[0].split('&');
            const id = res[0];
            return {id: id, query: query};
        } else {
            return {id: '', query: ''};
        }
    }

    getElasticResponse(query): Observable<HttpResponse<any>> {
        const configUrlElastic = '/apiperf/elastic/dossiers/statuts';
        return this.http.get<any>(`${configUrlElastic}?${query}`, {observe: 'response'});
    }

    getAS400Response(query): Observable<HttpResponse<any>> {
        const configUrlAS400 = '/apiperf/dossiers/statuts';
        return this.http.get<any>(`${configUrlAS400}?${query}`, {observe: 'response'});
    }

    generate_id(query): Observable<any> {
        const gerateID_path = '/apiespaceclientdev/generateid';
        return this.http
            .post<any>(`${gerateID_path}`, {id: query.id});
    }
}
