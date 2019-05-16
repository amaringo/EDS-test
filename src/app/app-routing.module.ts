import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PwnedlistComponent } from './pwnedlist/pwnedlist.component';
import { PwnedsearchComponent } from './pwnedsearch/pwnedsearch.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: 'pwnedlist',
    component: PwnedlistComponent
  },
  {
    path: 'pwnedsearch',
    component: PwnedsearchComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
