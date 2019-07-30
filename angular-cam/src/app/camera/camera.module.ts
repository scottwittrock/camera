import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera/camera.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [CameraComponent, ContainerComponent],
  imports: [
    CommonModule,
    CameraRoutingModule
  ], 
  exports: [ CameraComponent ]
})
export class CameraModule { }
