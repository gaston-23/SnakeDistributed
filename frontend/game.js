import FlappyBirdScene from './js/FlappyBirdScene.js';
var game;
window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 600
                },
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            width: 288,
            height: 512
        },
        scene : [ FlappyBirdScene ]
    };

    game = new Phaser.Game(config);
}

export default game