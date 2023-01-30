class Converter{
    static isPC = false;
    static pressed = null;
    static startFrame;
    static endFrame;
    static duration = [];
    static notPressingDuration;

    static initialize(){
        this.isPC = (window.ontouchstart === undefined) ? true : false;

        if(this.isPC){
            //PCの場合（スペースキー）
            document.addEventListener("keydown", function(event) {
                if (event.code == "Space") {
                    this.pressed = true;
                }
            });
        
            document.addEventListener("keyup", function(event) {
                if (event.code == "Space") {
                    this.pressed = false;
                }
            });
        }else{
            //スマホの場合（タップ）
            document.addEventListener("touchstart", function(event) {
                this.pressed = true;
            });
        
            document.addEventListener("touchend", function(event) {
                this.pressed = false;
            });
        }
        
    }
    
    /**
     * スペースを押している時間、離している時間を記録する
     * @param {int} frame 
     */
    static recordDuration(frame){
        if(this.pressed == true){
            console.log("b");
            if(this.startFrame !== null){
                this.notPressingDuration = this.startFrame - this.endFrame;
                this.duration.push(this.notPressingDuration);
            }
            this.startFrame = frame;
            console.log(this.duration);
        }else if(this.pressed == false){
            console.log("a");
            this.endFrame = frame;
            this.duration.push(this.endFrame - this.startFrame);
        }
    }
}