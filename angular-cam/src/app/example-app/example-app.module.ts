import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleAppRoutingModule } from './example-app-routing.module';
import { CameraModule } from '../camera/camera.module';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [
      ContainerComponent
  ],
  imports: [
    CommonModule,
    ExampleAppRoutingModule, 
    CameraModule
  ]
})
export class ExampleAppModule { }
