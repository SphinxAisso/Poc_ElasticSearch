import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';


@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	@ViewChild("search")
	public searchElementRef: ElementRef;
	public address: string;
	env = environment;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private titleService: Title
    ) {
		this.env.isLoggedIn = true;
        this.env.goBack = false;
    	document.body.className = "page page-home page-contact";
	}

	ngOnInit() {
		this.titleService.setTitle( "POK ElasticSearch" );
	}

	private onSubmit(){
		this.cdr.detectChanges();
	}

}
