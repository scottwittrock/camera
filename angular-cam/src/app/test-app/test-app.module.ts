import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestAppRoutingModule } from './test-app-routing.module';
import { ContainerComponent } from './container/container.component';
import { CameraModule } from '../camera/camera.module';

@NgModule({
    declarations: [
        ContainerComponent
    ],
    imports: [
        CommonModule,
        TestAppRoutingModule, 
        CameraModule
    ]
})
export class TestAppModule { }
