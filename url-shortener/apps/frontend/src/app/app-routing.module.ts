import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLinkFormComponent } from './add-link-form/add-link-form.component';

const routes: Routes = [
  {
    path: '',
    component: AddLinkFormComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
