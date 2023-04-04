// BalderJS
// version 5.1 (2022-09-28)
// Mattias Steinwall
// Baldergymnasiet, Skellefteå, Sweden
//
// Initialize
//
let ctx;
let W;
let H;
const _codes = new Set();
const _keyboard = {};
const _mouse = [];
let _touched = null;
class BalderCanvas extends HTMLCanvasElement {
    constructor() {
        super();
        this.addEventListener("keydown", event => {
            event.preventDefault();
            _key = event.key;
            if (_keyboard[event.code] !== false) {
                _keyboard[event.code] = true;
                _codes.add(event.code);
            }
        });
        this.addEventListener("keyup", event => {
            _key = null;
            _keyboard[event.code] = null;
            _codes.delete(event.code);
        });
        this.addEventListener("mousedown", event => {
            event.preventDefault();
            canvas.focus();
            if (_mouse[event.button] !== false) {
                _mouse[event.button] = true;
            }
        });
        this.addEventListener("mouseup", event => {
            _mouse[event.button] = null;
        });
        this.addEventListener("mousemove", event => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
            mouse.over = true;
        });
        this.addEventListener("mouseout", () => {
            mouse.over = false;
            _mouse[0] = _mouse[1] = _mouse[2] = null;
        });
        this.addEventListener("contextmenu", event => {
            event.preventDefault();
        });
        function touchHandler(event) {
            event.preventDefault();
            canvas.focus();
            const rect = canvas.getBoundingClientRect();
            touchscreen.touches = [];
            if (_touched !== false) {
                _touched = null;
                for (let i = 0; i < event.touches.length; i++) {
                    touchscreen.touches[i] = {
                        x: event.touches[i].clientX - rect.left,
                        y: event.touches[i].clientY - rect.top,
                        id: event.touches[i].identifier
                    };
                    if (i === 0) {
                        _touched = true;
                        touchscreen.x = touchscreen.touches[0].x;
                        touchscreen.y = touchscreen.touches[0].y;
                    }
                }
                return;
            }
            if (event.touches.length === 0) {
                _touched = null;
            }
        }
        this.addEventListener("touchstart", touchHandler);
        this.addEventListener("touchend", touchHandler);
        this.addEventListener("touchmove", touchHandler);
        this.addEventListener("blur", () => {
            for (const code of _codes) {
                _keyboard[code] = null;
            }
            _key = null;
            _codes.clear();
            _touched = null;
        });
        ctx = this.getContext("2d");
        this.tabIndex = 0;
        this.style.backgroundColor = "linen";
        canvas = this;
    }
}
let canvas;
customElements.define('balder-canvas', BalderCanvas, { extends: 'canvas' });
const _sprites = [];
let _update = () => { };
let deltaTime;
let _timestamp0;
function setUpdate(handler = () => { }) {
    _update = handler;
    canvas.focus();
}
function _updateHandler(timestamp) {
    deltaTime = timestamp - _timestamp0;
    _timestamp0 = timestamp;
    for (let s of _sprites) {
        s._update();
    }
    _update();
    requestAnimationFrame(_updateHandler);
}
requestAnimationFrame(timestamp => _timestamp0 = timestamp);
requestAnimationFrame(_updateHandler);
let _key;
let _errNr = 0;
let _errorElt;
window.onerror = (message) => {
    if (!_errorElt) {
        _errorElt = element("output", document.body);
    }
    _errorElt.value = `(#${++_errNr}) ${String(message)}`;
    _errorElt.style.color = "white";
    _errorElt.style.backgroundColor = "red";
    _errorElt.style.position = "fixed";
    _errorElt.style.bottom = "4px";
    _errorElt.style.left = "0";
    _errorElt.style.width = "100%";
    _errorElt.style.zIndex = "2147483647";
    _errorElt.focus();
    _errorElt.onclick = () => {
        _errorElt?.remove();
        _errorElt = null;
    };
};
window.addEventListener("unhandledrejection", event => {
    throw event.reason;
});
let _resetted = false; // 5.0
function resetCanvas() {
    canvas.style.display = "";
    _resetted = true;
    canvas.width = 0; // 5.02
    canvas.height = 0;
    canvas.width = W = parseInt(getComputedStyle(canvas).width);
    canvas.height = H = parseInt(getComputedStyle(canvas).height);
}
window.addEventListener("resize", () => location.reload());
let _outputElt;
let _inputLines = [];
let _inputLineIndex = 0;
function input(prompt = "", value = "") {
    let divElt = element("div", prompt);
    divElt.style.fontFamily = "consolas,monospace";
    divElt.style.whiteSpace = "pre-wrap";
    return new Promise((resolve) => {
        if (_inputLines[_inputLineIndex] != null) {
            element("b", _inputLines[_inputLineIndex], divElt);
            resolve(_inputLines[_inputLineIndex++]);
        }
        else {
            let bElt = element("b", value, divElt);
            bElt.contentEditable = "true";
            bElt.focus();
            getSelection().selectAllChildren(bElt);
            bElt.addEventListener("keydown", event => {
                if (event.code == "Enter") {
                    event.preventDefault();
                    getSelection().removeAllRanges();
                    bElt.contentEditable = "false";
                    _inputLines[_inputLineIndex] = bElt.textContent;
                    resolve(_inputLines[_inputLineIndex++]);
                }
            });
        }
    });
}
let _outputValue = "";
function print(...values) {
    if (!_outputElt) {
        _outputElt = element("div");
        _outputElt.style.fontFamily = "consolas,monospace";
        _outputElt.style.whiteSpace = "pre-wrap";
    }
    if (values.length > 1 && /^\s*$/.test(values[values.length - 1])) {
        _outputElt.textContent += values.slice(0, -1).map(v => str(v)).join(" ");
        _outputElt.textContent += values[values.length - 1];
    }
    else {
        _outputElt.textContent += values.map(v => str(v)).join(" ");
        _outputElt.textContent += "\n";
    }
}
function createTest(from = "script") {
    if (_params.get("o") == null) {
        if (from == "script") {
            element("div");
            _params.set("i", _inputLines?.join("\n")); // trim?
            _params.set("o", _outputValue.trimEnd());
            window.open(window.location.origin + "?" + _params, "_blank");
            _params.delete("o");
        }
        else {
            element("input:file", "input:").onchange = (e) => {
                let file = e.target.files[0];
                const fr = new FileReader();
                fr.onload = (e) => {
                    _params.set("i", encodeURIComponent(e.target.result.trimEnd()));
                };
                fr.readAsText(file);
            };
            element("input:file", "output:").onchange = (e) => {
                let file = e.target.files[0];
                const fr = new FileReader();
                fr.onload = (e) => {
                    _params.set("o", encodeURIComponent(e.target.result.trimEnd()));
                    window.open(window.location.origin + "?" + _params, "_blank");
                    _params.delete("o");
                };
                fr.readAsText(file);
            };
        }
    }
}
function str(value) {
    if (typeof value === "object" && value != null && (value.toString === Object.prototype.toString || value.toString === Array.prototype.toString)) {
        if (typeof value[Symbol.iterator] === "function") {
            value = Array.from(value);
        }
        try {
            return JSON.stringify(value);
        }
        catch { }
    }
    return String(value);
}
const _params = new URL(location.href).searchParams;
const _iParam = _params.get("i"); // input
if (_iParam != null) {
    _inputLines = decodeURIComponent(_iParam).split("\n");
}
//
// Load
//
window.addEventListener("load", () => {
    const oParam = _params.get("o"); // output
    if (oParam != null) {
        const resp = element("div");
        resp.style.fontFamily = "consolas,monospace";
        resp.style.whiteSpace = "pre-wrap";
        resp.style.color = "black";
        const oValue = decodeURIComponent(oParam);
        _outputValue = _outputValue.split("\n").map(line => line.trimEnd()).join("\n").trimEnd();
        console.log(_outputValue, _outputValue.length);
        console.log(oValue, oValue.length);
        if (_outputValue == oValue) {
            resp.style.backgroundColor = "palegreen";
            resp.textContent = _outputValue;
        }
        else {
            let offset = 0;
            while (_outputValue[offset] == oValue[offset]) {
                offset++;
            }
            resp.style.backgroundColor = "lightsalmon";
            resp.innerHTML = `<span style="background-color: palegreen">${oValue.slice(0, offset)}</span>`;
            resp.innerHTML += oValue.slice(offset);
        }
    }
});
//
// Drawing functions
//
function polygon(points, color = "black", lineWidth) {
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(...points[i]);
    }
    ctx.closePath();
    if (lineWidth != null) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
