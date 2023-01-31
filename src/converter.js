class Converter{
    static isPC; //true: PC, false: phone
    static pressed; //押されているか
    static prev_pressed; //前フレームのpressed
    static startFrame; //押し始めたフレーム
    static endFrame;   //離したフレーム
    static press_duration = []; //押しているときの時間の記録
    static release_duration = []; //押していないときの時間の記録
    static notPressingDuration; //押していない時間
    static codes = []; //トンツー、単語間などを記録

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
            this.release_duration.push(this.notPressingDuration);
            console.log(this.release_duration);
        }
        
        //離されたとき
        if(this.pressed === false && this.prev_pressed === true){
            this.endFrame = frame;
            this.press_duration.push(this.endFrame - this.startFrame);
            console.log(this.press_duration);

            this.durationToCodes();
        }

        //pressedをprev_pressedへ
        this.prev_pressed = this.pressed;
    }

    static durationToCodes(){
        let code_threshold;
        this.codes = [];

        //ボタンを押す長さの中央値を、トンツーの境目とする
        const mid = Math.floor(this.press_duration.length / 2);
        const nums = [...this.press_duration].sort((a, b) => a - b);
        code_threshold = this.press_duration.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;

        for(let i = 0; i<this.press_duration.length; i++){
            if(this.press_duration[i] > code_threshold){
                this.codes.push(3);
            }else{
                this.codes.push(1);
            }
        }

        console.log("codes = " + this.codes);

    }
}