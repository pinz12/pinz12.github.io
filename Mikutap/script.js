var isClicked = false;

var audioPreLoad;
var backtrack;

var backtrackName = 'media/backtrackBPM140.mp3';
var BPM =280;
var timePerBeat = 60/BPM;
var ishoverAudioEnded = true;
var isThisBeatAlreadyNotBePlayed = true;
var isThisBeatAlreadyNotBePlayed_CLICK = true;
var backtrackTimer1;
var backtrackTimer2;

var clickTimes = 0;

var colorContainer = ["#824d5c","#dd4e7c","#ee3970","#7cc7d8","#c0e1e0",
                        "#079c8f","#169fb0","#544b53","#018191",
                        "#80c1c1","#c0e0df","#f2f2f2","#d09a96","#83cedf",
                        "#3d3e3e","#14a799","#dbe4ea","#292021","#ebc2b3"
];
var back = document.getElementById("backgroundContainer");
back.style.backgroundColor = "#88CCCC";
var info = document.getElementById("about_con");
info.style.zIndex = "-6";

var isInSetTimeNoClick = true;
var isTipsNotGenerated = true;
var gameBackButton = document.getElementById("gameBack");
gameBackButton.textContent = "<";
var timing;
var isFeedbackOn = true;
var isBacktrackOn = true;
var isBacktrackPaused = false;

function generateStartFrame(){
    var con = document.getElementById("start_con");
    if(window.height > window.width){
        con.style.height = "50vw";
        con.style.width = "50vw";
    }
    else{
        con.style.height = "50vh";
        con.style.width = "50vh";
    }
}

function startGame(){
    var startCon = document.getElementById("start_con");
    startCon.style.animation = "startTransparent 0.2s"
    startCon.addEventListener('animationend',function(e){
        if(e.animationName === "startTransparent"){
            startCon.style.animation = "";
            startCon.style.zIndex = "-5";
        }
    });
    loadMedia();
    if(isBacktrackOn){
        backtrack.play();
    }
    generateButtons();
    window.onresize = checkWindowSizeAndChangeLayOut;
    generateBackButtonAndText();
    timing = setInterval(function(){
        if((isInSetTimeNoClick == true) & isTipsNotGenerated == true){
            generateBackButtonAndText();
            isTipsNotGenerated = false;
        }
        isInSetTimeNoClick = true;
    },500);
    
}

function generateAboutFrame(){
    var info = document.getElementById("about_con");
    info.style.zIndex = "2";
    var back = document.getElementById("backgroundContainer");
    var infoBack = document.getElementById("infoBack");
    infoBack.style.backgroundColor = rgb2hex(back.style.backgroundColor);
    infoBack.style.filter = "brightness(1.5)"
    var infoFrame = document.getElementById("information");
    infoFrame.style.backgroundColor = rgb2hex(back.style.backgroundColor);
    infoFrame.style.filter = "brightness(1)"
    info.style.animation = "startTransparentBack 0.2s";
    info.addEventListener('animationend',function(e){
        if(e.animationName === "startTransparentBack"){
            info.animation = "";
        }
    });
}

function backToStartFrame(){
    var info = document.getElementById("about_con");
    info.style.animation = "startTransparent 0.2s";
    info.addEventListener('animationend',function(e){
        if(e.animationName === "startTransparent"){
            info.animation = "";
            info.style.zIndex = "-6";
        }
    });
}

function generateBackButtonAndText(){
    var tipCon = document.getElementById("tip_con");
    tipCon.style.animation = "tipsWindowTurnOut 1s";
    tipCon.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOut"){
            tipCon.style.animation = "";
        }
    });
    tipCon.style.zIndex = "-1";

    var back = document.getElementById("gameBack");
    back.style.animation = "tipsWindowTurnOut 1s";
    back.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOut"){
            back.style.animation = "";
        }
    });
    back.style.zIndex = "1";

    var feedback = document.getElementById("feedbackid");
    feedback.style.animation = "tipsWindowTurnOut 1s";
    feedback.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOut"){
            feedback.style.animation = "";
        }
    });
    feedback.style.zIndex = "1";

    var backtrack = document.getElementById("backtrackid");
    backtrack.style.animation = "tipsWindowTurnOut 1s";
    backtrack.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOut"){
            backtrack.style.animation = "";
        }
    });
    backtrack.style.zIndex = "1";
}

