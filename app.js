
let balling = true
let idle = false
let running = false
let jump = false
let jumphojd = false
let jumpspeed = 5
let visaboll = false
let bollx = 190
let bolly = 0
let hairlength = 10
let xpos = 100
let ypos = 100
let skincolor = rgba(210, 161, 140)
let haircolor = rgba(0, 0, 0)
let run = true
let runcounter = 0
let ballspeed = 0
let runspeed = 3
let handY = 0
let groundY = 200
let bollstudsar = false
let handpos = 0
let hoppbolly = 0
let ballposcheck = false
let bollhbx = bollx
let bollhby = bolly
let pointcounter = 0
let debugmenu = false
let shooting = false
let throwing = false
let world = { g: 25, t: 0 }
let throwspeed = 0.1
let timingstickx = -10
let timingsticky = 0
let timing = false
let timingcounter = true
let timingspeed = 5
let timingcounter2 = 0
let hitterx = -40
let hittery = 0
let hitterrandom = 0
let hitternew = false
let hitterhits = 0
let fontsize = 13
let timercolor = "green"
let force = 10
let forcex = -1000
let forcey = 0
let forcing = false
let forcecounter = true
let ballforce = 1
let greentored = false
let restartball = false
let ballairtimer = 0
let ballchecker = false
let netcolor = "white"
let colors5 = ["darkblue", "darkred", "darkgreen", "darkyellow", "darkorange"]
let textcolor = "white"
let timertimer = 100
let basketheighty = H / 2
let tittarfärgtröja = "green"
let tittarfärgbyxor = "brown"
let tittarskinnfärg = "rgba(210, 161, 140)"
let gameon = false
let pointcheck = false
let shopmenu = false
let gameover = false
let settings = false
let customizations = false
let money = 0
let moneyearned = 0
let backgroundseats = true
let buttoncolor = "green"
let buttoncolor1 = "green"
let buttoncolor2 = "red"
let button1pressed = false
let buttongrow = 0
let bought = false
let boughtskin = false
let shirtcolor = "red"
let pantscolor = "blue"
let ballcolor = rgba(250, 70, 22)
let buybuy1 = false
let buybuy2 = false
let buybuy3 = false
let buybuy4 = false
let buybuy5 = false
let lifetimescore = 0


class crosshair {
    crosshairx;
    crosshairy;
    constructor(
    ) { }
    update() {
        rectangle(this.crosshairx - 15 + xpos, ypos + this.crosshairy, 30, 1, "red")
        rectangle(this.crosshairx + xpos, ypos + this.crosshairy - 15, 1, 30, "red")
    }
}

class timingstick {
    timingstickx;
    timingsticky;
    constructor(
    ) { }
    update(
    ) {
        rectangle(this.timingstickx, this.timingsticky, 10, 40, "red")

    }
}
class tori {
    torix;
    toriy;
    constructor(
    ) { }
    update() {
        //main body
        // rectangle(torix, toriy, 40, 30, toricolor)
        // rectangle(torix + 40, toriy + 5, 30, 20, toricolor)
        // rectangle(torix - 40, toriy + 5, 40, 17.5, toricolor)
        // rectangle(torix - 80, toriy + 7.5, 40, 10, "yellow")
        // //head
        // rectangle(torix + 70, toriy, 40, 20, toricolor)
        // //legs
        // rectangle(torix - 3, toriy + 25, 5, 15, toricolor)
        // rectangle(torix - 5, toriy + 33, 5, 10, toricolor)
        // rectangle(torix, toriy + 40, 10, 5, toricolor)
        // rectangle(torix + 7.5, toriy + 42.5, 5, 5, toricolor)
        // //wings
        // rectangle(torix, toriy, 50, toriwingl, "green")

    }
}
class ball {
    v0 = 100
    bollx;
    bolly;
    constructor(
    ) { }
    update() {
        rectangle(xpos + bollx + 70 - 90, hoppbolly + bolly + 115 + 80, 22, 18, ballcolor)
        rectangle(xpos + bollx + 72 - 90, hoppbolly + bolly + 115 + 78, 18, 22, ballcolor)
        rectangle(xpos + bollx + 73 - 90, hoppbolly + bolly + 115 + 78, 1, 22)
        rectangle(xpos + bollx + 80 - 90, hoppbolly + bolly + 115 + 78, 1, 22)
        rectangle(xpos + bollx + 87 - 90, hoppbolly + bolly + 115 + 78, 1, 22)
        rectangle(xpos + bollx + 70 - 90, hoppbolly + bolly + 115 + 87, 22, 1)

    }
}
class buybox1 {
    item;
    x;
    y;
    p;
    constructor(
    ) { }
    update() {
        rectangle(this.x - 50, this.y + 45, 110, 250, "grey")
        rectangle(this.x - 45, this.y + 80, 100, 170, "lightgrey")
        rectangle(this.x - 45, this.y + 255, 100, 35, buttoncolor)
        text(this.item, this.x - 45, this.y + 65, 13, "yellow",)
        //köpes knapp
        if (mouse.x > this.x - 45 && mouse.x < this.x + 55 + 100) {
            if (mouse.y > this.y + 255 && mouse.y < this.y + 290) {
                if (bought == true) {
                    if (mouse.left) {
                        boughtskin = true
                    }
                } else {

                    if (money >= this.p) {
                        if (mouse.left) {
                            mouse.left = false
                            if (bought == false) {
                                money -= this.p
                                bought = true
                            }

                        }
                    } else {
                        text("not enough money", mouse.x, mouse.y)
                    }
                }
            }
        }


        if (bought == true) {
            buttoncolor = buttoncolor2
            if (shirtcolor == "blue") {
                text("Equipped" + this.p, this.x - 25, this.y + 280, 25, "white")
            }
            text("Equip", this.x - 25, this.y + 280, 25, "white")
        } else {
            text("$" + this.p, this.x - 25, this.y + 280, 25, "white")
        }


    }

}





