RBC.Camera = {};
RBC.Camera.isTouch = false;
RBC.Methods.initScene3d = function(){
    var core = enchant.Core.instance;
    var scene = new Scene3D();
    scene.backgroundColor = [0.1, 0.2, 0.25, 1];

    //----------カメラ、光源の設定		
    //光源の設定

    var dLight = new DirectionalLight();
    dLight.color = [0.4, 0.4, 0.4];
    dLight.directionX = 0;
    dLight.directionY = 10;
    dLight.directionZ = 0;

    var aLight = new AmbientLight();
    aLight.color = [2.0, 2.0, 2.0];
    scene.backgroundColor = [0.1, 0.2, 0.25, 1];
    scene.setDirectionalLight(dLight);
    scene.setAmbientLight(aLight);


    //カメラ情報表示のラベル
    var info_label = new Label("");
    info_label.x = 10;
    info_label.y = 10;
    info_label.text = "";
    info_label.font = "25px sans bold";
    info_label.color = "lightgreen";
    //	    game.rootScene.addChild(info_label); //i系軸のデバッグ時には有効にすると便利

    //カメラ位置と方向を設定
    RBC.Camera.instance = scene.getCamera();
    var camera = RBC.Camera.instance;
    camera.z = 15 * distScale;
    camera.y = 6;
    camera.x = 15 * distScale;
    camera.centerX = 0;
    camera.centerY = 0;
    camera.centerZ = 0;
    //カメラ回転系操作
    var distScale = 11;
    var oldX = 0;
    var r = 10;
}
RBC.Methods.initGameCamera = function(){
    var core = enchant.Core.instance;
    var scene = new Scene3D();
    //カメラ位置と方向を設定
    var camera = RBC.Camera.instance;
    camera.z = 15 * distScale;
    camera.y = 2;
    camera.x = 15 * distScale;
    camera.centerX = 0;
    camera.centerY = 0;
    camera.centerZ = 0;
    //カメラ回転系操作
    var distScale = 15;
    var rotScale = 1;
    var oldX = 0;
    RBC.Camera.r = 10;
    RBC.Camera.targR = 10;
    core.rootScene.addEventListener('enterframe', function(){
            if(RBC.Camera.isTouch === false){
                var diff = RBC.Camera.targR - RBC.Camera.r;
                if(RBC.Camera.r > 0){
                    RBC.Camera.r += diff/3;
                }else{
                    RBC.Camera.r += Math.PI*2;
                    diff = RBC.Camera.targR - RBC.Camera.r;
                    RBC.Camera.r += diff/3;
                
                }
            }
            camera.x = Math.cos(RBC.Camera.r*rotScale) * distScale;
            camera.y = 0.4 * distScale;
            camera.z = Math.sin(RBC.Camera.r*rotScale) * distScale;
    });
    core.rootScene.addEventListener('touchstart', function(e) {
            oldX = e.x;
            RBC.Camera.isTouch = true;
    });
    core.rootScene.addEventListener('touchmove', function(e) {
            if(RBC.Camera.isTouch = true && RBC.TouchController.isTouch === false){
                RBC.Camera.r += (e.x - oldX) / 800 * Math.PI*2;
                RBC.Camera.r = RBC.Camera.r % (Math.PI*2);
                oldX = e.x;
            }
    });
    core.rootScene.addEventListener('touchend', function(e){
            //調整
            var half = Math.PI/4;
            RBC.Camera.isTouch = false;
            var n = RBC.Camera.r;
            if(n < 0){
                n += Math.PI*2;
            }
            if(n >= 0 && n < Math.PI/2){
                n = 0 + half;
            }else if(n >= Math.PI/2 && n < Math.PI){
                n = Math.PI/2 + half;
            }else if(n >= Math.PI && n < Math.PI/2 + Math.PI ){
                n = Math.PI + half;
            }else if(n >= Math.PI/2 + Math.PI){
                n = Math.PI/2 + Math.PI + half;
            }
            RBC.Camera.targR = n;
    })
}


RBC.Methods.initStartCamera = function(){
    var core = enchant.Core.instance;
    var scene = enchant.Core.instance.currentScene3D;
    var camera = RBC.Camera.instance;
    camera.x = 2;
    camera.y = 10;
    camera.z = 25;
    camera.centerX = 2;
    camera.centerY = 0;
    camera.centerZ = 0;
}
RBC.StartCubes = [];
RBC.Methods.createStartScene = function(){
    var scene = enchant.Core.instance.currentScene3D;
    var scale = 0.32;
    var fix = scale/0.5;
    var w = 16;
    var h = 16;
    for(var i=0;i<w;i++){
        for(var j=0;j<h;j++){
            var b = new RBC.StartCube(scale);
            b.x = (i - w/2 + (j%2)/1.4) * fix + i * 0.27 ;
            b.y = (j - h/2) * fix;
            b.z = (j - h/2)*(-1) * fix * 0.7;

            b.distCenter = Math.sqrt( (i-w/2)*(i-w/2) + (j-h/2)*(j-h/2) );
            if( i === w/2 && j === h/2){
            }else{
                b.distCenter += 0.1;
            }
            b.addEventListener('enterframe', function(){
                    if(this.age % (100) === Math.round(this.distCenter*10)){
                        b.rotApply(90, 5, this);
                    }
            });
            scene.addChild(b);
            RBC.StartCubes.push(b);
        }
    }
}
RBC.Methods.clearStartScene = function(){
    var scene = enchant.Core.instance.currentScene3D;
    var len = RBC.StartCubes.length;
    for (var i=len-1;i>= 0;i--){
        scene.removeChild(RBC.StartCubes[i])
    }
}
