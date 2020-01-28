import GameObject from "./GameObject.js";
import {
    canvas
} from "./context.js"

import {gameLogic} from "./gameLogic.js"

export default class ImageMoveGameObject extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.collisionEnable = false;
        this.imageWidth = 0;
    }

    update(dt) {
        this.imageWidth += -gameLogic.scrollSpeed * dt;
        if (this.imageWidth < -this.sprite.width)
            this.imageWidth = 0;
    }

    render(ctx) {
        if (this.sprite) {
            ctx.drawImage(this.sprite, this.imageWidth + 1, 0);
            ctx.drawImage(this.sprite, this.sprite.width + this.imageWidth - 1, 0);
        }
    }
}