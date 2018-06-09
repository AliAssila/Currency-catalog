import {  PipeTransform, Pipe } from '@angular/core';
import {Currency} from '../shared/model/currency.model';

@Pipe({
    name: 'currencyFilter'
})
export class CurrencyFilterPipe implements PipeTransform {

  transform(items: any[], inputSearch: string, filterBy: string ): Currency[] {
    if (items && items.length) {
      return items.filter(item => {
        if (filterBy && filterBy === 'id' && item.id.toLowerCase().indexOf(inputSearch.toLowerCase()) === -1) {
          return false;
        }
        if (filterBy && filterBy === 'type' && item.attributes.currency_type.toLowerCase().indexOf(inputSearch.toLowerCase()) === -1) {
          return false;
        }
        if (filterBy && filterBy === 'code' && item.attributes.code.toLowerCase().indexOf(inputSearch.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    } else {
      return items;
    }
  }
}