function hiddenBackButtonAndText(){
    isTipsNotGenerated = true;
    var tipCon = document.getElementById("tip_con");
    tipCon.style.animation = "tipsWindowTurnOff 1s";
    tipCon.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOff"){
            tipCon.style.animation = "";
        }
    });
    tipCon.style.zIndex = "-7";

    var back = document.getElementById("gameBack");
    back.style.animation = "tipsWindowTurnOff 1s";
    back.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOff"){
            back.style.animation = "";
        }
    });
    back.style.zIndex = "-7";

    var feedback = document.getElementById("feedbackid");
    feedback.style.animation = "tipsWindowTurnOff 1s";
    feedback.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOff"){
            feedback.style.animation = "";
        }
    });
    feedback.style.zIndex = "-7";

    var backtrack = document.getElementById("backtrackid");
    backtrack.style.animation = "tipsWindowTurnOff 1s";
    backtrack.addEventListener('animationend',function(e){
        if(e.animationName === "tipsWindowTurnOff"){
            backtrack.style.animation = "";
        }
    });
    backtrack.style.zIndex = "-7";
}

function fromGameBackToStart(){
    hiddenBackButtonAndText();
    clearInterval(backtrackTimer1);
    clearInterval(backtrackTimer2);
    isBacktrackPaused = true;
    backtrack.pause();
    var startCon = document.getElementById("start_con");
    startCon.style.animation = "startTransparent 0.2s"
    startCon.addEventListener('animationend',function(e){
        if(e.animationName === "startTransparent"){
            startCon.style.animation = "";
            startCon.style.zIndex = "1";
        }
    });
    clearInterval(timing);
}

function changeFeedback(){
    isFeedbackOn = !isFeedbackOn;
    var tag = document.getElementById("feedbackid");
    if(isFeedbackOn){
        tag.textContent = "ON";
    }
    else{
        tag.textContent = "OFF";
    }
}

function changeBacktrack(){
    isBacktrackOn = !isBacktrackOn;
    var tag = document.getElementById("backtrackid");
    if(isBacktrackOn){
        tag.textContent = "ON";
        backtrack.volume = 1;
        if(isBacktrackPaused){
            backtrack.play();
            isBacktrackPaused = false;
        }
    }
    else{
        tag.textContent = "OFF";
        backtrack.volume = 0;
    }
}

function checkWindowSizeAndChangeLayOut(){
    var myContainer = document.getElementById("my_con");
    if(window.innerHeight > window.innerWidth){
        myContainer.style.gridTemplateColumns = "repeat(4, 25%)";
        myContainer.style.gridTemplateRows =  "repeat(8, 12.5%)";
    }
    else{
        myContainer.style.gridTemplateColumns = "repeat(8, 12.5%)";
        myContainer.style.gridTemplateRows =  "repeat(4, 25%)";
    }
    generateButtons();
}

function generateButtons(){
    var myContainer = document.getElementById("my_con");
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 8; j++){
            var button = document.createElement("button"); 
            button.setAttribute("class", "tapButton");
            button.setAttribute("style", "background: transparent");
            //button.setAttribute("style", "opacity: 0.7");
            button.setAttribute("id",(i*8+j).toString());
            //button.textContent = i.toString()+j.toString();
            
            button.addEventListener('mousedown', function handleMouseOver() {
                isInSetTimeNoClick = false;
                isClicked = true;
                hiddenBackButtonAndText();
                if(isFeedbackOn){
                    this.style.background = "white";
                    this.style.opacity = "70%"
                    this.style.animation = "clickTransparent 0.5s";
                }
                var buttonIndex = this.id;
                var buttonJ = buttonIndex%8;
                var buttonI = parseInt(buttonIndex/8);

                var isInTheBeat = false;
                if(backtrack.currentTime%timePerBeat < 0.8*timePerBeat | backtrack.currentTime%timePerBeat > 0.8*timePerBeat){
                    isInTheBeat = true;
                }

                if(isThisBeatAlreadyNotBePlayed_CLICK & isInTheBeat){  
                    isThisBeatAlreadyNotBePlayed_CLICK = false;
                    isInTheBeat = false;
                    audioPreLoad[buttonI][buttonJ].currentTime = 0;
                    audioPreLoad[buttonI][buttonJ].play();

                    switchBackground();
                    generateRandomButtonAnimation();
                }
            });

            button.addEventListener('mouseover', function handleMouseOver() {
                if(isClicked){
                    isInSetTimeNoClick = false;
                    hiddenBackButtonAndText();
                    if(isFeedbackOn){
                        this.style.background = "white";
                        this.style.opacity = "70%"
                        this.style.animation = "clickTransparent 0.5s";
                    }
                    var buttonIndex = this.id;
                    var buttonJ = buttonIndex%8;
                    var buttonI = parseInt(buttonIndex/8);

                    var isInTheBeat = false;
                    if(backtrack.currentTime%timePerBeat < 0.8*timePerBeat | backtrack.currentTime%timePerBeat > 0.8*timePerBeat){
                        isInTheBeat = true;
                    }

                    if(isThisBeatAlreadyNotBePlayed & isInTheBeat){
                        isThisBeatAlreadyNotBePlayed = false;
                        isInTheBeat = false;
                        audioPreLoad[buttonI][buttonJ].play();

                        switchBackground();
                        generateRandomButtonAnimation()
                    }
                }
            });

            button.addEventListener('mouseup', function () {
                isClicked = false;
            });

            button.addEventListener('animationend', function () {
                this.style.background = "transparent";
                this.style.animation = "";
            });

            
            
            myContainer.appendChild(button);
        }
    }
}

