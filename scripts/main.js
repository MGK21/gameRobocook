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
    const player = new Player(0, 696);
    await player.init();


    const backGround = new ImageMoveGameObject(0, 0);
    backGround.loadSprite("../images/background ice all.png");
    gameState.add(backGround);
    gameState.add(player);
    player.onCollision = ()=>{
        console.log("hit")
    }


    setInterval(() => {
        const enemy = new Enemy(500+Math.random()*1000, 0, 600);
        enemy.loadSprite("../images/icicle.png");
        gameState.add(enemy);

        setTimeout(()=>{
            gameState.remove(enemy)
        },1000)
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

    }

    function render() {
        gameState.render();

    }
    requestAnimationFrame(main);

    loader.loaded().then(main);
})();