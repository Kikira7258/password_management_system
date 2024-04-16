import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items.component';

import { AddItemComponent } from './add-item/add-item.component';
import { ItemFormComponent } from './item-form/item-form.component';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'add-item', component: AddItemComponent},
  { path: 'item-form', component: ItemFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