//function för publik
function viewer(x, y,) {
    //stol
    rectangle(x, y, 50, 70, "darkred")
    rectangle(x, y + 60, 50, 10, "darkgrey")
    rectangle(x, y, 50, 1, "red")
    rectangle(x, y, 1, 50, "red")
    rectangle(x + 49, y, 1, 50, "red")
    rectangle(x - 10, y + 40, 10, 10)
    rectangle(x + 50, y + 40, 10, 10)
    rectangle(x + 50, y + 40, 10, 10, "black")
    //person
    // rectangle(x + 5, y + 20, 40, 40, tittarfärgtröja)
    // rectangle(x + 10, y, 30, 17.5, tittarskinnfärg)
    // rectangle(x + 12.5, y + 5, 25, 15, tittarskinnfärg)
    // rectangle(x + 7.5, y - 5, 37.5, 10, "black")
    // rectangle(x + 10, y - 7.5, 32.5, 10, "black")
    // rectangle(x - 4, y + 25, 10, 15, tittarfärgtröja)
    // rectangle(x + 45, y + 25, 9, 15, tittarfärgtröja)
    // rectangle(x + 5, y + 50, 40, 10, tittarfärgbyxor)
    // rectangle(x + 5, y + 50, 15, 40, tittarfärgbyxor)
    // rectangle(x + 30, y + 50, 15, 40, tittarfärgbyxor)
    // rectangle(x + 0, y + 35, 10, 10, tittarskinnfärg)
    // rectangle(x + 10, y + 30, 2, 20, "red")
    // rectangle(x + 12, y + 30, 2, 20, "white")
    // rectangle(x + 14, y + 30, 2, 20, "red")
    // rectangle(x + 16, y + 30, 2, 20, "white")
    // rectangle(x + 18, y + 30, 2, 20, "red")
    // rectangle(x + 20, y + 30, 2, 20, "white")
    // rectangle(x + 22, y + 30, 2, 20, "red")

}

class player {
    x;
    y;
    constructor(
    ) { }
    update() {
        handY = this.y
        if (jump == true) {
            //hoppandeben
            rectangle(xpos + this.x - 30, ypos + this.y + 140, 55, 15, skincolor)
            rectangle(xpos + this.x - 10, ypos + this.y + 137, 30, 20, skincolor)
            rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 25, skincolor)
            rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
            rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
            //sko
            rectangle(xpos + this.x - 40, ypos + this.y + 139, 10, 15, "green")
            rectangle(xpos + this.x - 42.5, ypos + this.y + 139, 10, 25, "green")
            rectangle(xpos + this.x - 45, ypos + this.y + 139, 10, 35, "green")
            rectangle(xpos + this.x - 47.5, ypos + this.y + 139, 10, 40, "green")

        }

