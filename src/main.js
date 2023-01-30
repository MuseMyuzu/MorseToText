//起動時
window.addEventListener("load", () => {
    initialize();
    loop();
})

let mode;
let frame;

function initialize(){
    Converter.initialize();
    mode = "start";
    frame = 0;
}

function loop(){
    switch(mode){
        case "start":
            mode = "typing";
            break;
        case "typing":
            Converter.recordDuration(frame);
            break;
        case "finish":
            break;
    }
    frame++;

    //1/60秒後にもう一度呼び出す
    requestAnimationFrame(loop);
}