function loadMedia(){
    backtrack = document.createElement('audio');
    backtrack.src= backtrackName;

    backtrack.addEventListener('timeupdate', function(){
        var buffer = 0.27;
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0;
            this.play();
        }}, false);
    
        
    backtrack.addEventListener('play',function(){
        backtrackTimer1 = setInterval(function(){
            isThisBeatAlreadyNotBePlayed = true;
        },timePerBeat*1000);
        backtrackTimer2 = setInterval(function(){
            isThisBeatAlreadyNotBePlayed_CLICK = true;
        },timePerBeat*1000);
    });
        
    window.addEventListener('focus',function(){
        backtrack.play();
    });

    window.addEventListener('blur',function(){
        backtrack.pause();
    });
    
    
    audioPreLoad = [];
    for(var i = 0; i < 4; i++){
        var row = [];
        for(var j = 0; j < 8; j++){
            var audioSrc = "media/" + i.toString() + j.toString() + ".mp3";
            var audioClip = document.createElement('audio');
            audioClip.src = audioSrc;
            row.push(audioClip);
        }
        audioPreLoad.push(row);
    }
    
}

function generateBackground(type){
    var cube = document.createElement('div');
    var backCon = document.getElementById("back_con");
    cube.style.width = "100vw";
    cube.style.height = "100vh"

    var newColor = getRandomColor();

    var back = document.getElementById("backgroundContainer");
    var currentColor =   rgb2hex(back.style.backgroundColor);
    cube.style.background = currentColor;
    back.style.backgroundColor = newColor;
    
    

    cube.style.position = "absolute";
    cube.style.animation = type.toString()+ " 0.5s ease-in-out";
    cube.addEventListener("animationend",function(){
        this.remove();
    });
    backCon.appendChild(cube);
}

function getRandomColor(){
    var back = document.getElementById("backgroundContainer");
    var currentColor =   rgb2hex(back.style.backgroundColor);
    var colorIndex = Math.floor(Math.random()*colorContainer.length);
    var newColor = colorContainer[colorIndex];
    while(newColor == currentColor){
        var colorIndex = Math.floor(Math.random()*colorContainer.length);
        var newColor = colorContainer[colorIndex];
    }
    return newColor; 
    
}

function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function switchBackground(){
    clickTimes++;

    if(clickTimes > 10){
        var probability = Math.floor(Math.random()*5);
        if(probability == 0){
            clickTimes = 0;
            var a = Math.floor(Math.random()*5);
            switch(a){
                case 0:
                    generateBackground("horizontalSlideLeftToRight");
                    break;
                case 1:
                    generateBackground("horizontalSlideRightToLeft");
                    break;
                case 2:
                    generateBackground("horizontalSlideOutsideToCenter");
                    break;
                case 3:
                    generateBackground("verticalSlideUpToDown");
                    break;
                case 4:
                    generateBackground("verticalSlideDownToUp");
                    break;
                case 5:
                    generateBackground("verticalSlideOutsideToCenter");
                    break;
            }
        }
    }
}

