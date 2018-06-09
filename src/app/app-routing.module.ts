import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyListComponent} from './Currency/currency-list/currency-list.component';
import {CurrencyDetailComponent} from './Currency/currency-detail/currency-detail.component';
import {CurrencyDetailGuard} from './Currency/currency-guard.service';
import {UserResolvePagingParams} from './Currency/currency.service';

const routes: Routes = [
  { path: '', component: CurrencyListComponent,
    resolve: {
      'pagingParams': UserResolvePagingParams
    }
  },
  { path: 'currency/:id', canActivate: [CurrencyDetailGuard], component: CurrencyDetailComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
