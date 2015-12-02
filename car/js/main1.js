(function (e) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
    sizeHandler()
});
function trace(str) {
    console.log(str)
}
$(window).ready(function () {
    sizeHandler()
});
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = CANVAS_WIDTH, b = CANVAS_HEIGHT, d = window.innerWidth;
        multiplier = Math.min(window.innerHeight / b, d / a);
        a *= multiplier;
        b *= multiplier;
        $("#canvas").css("width", a + "px");
        $("#canvas").css("height", b + "px");
        $("#canvas").css("left", d / 2 - a / 2 + "px")
    }
}
var CANVAS_WIDTH = 768, CANVAS_HEIGHT = 1024, FPS_TIME = 1E3 / 24, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, NUM_LINES = 2, MAX_STARTING_SPEED, INCREASE_SPEED_UP_INTERVAL, INCREASE_SPEED, DISTANCE_AMONG_OBSTACLES, ACCELLERATION, SCORE_INCREASE, MALUS_SCORE, NUM_LIVES, BUT_LEFT_X = 80, BUT_LEFT_Y = 974, BUT_RIGHT_X = 700, BUT_RIGHT_Y = 974;

function CMain() {
    var a = 0, b, d = STATE_LOADING, e, h;
    this.initContainer = function () {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this._update);
        s_oSpriteLibrary = new CSpriteLibrary;
        e = new CPreloader;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), this._initSounds());
        this._loadImages()
    };
    this._initSounds = function () {
        createjs.Sound.initializeDefaultPlugins() &&
        (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.handleFileLoad, this)), createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack"), createjs.Sound.registerSound("./sounds/jump.mp3", "jump"), createjs.Sound.registerSound("./sounds/jump_end.mp3", "jump_end"), createjs.Sound.registerSound("./sounds/crash.mp3", "crash"), createjs.Sound.registerSound("./sounds/steer.mp3", "steer"), b += 5)
    };
    this.handleFileLoad = function () {
        a++;
        a === b && (e.unload(), !1 ===
        s_bMobile && (s_oSoundTrackSnd = createjs.Sound.play("soundtrack", {
            interrupt: createjs.Sound.INTERRUPT_ANY,
            loop: -1,
            volume: 0.5
        })), this.gotoMenu())
    };
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("road_tile",
            "./sprites/road_tile.jpg");
        s_oSpriteLibrary.addSprite("hero", "./sprites/hero.png");
        s_oSpriteLibrary.addSprite("but_right", "./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("but_left", "./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_jump", "./sprites/but_jump.png");
        s_oSpriteLibrary.addSprite("enemy", "./sprites/enemy.png");
        s_oSpriteLibrary.addSprite("life", "./sprites/life.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        b = s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function () {
        a++;
        e.refreshLoader(Math.floor(a / b * 100));
        a === b && (e.unload(), !1 === s_bMobile && (s_oSoundTrackSnd = createjs.Sound.play("soundtrack", {
            interrupt: createjs.Sound.INTERRUPT_ANY,
            loop: -1,
            volume: 0.5
        })), this.gotoMenu())
    };
    this._onAllImagesLoaded = function () {
    };
    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages()
    };
    this.gotoMenu = function () {
        new CMenu;
        d = STATE_MENU
    };
    this.gotoGame = function () {
        h = new CGame({
            max_start_speed: 8,
            increase_speed_up_interval: 20,
            increase_speed: 1,
            dist_obstacles: 550,
            accelleration: 0.24,
            score_increase: 1,
            malus_score: 0,
            lives: 3
        });
        d = STATE_GAME;
        $(s_oMain).trigger("game_start")
    };
    this.gotoHelp = function () {
        new CHelp;
        d = STATE_HELP
    };
    this._update = function (a) {
        var c = (new Date).getTime();
        s_iTimeElaps = c - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = c;
        1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
        s_fPrevForceFactor = s_fCurForceFactor = s_iTimeElaps / 33.33;
        d === STATE_GAME && h.update();
        s_oStage.update(a)
    };
    s_oMain = this;
    this.initContainer()
}


