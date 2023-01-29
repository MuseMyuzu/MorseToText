class Converter{
    static startTime;
    static endTime;
    static duration = [];
    static notPressingDuration;

    static initialize(){
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
    }

    //スマホかPCかで変更する
    static getEventTypeStart(){
        return (window.ontouchstart === undefined) ? "mousedown" : "touchstart";
    }

    static getEventTypeEnd(){
        return (window.ontouchstart === undefined) ? "mouseup" : "touchend";
    }
    
}