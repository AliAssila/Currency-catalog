import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Currency} from '../../shared/model/currency.model';
import {CurrencyService} from '../currency.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.css']
})
export class CurrencyDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Currency Detail';
  private subscription: Subscription;
  currency: Currency;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _currentService: CurrencyService) { }

  ngOnInit() {
    this.subscription = this._route.params.subscribe((params) => {
      this.getCurrency(params['id']);
    });
  }
  getCurrency(id: any) {
    this._currentService.find(id).subscribe((res: HttpResponse<Currency>) => {
      this.currency = res.body;
    });
  }
  onBack(): void {
    this._router.navigate(['']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
