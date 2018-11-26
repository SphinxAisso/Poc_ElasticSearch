import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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

            // let id_agent = this.generate_id(id.replace(/'/g, ''))
            const request = this.generate_id(id)
                .subscribe(resp => {
                    if (resp.id) return resp.id;
                });
            if (request) {
                const regex2 = /[^id_agent=].*&/gi;
                console.log(query.replace(regex2, `${request}&`));
                return query.replace(regex2, `${request}&`);
            }
        }
        return '';
    }

    getElasticResponse(query): Observable<HttpResponse<any>> {
        const configUrlElastic = '/apiperf/elastic/dossiers/statuts';
        const req = this.encodeQueryData(query);
        console.log(req);
        if (req) {
            const begin = Date.now();
            return this.http.get<any>(
                `${configUrlElastic}?${req}`, {observe: 'response'})
                .pipe(
                    tap( // Log the result or error
                        data => {},
                        error => console.log('Error! ', error),
                        () => console.log('finished !')
                    )
                );
        }
    }

    getAS400Response(query): Observable<HttpResponse<any>> {
        const configUrlAS400 = '/apiperf/dossiers/statuts';
        const req = this.encodeQueryData(query);
        const begin = Date.now();
        return this.http.get<any>(
            `${configUrlAS400}?${req}`, {observe: 'response'})
            .pipe(
                tap( // Log the result or error
                    data => {},
                    error => console.log('Error! ', error),
                    () => console.log('finished !')
                )
            );
    }

    generate_id(query): Observable<any> {
        const gerateID_path = '/apiespaceclientdev/generateid';
        return this.http.post<any>(
            `${gerateID_path}`, {id: query})
            .pipe(
                tap(
                    data => console.log('generate_id - ' + data),
                    error => console.log('generate_id - Error! ', error),
                    () => console.log('generate_id - finished !')
                )
            );
    }
}
