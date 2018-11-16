import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	env = environment;

	public constructor(private titleService: Title ) {
	}

	public setTitle( newTitle: string) {
		this.titleService.setTitle( newTitle );
	}
}