function line(x1, y1, x2, y2, color = "black", lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}
function circle(x, y, radius, color = "black", lineWidth) {
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    if (lineWidth != null) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
function rectangle(x, y, width, height, color = "black", lineWidth) {
    if (lineWidth != null) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, width, height);
    }
    else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
}
function triangle(x1, y1, x2, y2, x3, y3, color = "black", lineWidth) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    if (lineWidth != null) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
function text(value, x = 0, y = 24, font = 24, color = "black", lineWidth) {
    ctx.font = (typeof font == "number") ? font + "px consolas,monospace" : font;
    let _text = str(value);
    let w = ctx.measureText(_text).width;
    if (typeof x != "number") {
        x = (x[1] == "center") ? x[0] - w / 2 : x[0] - w;
    }
    if (lineWidth != null) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.strokeText(_text, x, y);
    }
    else {
        ctx.fillStyle = color;
        ctx.fillText(_text, x, y);
    }
}
let _images = [];
function _loadImage(path) {
    return new Promise((resolve, reject) => {
        if (_images[path] === undefined) {
            _images[path] = new Image();
            _images[path].src = path;
            _images[path].addEventListener("load", () => resolve());
            _images[path].addEventListener("error", () => reject(new Error(`'${path}' can not be loaded`)));
        }
        else if (_images[path].complete) {
            resolve();
        }
        else {
            _images[path].addEventListener("load", () => resolve());
        }
    });
}
async function image(path, x = 0, y = 0, width, height) {
    await _loadImage(path);
    if (width && height) {
        ctx.drawImage(_images[path], x, y, width, height);
    }
    else {
        ctx.drawImage(_images[path], x, y);
    }
}
function clear(x = 0, y = 0, width = W, height = H) {
    ctx.clearRect(x, y, width, height);
}
function fill(color = "black", x = 0, y = 0, width = W, height = H) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
//
// Vector2
// 
class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromPolar(length, angle) {
        return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
    }
    get length() {
        return Math.hypot(this.x, this.y);
    }
    set length(value) {
        const angle = this.angle;
        this.x = value * Math.cos(angle);
        this.y = value * Math.sin(angle);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(value) {
        const length = this.length;
        this.x = length * Math.cos(value);
        this.y = length * Math.sin(value);
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
    }
    scalarMultiply(s) {
        this.x *= s;
        this.y *= s;
    }
    distanceTo(v) {
        return Math.hypot(this.x - v.x, this.y - v.y);
    }
    directionTo(v) {
        let angle = Math.atan2(v.y - this.y, v.x - this.x);
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
//
// Hitbox
//
class Hitbox {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    intersects(other) {
        return (this.x + this.width > other.x &&
            this.x < other.x + other.width &&
            this.y + this.height > other.y &&
            this.y < other.y + other.height);
    }
    contains(x, y) {
        return (this.x + this.width > x &&
            this.x <= x &&
            this.y + this.height > y &&
            this.y <= y);
    }
    drawOutline(color = "black") {
        rectangle(this.x, this.y, this.width, this.height, color, 1);
    }
}
//
// Sprite
//
class Sprite extends Hitbox {
    spritesheetPath;
    rows;
    columns;
    frames;
    index = 0;
    frameTime = 0;
    remainingTime = 0;
    loop = true;
    tag = {};
    constructor(spritesheetPath, rows = 1, columns = 1, frames) {
        super(0, 0, 0, 0);
        this.spritesheetPath = spritesheetPath;
        this.rows = rows;
        this.columns = columns;
        this.frames = frames;
        this.frames = frames ?? range(rows * columns);
        _sprites.push(this);
        this.framesPerSecond = 12;
    }
    set framesPerSecond(value) {
        this.frameTime = 1000 / value;
        this.remainingTime = this.frameTime;
    }
    get framesPerSecond() {
        return 1000 / this.frameTime;
    }
    _update() {
        this.remainingTime -= deltaTime;
        if (this.remainingTime < 0) {
            this.index++;
            if (this.index >= this.frames.length) {
                if (this.loop) {
                    this.index = 0;
                }
                else {
                    _sprites.splice(_sprites.indexOf(this), 1);
                }
            }
            this.remainingTime += this.frameTime;
        }
    }
    async draw() {
        await _loadImage(this.spritesheetPath);
        const frameWidth = _images[this.spritesheetPath].width / this.columns;
        const frameHeight = _images[this.spritesheetPath].height / this.rows;
        if (this.width == 0)
            this.width = frameWidth;
        if (this.height == 0)
            this.height = frameHeight;
        const sx = frameWidth * (this.frames[this.index] % this.columns);
        const sy = frameHeight * Math.floor(this.frames[this.index] / this.columns);
        ctx.drawImage(_images[this.spritesheetPath], sx, sy, frameWidth, frameHeight, this.x, this.y, this.width, this.height);
    }
}
//
// Keyboard
//
const keyboard = {
    get shiftLeft() { return !!_keyboard["ShiftLeft"]; }, set shiftLeft(value) { _keyboard["ShiftLeft"] = value; },
    get shiftRight() { return !!_keyboard["ShiftRight"]; }, set shiftRight(value) { _keyboard["ShiftRight"] = value; },
    get backspace() { return !!_keyboard["Backspace"]; }, set backspace(value) { _keyboard["Backspace"] = value; },
    get enter() { return !!_keyboard["Enter"]; }, set enter(value) { _keyboard["Enter"] = value; },
    get space() { return !!_keyboard["Space"]; }, set space(value) { _keyboard["Space"] = value; },
    get left() { return !!_keyboard["ArrowLeft"]; }, set left(value) { _keyboard["ArrowLeft"] = value; },
    get up() { return !!_keyboard["ArrowUp"]; }, set up(value) { _keyboard["ArrowUp"] = value; },
    get right() { return !!_keyboard["ArrowRight"]; }, set right(value) { _keyboard["ArrowRight"] = value; },
    get down() { return !!_keyboard["ArrowDown"]; }, set down(value) { _keyboard["ArrowDown"] = value; },
    get digit0() { return !!_keyboard["Digit0"]; }, set digit0(value) { _keyboard["Digit0"] = value; },
    get digit1() { return !!_keyboard["Digit1"]; }, set digit1(value) { _keyboard["Digit1"] = value; },
    get digit2() { return !!_keyboard["Digit2"]; }, set digit2(value) { _keyboard["Digit2"] = value; },
    get digit3() { return !!_keyboard["Digit3"]; }, set digit3(value) { _keyboard["Digit3"] = value; },
    get digit4() { return !!_keyboard["Digit4"]; }, set digit4(value) { _keyboard["Digit4"] = value; },
    get digit5() { return !!_keyboard["Digit5"]; }, set digit5(value) { _keyboard["Digit5"] = value; },
    get digit6() { return !!_keyboard["Digit6"]; }, set digit6(value) { _keyboard["Digit6"] = value; },
    get digit7() { return !!_keyboard["Digit7"]; }, set digit7(value) { _keyboard["Digit7"] = value; },
    get digit8() { return !!_keyboard["Digit8"]; }, set digit8(value) { _keyboard["Digit8"] = value; },
    get digit9() { return !!_keyboard["Digit9"]; }, set digit9(value) { _keyboard["Digit9"] = value; },
    get a() { return !!_keyboard["KeyA"]; }, set a(value) { _keyboard["KeyA"] = value; },
    get b() { return !!_keyboard["KeyB"]; }, set b(value) { _keyboard["KeyB"] = value; },
    get c() { return !!_keyboard["KeyC"]; }, set c(value) { _keyboard["KeyC"] = value; },
    get d() { return !!_keyboard["KeyD"]; }, set d(value) { _keyboard["KeyD"] = value; },
    get e() { return !!_keyboard["KeyE"]; }, set e(value) { _keyboard["KeyE"] = value; },
    get f() { return !!_keyboard["KeyF"]; }, set f(value) { _keyboard["KeyF"] = value; },
    get g() { return !!_keyboard["KeyG"]; }, set g(value) { _keyboard["KeyG"] = value; },
    get h() { return !!_keyboard["KeyH"]; }, set h(value) { _keyboard["KeyH"] = value; },
    get i() { return !!_keyboard["KeyI"]; }, set i(value) { _keyboard["KeyI"] = value; },
    get j() { return !!_keyboard["KeyJ"]; }, set j(value) { _keyboard["KeyJ"] = value; },
    get k() { return !!_keyboard["KeyK"]; }, set k(value) { _keyboard["KeyK"] = value; },
    get l() { return !!_keyboard["KeyL"]; }, set l(value) { _keyboard["KeyL"] = value; },
    get m() { return !!_keyboard["KeyM"]; }, set m(value) { _keyboard["KeyM"] = value; },
    get n() { return !!_keyboard["KeyN"]; }, set n(value) { _keyboard["KeyN"] = value; },
    get o() { return !!_keyboard["KeyO"]; }, set o(value) { _keyboard["KeyO"] = value; },
    get p() { return !!_keyboard["KeyP"]; }, set p(value) { _keyboard["KeyP"] = value; },
    get q() { return !!_keyboard["KeyQ"]; }, set q(value) { _keyboard["KeyQ"] = value; },
    get r() { return !!_keyboard["KeyR"]; }, set r(value) { _keyboard["KeyR"] = value; },
    get s() { return !!_keyboard["KeyS"]; }, set s(value) { _keyboard["KeyS"] = value; },
    get t() { return !!_keyboard["KeyT"]; }, set t(value) { _keyboard["KeyT"] = value; },
    get u() { return !!_keyboard["KeyU"]; }, set u(value) { _keyboard["KeyU"] = value; },
    get v() { return !!_keyboard["KeyV"]; }, set v(value) { _keyboard["KeyV"] = value; },
    get w() { return !!_keyboard["KeyW"]; }, set w(value) { _keyboard["KeyW"] = value; },
    get x() { return !!_keyboard["KeyX"]; }, set x(value) { _keyboard["KeyX"] = value; },
    get y() { return !!_keyboard["KeyY"]; }, set y(value) { _keyboard["KeyY"] = value; },
    get z() { return !!_keyboard["KeyZ"]; }, set z(value) { _keyboard["KeyZ"] = value; },
    poll: () => {
        return _key;
    }
};
window.addEventListener("blur", () => {
    _keyboard["AltLeft"] = false;
});
//
// Mouse
//
const mouse = {
    x: -1,
    y: -1,
    over: false,
    get left() { return !!_mouse[0]; }, set left(value) { _mouse[0] = value; },
    get middle() { return !!_mouse[1]; }, set middle(value) { _mouse[1] = value; },
    get right() { return !!_mouse[2]; }, set right(value) { _mouse[2] = value; }
};
//
// Touchscreen
//
const touchscreen = {
    x: -1,
    y: -1,
    touches: [],
    get touched() { return !!_touched; }, set touched(value) { _touched = value; }
};
//
// Turtle
//
class Turtle {
    x;
    y;
    heading;
    turtleContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    turtle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    points = [];
    penSize = 1;
    constructor(x = W / 2, y = H / 2, heading = 0) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        document.body.appendChild(this.turtleContainer);
        this.turtleContainer.appendChild(this.turtle);
        this.turtleContainer.setAttribute("width", "20");
        this.turtleContainer.setAttribute("height", "20");
        this.turtleContainer.style.position = "absolute";
        this.turtle.setAttribute("points", "0,0 10,10, 0,20");
        this.turtle.setAttribute("fill", "black");
        this.right(0);
        this.forward(0);
    }
    get state() {
        return [this.x, this.y, this.heading];
    }
    set state(value) {
        [this.x, this.y, this.heading] = value;
        this.right(0);
        this.forward(0);
    }
    get penColor() {
        return this.turtle.getAttribute("fill");
    }
    set penColor(value) {
        this.turtle.setAttribute("fill", value);
    }
    forward(length, penDown = true) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.x += Math.cos(radians(this.heading)) * length;
        this.y += Math.sin(radians(this.heading)) * length;
        if (penDown) {
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = this.penColor;
            ctx.lineWidth = this.penSize;
            ctx.stroke();
        }
        else {
            ctx.moveTo(this.x, this.y);
        }
        const style = getComputedStyle(canvas);
        const offsetLeft = canvas.offsetLeft + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft);
        const offsetTop = canvas.offsetTop + parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop);
        this.turtleContainer.style.left = (offsetLeft + this.x - 10) + "px";
        this.turtleContainer.style.top = (offsetTop + this.y - 10) + "px";
        this.points.push([this.x, this.y]);
    }
    backward(length, penDown = true) {
        this.forward(-length, penDown);
    }
    right(degAngle = 90) {
        this.heading += degAngle;
        let [x1, y1] = pointFromPolar(10, this.heading + 150, 10, 10);
        let [x2, y2] = pointFromPolar(6, this.heading + 180, 10, 10);
        let [x3, y3] = pointFromPolar(10, this.heading - 150, 10, 10);
        this.turtle.setAttribute("points", `10,10 ${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    }
    left(degAngle = 90) {
        this.right(-degAngle);
    }
    hide() {
        this.turtleContainer.style.display = "none";
    }
    fill(color = "black") {
        polygon(this.points, color);
    }
}
//
// Grid
//
class Cell {
    row;
    column;
    x;
    y;
    width;
    height;
    _color = null;
    _image = null;
    _custom = null;
    tag = {};
    constructor(row, column, x, y, width, height) {
        this.row = row;
        this.column = column;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.draw();
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
        this.draw();
    }
    get custom() {
        return this._custom;
    }
    set custom(value) {
        this._custom = value;
        this.draw();
    }
    async draw() {
        clear(this.x, this.y, this.width, this.height);
        if (this._color) {
            fill(this._color, this.x + 0.5, this.y + 0.5, this.width - 1, this.height - 1);
        }
        if (this._image) {
            await image(this._image, this.x, this.y, this.width, this.height);
        }
        if (this._custom) {
            this._custom(this);
        }
    }
}
class _Grid {
    cellWidth;
    cellHeight;
    constructor(rows, columns, x, y, width, height, lineWidth) {
        this.cellWidth = (width - (columns + 1) * lineWidth) / columns;
        this.cellHeight = (height - (rows + 1) * lineWidth) / rows;
        for (let i = 0; i < rows; i++) {
            this[i] = [];
            for (let j = 0; j < columns; j++) {
                this[i][j] = new Cell(i, j, x + j * (this.cellWidth + lineWidth) + lineWidth, y + i * (this.cellHeight + lineWidth) + lineWidth, this.cellWidth, this.cellHeight);
            }
        }
    }
}
class Grid extends _Grid {
    rows;
    columns;
    x;
    y;
    width;
    height;
    color;
    lineWidth;
    activatable = true;
    _activeCell = null;
    constructor(rows, columns, x = 0, y = 0, width = W - x, height = H - y, color = "black", lineWidth = 1) {
        super(rows, columns, x, y, width, height, lineWidth);
        this.rows = rows;
        this.columns = columns;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;
        this.draw();
    }
    get activated() {
        let m = _mouse.some(v => v); // 5.0
        if (m || _touched) {
            if (this.activatable) {
                let x = touchscreen.x;
                let y = touchscreen.y;
                if (m) {
                    x = mouse.x;
                    y = mouse.y;
                }
                this._activeCell = this.cellFromPoint(x, y);
                this.activatable = false;
                return !!this._activeCell;
            }
            else {
                return false;
            }
        }
        this.activatable = true;
        return false;
    }
    get activeCell() {
        return this._activeCell;
    }
    cellFromPoint(x, y) {
        let row;
        let column;
        if ((x - this.x - this.lineWidth + this.cellWidth + this.lineWidth) % (this.cellWidth + this.lineWidth) < this.cellWidth) {
            column = Math.floor((x - this.x) / (this.cellWidth + this.lineWidth));
            if (column < 0 || column >= this.columns) {
                return null;
            }
        }
        else {
            return null;
        }
        if ((y - this.y - this.lineWidth + this.cellHeight + this.lineWidth) % (this.cellHeight + this.lineWidth) < this.cellHeight) {
            row = Math.floor((y - this.y) / (this.cellHeight + this.lineWidth));
            if (row < 0 || row >= this.rows) {
                return null;
            }
        }
        else {
            return null;
        }
        return this[row][column];
    }
    draw() {
        if (this.color) {
            fill(this.color, this.x, this.y, this.width, this.height);
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this[i][j].draw(); // TODO, await?
            }
        }
    }
}
//
// Helper functions
//
function ord(char) {
    return char.codePointAt(0);
}
function chr(charCode) {
    return String.fromCodePoint(charCode);
}
function randomInt(m, n) {
    return Math.floor(n != null ? m + Math.random() * (n - m + 1) : Math.random() * m);
}
function randomItem(...items) {
    return items[randomInt(items.length)];
}
function radians(degAngle) {
    return degAngle * Math.PI / 180;
}
function degrees(radAngle) {
    return radAngle * 180 / Math.PI;
}
function pointFromPolar(radius, degAngle, x0 = 0, y0 = 0) {
    const a = radians(degAngle);
    return [x0 + Math.cos(a) * radius, y0 + Math.sin(a) * radius];
}
// 5.1
function rgba(red, green, blue, alpha = 1) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
function getPixel(x, y) {
    const data = ctx.getImageData(x, y, 1, 1).data;
    return { red: data[0], green: data[1], blue: data[2], alpha: data[3] };
}
function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
// 5.1
function sleep(msDuration) {
    return new Promise(resolve => setTimeout(() => resolve(), msDuration)); // TODO, reject?
}
function array(length, value) {
    if (typeof value == "function") {
        let a = [];
        for (let i = 0; i < length; i++) {
            a[i] = value(i);
        }
        return a;
    }
    return Array(length).fill(value);
}
function array2D(rows, columns, value) {
    if (typeof value == "function") {
        let m = [];
        for (let i = 0; i < rows; i++) {
            m[i] = [];
            for (let j = 0; j < columns; j++) {
                m[i][j] = value(i, j);
            }
        }
        return m;
    }
    return Array(rows).fill(null).map(() => Array(columns).fill(value));
}
function range(a, b, c = 1) {
    const r = [];
    if (b === undefined) {
        [a, b] = [0, a];
    }
    if (c > 0) {
        for (let i = a; i < b; i += c) {
            r.push(i);
        }
    }
    else if (c < 0) {
        for (let i = a; i > b; i += c) {
            r.push(i);
        }
    }
    else {
        throw new RangeError("'by' must not be zero"); // 5.0
    }
    return r;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function imagePath(value, color = "black") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "124px consolas,monospace";
    canvas.width = ctx.measureText(String(value)).width;
    canvas.height = 132;
    ctx.font = "124px consolas,monospace";
    ctx.fillStyle = color;
    ctx.fillText(String(value), 0, 106);
    return canvas.toDataURL("image/png");
}
// 5.1
async function imagePaths(spritesheetPath, rows, columns) {
    await _loadImage(spritesheetPath);
    const _frameCanvas = document.createElement("canvas");
    const _frameCtx = _frameCanvas.getContext("2d");
    const frameWidth = _images[spritesheetPath].width / columns;
    const frameHeight = _images[spritesheetPath].height / rows;
    _frameCanvas.width = frameWidth;
    _frameCanvas.height = frameHeight;
    let paths = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            _frameCtx.clearRect(0, 0, frameWidth, frameHeight);
            _frameCtx.drawImage(_images[spritesheetPath], j * frameWidth, i * frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
            paths.push(_frameCanvas.toDataURL("image/png"));
        }
    }
    return paths;
}
//
// GUI functions
//
let div; // 5.1
function element(tagName, arg1, arg2, arg3) {
    let elt;
    if (!_resetted)
        canvas.style.display = "none"; // 5.0
    if (_outputElt) {
        _outputValue += _outputElt.textContent.trimEnd() + "\n";
        _outputElt = null;
    }
    if (typeof arg1 == "string") {
        if (["input", "meter", "output", "progress", "select", "textarea"].includes(tagName.split(":")[0])) {
            let labelElt = element("label", arg2, arg3);
            labelElt.style.display = "flex"; // 5.0
            labelElt.style.margin = "0.25em 0"; // 5.0
            if (arg1.endsWith("\\ ")) {
                arg1 = arg1.slice(0, -2);
                labelElt.style.flexDirection = "row";
                labelElt.style.gap = "0.25em";
            }
            else if (["input:checkbox", "input:radio"].includes(tagName)) {
                labelElt.style.flexDirection = "row-reverse";
                labelElt.style.justifyContent = "flex-end"; // 5.0
                labelElt.style.gap = "0.25em"; // 5.0
            }
            else {
                labelElt.style.flexDirection = "column";
                labelElt.style.alignItems = "flex-start"; // 5.0
            }
            element("span", arg1, labelElt);
            elt = element(tagName, labelElt);
            return elt;
        }
        elt = document.createElement(tagName);
        if (tagName == "fieldset") {
            element("legend", arg1, elt);
            elt.style.width = "fit-content";
            elt.style.margin = "0.25em 0"; // 5.0
        }
        else if (tagName == "details") {
            element("summary", arg1, elt);
        }
        else if (tagName == "table") {
            element("caption", arg1, elt);
        }
        else {
            if (arg1.endsWith("\\html")) { // 5.0
                elt.innerHTML = arg1.slice(0, -5);
            }
            else {
                elt.textContent = arg1;
            }
        }
    }
    else {
        [arg3, arg2] = [arg2, arg1];
        if (tagName.startsWith("input:")) {
            elt = document.createElement("input");
            elt.type = tagName.slice(6);
        }
        else {
            elt = document.createElement(tagName);
        }
    }
    let parent = arg2 ?? div ?? document.body;
    if (tagName == "input:radio") {
        elt.name =
            parent instanceof HTMLFieldSetElement ?
                parent.querySelector("legend")?.textContent :
                parent.parentElement instanceof HTMLFieldSetElement ?
                    parent.parentElement.querySelector("legend")?.textContent :
                    " ";
    }
    parent.insertBefore(elt, parent.insertBefore(document.createTextNode("\n"), arg3 ?? null));
    return elt;
}
function setLabel(labeledElement, text) {
    if (labeledElement.parentElement instanceof HTMLLabelElement) {
        const spanElt = labeledElement.parentElement.querySelector("span");
        if (spanElt) {
            spanElt.textContent = text;
            return;
        }
    }
    throw new Error("Element is not labeled");
}
function getLabel(labeledElement) {
    if (labeledElement.parentElement instanceof HTMLLabelElement) {
        const spanElt = labeledElement.parentElement.querySelector("span");
        if (spanElt) {
            return spanElt.textContent;
        }
    }
    throw new Error("Element is not labeled");
}
function flex(container = div, direction = "row", gap = "0.25em") {
    container.style.display = "flex";
    container.style.flexDirection = direction;
    container.style.flexWrap = "wrap";
    container.style.gap = (typeof gap == "number") ? gap + "px" : gap;
    container.style.alignItems = "baseline"; // 5.1
}
if (!document.querySelector("canvas[is=balder-canvas]")) {
    document.documentElement.style.height = "100%";
    document.documentElement.style.display = "flex";
    document.body.style.flex = "1";
    document.body.style.display = "flex";
    document.body.style.flexFlow = "column";
    div = document.createElement("div");
    document.body.append(div);
    document.createElement("canvas", { is: 'balder-canvas' });
    document.body.append(canvas);
    canvas.style.minHeight = "150px";
    canvas.style.minWidth = "300px";
    canvas.style.maxHeight = "700px";
    canvas.style.maxWidth = "700px";
    canvas.style.flex = "1";
    const style = document.createElement('style'); // 5.0
    document.head.appendChild(style);
    style.sheet.insertRule("label>output::before { content: '\\200B'}");
}
canvas.width = W = 700;
canvas.height = H = 700;
history.scrollRestoration = 'manual'; // 5.0
//# sourceMappingURL=balder.js.map