function generateAniAreaWithRandomSize(aniArea){
    aniArea.style.backgroundColor = "transparent";
    aniArea.style.position = "absolute";
    aniArea.style.top ="0";
    aniArea.style.bottom = "0";
    aniArea.style.left ="0";
    aniArea.style.right = "0";
    aniArea.style.margin = "auto";

    var aniAreaSize;
    var a = Math.floor(Math.random()*4);
    var einheit;
    if(window.innerHeight > window.innerWidth){
        einheit = "vw";
    }
    else{
        einheit = "vh";
    }
    switch(a){
        case 0:
            aniArea.style.width = "80" + einheit;
            aniArea.style.height = "80" + einheit;
            aniAreaSize = "80";
            break;
        case 1:
            aniArea.style.width = "70" + einheit;
            aniArea.style.height = "70" + einheit;
            aniAreaSize = "70";
            break;
        case 2:
            aniArea.style.width = "60" + einheit;
            aniArea.style.height = "60" + einheit;
            aniAreaSize = "60";
            break;
        case 3:
            aniArea.style.width = "50" + einheit;
            aniArea.style.height = "50" + einheit;
            aniAreaSize = "50";
            break;
    }
    return aniAreaSize;
}

function generateRandomButtonAnimation(){
    var animationProbability = Math.floor(Math.random()*5);
    switch(animationProbability){
        case 0:
            generateButtonAnimation_circleSector();
            break;
        case 1:
            generateButtonAnimation_cubeSlide();
            break;
        case 2:
            generateButtonAnimation_crossRotate();
            break;
        case 3:
            generateButtonAnimation_shuttle();
            break;
        case 4:
            generateButtonAnimation_bubble();
            break;
    }
    //generateButtonAnimation_cubeJump();
}

function generateButtonAnimation_cubeSlide(){
    var aniArea = document.createElement('div');
    var aniCon = document.getElementById("ani_con");
    var aniAreaSize = generateAniAreaWithRandomSize(aniArea);
    var newColor = getRandomColor();
    

    aniArea.style.display = "grid";
    var a = Math.floor(Math.random()*16);
    var elementsNumber;
    var isRow;
    switch(a){
        case 0:
            aniArea.style.gridTemplateRows = "repeat(3, 33.3%)";
            elementsNumber = 3;
            isRow = true;
            break;
        case 1:
            aniArea.style.gridTemplateRows = "repeat(5, 20%)";
            elementsNumber = 5;
            isRow = true;
            break;
        case 2:
            aniArea.style.gridTemplateRows = "repeat(7, 14.29%)";
            elementsNumber = 7;
            isRow = true;
            break;
        case 3:
            aniArea.style.gridTemplateRows = "repeat(9, 11.11%)";
            elementsNumber = 9;
            isRow = true;
            break;
        case 4:
            aniArea.style.gridTemplateRows = "repeat(11, 9.09%)";
            elementsNumber = 11;
            isRow = true;
            break;
        case 4:
            aniArea.style.gridTemplateRows = "repeat(13, 7.69%)";
            elementsNumber = 13;
            isRow = true;
            break;
        case 5:
            aniArea.style.gridTemplateRows = "repeat(15, 6.67%)";
            elementsNumber = 15;
            isRow = true;
            break;
        case 7:
            aniArea.style.gridTemplateRows = "repeat(17, 5.88%)";
            elementsNumber = 17;
            isRow = true;
            break;
        case 8:
            aniArea.style.gridTemplateColumns = "repeat(3, 33.3%)";
            elementsNumber = 3;
            isRow = false;
            break;
        case 9:
            aniArea.style.gridTemplateColumns = "repeat(5, 20%)";
            elementsNumber = 5;
            isRow = false;
            break;
        case 10:
            aniArea.style.gridTemplateColumns = "repeat(7, 14.29%)";
            elementsNumber = 7;
            isRow = false;
            break;
        case 11:
            aniArea.style.gridTemplateColumns = "repeat(9, 11.11%)";
            elementsNumber = 9;
            isRow = false;
            break;
        case 12:
            aniArea.style.gridTemplateColumns = "repeat(11, 9.09%)";
            elementsNumber = 11;
            isRow = false;
            break;
        case 13:
            aniArea.style.gridTemplateColumns = "repeat(13, 7.69%)";
            elementsNumber = 13;
            isRow = false;
            break;
        case 14:
            aniArea.style.gridTemplateColumns = "repeat(15, 6.67%)";
            elementsNumber = 15;
            isRow = false;
            break;
        case 15:
            aniArea.style.gridTemplateColumns = "repeat(17, 5.88%)";
            elementsNumber = 17;
            isRow = false;
            break;
    }
    var isLeftToRight =true;
    if(Math.round(Math.random()) == 1){
        isLeftToRight = false;
    }
    for(var i = 0; i < elementsNumber; i++){
        var bar = document.createElement('div');
        bar.style.width = "100%";
        bar.style.height = "100%";
        if(isRow){
            if(isLeftToRight){
                bar.style.animation = "horizontalSlideLeftToRight_Small_" + aniAreaSize.toString() +  " 0.5s ease-in-out";
            }
            else{
                bar.style.animation = "horizontalSlideRightToLeft_Small_" + aniAreaSize.toString() +  " 0.5s ease-in-out";
            }
        }
        else{
            if(isLeftToRight){
                bar.style.animation = "verticalSlideLeftToRight_Small_" + aniAreaSize.toString() +  " 0.5s ease-in-out";
            }
            else{
                bar.style.animation = "verticalSlideRightToLeft_Small_" + aniAreaSize.toString() +  " 0.5s ease-in-out";
            }
        }
        if(i%2 == 0){
            bar.style.background = newColor;
        }
        else{
            bar.style.background = "transparent";
        }
        aniArea.appendChild(bar);
    }
    aniArea.addEventListener("animationend",function(){
        this.remove();
    });
    aniCon.appendChild(aniArea);
}

