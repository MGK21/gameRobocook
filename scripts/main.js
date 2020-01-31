import loader from "./loader.js";
import gameState from "./GameState.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import Animation from "./Animation.js";
import GameObject from "./GameObject.js";
import ImageMoveGameObject from "./ImageMoveGameObject.js";
import {
    gameLogic
} from "./gameLogic.js";




(async function () {
    const player = new Player(100, 696);
    await player.init();


    const backGround = new ImageMoveGameObject(0, 0);
    backGround.loadSprite("../images/background ice all.png");
    gameState.add(backGround);
    gameState.add(player);
    window.player = player;
    player.onCollision = (gameObject) => {
        gameObject.collisionEnable = false;
        gameLogic.score -= 100;
    }

    window.gameLogic = gameLogic;
    //clamp scrollSpeed = clamp(1000,3500)
    //1000->3500
    //0 -> 60
    //3500/60 = 58;
    let lastScrollSpeed = 1000;
    setInterval(() => {
        if (gameLogic.defaultScrollSpeed >= 3500) return;
        lastScrollSpeed = gameLogic.defaultScrollSpeed;
        gameLogic.defaultScrollSpeed += 200;

        for (const o in player.runAnimation.speedOfFrame) {
            player.runAnimation.speedOfFrame[o] -= 1 * ((gameLogic.defaultScrollSpeed - lastScrollSpeed) / 50);
        }
        player.runAnimation.setSpeedOfFrame(player.runAnimation.speedOfFrame);
    }, 3000)

    setInterval(() => {
        const enemy = new Enemy(500 + Math.random() * 1000, 0, 600);
        enemy.loadSprite("../images/icicle.png");
        enemy.hitBoxFunction = (hitBox, gameObject) => {
            gameObject.updateHitBoxToSprite();
            hitBox.x += 30;
            hitBox.width -= 30;
        }
        gameState.add(enemy);
        window.enemy = enemy;
    }, 2000)


    let lastTime;

    function main() {
        var now = Date.now();
        var dt = (now - lastTime) / 1000.0;
        if (dt)
            update(dt);
        render();

        lastTime = now;
        requestAnimationFrame(main);

    };

    function update(dt) {
        gameState.update(dt);
        document.getElementById("score").innerText = gameLogic.score;
    }

    function render() {
        gameState.render();

    }
    requestAnimationFrame(main);

    loader.loaded().then(main);
})();