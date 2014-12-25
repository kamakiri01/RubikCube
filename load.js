enchant();
var IMAGE_LIST = [];
var TEXTURE_BOX = RBC.CONST.TEXTURE_BOX;
IMAGE_LIST.push(TEXTURE_BOX);
var IMAGE_BACK = RBC.CONST.IMAGE_BACK;
IMAGE_LIST.push(IMAGE_BACK);
var IMAGE_START = "./images/start.png";
IMAGE_LIST.push(IMAGE_START);
var IMAGE_EASY = "./images/easy.png";
IMAGE_LIST.push(IMAGE_EASY);
var IMAGE_NORMAL = "./images/normal.png";
IMAGE_LIST.push(IMAGE_NORMAL);
var IMAGE_HARD = "./images/hard.png";
IMAGE_LIST.push(IMAGE_HARD);
window.onload = function(){
    var core = new Core(512, 512);
    core.preload(IMAGE_LIST);
    core.onload = function(){
        var game_start_seque = function(){
            RBC.Methods.clearStartScene();
            RBC.Methods.createScene2DModule();
            RBC.Methods.initGameCamera();
            RBC.Methods.createCubes();
            RBC.Methods.game_start();
        };
        RBC.Methods.initScene3d();
        RBC.Methods.initStartCamera();
        RBC.Methods.createStartScene();
        //開始画面
        var scene = enchant.Core.instance.currentScene;
        var t = new Sprite(192, 64);
        t.image = core.assets[IMAGE_START];
        t.x = 512/2 - 192/2 + 10;
        t.y = 200;
        scene.addChild(t);
        t.addEventListener('touchend', function(){
                scene.removeChild(t);
                //難易度選択
                var n0 = new Sprite(192, 64);
                n0.image = core.assets[IMAGE_HARD];
                n0.x = 512/2 - 192/2;
                n0.y = 200;
                scene.addChild(n0);
                n0.addEventListener('touchend', function(){
                        scene.removeChild(n0);
                        scene.removeChild(n1);
                        scene.removeChild(n2);
                        RBC.difficult = 3;
                        game_start_seque();
                });
               var n1 = new Sprite(256, 64);
               n1.image = core.assets[IMAGE_NORMAL];
                n1.x = 512/2 - 256/2;
                n1.y = 300;
                scene.addChild(n1);
                n1.addEventListener('touchend', function(){
                        scene.removeChild(n0);
                        scene.removeChild(n1);
                        scene.removeChild(n2);
                        RBC.difficult = 2;
                        game_start_seque();
                });
               var n2 = new Sprite(192, 64);
               n2.image = core.assets[IMAGE_EASY];
                n2.x = 512/2 - 192/2;
                n2.y = 400;
                scene.addChild(n2);
                n2.addEventListener('touchend', function(){
                        scene.removeChild(n0);
                        scene.removeChild(n1);
                        scene.removeChild(n2);
                        RBC.difficult = 1;
                        game_start_seque();
                });
        });
    };
    core.start();
};