function generateButtonAnimation_circleSector(){
    var aniArea = document.createElement('div');
    var aniCon = document.getElementById("ani_con");
    var aniAreaSize = generateAniAreaWithRandomSize(aniArea);
    var newColor = getRandomColor();

    var pie = document.createElement('div');
    pie.style.position = "absolute";
    pie.style.width = "100%";
    pie.style.height = "100%";
    pie.style.borderRadius = "50%";
    pie.style.background = newColor;

    var degree_probability = Math.floor(Math.random()*4);
    switch(degree_probability){
        case 0:
            pie.style.transform = "rotate(45deg)";
            break;
        case 1:
            pie.style.transform = "rotate(135deg)";
            break;
        case 2:
            pie.style.transform = "rotate(225deg)";
            break;
        case 3:
            pie.style.transform = "rotate(315deg)";
            break;
    }

    

    var isBackwards = "";
    var isBackwards_probability = Math.round(Math.random());
    if(isBackwards_probability == 1){
        isBackwards = "_backwards";
    }
    

    pie.style.animation = "circleSector_1_4" + isBackwards + " 0.1s linear" ;
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_1_4" + isBackwards){
            this.style.animation = "circleSector_2_4" + isBackwards + " 0.1s linear";
        }
    });
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_2_4" + isBackwards){
            this.style.animation = "circleSector_3_4" + isBackwards + " 0.1s linear";
        }
    });
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_3_4" + isBackwards){
            this.style.animation = "circleSector_4_4" + isBackwards + " 0.1s linear";
        }
    });
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_4_4" + isBackwards){
            this.style.animation = "circleSector_5_4" + isBackwards + " 0.1s linear";
        }
    });
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_5_4" + isBackwards){
            this.style.animation = "circleSector_6_4" + isBackwards + " 0.1s linear";
        }
    });
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_6_4" + isBackwards){
            this.style.animation = "circleSector_7_4" + isBackwards + " 0.1s linear";
        }
    });
    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_7_4" + isBackwards){
            this.style.animation = "circleSector_8_4" + isBackwards + " 0.1s linear";
        }
    });
    //pie.style.clipPath = "polygon(0 0, 50% 50%, 0% 0%)";

    pie.addEventListener('animationend', function(e){
        if(e.animationName === "circleSector_8_4" + isBackwards){
            this.remove();
        }
    });
    
    

    aniArea.appendChild(pie);
    aniCon.appendChild(aniArea);
}

