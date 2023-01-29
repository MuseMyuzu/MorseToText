//起動時
window.addEventListener("load", () => {
    Main.initialize();
})

class Main{
    static mode;

    static initialize(){
        //ループを開始
        Main.loop();
    }

    static loop(){
        switch(Main.mode){
            case "start":
                break;
            case "typing":
                break;
            case "finish":
                break;
        }
        
        if(Main.loopFlag){
            //1/60秒後にもう一度呼び出す
            requestAnimationFrame(Main.loop);
        }
    }
}

let startTime;
let endTime;
let duration = [];
let notPressingDuration;

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
        startTime = Date.now();
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 32) {
        endTime = Date.now();
        duration.push(endTime - startTime);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32 && startTime !== null) {
        notPressingDuration = startTime - endTime;
        duration.push(notPressingDuration);
    }
});
