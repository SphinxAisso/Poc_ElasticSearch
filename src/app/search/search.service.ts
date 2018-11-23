import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class SearchService {
    timerElastic: number;
    timerAS400: number;
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
            return ret.join('&');
        }
        return '';
    }

    getElasticResponse(query): Observable<HttpResponse<any>> {
        const configUrlElastic = '/apiperf/elastic/dossiers/statuts';
        const req = this.encodeQueryData(query);
        console.log(req);
        const begin = Date.now();
        return this.http.get<any>(
            `${configUrlElastic}?${req}`, {observe: 'response'})
            .pipe(
                tap( // Log the result or error
                    data => {
                        const end = Date.now();
                        this.timerElastic = (end - begin);
                        console.log(this.timerElastic);
                        console.log(begin);
                        console.log(end);
                    },
                    error => console.log('Error! ', error),
                    () => console.log('finished !')
                )
            );
    }

    getAS400Response(query): Observable<HttpResponse<any>> {
        const configUrlAS400 = '/apiperf/dossiers/statuts';
        const req = this.encodeQueryData(query);
        const begin = Date.now();
        return this.http.get<any>(
            `${configUrlAS400}?${req}`, {observe: 'response'})
            .pipe(
                tap( // Log the result or error
                    data => {
                        const end = Date.now();
                        this.timerAS400 = (end - begin);
                        console.log('begin : ' + begin);
                        console.log('end : ' + end);
                        console.log(this.timerAS400);
                    },
                    error => console.log('Error! ', error),
                    () => console.log('finished !')
                )
            );
    }

    msToTime(duration) {
        const milliseconds = (duration % 1000);
        let seconds = (duration / 1000) % 60 + '';
        let minutes = (duration / (1000 * 60)) % 60 + '';

        minutes = (parseInt(minutes) < 10) ? '0' + minutes : minutes;
        seconds = (parseInt(seconds) < 10) ? '0' + seconds : seconds;

        return minutes + ' min ' + seconds + ' sec ' + milliseconds + ' ms';
    }

    getTimeElastic() {
        return this.msToTime(this.timerElastic);
    }

    getTimeAS400() {
        return this.msToTime(this.timerAS400);
    }

    generate_id(query): Observable<HttpResponse<any>> {
        const gerateID_path = '/apiespaceclientdev/generateid';
        return this.http.post<any>(
            `${gerateID_path}`, {observe: 'response'})
            .pipe(
                tap(
                    data => console.log(data),
                    error => console.log('Error! ', error),
                    () => console.log('finished !')
                )
            );
    }
}