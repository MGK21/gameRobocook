import GameObject from "./GameObject.js"
import {gameLogic} from "./gameLogic.js"

export default class Enemy extends GameObject {
    constructor(x, y, ySpeed) {
        super(x, y);
        this.ySpeed = ySpeed || 0;
    }

    update(dtime) {
        super.update(dtime);
        this.y += dtime * this.ySpeed;
        this.x += dtime * -gameLogic.scrollSpeed;
    }

    render(ctx) {
        super.render(ctx);
    }

}