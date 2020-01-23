import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    loadChildren: () => import('./example-app/example-app.module').then(m => m.ExampleAppModule)
},{
    path: 'test',
    loadChildren: () => import('./test-app/test-app.module').then(m => m.TestAppModule)
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