        if (balling == true) {
            if (running == false) {
                if (jump == true) {
                    //hoppandeben
                    rectangle(xpos + this.x - 30, ypos + this.y + 140, 55, 15, skincolor)
                    rectangle(xpos + this.x - 10, ypos + this.y + 137, 30, 20, skincolor)
                    rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 25, skincolor)
                    rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
                    //sko
                    rectangle(xpos + this.x - 40, ypos + this.y + 139, 10, 15)
                    rectangle(xpos + this.x - 42.5, ypos + this.y + 139, 10, 25)
                    rectangle(xpos + this.x - 45, ypos + this.y + 139, 10, 35)
                    rectangle(xpos + this.x - 47.5, ypos + this.y + 139, 10, 40)

                } else {

                    //ben
                    rectangle(xpos + this.x + 4.5, ypos + this.y + 137, 21, 10, skincolor)
                    rectangle(xpos + this.x + 4, ypos + this.y + 146, 22, 15, skincolor)
                    rectangle(xpos + this.x + 5, ypos + this.y + 146, 20, 30, skincolor)
                    rectangle(xpos + this.x + 7.5, ypos + this.y + 146, 15, 40, skincolor)
                    rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 20, skincolor)
                    rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
                    //skor
                    rectangle(xpos + this.x + 7, ypos + this.y + 180, 15, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 182.5, 25, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 185, 35, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 187.5, 40, 10,)

                }
            }
            //huvud ---V---
            //nacke
            rectangle(xpos + this.x + 7.5, ypos + this.y + 10, 15, 30, skincolor)
            //skalle
            rectangle(xpos + this.x, ypos + this.y, 30, 30, skincolor)
            rectangle(xpos + this.x + 2.5, ypos + this.y + 2.5, 25, 30, skincolor)
            //hår
            rectangle(xpos + this.x - 3, ypos + this.y - 3, 36, 10, haircolor)
            rectangle(xpos + this.x, ypos + this.y - 6, 30, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 2.5, 30, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 6, 24, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 10, 20, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 15, 15, hairlength, haircolor)
            //kropp ---V---
            //torso
            rectangle(xpos + this.x + 2.5, ypos + this.y + 37.5, 25, 30, shirtcolor)
            rectangle(xpos + this.x, ypos + this.y + 40, 30, 30, shirtcolor)
            rectangle(xpos + this.x + 2.5, ypos + this.y + 40, 25, 50, shirtcolor)
            //armar
            rectangle(xpos + this.x + 7.5, ypos + this.y + 42.5, 17.5, 17.5, skincolor)
            rectangle(xpos + this.x + 7.5, ypos + this.y + 40, 17.5, 22.5, skincolor)
            rectangle(xpos + this.x + 5, ypos + this.y + 42.5, 22.5, 17.5, skincolor)
            rectangle(xpos + this.x + 6.5, ypos + this.y + 44, 20, 40, skincolor)
            rectangle(xpos + this.x + 5.5, ypos + this.y + 44, 22, 30, skincolor)
            rectangle(xpos + this.x + 8.5, ypos + this.y + 66, 27, 20, skincolor)
            rectangle(xpos + this.x + 8.5, ypos + this.y + 69, 40, 17, skincolor)
            rectangle(xpos + this.x + 8.5, ypos + this.y + 69, 45, 15, skincolor)
            rectangle(xpos + this.x + 8.5, ypos + this.y + 72, 50, 10, skincolor)
            rectangle(xpos + this.x + 8.5, ypos + this.y + 72, 55, 10, skincolor)
            rectangle(xpos + this.x + 63, ypos + this.y + 73, 10, 8, skincolor)
            rectangle(xpos + this.x + 73, ypos + this.y + 75, 25, 5, skincolor)

        }
        if (idle == true) {
            //huvud ---V---
            //nacke
            rectangle(xpos + this.x + 7.5, ypos + this.y + 10, 15, 30, skincolor)
            //skalle
            rectangle(xpos + this.x, ypos + this.y, 30, 30, skincolor)
            rectangle(xpos + this.x + 2.5, ypos + this.y + 2.5, 25, 30, skincolor)
            //hår
            rectangle(xpos + this.x - 3, ypos + this.y - 3, 36, 10, haircolor)
            rectangle(xpos + this.x, ypos + this.y - 6, 30, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 2.5, 30, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 6, 24, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 10, 20, 10, haircolor)
            rectangle(xpos + this.x - 3, ypos + this.y + 15, 15, hairlength, haircolor)
            //kropp ---V---
            //torso
            rectangle(xpos + this.x + 2.5, ypos + this.y + 37.5, 25, 30, shirtcolor)
            rectangle(xpos + this.x, ypos + this.y + 40, 30, 30, shirtcolor)
            rectangle(xpos + this.x + 2.5, ypos + this.y + 40, 25, 50, shirtcolor)
            if (running == false) {
                if (jump == false) {
                    //ben
                    rectangle(xpos + this.x + 4.5, ypos + this.y + 137, 21, 10, skincolor)
                    rectangle(xpos + this.x + 4, ypos + this.y + 146, 22, 15, skincolor)
                    rectangle(xpos + this.x + 5, ypos + this.y + 146, 20, 30, skincolor)
                    rectangle(xpos + this.x + 7.5, ypos + this.y + 146, 15, 40, skincolor)
                    rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 20, skincolor)
                    rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
                    //skor
                    rectangle(xpos + this.x + 7, ypos + this.y + 180, 15, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 182.5, 25, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 185, 35, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 187.5, 40, 10,)
                }
            }
            if (jump == false) {
                //armar
                rectangle(xpos + this.x + 7.5, ypos + this.y + 42.5, 17.5, 17.5, skincolor)
                rectangle(xpos + this.x + 7.5, ypos + this.y + 40, 17.5, 22.5, skincolor)
                rectangle(xpos + this.x + 5, ypos + this.y + 42.5, 22.5, 17.5, skincolor)
                rectangle(xpos + this.x + 6.5, ypos + this.y + 44, 20, 40, skincolor)
                rectangle(xpos + this.x + 5.5, ypos + this.y + 44, 22, 30, skincolor)
                rectangle(xpos + this.x + 8.5, ypos + this.y + 66, 27, 20, skincolor)
                rectangle(xpos + this.x + 8.5, ypos + this.y + 69, 40, 17, skincolor)
                rectangle(xpos + this.x + 8.5, ypos + this.y + 69, 45, 15, skincolor)
                rectangle(xpos + this.x + 8.5, ypos + this.y + 72, 50, 10, skincolor)
                rectangle(xpos + this.x + 8.5, ypos + this.y + 72, 55, 10, skincolor)
                rectangle(xpos + this.x + 63, ypos + this.y + 73, 10, 8, skincolor)
                rectangle(xpos + this.x + 73, ypos + this.y + 75, 25, 5, skincolor)
            } else {
                //armar
                // rectangle(xpos + this.x + 7.5, ypos + this.y + 42.5, 17.5, 17.5, skincolor)
                rectangle(xpos + this.x + 7.5, ypos + this.y + 40, 17.5, 22.5, skincolor)
                rectangle(xpos + this.x + 5, ypos + this.y + 42.5, 22.5, 17.5, skincolor)
                rectangle(xpos + this.x + 6.5, ypos + this.y + 4, 20, 40, skincolor)
                rectangle(xpos + this.x + 10.5, ypos + this.y + -20, 20, 40, skincolor)
                rectangle(xpos + this.x + 12.5, ypos + this.y + -40, 19, 40, skincolor)
                rectangle(xpos + this.x + 15, ypos + this.y + -50, 20, 10, skincolor)
                rectangle(xpos + this.x + 20, ypos + this.y + -52, 23, 7, skincolor)
                rectangle(xpos + this.x + 25, ypos + this.y + -55, 23, 7, skincolor)
                // rectangle(xpos + this.x + 8.5, ypos + this.y + 72, 55, 10, skincolor)
                // rectangle(xpos + this.x + 63, ypos + this.y + 73, 10, 8, skincolor)
                // rectangle(xpos + this.x + 73, ypos + this.y + 75, 25, 5, skincolor)
            }



        }
        if (running == true) {
            if (jump == true) {
                //hoppandeben
                rectangle(xpos + this.x - 30, ypos + this.y + 140, 55, 15, skincolor)
                rectangle(xpos + this.x - 10, ypos + this.y + 137, 30, 20, skincolor)
                rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 25, skincolor)
                rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
                rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
                //sko
                rectangle(xpos + this.x - 40, ypos + this.y + 139, 10, 15)
                rectangle(xpos + this.x - 42.5, ypos + this.y + 139, 10, 25)
                rectangle(xpos + this.x - 45, ypos + this.y + 139, 10, 35)
                rectangle(xpos + this.x - 47.5, ypos + this.y + 139, 10, 40)

            } else if (running == true) {
                if (runcounter % 8 < 4) {

                    //springande ben
                    rectangle(xpos + this.x + 25, ypos + this.y + 95, 30, 22, skincolor)
                    rectangle(xpos + this.x + 25, ypos + this.y + 96, 40, 20, skincolor)
                    rectangle(xpos + this.x + 25, ypos + this.y + 98, 50, 16, skincolor)
                    rectangle(xpos + this.x + 53, ypos + this.y + 104, 20, 30, skincolor)
                    rectangle(xpos + this.x + 55, ypos + this.y + 134, 17, 20, skincolor)
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 94, 30, 25, "blue")
                    //sko1
                    rectangle(xpos + this.x + 55, ypos + this.y + 145, 15, 10,)
                    rectangle(xpos + this.x + 55, ypos + this.y + 147.5, 25, 10,)
                    rectangle(xpos + this.x + 55, ypos + this.y + 150, 35, 10,)
                    rectangle(xpos + this.x + 55, ypos + this.y + 152.5, 40, 10,)
                    //springande ben 2
                    rectangle(xpos + this.x - 30, ypos + this.y + 140, 55, 15, skincolor)
                    rectangle(xpos + this.x - 10, ypos + this.y + 137, 30, 20, skincolor)
                    rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 25, skincolor)
                    rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")
                    //sko2
                    rectangle(xpos + this.x - 40, ypos + this.y + 139, 10, 15)
                    rectangle(xpos + this.x - 42.5, ypos + this.y + 139, 10, 25)
                    rectangle(xpos + this.x - 45, ypos + this.y + 139, 10, 35)
                    rectangle(xpos + this.x - 47.5, ypos + this.y + 139, 10, 40)
                }
                else {
                    //ben
                    rectangle(xpos + this.x + 4.5, ypos + this.y + 137, 21, 10, skincolor)
                    rectangle(xpos + this.x + 4, ypos + this.y + 146, 22, 15, skincolor)
                    rectangle(xpos + this.x + 5, ypos + this.y + 146, 20, 30, skincolor)
                    rectangle(xpos + this.x + 7.5, ypos + this.y + 146, 15, 40, skincolor)
                    rectangle(xpos + this.x + 3.5, ypos + this.y + 118, 23, 20, skincolor)
                    rectangle(xpos + this.x + 2.5, ypos + this.y + 118, 25, 10, skincolor)
                    rectangle(xpos + this.x + 1.5, ypos + this.y + 89, 27, 30, "blue")

                    //skor
                    rectangle(xpos + this.x + 7, ypos + this.y + 180, 15, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 182.5, 25, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 185, 35, 10,)
                    rectangle(xpos + this.x + 7, ypos + this.y + 187.5, 40, 10,)

                }
            }

        }
    }
}

