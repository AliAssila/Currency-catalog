import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CurrencyListComponent} from './Currency/currency-list/currency-list.component';
import {CurrencyDetailComponent} from './Currency/currency-detail/currency-detail.component';
import {CurrencyService, UserResolvePagingParams} from './Currency/currency.service';
import {CurrencyDetailGuard} from './Currency/currency-guard.service';
import {CurrencyFilterPipe} from './Currency/currency-filter.pipe';
import {SharedModule} from './shared/SharedModule';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyListComponent,
    CurrencyDetailComponent,
    CurrencyFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  providers: [
    CurrencyDetailGuard,
    CurrencyService,
    UserResolvePagingParams],
  bootstrap: [AppComponent]
})
export class AppModule { }
