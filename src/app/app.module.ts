import {BrowserModule, Title} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';

import {AuthGuard} from './guards';
import {AppComponent} from './app.component';
import {LoginComponent} from './login';
import {SearchComponent} from './search/search.component';

import {AuthenticationService} from './services';
import {TabComponent} from "./tableau/tab.component";
import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'search/:address', component: SearchComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    {path: '**', redirectTo: ''}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SearchComponent,
        TabComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NguiAutoCompleteModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot(appRoutes, {enableTracing: false}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyA9-Jv0N_r0H5NYJmYxXiqtb99aPupPqXE',
            libraries: ["places"]
        })
    ],
    providers: [AuthenticationService, AuthGuard, Title],
    bootstrap: [AppComponent]
})
export class AppModule {
}