function generateButtonAnimation_crossRotate(){
    var aniCon = document.getElementById("ani_con");
    var newColor = getRandomColor();
    var aniArea = document.createElement('div');
    generateAniAreaWithRandomSize(aniArea);
    //aniArea.style.backgroundColor = "red";

    var probability1 = Math.floor(Math.random()*4);
    switch(probability1){
        case 0:
            aniArea.style.top ="";
            aniArea.style.bottom = "0";
            aniArea.style.left ="0";
            aniArea.style.right = "0";
            break;
        case 1:
            aniArea.style.top ="0";
            aniArea.style.bottom = "";
            aniArea.style.left ="0";
            aniArea.style.right = "0";
            break;
        case 2:
            aniArea.style.top ="0";
            aniArea.style.bottom = "0";
            aniArea.style.left ="";
            aniArea.style.right = "0";
            break;
        case 3:
            aniArea.style.top ="0";
            aniArea.style.bottom = "0";
            aniArea.style.left ="0";
            aniArea.style.right = "";
            break;
    }

    var probability2 = Math.floor(Math.random()*8);
    switch(probability2){
        case 0:
            aniArea.style.rotate = "90deg";
            break;
        case 1:
            aniArea.style.rotate = "180deg";
            break;
        case 2:
            aniArea.style.rotate = "270deg";
            break;
        case 3:
            break;
        case 4:
            aniArea.style.rotate = "45deg";
            break;
        case 5:
            aniArea.style.rotate = "135deg";
            break;
        case 6:
            aniArea.style.rotate = "225deg";
            break;
        case 7:
            aniArea.style.rotate = "315deg";
            break;
    }

    var bar1 = document.createElement('div');
    bar1.style.width = "10%";
    bar1.style.height = "100%";
    bar1.style.backgroundColor = newColor;
    bar1.style.position = "absolute";
    bar1.style.left = "45%";
    bar1.style.top = "0%";

    var bar2 = document.createElement('div');
    bar2.style.width = "10%";
    bar2.style.height = "100%";
    bar2.style.backgroundColor = newColor;
    bar2.style.position = "absolute";
    bar2.style.left = "45%";
    bar2.style.top = "0%";
    bar2.style.rotate = "90deg"

    bar1.style.animation = "crossRotate_rotate1 .5s cubic-bezier(.26,.62,.86,1.43),crossRotate_translate_on .5s";

    bar2.style.animation = "crossRotate_rotate2 .5s cubic-bezier(.26,.62,.86,1.43),_on .5s";

    bar1.addEventListener("animationend",function(e){
        if(e.animationName === "crossRotate_translate_on"){
            setTimeout(function(){
                bar1.style.animation = "crossRotate_translate_off .5s"
            }, 150);
        }
        if(e.animationName === "crossRotate_translate_off"){
            bar1.remove();
        }
    });
    bar2.addEventListener("animationend",function(e){
        if(e.animationName === "crossRotate_rotate2"){
            setTimeout(function(){
                bar2.style.animation = "crossRotate_translate_off .5s"
            }, 150);
        }
        if(e.animationName === "crossRotate_translate_off"){
            bar2.remove();
        }
    });

    aniArea.appendChild(bar1);
    aniArea.appendChild(bar2);
    aniCon.appendChild(aniArea);
}

function generateButtonAnimation_shuttle(){
    var aniCon = document.getElementById("ani_con");
    var newColor = getRandomColor();
    var aniArea = document.createElement('div');
    generateAniAreaWithRandomSize(aniArea);
    //aniArea.style.backgroundColor = "red";

    var probability1 = Math.floor(Math.random()*4);
    switch(probability1){
        case 0:
            aniArea.style.top ="";
            aniArea.style.bottom = "0";
            aniArea.style.left ="0";
            aniArea.style.right = "0";
            break;
        case 1:
            aniArea.style.top ="0";
            aniArea.style.bottom = "";
            aniArea.style.left ="0";
            aniArea.style.right = "0";
            break;
        case 2:
            aniArea.style.top ="0";
            aniArea.style.bottom = "0";
            aniArea.style.left ="";
            aniArea.style.right = "0";
            break;
        case 3:
            aniArea.style.top ="0";
            aniArea.style.bottom = "0";
            aniArea.style.left ="0";
            aniArea.style.right = "";
            break;
    }

    var probability2 = Math.floor(Math.random()*4);
    switch(probability2){
        case 0:
            aniArea.style.rotate = "90deg";
            break;
        case 1:
            aniArea.style.rotate = "180deg";
            break;
        case 2:
            aniArea.style.rotate = "270deg";
            break;
        case 3:
            break;
    }

    var newColor = getRandomColor();
    var div1 = document.createElement('div');
    div1.style.backgroundColor = newColor;
    div1.style.position = "absolute";
    div1.style.width = "100%";
    div1.style.height = "100%";

    var probability3 = Math.floor(Math.random()*3);
    switch(probability3){
        case 0:
            div1.style.clipPath = "polygon(0 100%, 5% 100%,50% 18.4%,95% 100%, 100% 100%, 50% 13.4%)"
            break;
        case 1:
            div1.style.clipPath = "polygon(0 0, 0 100%, 100% 100%, 100% 0, 95% 0, 95% 95%, 5% 95%, 5% 5%)";
            break;
        case 2:
            div1.style.clipPath = "polygon(0 41%, 20% 100%, 81% 100%, 100% 41%, 50% 0, 43% 2%, 97% 41%, 79% 98%, 22% 98%, 3% 41%)";
            break;
    }

    div1.style.animation = "shuttle 0.5s linear";
    div1.addEventListener("animationend",function(){
        div1.remove();
    });



    aniArea.appendChild(div1);
    aniCon.appendChild(aniArea);
}

