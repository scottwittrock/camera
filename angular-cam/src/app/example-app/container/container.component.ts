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
    results = [];
    number = 0;
    statuses = []; 
    orientation;

    constructor() { }

    ngOnInit() {
    }

    onStart(e) {
        this.searching = true;
        var i = new Image()
        i.onload = ()=>{
          console.log({w: i.width, h: i.height})
          if(i.width > i.height){
              this.orientation = 'landscape';
          }else {
              this.orientation = 'portrait';
          }
          console.log(this.orientation);
        };
        i.src = e
        // TODO: get orientation of image and adjust accordingly
        this.userGeneratedImage = e;
        this.statuses.push("onstart ran")
        this.number++
    }
    renderTag(e) {
        if(this.tags.length < 8){
            this.tags.push(e);
        }
    }

    renderResult(e) {
        console.log(e);
        this.results.push(e);
        this.number++
    }

    onError(e){
        console.log(e);
        this.statuses.push("onError ran");
        this.number++

    }

    newSearch(){
        this.searching = false;
        this.tags = [];
        this.results = [];
        this.number = 0;
        this.statuses = [];
    }

}
