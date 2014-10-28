enchant();

    var TEXTURE_BOX = "enchant9.png";
window.onload = function(){
    var core = new Core(512, 512);

    core.preload(TEXTURE_BOX);
    core.onload = function(){
        RBC.Methods.initScene3d();
        RBC.Methods.initStartCamera();
        RBC.Methods.createStartScene();

        var t = new Label("");
        t.text = "start";
        t.font = "50px bold sans";
        t.color = "red";
        t.x = 215;
        t.y = 200;
                enchant.Core.instance.currentScene.addChild(t);
        t.addEventListener('touchstart', function(){
        RBC.Methods.clearStartScene();

        RBC.Methods.initGameCamera();
        RBC.Methods.createCubes();
        })

    };
    core.start();
};

var check_serialize = function(){};
