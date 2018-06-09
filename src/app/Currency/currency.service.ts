import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from './../app.constants';
import {Currency} from '../shared/model/currency.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class CurrencyService {
  private resourceUrl = SERVER_API_URL ;

  constructor(private http: HttpClient) {}
  /**
   * Find all the elements
   * @returns gets the list of currency found
   */
  public findAll(req?: any):  Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl + 'currencies', {params: req, observe: 'response'})
      .map((res: HttpResponse<any>) => this.convertArrayResponse(res));
  }
  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  find(id: any): Observable<HttpResponse<Currency>> {
    return this.http.get<any>(`${this.resourceUrl + 'currencies'}/${id}`, { observe: 'response'})
      .map((res: HttpResponse<any>) => this.convertResponse(res));
  }
  private convertArrayResponse(res: HttpResponse<any>): HttpResponse<Currency[]> {
    const jsonResponse: Currency[] = res.body.data;
    let headers = new HttpHeaders();
    const total = res.body.meta.total;
    headers = headers.append('X-Total-Count', total);
    const body: Currency[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ headers: headers, body: body});
  }
  /**
   * Convert a returned JSON object to Blog.
   */
  private convertItemFromServer(data: any): Currency {
    const copy: Currency = Object.assign({}, data);
    return copy;
  }

  private convertResponse(res: HttpResponse<any>): HttpResponse<Currency> {
    const body: Currency = this.convertItemFromServer(res.body.data);
    return res.clone({body});
  }
}
@Injectable()
export class UserResolvePagingParams implements Resolve<any> {

  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const page = route.queryParams['page[number]'] ? route.queryParams['page[number]'] : '1';
    return {
      page: this.parsePage(page),
    };
  }
  parsePage(page: string): number {
    return parseInt(page, 10);
  }
}
