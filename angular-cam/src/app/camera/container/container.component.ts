import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

    tags = [];
    userGeneratedImage;
    searching;

    constructor() { }

    ngOnInit() {
    }

    onStart(e) {
        this.searching = true;
        this.userGeneratedImage = e;
    }
    renderTag(e) {
        this.tags.push(e.tag);
    }

    renderResults() {

    }

}
