function CGfxButton(a, b, d, e) {
    var h, f, c;
    this._init = function (a, b, d, e) {
        h = [];
        f = [];
        c = new createjs.Bitmap(d);
        c.x = a;
        c.y = b;
        c.regX = d.width / 2;
        c.regY = d.height / 2;
        e && s_oStage.addChild(c);
        this._initListener()
    };
    this.unload = function () {
        c.off("mousedown");
        c.off("pressup")
    };
    this.setVisible = function (a) {
        c.visible = a
    };
    this._initListener = function () {
        oParent = this;
        c.on("mousedown", this.buttonDown);
        c.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, c, b) {
        h[a] = c;
        f[a] = b
    };
    this.buttonRelease = function () {
        c.scaleX =
            1;
        c.scaleY = 1;
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(f[ON_MOUSE_UP])
    };
    this.buttonDown = function () {
        c.scaleX = 0.9;
        c.scaleY = 0.9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN])
    };
    this.setPosition = function (a, b) {
        c.x = a;
        c.y = b
    };
    this.setX = function (a) {
        c.x = a
    };
    this.setY = function (a) {
        c.y = a
    };
    this.getButtonImage = function () {
        return c
    };
    this.getX = function () {
        return c.x
    };
    this.getY = function () {
        return c.y
    };
    this._init(a, b, d, e);
    return this
}
function CGame(a) {
    function b(a) {
        h = !1
    }

    function d(a) {
        if (!1 !== e && !h)switch (a || (a = window.event), h = !0, a.keyCode) {
            case 37:
                s_oGame.shiftLeft();
                break;
            case 39:
                s_oGame.shiftRight();
                break;
            case 32:
                s_oGame.jump()
        }
    }

    var e = !1, h = !1, f, c, g = 0, p = 0, l, q, v = 0, B, x, k, m, s, n, r, y, z, w, t, u, C, D, A, E;
    this._init = function () {
        var a = new createjs.Shape;
        a.graphics.beginFill("#5B89A1").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(a);
        B = new createjs.Bitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(B);
        this._initLineObjects();
        this._initObstacles();
        a = new createjs.Shape;
        a.graphics.beginFill("rgba(0,0,0,1)").drawRect(0, 0, CANVAS_WIDTH, 100);
        s_oStage.addChild(a);
        a = new createjs.Shape;
        a.graphics.beginFill("rgba(0,0,0,1)").drawRect(0, 924, CANVAS_WIDTH, 100);
        s_oStage.addChild(a);
        a = s_oSpriteLibrary.getSprite("but_exit");
        x = new CGfxButton(CANVAS_WIDTH - a.width / 2 - 10, 10 + a.height / 2, a, !0);
        x.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === s_bMobile && (document.onkeydown = d, document.onkeyup = b, E = new CToggle(CANVAS_WIDTH - 150, 10 + a.height / 2,
            s_oSpriteLibrary.getSprite("audio_icon"), s_bAudioActive), E.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this));
        l = NUM_LIVES;
        q = 1;
        a = s_oSpriteLibrary.getSprite("hero");
        n = new CHero(k[q], a);
        a = s_oSpriteLibrary.getSprite("life");
        a = new createjs.Bitmap(a);
        a.x = 10;
        a.y = 15;
        s_oStage.addChild(a);
        t = new createjs.Text(TEXT_SCORE + ": 0", "bold 50px Arial", "#ffffff");
        t.x = CANVAS_WIDTH / 2;
        t.y = 30;
        t.textAlign = "center";
        s_oStage.addChild(t);
        u = new createjs.Text("X" + l, "bold 50px Arial", "#ffffff");
        u.x = 130;
        u.y = 30;
        u.textAlign =
            "center";
        s_oStage.addChild(u);
        r = new createjs.Shape;
        r.graphics.beginFill("red").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        r.alpha = 0.1;
        r.visible = !1;
        s_oStage.addChild(r);
        a = s_oSpriteLibrary.getSprite("but_left");
        y = new CGfxButton(BUT_LEFT_X, BUT_LEFT_Y, a, !0);
        y.addEventListener(ON_MOUSE_DOWN, this._onReleaseLeft, this);
        a = s_oSpriteLibrary.getSprite("but_right");
        z = new CGfxButton(BUT_RIGHT_X, BUT_RIGHT_Y, a, !0);
        z.addEventListener(ON_MOUSE_DOWN, this._onReleaseRight, this);
        a = s_oSpriteLibrary.getSprite("but_jump");
        w = new CTextButton(CANVAS_WIDTH / 2, BUT_RIGHT_Y, a, TEXT_JUMP, "Arial", "#383838", 40);
        w.addEventListener(ON_MOUSE_DOWN, this._onReleaseJump, this);
        w.getButtonImage().visible = !1;
        A = new CHelpPanel(s_oSpriteLibrary.getSprite("bg_help"));
        f = 0;
        c = MAX_STARTING_SPEED
    };
    this.unload = function () {
        x.unload();
        x = null;
        y.unload();
        y = null;
        z.unload();
        z = null;
        s_oStage.removeAllChildren()
    };
    this.shiftLeft = function () {
        this._onReleaseLeft()
    };
    this.shiftRight = function () {
        this._onReleaseRight()
    };
    this.jump = function () {
        !1 !== w.getButtonImage().visible &&
        this._onReleaseJump()
    };
    this._onExitHelp = function () {
        A.unload();
        s_oStage.removeChild(A);
        e = !0
    };
    this._initLineObjects = function () {
        k = [128, 384, 640];
        var a = s_oSpriteLibrary.getSprite("road_tile");
        D = new CScrollingBg(a)
    };
    this._initObstacles = function () {
        m = [];
        m[0] = [k[0]];
        m[1] = [k[1]];
        m[2] = [k[2]];
        m[3] = [k[0], k[1]];
        m[4] = [k[1], k[2]];
        m[5] = [k[2], k[0]];
        m[6] = [k[0], k[1]];
        m[7] = [k[1], k[2]];
        m[8] = [k[2], k[0]];
        m[9] = [k[2], k[0]];
        m[10] = [k[0], k[1]];
        m[11] = [k[1], k[2]];
        m[12] = [k[2], k[0]];
        m[13] = [k[0], k[1]];
        m[14] = [k[1], k[2]];
        m[15] = [k[0],
            k[1], k[2]];
        m = shuffle(m);
        s = [];
        for (var a = s_oSpriteLibrary.getSprite("enemy"), c = new createjs.SpriteSheet({
            images: [a],
            frames: [[0, 0, 98, 200, 0, 49, 100], [98, 0, 98, 200, 0, 49, 100], [196, 0, 98, 200, 0, 49, 100], [294, 0, 96, 200, 0, 48, 100], [388, 0, 96, 200, 0, 48, 100], [484, 0, 96, 200, 0, 48, 100], [580, 0, 108, 168, 0, 54, 84], [688, 0, 108, 168, 0, 54, 84], [796, 0, 108, 168, 0, 54, 84], [904, 0, 80, 200, 0, 40, 100], [984, 0, 80, 200, 0, 40, 100], [1064, 0, 80, 200, 0, 40, 100]]
        }), b = 0, f = -a.height; f > -(8 * CANVAS_HEIGHT);) {
            for (var d = 0; d < m[b].length; d++) {
                var g = new CObstacle(m[b][d],
                    f, c);
                s.push(g)
            }
            f -= a.height + DISTANCE_AMONG_OBSTACLES;
            b++
        }
    };
    this._increaseScore = function () {
        g += SCORE_INCREASE;
        t.text = TEXT_SCORE + ": " + g;
        p += SCORE_INCREASE;
        p > INCREASE_SPEED_UP_INTERVAL && (p = 0, c += INCREASE_SPEED)
    };
    this._lifeLost = function () {
        r.visible = !0;
        var a = this;
        createjs.Tween.get(r).to({alpha: 0.6}, 400).call(function () {
            a._resetHurt()
        });
        g -= MALUS_SCORE;
        0 > g && (g = 0);
        t.text = TEXT_SCORE + ": " + g;
        !1 === s_bMobile && createjs.Sound.play("crash");
        l--;
        u.text = "X" + l;
        0 === l && this._gameOver()
    };
    this._resetHurt = function () {
        r.visible = !1;
        r.alpha = 0.5
    };
    this._gameOver = function () {
        e = !1;
        var a = s_oSpriteLibrary.getSprite("msg_box");
        C = new CEndPanel(a);
        C.show(g)
    };
    this._onReleaseLeft = function () {
        0 === q || n.isJumping() || (q--, n.move(k[q]), !1 === s_bMobile && createjs.Sound.play("steer"))
    };
    this._onReleaseRight = function () {
        q === NUM_LINES || n.isJumping() || (q++, n.move(k[q], 1 - 0.2 * (NUM_LINES - q)), !1 === s_bMobile && createjs.Sound.play("steer"))
    };
    this._onReleaseJump = function () {
        n.isJumping() || (n.jump(f), !1 === s_bMobile && createjs.Sound.play("jump"))
    };
    this._onExit =
        function () {
            this.unload();
            s_oMain.gotoMenu();
            $(s_oMain).trigger("restart")
        };
    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._checkCollision = function (a) {
        var c = n.getPos(), b = a.getPos();
        a = a.getSquareRadius();
        return (b.x - c.x) * (b.x - c.x) + (b.y - c.y) * (b.y - c.y) < a ? !0 : !1
    };
    this._updateMove = function () {
        f += ACCELLERATION;
        f > c && (f = c, w.getButtonImage().visible = !0);
        n.update();
        D.update(Math.floor(f))
    };
    this.updateObstacles = function () {
        for (var a = 0; a < s.length; a++)s[a].update(f *
            s_fCurForceFactor), !1 === n.isJumping() && this._checkCollision(s[a]) ? (s[a].reset(), this._lifeLost()) : s[a].getFront() > CANVAS_HEIGHT && s[a].reset()
    };
    this.update = function () {
        !1 !== e && (this._updateMove(), this.updateObstacles(), v += s_iTimeElaps, 1E3 <= v && (v -= 1E3, this._increaseScore()))
    };
    s_oGame = this;
    MAX_STARTING_SPEED = a.max_start_speed;
    INCREASE_SPEED_UP_INTERVAL = a.increase_speed_up_interval;
    INCREASE_SPEED = a.increase_speed;
    DISTANCE_AMONG_OBSTACLES = a.dist_obstacles;
    ACCELLERATION = a.accelleration;
    SCORE_INCREASE = a.score_increase;
    MALUS_SCORE = a.malus_score;
    NUM_LIVES = a.lives;
    this._init()
}
var s_oGame;
function CEndPanel(a) {
    var b, d, e, h, f, c;
    this._init = function (a) {
        b = new createjs.Bitmap(a);
        b.x = 0;
        b.y = 0;
        f = new createjs.Text("", "bold 80px Arial", "#000");
        f.x = CANVAS_WIDTH / 2 + 2;
        f.y = CANVAS_HEIGHT / 2 - 98;
        f.textAlign = "center";
        h = new createjs.Text("", "bold 80px Arial", "#ffffff");
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 - 100;
        h.textAlign = "center";
        d = new createjs.Text("", "bold 50px Arial", "#000");
        d.x = CANVAS_WIDTH / 2 + 2;
        d.y = CANVAS_HEIGHT / 2 + 22;
        d.textAlign = "center";
        e = new createjs.Text("", "bold 50px Arial", "#ffffff");
        e.x = CANVAS_WIDTH /
            2;
        e.y = CANVAS_HEIGHT / 2 + 20;
        e.textAlign = "center";
        c = new createjs.Container;
        c.alpha = 0;
        c.visible = !1;
        c.addChild(b, d, e, f, h);
        s_oStage.addChild(c)
    };
    this._initListener = function () {
        c.on("mousedown", this._onExit)
    };
    this.show = function (a) {
        f.text = TEXT_GAME_OVER;
        h.text = TEXT_GAME_OVER;
        d.text = TEXT_SCORE + ": " + a;
        e.text = TEXT_SCORE + ": " + a;
        c.visible = !0;
        var b = this;
        createjs.Tween.get(c).to({alpha: 1}, 500).call(function () {
            b._initListener()
        });
        $(s_oMain).trigger("save_score", a)
    };
    this._onExit = function () {
        c.off("mousedown");
        s_oGame._onExit()
    };
    this._init(a)
}
function CSpriteLibrary() {
    var a, b, d, e, h, f;
    this.init = function (c, g, p) {
        d = b = 0;
        e = c;
        h = g;
        f = p;
        a = {}
    };
    this.addSprite = function (c, f) {
        a.hasOwnProperty(c) || (a[c] = {szPath: f, oSprite: new Image}, b++)
    };
    this.getSprite = function (c) {
        return a.hasOwnProperty(c) ? a[c].oSprite : null
    };
    this._onSpritesLoaded = function () {
        h.call(f)
    };
    this._onSpriteLoaded = function () {
        e.call(f);
        ++d == b && this._onSpritesLoaded()
    };
    this.loadSprites = function () {
        for (var c in a)a[c].oSprite.oSpriteLibrary = this, a[c].oSprite.onload = function () {
            this.oSpriteLibrary._onSpriteLoaded()
        }, a[c].oSprite.src =
            a[c].szPath
    };
    this.getNumSprites = function () {
        return b
    }
}
var CANVAS_WIDTH = 768, CANVAS_HEIGHT = 1024, FPS_TIME = 1E3 / 24, STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, NUM_LINES = 2, MAX_STARTING_SPEED, INCREASE_SPEED_UP_INTERVAL, INCREASE_SPEED, DISTANCE_AMONG_OBSTACLES, ACCELLERATION, SCORE_INCREASE, MALUS_SCORE, NUM_LIVES, BUT_LEFT_X = 80, BUT_LEFT_Y = 974, BUT_RIGHT_X = 700, BUT_RIGHT_Y = 974;
function CToggle(a, b, d, e) {
    var h, f, c, g;
    this._init = function (a, b, d, e) {
        f = [];
        c = [];
        d = new createjs.SpriteSheet({
            images: [d],
            frames: {width: d.width / 2, height: d.height, regX: d.width / 2 / 2, regY: d.height / 2},
            animations: {state_false: [0, 1], state_true: [1, 2]}
        });
        h = e;
        g = new createjs.Sprite(d, "state_" + h);
        g.x = a;
        g.y = b;
        g.stop();
        s_oStage.addChild(g);
        this._initListener()
    };
    this.unload = function () {
        g.off("mousedown", this.buttonDown);
        g.off("pressup", this.buttonRelease);
        s_oStage.removeChild(g)
    };
    this._initListener = function () {
        g.on("mousedown",
            this.buttonDown);
        g.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, b, d) {
        f[a] = b;
        c[a] = d
    };
    this.buttonRelease = function () {
        g.scaleX = 1;
        g.scaleY = 1;
        h = !h;
        g.gotoAndStop("state_" + h);
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(c[ON_MOUSE_UP], h)
    };
    this.buttonDown = function () {
        g.scaleX = 0.9;
        g.scaleY = 0.9;
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(c[ON_MOUSE_DOWN])
    };
    this._init(a, b, d, e)
}
(function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
    sizeHandler()
});
function trace(a) {
    console.log(a)
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
        var multiplier = Math.min(window.innerHeight / b, d / a);
        a *= multiplier;
        b *= multiplier;
        $("#canvas").css("width", a + "px");
        $("#canvas").css("height", b + "px");
        $("#canvas").css("left", d / 2 - a / 2 + "px")
    }
}
function randomFloatBetween(a, b, d) {
    "undefined" === typeof d && (d = 2);
    return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(d))
}
function shuffle(a) {
    for (var b = a.length, d, e; 0 !== b;)e = Math.floor(Math.random() * b), b -= 1, d = a[b], a[b] = a[e], a[e] = d;
    return a
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function (a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    }, onTouchStart: function (a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    }, onTouchMove: function (a) {
        this.moved = !0
    }, onTouchEnd: function (a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0);
            a.dispatchEvent(b)
        }
    }
};
function CTextButton(a, b, d, e, h, f, c) {
    var g, p, l;
    this._init = function (a, b, c, d, f, e, h) {
        g = [];
        p = [];
        var n = new createjs.Bitmap(c);
        Math.ceil(h / 20);
        d = new createjs.Text(d, "bold " + h + "px " + f, e);
        d.textAlign = "center";
        f = d.getBounds();
        d.x = c.width / 2;
        d.y = (c.height - f.height) / 2;
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        l.regX = c.width / 2;
        l.regY = c.height / 2;
        l.addChild(n, d);
        s_oStage.addChild(l);
        this._initListener()
    };
    this.unload = function () {
        l.off("mousedown");
        l.off("pressup")
    };
    this.setVisible = function (a) {
        l.visible = a
    };
    this._initListener =
        function () {
            oParent = this;
            l.on("mousedown", this.buttonDown);
            l.on("pressup", this.buttonRelease)
        };
    this.addEventListener = function (a, c, b) {
        g[a] = c;
        p[a] = b
    };
    this.buttonRelease = function () {
        l.scaleX = 1;
        l.scaleY = 1;
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(p[ON_MOUSE_UP])
    };
    this.buttonDown = function () {
        l.scaleX = 0.9;
        l.scaleY = 0.9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN])
    };
    this.setPosition = function (a, c) {
        l.x = a;
        l.y = c
    };
    this.setX = function (a) {
        l.x = a
    };
    this.setY = function (a) {
        l.y = a
    };
    this.getButtonImage = function () {
        return l
    };
    this.getX = function () {
        return l.x
    };
    this.getY = function () {
        return l.y
    };
    this._init(a, b, d, e, h, f, c);
    return this
}
function CScrollingBg(a) {
    var b, d, e;
    this._init = function (a) {
        e = a;
        d = [];
        for (var f = -a.height; f < CANVAS_HEIGHT;) {
            var c = new createjs.Bitmap(a);
            c.y = f;
            f += a.height;
            d.push(c);
            s_oStage.addChild(c)
        }
        b = 0
    };
    this.update = function (a) {
        for (var f = 0; f < d.length; f++)d[f].y > CANVAS_HEIGHT && (d[f].y = d[b].y - e.height, b = f), d[f].y += a
    };
    this._init(a)
}
function CPreloader() {
    var a;
    this._init = function () {
        this._onAllPreloaderImagesLoaded()
    };
    this._onPreloaderImagesLoaded = function () {
    };
    this._onAllPreloaderImagesLoaded = function () {
        a = new createjs.Text("", "bold 42px Arial center", "#ffffff");
        a.x = CANVAS_WIDTH / 2 - 40;
        a.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(a)
    };
    this.unload = function () {
        s_oStage.removeChild(a)
    };
    this.refreshLoader = function (b) {
        a.text = b + "%"
    };
    this._init()
}
function CObstacle(a, b, d) {
    var e, h, f, c, g;
    this._init = function (a, b, d) {
        h = -1;
        c = d;
        d = Math.floor(11 * Math.random() + 1);
        g = new createjs.Sprite(c, d);
        g.stop();
        g.x = a;
        g.y = b;
        s_oStage.addChild(g);
        e = 100;
        f = 37500
    };
    this.reset = function () {
        g.y -= 8 * CANVAS_HEIGHT + DISTANCE_AMONG_OBSTACLES
    };
    this.getPos = function () {
        return {x: g.x, y: g.y}
    };
    this.getY = function () {
        return g.y
    };
    this.getFront = function () {
        return g.y - e
    };
    this.getSquareRadius = function () {
        return f
    };
    this.isActive = function () {
        return !0
    };
    this.update = function (a) {
        g.y += a + h
    };
    this._init(a,
        b, d)
}
function CMenu() {
    var a, b, d;
    this._init = function () {
        a = new createjs.Bitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(a);
        var e = s_oSpriteLibrary.getSprite("but_play");
        b = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 150, e, TEXT_PLAY, "Arial", "#000000", 42);
        b.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        !1 === s_bMobile && (_oAudioToggle = new CToggle(CANVAS_WIDTH - 60, 60, s_oSpriteLibrary.getSprite("audio_icon"), s_bAudioActive), _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this));
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(d);
        createjs.Tween.get(d).to({alpha: 0}, 1E3).call(function () {
            d.visible = !1
        })
    };
    this.unload = function () {
        b.unload();
        b = null;
        s_oStage.removeChild(a);
        a = null
    };
    this._onButPlayRelease = function () {
        this.unload();
        s_oMain.gotoGame()
    };
    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._init()
}
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
var s_fPrevForceFactor = 1, s_fCurForceFactor = 0, s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 0, s_oSoundTrackSnd, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary;
TEXT_SCORE = "SCORE";
TEXT_GAME_OVER = "GAME OVER";
TEXT_JUMP = "JUMP";
TEXT_PLAY = "PLAY";
TEXT_HELP1 = "AVOID THE OPPOSING \nCARS CLICKING THE ARROWS\n OR THE JUMP BUTTON";
TEXT_HELP2 = "TRY TO DRIVE\n AS LONG AS POSSIBLE";
function CHero(a, b) {
    var d = !1, e;
    this._init = function (a, b) {
        e = new createjs.Bitmap(b);
        e.regX = b.width / 2;
        e.regY = b.height / 2;
        e.x = a;
        e.y = CANVAS_HEIGHT - 250;
        s_oStage.addChild(e)
    };
    this.move = function (a) {
        createjs.Tween.get(e).to({x: a}, 150, createjs.Ease.cubicOut)
    };
    this.jump = function (a) {
        createjs.Tween.get(e).to({scaleX: 1.3, scaleY: 1.3}, 17E3 / a, createjs.Ease.cubicOut).call(function () {
            !1 === s_bMobile && createjs.Sound.play("jump_end");
            createjs.Tween.get(e).to({scaleX: 1, scaleY: 1}, 2E4 / a, createjs.Ease.bounceOut).call(function () {
            })
        })
    };
    this.getPos = function () {
        return {x: e.x, y: e.y}
    };
    this.getY = function () {
        return e.y
    };
    this.isTweening = function () {
        return createjs.Tween.hasActiveTweens(e)
    };
    this.isJumping = function () {
        return d
    };
    this.update = function () {
        d = 1.1 < e.scaleY ? !0 : !1
    };
    this._init(a, b)
}
function CHelpPanel(a) {
    var b, d, e, h;
    this._init = function (a) {
        e = new createjs.Bitmap(a);
        d = new createjs.Text(TEXT_HELP1, "bold 30px Arial", "#000000");
        d.textAlign = "center";
        d.x = CANVAS_WIDTH / 2 + 2;
        d.y = 312;
        b = new createjs.Text(TEXT_HELP1, "bold 30px Arial", "#ffffff");
        b.textAlign = "center";
        b.x = CANVAS_WIDTH / 2;
        b.y = 310;
        a = new createjs.Text(TEXT_HELP2, "bold 36px Arial", "#000000");
        a.textAlign = "center";
        a.x = CANVAS_WIDTH / 2 + 2;
        a.y = 639;
        var c = new createjs.Text(TEXT_HELP2, "bold 36px Arial", "#ffffff");
        c.textAlign = "center";
        c.x = CANVAS_WIDTH /
            2;
        c.y = 637;
        h = new createjs.Container;
        h.addChild(e, d, b, a, c);
        s_oStage.addChild(h);
        var g = this;
        h.on("pressup", function () {
            g._onExitHelp()
        })
    };
    this.unload = function () {
        s_oStage.removeChild(h);
        var a = this;
        h.off("pressup", function () {
            a._onExitHelp()
        })
    };
    this._onExitHelp = function () {
        this.unload();
        s_oGame._onExitHelp()
    };
    this._init(a)
};