let p1 = new player(xpos, ypos)
let b1 = new ball(bollx, bolly)
let ts = new timingstick(timingstickx, timingsticky)
// let tori1 = new tori(torix, toriy)
// let ch1 = new crosshair(W / 2, H / 2)
let bhb = new Hitbox(bollx, bolly, 22, 22)
let korghb1 = new Hitbox(W - 58, H / 2 - 100, 80, 1)
let korghb2 = new Hitbox(W - 58, H / 2 - 90, 80, 1)
let korghb3 = new Hitbox(W - 58, H / 2 - 80, 80, 1)
let timingstickhb = new Hitbox(timingstickx - 10, timingsticky - 2, 20, 40)
let hitterhb = new Hitbox(hitterx, hittery, 20, 20)
let buy1 = new buybox1("Green Shirt", 100, 50, 100)

handpos = ypos + handY - 10

setUpdate(() => {
    if (keyboard.k) {
        money += 1000000
    }

    if (customizations == true) {
        rectangle(0, 0, W, H, "white")
        text("$" + money, 20, H - 20, "", "Black")
        rectangle(W / 20, H / 2 + H / 4, 150, 60, "red")
        text("Menu", W / 10, H / 2 + H / 3)
        buy1.update()
        if (mouse.x > W / 20 && mouse.x < W / 20 + 150) {
            if (mouse.y > H / 2 + H / 4 && mouse.y < H / 2 + H / 4 + 60) {
                if (mouse.left) {
                    mouse.left = false
                    gameon = false
                    customizations = false
                }
            }
        }
        if (mouse.x > W / 5 - 50 && mouse.x < W / 5 + 100) {
            if (mouse.y > H / 5 + 50 && mouse.y < H / 5 + 120) {
                if (mouse.left) {
                    mouse.left = false
                }
            }
        }

    }
    if (settings == true) {
        rectangle(0, 0, W, H, "white")

    }
    if (gameon == false && customizations == false && settings == false) {
        rectangle(0, 0, W, H, "white")
        text("$" + money, 20, H - 20, "", "Black")
        rectangle(W / 5 - 50, H / 5 - 30, 150, 60, "red")
        rectangle(W / 5 - 50, H / 5 + 50, 150, 60, "red")
        rectangle(W / 5 - 50, H / 5 + 130, 150, 60, "red")
        text("Start", W / 5 - 35, H / 5)
        text("Customize", W / 5 - 35, H / 5 + 80)
        text("Quit", W / 5 - 35, H / 5 + 155)
        //gameicon
        // circle(W / 2 + 30, H / 2 - 100, 40, "darkorange")
        // rectangle(W / 2 + 15, H / 2 - 150, 40, 20, skincolor)
        // rectangle(W / 2 + 35, H / 2 - 145, 40, 20, skincolor)
        // rectangle(W / 2 + 65, H / 2 - 135, 20, 60, skincolor)
        // rectangle(W / 2 + 70, H / 2 - 85, 25, 60, skincolor)
        // rectangle(W / 2 + 70, H / 2 - 85, 25, 60, shirtcolor)
        if (mouse.x > W / 5 - 50 && mouse.x < W / 5 + 100) {
            if (mouse.y > H / 5 - 30 && mouse.y < H / 5 + 30) {
                if (mouse.left) {
                    mouse.left = false
                    gameon = true
                    gameover = false
                }
            }
        }
        text("settings: " + settings, 100, 100, "", "green")
        if (mouse.x > W / 5 - 50 && mouse.x < W / 5 + 100) {
            if (mouse.y > H / 5 + 50 && mouse.y < H / 5 + 110) {
                if (mouse.left) {
                    mouse.left = false
                    customizations = true
                    gameover = false
                    gameon = false
                    settings = false
                }
            }
        }
        if (mouse.x > W / 5 - 50 && mouse.x < W / 5 + 100) {
            if (mouse.y > H / 5 + 130 && mouse.y < H / 5 + 190) {
                if (mouse.left) {
                    mouse.left = false
                    customizations = false
                    gameover = false
                    gameon = false
                    settings = true
                }
            }
        }
        if (mouse.x > W / 5 - 50 && mouse.x < W / 5 + 100) {
            if (mouse.y > H / 5 - 30 && mouse.y < H / 5 + 30) {
                if (mouse.left) {
                    mouse.left = false
                    gameon = true
                    gameover = false
                }
            }
        }

    }

    if (gameover == true) {
        moneyearned = pointcounter
        if (money < moneyearned) {
            money += moneyearned
        }
        if (pointcounter > lifetimescore) {
            lifetimescore = pointcounter
            //fetch("writescore.php?score=" += lifetimescore)
        }
        rectangle(0, 0, W, H, "white")
        text("$" + money, 20, H - 20, "", "Black")
        text("Game Over", W / 2 - 100, H / 2, "")
        text("Top Score: " + lifetimescore, W / 2 - 100, H / 2 + 50, "")
        text("Score: " + pointcounter, W / 2 - 100, H / 2 + 100, "")
        text("Money Earned: " + moneyearned, W / 2 - 100, H / 2 + 70, "")
        rectangle(W / 2 - 50, H / 2 + 100, 100, 60, "red")
        text("Menu", W / 2 - 40, H / 2 + 140)
        if (mouse.x > W / 2 - 50 && mouse.x < W / 2 + 50) {
            if (mouse.y > H / 2 + 100 && mouse.y < H / 2 + 150) {
                if (mouse.left) {
                    mouse.left = false
                    gameon = false
                    gameover = false
                    pointcounter = 0
                }
            }

        }

    }
    if (gameon == true) {
        clear()
        moneyearned = 0
        //Background
        rectangle(0, 0, W, H, "grey")
        rectangle(0, 8 * (H / 9) - 61, W, 21, "darkorange")
        rectangle(W / 2 + 7, 8 * (H / 9) - 60, 10, 20, "lightgrey")
        rectangle(W / 2, 8 * (H / 9) - 40, 10, 20, "lightgrey")
        rectangle(W / 2 - 4, 8 * (H / 9) - 20, 10, 40, "lightgrey")
        rectangle(0, 8 * (H / 9) - 120, W, 60, "grey")
        rectangle(0, 8 * (H / 9) - 120, W, 10, "darkgrey")
        //Real Background
        if (backgroundseats == true) {
            // viewer(100, 100)
            for (let y = 0; y < (H / 60) - 1; y += 1) {
                for (let i = 0; i < (W / 60) + 180; i += 1) {
                    viewer(60 * i + y * -20, 50 * y + 25,)
                }
            }
            rectangle(0, 8 * (H / 9) - 40, W, 60, "orange")
        }
        //hitbox
        bhb.x = xpos + bollx - 20
        bhb.y = ypos + bolly + 100
        //timing stick
        rectangle((W / 2) - 150, 7 * (H / 8), 300, 30, "grey")
        rectangle((W / 2) - 145, (7 * (H / 8)) + 5, 290, 20, timercolor)
        rectangle(hitterx, hittery, 20, 20, "lime")
        //force
        rectangle(forcex, forcey, force, 20, "pink")
        //scores
        rectangle(W / 2 - 200, H / 8, 400, 40, "lime")
        rectangle(W / 2 - 195, H / 8 + 5, 390, 30, "green")
        rectangle(W / 2 - 40, H / 8, 80, 40, "lime")
        rectangle(W / 2 - 35, H / 8 + 5, 70, 30, "white")
        text("P1: " + pointcounter, W / 2 - 190, H / 8 + 30, "", "white")
        text("P2: " + (pointcounter - pointcounter / 3).toFixed(0), W / 2 + 100, H / 8 + 30, "", "white")
        text(timertimer.toFixed(1), W / 2 - 32.5, H / 8 + 30, "", "black")

        //money
        text("$" + money, 20, H - 20, "", "Black")
        //gametimer
        if (timertimer > 0) {
            timertimer -= 0.015
        }
        if (timertimer < 0) {
            gameon = false
            gameover = true
            timertimer = 300
        }
        //Stats
        if (debugmenu == true) {
            bhb.drawOutline("red")
            korghb1.drawOutline("green")
            korghb2.drawOutline("orange")
            korghb3.drawOutline("red")
            timingstickhb.drawOutline("green")
            hitterhb.drawOutline("red")

            text("Boll Y " + bolly, 0, 10, fontsize, textcolor)
            text("Boll X " + bollx, 0, 20, fontsize, textcolor)
            text("Spring Timer " + runcounter, 0, 30, fontsize, textcolor)
            text("Hand Position " + handpos, 0, 40, fontsize, textcolor)
            text("Hand Y " + handY, 0, 50, fontsize, textcolor)
            text("Springfart " + runspeed, 0, 60, fontsize, textcolor)
            text("Studsfart " + ballspeed, 0, 70, fontsize, textcolor)
            text("Spelarposition Y " + ypos, 0, 80, fontsize, textcolor)
            text("Hopphöjd " + jumphojd, 0, 90, fontsize, textcolor)
            text("Golvhöjd " + groundY.toFixed(0), 0, 100, fontsize, textcolor)
            text("Poäng: " + pointcounter, 0, 110, fontsize, textcolor)
            text("X Position: " + xpos, 0, 120, fontsize, textcolor)
            text("Y Position: " + ypos, 0, 130, fontsize, textcolor)
            text("World G: " + world.g, 0, 140, fontsize, textcolor)
            text("World T: " + world.t, 0, 150, fontsize, textcolor)
            text("Boll v0: " + b1.v0, 0, 160, fontsize, textcolor)
            text("Timing Timer: " + timingcounter2, 0, 170, fontsize, textcolor)
            text("Timing Stick X: " + ts.timingstickx, 0, 180, fontsize, textcolor)
            text("Timing Stick Y: " + ts.timingsticky, 0, 190, fontsize, textcolor)
            text("New Hitter: " + hitternew, 0, 200, fontsize, textcolor)
            text("Hitter points: " + hitterhits, 0, 210, fontsize, textcolor)
            text("Forcing: " + forcing, 0, 220, fontsize, textcolor)
            text("Force: " + force, 0, 230, fontsize, textcolor)
            text("Shooting Force: " + ballforce, 0, 240, fontsize, textcolor)
            text("Restart: " + restartball, 0, 250, fontsize, textcolor)
            text("Springer " + running, 0, 260, fontsize, textcolor)
            text("Boll Hitbox X" + bhb.x, 0, 270, fontsize, textcolor)


            text("hitboxes", 100, 70, fontsize, "red",)

            if (balling == true) {
                text("balling", 100, 100, fontsize, "red",)
            }
            if (idle == true) {
                text("idle", 100, 100, fontsize, "red",)
            }
            if (running == true) {
                text("running", 100, 90, fontsize, "red",)
            }
            if (jump == true) {
                text("jumping", 100, 80, fontsize, "red",)
            }
            if (shooting == true) {

                text("shooting", 100, 60, fontsize, "red",)
            }
        }


        //Jumping stuff
        if (idle == true) {
            if (jump == true) {
                bolly = 100
            }
        }
        //Balling Code
        if (balling == true) {
            bollx = 190
            if (bolly <= handpos) {
                bollstudsar = false
            }
            if (bollstudsar == false) {
                bolly += ballspeed
            }
            if (bolly > groundY - 30) {
                bollstudsar = true
            }
            if (bollstudsar == true) {
                bolly -= ballspeed
            }

        } else {
            if (idle == true) {
                if (jump == true) {
                    bolly = -40
                    bollx = 155
                }
                if (idle == true) {
                    if (jump == false) {
                        if (shooting == false) {
                            bolly = 60
                            bollx = 190
                        } else {
                        }
                    }
                }
            } else {
                bolly = 65
                bollx = 190
                hoppbolly = 0
            }
        }
        //throw
        if (shooting == true) {
            if (bolly < 200) {
                world.t += throwspeed
                bolly = 80 + (b1.v0 * Math.sin(-Math.PI / ballforce) * world.t + ((world.g * world.t * world.t) / ballforce))
                bollx = 190 + (b1.v0 * Math.cos(-Math.PI / ballforce) * world.t)
            }
            if (bollx > 700) {
                world.t = 0
                shooting = false
                restartball = true
            }
        }


        //timing game
        function newhitter() {
            hitterrandom = randomInt(0, 270)
            hitterx = (W / 2) - 145 + hitterrandom
            hittery = 7 * (H / 8) + 5
            hitterhb.x = (W / 2) - 145 + hitterrandom
            hitterhb.y = 7 * (H / 8) + 5
        }
        if (greentored == false) {
            if (keyboard.space) {
                keyboard.space = false
                if (forcing == false) {
                    timingcounter2 = 0
                    timing = true
                    ts.timingstickx = (W / 2) - 150
                    ts.timingsticky = 7 * (H / 8) - 5
                    timingstickhb.x = (W / 2) - 150
                    timingstickhb.y = 7 * (H / 8) - 5
                    hitterrandom = randomInt(0, 130)
                    hitterx = (W / 2) - 145 + hitterrandom
                    hittery = 7 * (H / 8) + 5
                    hitterhb.x = (W / 2) - 145 + hitterrandom
                    hitterhb.y = 7 * (H / 8) + 5
                    greentored = true
                }
            }
        }
        if (greentored == true) {
            if (timing == true) {
                timercolor = "green"
                if (keyboard.space) {
                    keyboard.space = false
                    if (timingstickhb.intersects(hitterhb)) {
                        newhitter()
                        hitterhits += 2
                    } else {
                        newhitter()
                        if (hitterhits != 0) {
                            hitterhits -= 1
                        }
                    }
                }
            }
        }

        if (hitterhits >= 2) {
            forcex = (W / 2) - 150 + 5
            forcey = 7 * (H / 8) + 5
            timercolor = "red"
            timing = false
            forcing = true
            hitterx = -30
            hittery = 0
            ts.timingstickx = -10
            ts.timingsticky = 0
            hitterhb.x = -40
            hitterhb.y = 0
            timingstickhb.x = -30
            timingstickhb.y = 0
        }



        if (timing == true) {
            if (timingcounter2 <= 0) {
                timingcounter = true
            }
            if (timingcounter == true) {
                ts.timingstickx += timingspeed
                timingcounter2 += timingspeed
                timingstickhb.x += timingspeed
            }
            if (timingcounter2 >= 300) {
                timingcounter = false
            }
            if (timingcounter == false) {
                ts.timingstickx -= timingspeed
                timingcounter2 -= timingspeed
                timingstickhb.x -= timingspeed
            }
        } else {
            timing = false
            timingcounter2 = 0
        }


        if (keyboard.o) {
            pointcounter += 1
        }

        //Force
        if (forcing == true) {
            if (keyboard.space) {
                keyboard.space = false
                if (force > 100) {
                    ballforce = 6
                } else {
                    ballforce = 4
                }
                shooting = true
                forcing = false
                timing = false
                throwspeed = 0.1

            }
        }
        if (forcing == true) {
            if (force == 0) {
                forcecounter = true
            }
            if (forcecounter == true) {
                force += 5
            }
            if (force >= 290) {
                forcecounter = false
            }
            if (forcecounter == false) {
                force -= 5
            }
        }






        //Button Presses
        if (keyboard.l) {
            keyboard.l = false
            if (debugmenu != true) {
                debugmenu = true
            } else {
                debugmenu = false
            }
        }
        if (jump == false) {

            if (keyboard.digit1) {
                balling = true
                idle = false
            }
        }
        if (jump == false) {

            if (keyboard.digit2) {
                balling = false
                idle = true
            }
        }
        //Cheats
        if (keyboard.i) {
            shooting = true
        }
        if (keyboard.m) {
            forcing = true
        }
        if (keyboard.digit0) {
            keyboard.digit0 = false
            ballforce -= 0.5
        }
        if (keyboard.digit9) {
            keyboard.digit9 = false
            ballforce += 0.5
        }
        //Jumping code
        if (keyboard.w) {
            jump = true
            keyboard.w = false
        }
        if (jump == true) {
            if (ypos > 100) {
                jumphojd = false
            }
            if (jumphojd == false) {
                ypos -= jumpspeed
                handpos -= jumpspeed
                if (idle == true) {
                    hoppbolly -= jumpspeed
                }
            }
            if (ypos < 0) {
                jumphojd = true
            }
            if (jumphojd == true) {
                ypos += jumpspeed
                handpos += jumpspeed
                if (idle == true) {
                    hoppbolly += jumpspeed
                }
            }
            if (ypos == 100) {
                if (jumphojd == true) {
                    jump = false
                }
            }
        }
        //running
        if (shooting == false) {
            if (xpos >= -100) {

                if (keyboard.a) {
                    xpos -= 5
                    running = true
                } else if (keyboard.d) {
                    running = true
                } else {
                    running = false
                }


            }
            if (xpos < W - 195) {
                if (keyboard.d) {
                    xpos += 5
                    running = true
                } else if (keyboard.a) {
                    running = true
                } else {
                    running = false
                }

            }
        }


        //Counter
        if (running == true) {
            if (runcounter == 0) {
                runcounter = 100
            } else {
                runcounter -= 0.5
            }
        }

        //Checkings 
        if (restartball == true) {
            timing = false
            shooting = false
            forcing = false
            hitterhits = 0
            force = 0
            greentored = false
            timercolor = "green"
            restartball = false
        }
        if (skincolor == rgba(90, 69, 60)) {
            ballspeed = 10
            runspeed = 5
            jumpspeed = 8
        } else if (skincolor == rgba(165, 126, 110)) {

            ballspeed = 10
            runspeed = 5
            jumpspeed = 8
        } else {
            ballspeed = 10
            runspeed = 5
            jumpspeed = 8
        }
        if (idle == true || shooting == true) {
            pointcheck = false
            if (jumphojd == true || shooting == true) {
                if (bhb.intersects(korghb1)) {
                    if (bhb.intersects(korghb2)) {
                        if (bhb.intersects(korghb3)) {
                            if (xpos > 200) {
                                if (pointcheck == false) {

                                    pointcounter += 1
                                    pointcheck = true
                                }
                            } else if (xpos > 100 && xpos < 200) {
                                if (pointcheck == false) {
                                    pointcounter += 2
                                    pointcheck = true
                                }
                            } else {
                                if (pointcheck == false) {
                                    pointcounter += 3
                                    pointcheck = true
                                }
                            }


                        }
                    }
                }
            }
        }

        //Customizations
        if (keyboard.digit4) {
            skincolor = rgba(210, 161, 140)
        }
        if (keyboard.digit5) {
            skincolor = rgba(165, 126, 110)
        }
        if (keyboard.digit6) {
            skincolor = rgba(90, 69, 60)
        }
        if (keyboard.digit7) {
            keyboard.digit7 = false
            if (hairlength == 10) {
                hairlength = 50
            } else {
                hairlength = 10
            }
        }
        //inrekorg
        rectangle(W - 68, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 64, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 60, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 56, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 52, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 48, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 44, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 40, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 36, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 32, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 28, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 24, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 20, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 16, basketheighty - 100, 2, 10, netcolor)
        rectangle(W - 66, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 58, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 50, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 42, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 34, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 26, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 18, basketheighty - 90, 2, 10, netcolor)
        rectangle(W - 64, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 60, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 56, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 52, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 48, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 44, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 40, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 36, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 32, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 28, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 24, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 20, basketheighty - 80, 2, 20, netcolor)
        rectangle(W - 62, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 58, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 54, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 50, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 46, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 42, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 38, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 34, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 30, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 26, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 22, basketheighty - 60, 2, 10, netcolor)
        rectangle(W - 60, basketheighty - 50, 38, 2, netcolor)


        b1.update()
        //korg
        rectangle(W - 70, H / 2 - 102, 70, 5, "black")
        rectangle(W - 5, H / 2 - 152, 5, 70, "red")
        p1.update()
        ts.update()
    }
})
//# sourceMappingURL=app.js.map