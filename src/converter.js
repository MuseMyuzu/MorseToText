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

    static alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " "];
    static morse = [[1, 3], [3, 1, 1, 1], [3, 1, 3, 1], [3, 1, 1], [1], [1, 1, 3, 1],
    [3, 3, 1], [1, 1, 1, 1], [1, 1], [1, 3, 3, 3], [3, 1, 3], [1, 3, 1, 1],
    [3, 3], [3, 1], [3, 3, 3], [1, 3, 3, 1], [3, 3, 1, 3], [1, 3, 1], [1, 1, 1],
    [3], [1, 1, 3], [1, 1, 1, 3], [1, 3, 3], [3, 1, 1, 3], [3, 1, 3, 3], [3, 3, 1, 1], "interword"];

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
            this.codesToText();
        }

        //pressedをprev_pressedへ
        this.prev_pressed = this.pressed;
    }

    static durationToCodes(){
        let code_threshold;
        this.codes = [];
        let chr_codes = []; //アルファベット一文字分のトンツーを入れる
        let th_min = 5;
        let th_max = 20;
        let words_th_ratio = 4;

        //ボタンを押す長さの平均値を、トンツーの境目とする
        let sum = 0;
        this.press_duration.forEach(element => {
            sum += element;
        });
        code_threshold = sum/this.press_duration.length;

        //code_thresholdの範囲を制限
        if(code_threshold < th_min) code_threshold = th_min;
        if(code_threshold > th_max) code_threshold = th_max;

        // codesに対し、アルファベットごとにトンツーを割り当て
        for(let i = 0; i<this.press_duration.length; i++){
            if(this.press_duration[i] > code_threshold){
                chr_codes.push(3);
            }else{
                chr_codes.push(1);
            }

            //アルファベット間で区切り
            //最後のトンツーだけは強制的にアルファベット一文字とする
            if(i >= this.press_duration.length - 1){
                this.codes.push(chr_codes);
                chr_codes = [];
            } else {
                let blank = this.release_duration[i+1];
                if(code_threshold < blank && blank < words_th_ratio*code_threshold){
                    this.codes.push(chr_codes);
                    chr_codes = [];
                }else if(words_th_ratio*code_threshold <= blank){
                    this.codes.push(chr_codes);
                    this.codes.push("interword");
                    chr_codes = [];
                }
            }
        }

        console.log("chr_codes = " + chr_codes);
        console.log("codes = " + this.codes);

        //press    0 1 2 3 4 5
        //release 0 1 2 3 4 5 6
    }

    static codesToText(){
        let text = "";

        this.codes.forEach(chr_codes => {
            let index = this.morse.findIndex((e) => e.toString() === chr_codes.toString());
            if(0 <= index && index <= this.alphabet.length - 1){
                text += this.alphabet[index];
            }else{
                text += "*";
            }
            
        });

        console.log("text = " + text);
    }
}