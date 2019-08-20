import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
    userGeneratedImage;

    constructor() { }

    ngOnInit() {
    }

    onStart(e) {
        this.userGeneratedImage = e;
    }
}
