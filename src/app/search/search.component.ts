import {Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environments/environment';
import {SearchService} from "./search.service";
import {FormControl} from "@angular/forms";

@Component({
    templateUrl: './search.component.html',
    providers: [SearchService],
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    timerElasticComp: string;
    timerAS400Comp: string;
    public searchControl: FormControl;
    responseElastic: object[];
    responseAS400: object[];
    elastic_params: string;
    as400_params: string;
    loadingElastic: boolean;
    loadingAS400: boolean;
    error: any;
    headers: string[];
    @ViewChild("search")
    public searchElementRef: ElementRef;
    public address: string;
    env = environment;


    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private titleService: Title
    ) {
        this.loadingElastic = false;
        this.loadingAS400 = false;
        this.env.isLoggedIn = true;
        this.env.goBack = false;
        document.body.className = "page page-home page-contact";
        this.responseElastic = [];
        this.responseAS400 = [];
    }

    ngOnInit() {
        this.titleService.setTitle("POK ElasticSearch");
        //create search FormControl
        this.searchControl = new FormControl();
    }

    clear() {
        this.error = undefined;
        this.headers = undefined;
    }

    showSearchResponseElastic() {
        this.searchService.getElasticResponse(this.elastic_params)
            .subscribe(
                resp => {
                this.responseElastic = [];
                resp.body._resource.map(item => {
                    let object = {
                        id_agent: item.id_agent,
                        num_dossier: item.num_dossier,
                        origine: item.origine,
                        personne: item.personne,
                        statut: item.statut,
                        type: item.type
                    };
                    this.responseElastic.push(object);
                });
                this.loadingElastic = false;
            }),
            error => console.log('Error:', error),
            () => console.log('Finished');
    }

    showSearchResponseAS400() {
        this.searchService.getAS400Response(this.as400_params)
        // resp is of type `HttpResponse<any>`
            .subscribe(resp => {
                this.responseAS400 = [];
                resp.body._resource.map(item => {
                    let object = {
                        id_agent: item.id_agent,
                        num_dossier: item.num_dossier,
                        origine: item.origine,
                        personne: item.personne,
                        statut: item.statut,
                        type: item.type
                    };
                    this.responseAS400.push(object);
                });
                this.loadingAS400 = false;
            });
    }

    public onSubmitElastic() {
        this.loadingElastic = true;
        this.showSearchResponseElastic();
        this.timerElasticComp = this.searchService.getTimeElastic();
        this.cdr.detectChanges();
    }

    public onSubmitAS400() {
        this.loadingAS400 = true;
        this.showSearchResponseAS400();
        this.timerAS400Comp = this.searchService.getTimeAS400();
        this.cdr.detectChanges();
    }
}