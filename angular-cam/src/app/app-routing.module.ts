import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    loadChildren: './example-app/example-app.module#ExampleAppModule'
},{
    path: 'test',
    loadChildren: './test-app/test-app.module#TestAppModule'
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
