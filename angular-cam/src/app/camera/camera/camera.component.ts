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
    orientation;

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
        setInterval(() => {
            this.orientation = this.getOrientation();
        }, 500)
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

    getOrientation() {
        var cameraWidth = this.preview.nativeElement.srcObject.getVideoTracks()[0].getSettings().width;
        var cameraHeight = this.preview.nativeElement.srcObject.getVideoTracks()[0].getSettings().height;
        var lensWidth = this.lens.nativeElement.offsetWidth;
        var lensHeight = this.lens.nativeElement.offsetHeight;
        let orientation:
            'portrait-heightUnder-widthUnder' |
            'landscape-heightUnder-widthUnder' |
            'square-heightUnder-widthUnder' |

            'portrait-heightOver-widthUnder' |
            'landscape-heightOver-widthUnder' |
            'square-heightOver-widthUnder' |
            'landscape-heightOver-widthOver' |

            'landscape-heightUnder-widthOver' |

            
            // Not possible..
            'square-heightOver-widthOver' | // Maybe possible on big device
            'square-heightUnder-widthOver' |
            'portrait-heightUnder-widthOver' |
            'portrait-heightOver-widthOver' // Really long phone

        if (lensWidth < lensHeight) {
            // console.log("Portrait");
            if (lensHeight < cameraHeight) {
                // console.log("height under");
                if (lensWidth < cameraWidth) {
                    // console.log("width under");
                    orientation = 'portrait-heightUnder-widthUnder';
                } else {
                    // console.log('width over');
                    orientation = 'portrait-heightUnder-widthOver'
                }
            } else {
                // console.log("height over");
                if (lensWidth < cameraWidth) {
                    // console.log("width under");
                    orientation = 'portrait-heightOver-widthUnder';
                } else {
                    // console.log('width over');
                    orientation = 'portrait-heightOver-widthOver'
                }
            }
        } else if (lensWidth > lensHeight) {
            // console.log("Landscape");
            if (lensHeight < cameraHeight) {
                // console.log("height under");
                if (lensWidth < cameraWidth) {
                    // console.log("width under");
                    orientation = 'landscape-heightUnder-widthUnder';
                } else {
                    // console.log('width over');
                    orientation = 'landscape-heightUnder-widthOver'
                }
            } else {
                // console.log("height over");
                if (lensWidth < cameraWidth) {
                    // console.log("width under");
                    orientation = 'landscape-heightOver-widthUnder';
                } else {
                    // console.log('width over');
                    orientation = 'landscape-heightOver-widthOver'
                }
            }
        } else {
            // console.log("Square");
            if (lensHeight < cameraHeight) {
                // console.log("height under");
                if (lensWidth < cameraWidth) {
                    // console.log("width under");
                    orientation = 'square-heightUnder-widthUnder';
                } else {
                    // console.log('width over');
                    orientation = 'square-heightUnder-widthOver'
                }
            } else {
                // console.log("height over");
                if (lensWidth < cameraWidth) {
                    // console.log("width under");
                    orientation = 'square-heightOver-widthUnder';
                } else {
                    // console.log('width over');
                    orientation = 'square-heightOver-widthOver'
                }
            }
        }
        console.log(orientation);
        return orientation;
    }

    snapPicture() {
        var previewWidth = this.preview.nativeElement.offsetWidth;
        var previewHeight = this.preview.nativeElement.offsetHeight;
        var cameraWidth = this.preview.nativeElement.srcObject.getVideoTracks()[0].getSettings().width;
        var cameraHeight = this.preview.nativeElement.srcObject.getVideoTracks()[0].getSettings().height;
        var lensWidth = this.lens.nativeElement.offsetWidth;
        var lensHeight = this.lens.nativeElement.offsetHeight;
        console.log({ previewHeight });
        console.log({ previewWidth });
        console.log({ cameraWidth });
        console.log({ cameraHeight });
        console.log({ lensWidth });
        console.log({ lensHeight });

        let orientation = this.getOrientation();
        let sx, sw, dx, dw, sy, sh, dy, dh;
        let canvasWidth, canvasHeight;

        switch (orientation) {
            case 'portrait-heightUnder-widthUnder':
            case 'square-heightUnder-widthUnder':
            case 'landscape-heightUnder-widthUnder':

                console.log("WORKING");
                console.log('portrait-heightUnder-widthUnder');
                console.log('square-heightUnder-widthUnder');
                console.log('landscape-heightUnder-widthUnder');
                canvasHeight = lensHeight;
                canvasWidth = lensWidth;
                sx = (cameraWidth / previewWidth) * (previewWidth - lensWidth) / 2;
                sw = (cameraWidth / previewWidth) * (lensWidth);
                dx = 0;
                dw = canvasWidth;

                sy = (cameraHeight / previewHeight) * (previewHeight - lensHeight) / 2;
                sh = lensHeight
                dy = 0;
                dh = canvasHeight;
                break;
            case 'portrait-heightOver-widthUnder':
            case 'landscape-heightOver-widthUnder':
            case 'square-heightOver-widthUnder':
            case 'landscape-heightOver-widthOver':
                console.log("WORKING");
                console.log('portrait-heightOver-widthUnder');
                console.log('landscape-heightOver-widthUnder');
                console.log('square-heightOver-widthUnder');
                console.log('landscape-heightOver-widthOver');
                canvasHeight = lensHeight;
                canvasWidth = lensWidth;
                sx = (cameraWidth / previewWidth) * (previewWidth - lensWidth) / 2;
                sw = (cameraWidth / previewWidth) * (lensWidth);
                dx = 0;
                dw = canvasWidth;

                sy = 0;
                sh = cameraHeight
                dy = 0;
                dh = canvasHeight;
                break;
            case 'landscape-heightUnder-widthOver':
                console.log("ALMOST WORKING");
                console.log('landscape-heightUnder-widthOver');

                canvasHeight = lensHeight;
                canvasWidth = lensWidth;
                sx = (cameraWidth / previewWidth) * (previewWidth - lensWidth) / 2;
                sw = (cameraWidth / previewWidth) * (lensWidth);
                dx = 0;
                dw = canvasWidth;

                sy = (cameraHeight / previewHeight) * (previewHeight - lensHeight) / 2;
                sh = lensHeight
                dy = 0;
                dh = canvasHeight;
                break;
        }

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
        this.callClarify(dataURL);
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
                        confidence: parseInt(concept.value.toFixed(2)) * 100
                    }
                    if(item.confidence > 1){
                        this.onResult.emit(item);
                    }
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

