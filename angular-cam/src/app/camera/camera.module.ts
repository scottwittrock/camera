import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera/camera.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [CameraComponent ],
    imports: [
        CommonModule,
        CameraRoutingModule,
        HttpClientModule
    ],
    exports: [
        CameraComponent
    ]
})
export class CameraModule { }
