import {Component, HostListener, OnInit} from '@angular/core';
import {CurrencyService} from '../currency.service';
import {Currency} from '../../shared/model/currency.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ITEMS_PER_PAGE, MOBILE_MAX_WIDTH, TABLET_MAX_WIDTH} from '../../app.constants';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  pageTitle = 'Available currencies';
  currencies$: any[] ;
  error: string;
  inputFilter: string;
  typeFilter: string;
  page: any;
  routeData: any;
  totalItems: any;
  itemsPerPage: any;
  previousPage: any;
  perPage = 12;
  public innerWidth: any;
  listFilter = [
    {
      'id': 'id',
      'name': 'id'
    },
    {
      'id': 'code',
      'name': 'code'},
    {
      'id': 'name',
      'name': 'name'},
    {
      'id': 'currency_type',
      'name': 'type'
    },
    ];
  constructor(private _currencyService: CurrencyService,
              private activatedRoute: ActivatedRoute,
              private _router: Router) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
      this.page = data['pagingParams'].page;
      this.previousPage = data['pagingParams'].page;
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.loadAll();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if ( innerWidth < MOBILE_MAX_WIDTH) {
      this.changeSize(4);
    } else if (innerWidth < TABLET_MAX_WIDTH) {
      this.changeSize(8);
    } else {
      this.changeSize(12);
    }
    console.log('screen changed. new: ' + this.innerWidth );
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  changeSize(num: number) {
    this._currencyService.findAll({
      'page[number]': this.page - 1,
      'page[size]': num})
      .subscribe((res: HttpResponse<Currency[]>) =>  this.onSuccess(res.body, res.headers),
        (res: HttpResponse<any>) => this.onError(res.body)
      );
  }
  transition() {
    this._router.navigate([''], {
      queryParams: {
        page: this.page,
      }
    });
    this.loadAll();
  }
  loadAll() {
   this._currencyService.findAll({
     'page[number]': this.page - 1,
     'page[size]': this.itemsPerPage})
     .subscribe((res: HttpResponse<Currency[]>) =>  this.onSuccess(res.body, res.headers),
         (res: HttpResponse<any>) => this.onError(res.body)
   );
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.currencies$ = data;
  }

  private onError(error) {
  }
  goToCurrencyDetail(id: string) {
    this._router.navigate(['/currency/' + id]);
  }

}
