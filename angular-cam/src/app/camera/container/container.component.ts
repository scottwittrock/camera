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
    results;
    number = 0;
    statuses = []

    constructor() { }

    ngOnInit() {
    }

    onStart(e) {
        this.searching = true;
        this.userGeneratedImage = e;
        this.statuses.push("onstart ran")
        this.number++
    }
    renderTag(e) {
        this.tags.push(e);
        this.number++
        this.statuses.push(e)
    }

    renderResults(e) {
        console.log(e);
        this.statuses.push("renderResults ran");
        this.number++
        this.results = e;
    }

    onError(e){
        console.log(e);
        this.statuses.push("onError ran");
        this.number++

    }

    newSearch(){
        this.searching = false;
        this.tags = [];
        this.number = 0;
        this.statuses = [];
    }

}