function generateButtonAnimation_bubble(){
    var aniCon = document.getElementById("ani_con");
    var newColor = getRandomColor();
    var aniArea = document.createElement('div');
    aniArea.style.position = "absolute";
    aniArea.style.width = "100%";
    aniArea.style.height = "100%"


    for(var i = 1; i <= 8; i++){
        aniArea.appendChild(generateBubble(newColor));
    }

    aniArea.style.animation = "bubble 1s";

    aniArea.addEventListener("animationend",function(){
        setTimeout(
            function(){
                aniArea.remove();
            },150
        );
    });

    
    aniCon.appendChild(aniArea);
}

function generateBubble(newColor){
    var bubble = document.createElement('div');
    bubble.style.width = "10vh";
    bubble.style.height = "10vh";
    bubble.style.borderRadius = "50%";
    bubble.style.backgroundColor = newColor;
    bubble.style.position = "absolute";
    // bubble.style.border =  "10px solid #000";
    // bubble.style.clipPath = "rect(0,100px,100px,50px)";
    //bubble.style.mask = "linear-gradient(#000, transparent)";
    bubble.style.webkitMask = "radial-gradient(transparent 60%, black 30%)";

    var top = Math.floor(Math.random()*100);
    var button = Math.floor(Math.random()*100);
    var left = Math.floor(Math.random()*100);
    var right = Math.floor(Math.random()*100);
    bubble.style.top = top.toString() + "%";
    bubble.style.button = button.toString() + "%";
    bubble.style.left = left.toString() + "%";
    bubble.style.right = right.toString() + "%";
    return bubble;
}

function generateCube(newColor){
    var bubble = document.createElement('div');
    bubble.style.width = "10vh";
    bubble.style.height = "10vh";
    //bubble.style.borderRadius = "50%";
    bubble.style.backgroundColor = newColor;
    bubble.style.position = "absolute";
    // bubble.style.border =  "10px solid #000";
    // bubble.style.clipPath = "rect(0,100px,100px,50px)";
    //bubble.style.mask = "linear-gradient(#000, transparent)";

    //var mask = document.getElementById("mask");
    //bubble.style.maskImage = "url(mask1.svg)";

    //bubble.style.webkitMaskImage = "url(mask1.svg#mask)";

    var top = Math.floor(Math.random()*100);
    var button = Math.floor(Math.random()*100);
    var left = Math.floor(Math.random()*100);
    var right = Math.floor(Math.random()*100);
    bubble.style.top = top.toString() + "%";
    bubble.style.button = button.toString() + "%";
    bubble.style.left = left.toString() + "%";
    bubble.style.right = right.toString() + "%";
    return bubble;
}

function generateButtonAnimation_cubeJump(){
    var aniCon = document.getElementById("ani_con");
    var newColor = getRandomColor();
    var aniArea = document.createElement('div');
    aniArea.style.position = "absolute";
    aniArea.style.width = "100%";
    aniArea.style.height = "100%"


    for(var i = 1; i <= 8; i++){
        aniArea.appendChild(generateCube(newColor));
    }

    aniArea.style.animation = "bubble 1s";

    aniArea.addEventListener("animationend",function(){
        setTimeout(
            function(){
                aniArea.remove();
            },150
        );
    });

    
    aniCon.appendChild(aniArea);
}