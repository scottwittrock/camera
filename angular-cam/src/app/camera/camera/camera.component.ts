import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    @Output() onResult: EventEmitter<any> = new EventEmitter();
    @Output() onError: EventEmitter<Array<any>> = new EventEmitter();

    sdk;
    results;
    fallback;

    constraints = {
        video: {
            width: { min: 720 },
            height: { min: 720 },
            facingMode: 'enviroment'
        },
        audio: false
    }

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.sdk = window["sdk"];
    }

    ngAfterViewInit() {
        console.log(this.preview);

        navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
            console.log("Getting stream");
            this.preview.nativeElement.srcObject = stream

        }).catch((err) => {
            console.log("There was an issue using the camera falling back to image upload");
            this.fallback = true;
            console.error(err);
        });
    }

    image;

    snapPicture() {
        var previewWidth = this.preview.nativeElement.offsetWidth;
        var previewHeight = this.preview.nativeElement.offsetHeight;
        console.log({ previewHeight });
        console.log({ previewWidth });
        var lensWidth = this.lens.nativeElement.offsetWidth;
        var lensHeight = this.lens.nativeElement.offsetHeight;
        console.log({ lensWidth });
        console.log({ lensHeight });

        let orientation;
        if (lensWidth < previewHeight) {
            orientation = 'portrait';
        } else if (lensWidth > previewHeight) {
            orientation = 'landscape';
        } else {
            orientation = 'square';
        }
        console.log(orientation);

        let sx, sw, dx, dw, sy, sh, dy, dh;
        let canvasWidth, canvasHeight;

        if (orientation === 'portrait') {

        }


        if (lensHeight > 720) {
            canvasHeight = 720;
            canvasWidth = canvasHeight / lensHeight * lensWidth;
            console.log({ previewHeight })
            console.log({ previewWidth })
            console.log({ lensHeight })
            console.log({ lensWidth })
            console.log({ canvasHeight })
            console.log({ canvasWidth })

            // lensHeight 900 
            // lensWidth 500

            // canvasHeight 720 
            // X 400

            //     900     720
            // X * ---  == --- * 500
            //     500      900

            // sx = (previewWidth - lensWidth) / 2;
            sx = 600 - 160;
            // sw = previewWidth - sx;
            sw = 400;
            // dx = 0;
            dx = 0;
            // dw = canvasWidth + (previewWidth - canvasWidth) / 2;
            dw = 400


            // sy = (previewHeight - lensHeight) / 2;
            sy = 90;
            // sh = previewHeight - sy;
            sh = 720;
            // dy = 0;
            dy = 0
            // dh = lensHeight + sy;
            dh = 720

        } else if (lensWidth > 1280) {
            canvasWidth = 1280;
            canvasHeight = 1280 / lensWidth * lensHeight;
            sx = (previewWidth - lensWidth) / 2;
            sw = previewWidth - sx;
            dx = 0;
            dw = lensWidth + sx;

            sy = (previewHeight - lensHeight) / 2;
            sh = previewHeight - sy;
            dy = 0;
            dh = lensHeight + sy;
        } else {
            canvasWidth = lensWidth;
            canvasHeight = lensHeight;
            sx = (previewWidth - lensWidth) / 2;
            sw = previewWidth - sx;
            dx = 0;
            dw = lensWidth + sx;

            sy = (previewHeight - lensHeight) / 2;
            sh = previewHeight - sy;
            dy = 0;
            dh = lensHeight + sy;
        }

        // if()

        console.log({ sx });
        console.log({ sy });
        console.log({ sw });
        console.log({ sh });
        console.log({ dx });
        console.log({ dy });
        console.log({ dw });
        console.log({ dh });
        // console.log({sy});
        // Reference https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas


        this.canvas.nativeElement.height = canvasHeight;
        this.canvas.nativeElement.width = canvasWidth;
        var context = this.canvas.nativeElement.getContext('2d');

        context.drawImage(this.preview.nativeElement,
            sx, sy,
            sw, sh,
            dx, dy,
            dw, dh
        );
        var dataURL = this.canvas.nativeElement.toDataURL();
        this.onStart.emit(dataURL);
        let blob = this.dataURLtoBlob(dataURL);

        console.log(dataURL);
        this.callClarify(dataURL)
        // this.callForge(blob);
    }

    callForge(blob) {
        let callbacks = {
            onTaskUpdated: (message) => {
                console.log(message)
                if (message.progress && message.progress.tag) {
                    this.onTag.emit(message.progress.tag);
                }
            },
            onTaskCompleted: (message, errors) => {
                console.log(message)
                console.log(errors);
                console.log(message.results[0].items);
                if (message.results && message.results[0] && message.results[0].items) {
                    let results = message.results[0].items;
                    console.log(results);
                    this.onResults.emit(results)
                } else {
                    this.onError.emit();
                }
            },
            afterImageProcessed: (message) => {
                console.log(message)
            }
        }
        this.sdk.executeWorkflow(blob, 'qhw9xqfE6DjFKMMk9UywdB', callbacks, false)

    }

    callClarify(dataURL) {
        var base64 = dataURL.split(",")[1];
        console.log(base64);
        const url = 'https://api.clarifai.com/v2/workflows/slyce-test-workflow/results';
        const imageUrl = 'https://i.ibb.co/1XnZ7bL/IMG-2567.jpg';
        // let imageUrl = 'https://i.imgur.com/16Wb7Kb.jpg';

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Key 24345437f2b54a71a2f32c6ddd3f5847'
            })
        };
        this.http.post(url, {
            inputs: [
                {
                    data: {
                        image: {
                            base64: base64
                        }
                    }
                }
            ]
        },
            httpOptions).subscribe((res: any) => {
                console.log(res);
                res.results[0].outputs[0].data.concepts.forEach(concept => {
                    console.log(concept);
                    let item = {
                        title: concept.name,
                        confidence: concept.value.toFixed(2)
                    }
                    this.onResult.emit(item);
                });

                res.results[0].outputs[1].data.concepts.forEach(concept => {
                    console.log(concept);
                    this.onTag.emit(concept.name)
                });
            });
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

