class Converter{
    static isPC; //true: PC, false: phone
    static pressed; //押されているか
    static prev_pressed; //前フレームのpressed
    static startFrame; //押し始めたフレーム
    static endFrame;   //離したフレーム
    static duration = []; //押しているとき、押していないときの時間の記録
    static notPressingDuration; //押していない時間

    static initialize(){
        //PCかスマホか確認
        this.isPC = (window.ontouchstart === undefined) ? true : false;
        this.pressed = false;
        this.prev_pressed = false;
        this.startFrame = 0;
        this.endFrame = 0;

        if(this.isPC){
            //PCの場合（スペースキー）
            document.addEventListener("keydown", function(event) {
                if (event.code == "Space") {
                    Converter.pressed = true;
                }
            });
        
            document.addEventListener("keyup", function(event) {
                if (event.code == "Space") {
                    Converter.pressed = false;
                }
            });
        }else{
            //スマホの場合（タップ）
            document.addEventListener("touchstart", function(event) {
                Converter.pressed = true;
            });
        
            document.addEventListener("touchend", function(event) {
                Converter.pressed = false;
            });
        }
        
    }
    
    /**
     * スペースを押している時間、離している時間を記録する
     * @param {int} frame 
     */
    static recordDuration(frame){
        //押されたとき
        if(this.pressed === true && this.prev_pressed === false){
            this.startFrame = frame;
            this.notPressingDuration = this.startFrame - this.endFrame;
            this.duration.push(this.notPressingDuration);
            console.log(this.duration);
        }
        
        //離されたとき
        if(this.pressed === false && this.prev_pressed === true){
            this.endFrame = frame;
            this.duration.push(this.endFrame - this.startFrame);
            console.log(this.duration);
        }

        //pressedをprev_pressedへ
        this.prev_pressed = this.pressed;
    }
}