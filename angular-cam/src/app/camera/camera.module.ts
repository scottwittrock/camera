import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera/camera.component';
import { HttpClientModule } from '@angular/common/http';
import { PreviewBigComponent } from './preview-big/preview-big.component';

@NgModule({
    declarations: [CameraComponent, PreviewBigComponent],
    imports: [
        CommonModule,
        CameraRoutingModule,
        HttpClientModule
    ],
    exports: [
        CameraComponent,
        PreviewBigComponent
    ]
})
export class CameraModule { }
