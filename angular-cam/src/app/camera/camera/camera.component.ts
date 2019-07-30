import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

    @ViewChild('lens') lens;
    @ViewChild('preview') preview;
    @ViewChild('canvas') canvas;

    @Output() onStart: EventEmitter<Blob> = new EventEmitter();
    @Output() onTag: EventEmitter<string> = new EventEmitter();
    @Output() onResults: EventEmitter<Array<any>> = new EventEmitter();

    sdk;
    results;

    constraints = {
        video: {
            width: { min: 1280 },
            height: { min: 720 },
            facingMode: 'enviroment'
        },
        audio: false
    }

    constructor() { }

    ngOnInit() {
        this.sdk = window["sdk"];
    }

    ngAfterViewInit() {
        console.log(this.preview);

        navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
            console.log("Getting stream");
            this.preview.nativeElement.srcObject = stream

        }).catch((err) => {
            console.error(err);
        });
    }

    image;

    snapPicture() {
        var context = this.canvas.nativeElement.getContext('2d');

        var cameraWidth = this.preview.nativeElement.offsetWidth;
        var cameraHeight = this.preview.nativeElement.offsetHeight;
        console.log({cameraWidth});
        console.log({cameraHeight});

        var lensWidth = this.lens.nativeElement.offsetWidth;
        var lensHeight = this.lens.nativeElement.offsetHeight;
        console.log({lensWidth});
        console.log({lensHeight});

        this.canvas.nativeElement.width = this.lens.nativeElement.offsetWidth;
        this.canvas.nativeElement.height = this.lens.nativeElement.offsetHeight;


        let sx = (cameraWidth - lensWidth) / 2;
        let height = this.preview.nativeElement.offsetHeight - this.lens.nativeElement.offsetWidth;

        console.log({sx});
        console.log({height});
        // Reference https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas
        context.drawImage(this.preview.nativeElement, 
            sx, height/2, lensWidth, this.preview.nativeElement.offsetHeight,
            0, 0, this.lens.nativeElement.offsetWidth, this.lens.nativeElement.offsetHeight
        );
        var dataURL = this.canvas.nativeElement.toDataURL();
        this.onStart.emit(dataURL);
        let callbacks = {
            onTaskUpdated: (message) => {
                if(message.tag){
                    this.onTag.emit(message.tag);
                }
            },
            onTaskCompleted: (message, errors) => {
                this.results = message.results[0].items;
                if(message[0].items){
                    this.onResults.emit(message[0].items)
                }
            },
            afterImageProcessed: (message) => {
                console.log(message);
            }
        }

        let blob = this.dataURLtoBlob(dataURL);
        // this.sdk.executeWorkflow(blob, 'qhw9xqfE6DjFKMMk9UywdB', callbacks, false)
    }

    // Function source https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
    dataURLtoBlob(dataURL) {
        var arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
}

