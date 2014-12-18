enchant();

    var TEXTURE_BOX = "enchant9.png";
window.onload = function(){
    var core = new Core(512, 512);

    core.preload(TEXTURE_BOX);
    core.onload = function(){
        var game_start = function(){
            RBC.Methods.clearStartScene();
            RBC.Methods.initGameCamera();
            RBC.Methods.createCubes();
            RBC.Methods.game_start();
        };
        RBC.Methods.initScene3d();
        RBC.Methods.initStartCamera();
        RBC.Methods.createStartScene();

        //開始画面
        var t = new Label("");
        t.text = "start";
        t.font = "50px bold sans";
        t.color = "red";
        t.x = 215;
        t.y = 200;
        enchant.Core.instance.currentScene.addChild(t);
        t.addEventListener('touchstart', function(){
                enchant.Core.instance.currentScene.removeChild(t);

                //難易度選択
                var n0 = new Label("");
                n0.text = "HARD";
                n0.font = "50px bold sans";
                n0.color = "red";
                n0.x = 215;
                n0.y = 200;
                enchant.Core.instance.currentScene.addChild(n0);
                n0.addEventListener('touchstart', function(){
                        enchant.Core.instance.currentScene.removeChild(n0);
                        enchant.Core.instance.currentScene.removeChild(n1);
                        enchant.Core.instance.currentScene.removeChild(n2);
                        RBC.difficult = 3;
                        game_start();
                });
                var n1 = new Label("");
                n1.text = "NORMAL";
                n1.font = "50px bold sans";
                n1.color = "red";
                n1.x = 185;
                n1.y = 300;
                enchant.Core.instance.currentScene.addChild(n1);
                n1.addEventListener('touchstart', function(){
                        enchant.Core.instance.currentScene.removeChild(n0);
                        enchant.Core.instance.currentScene.removeChild(n1);
                        enchant.Core.instance.currentScene.removeChild(n2);
                        RBC.difficult = 2;
                        game_start();
                });
                var n2 = new Label("");
                n2.text = "EASY";
                n2.font = "50px bold sans";
                n2.color = "red";
                n2.x = 215;
                n2.y = 400;
                enchant.Core.instance.currentScene.addChild(n2);
                n2.addEventListener('touchstart', function(){
                        enchant.Core.instance.currentScene.removeChild(n0);
                        enchant.Core.instance.currentScene.removeChild(n1);
                        enchant.Core.instance.currentScene.removeChild(n2);
                        RBC.difficult = 1;
                        game_start();
                });

        });

    };
    core.start();
};

var check_serialize = function(){
    //ゲームが開始されている
    var ix = [0,0,0];
    var iy = [0,0,0];
    var iz = [0,0,0];

    for(var i=0; i<3; i++){ //x軸方向に３枚
        for(var j=0; j<3; j++){ //y軸方向に３本
            for(var k=0; k<3; k++){ //z軸方向に３個
                vec3.add(ix, RBC.cubes[i][j][k].ix);
                vec3.add(iy, RBC.cubes[i][j][k].iy);
                vec3.add(iz, RBC.cubes[i][j][k].iz);
            }
        }
    }

    console.log(Math.round(ix[0]) +", "+ Math.round(ix[1]) +", "+ Math.round(ix[2]));
    console.log(Math.round(iy[0]) +", "+ Math.round(iy[1]) +", "+ Math.round(iy[2]));
    console.log(Math.round(iz[0]) +", "+ Math.round(iz[1]) +", "+ Math.round(iz[2]));

    //27になる要素が各ベクトルにあればシリアライズされているとする
    if( (Math.abs(Math.round(ix[0])) == 27 || Math.abs(Math.round(ix[1])) == 27 || Math.abs(Math.round(ix[2])) == 27 )&& 
        (Math.abs(Math.round(iy[0])) == 27 || Math.abs(Math.round(iy[1])) == 27 || Math.abs(Math.round(iy[2])) == 27 )&& 
        (Math.abs(Math.round(iz[0])) == 27 || Math.abs(Math.round(iz[1])) == 27 || Math.abs(Math.round(iz[2])) == 27 ) 
    ){
        //game end
        console.log("game clear!");
        game_ending();
        //game.end(counter, score + "秒でルービックキューブを解きました！");
    };
};
var game_ending = function(){
    var score = enchant.Core.instance.frame - RBC.score;
    var trueScore = 1000 / score * 500;
    console.log("score is " + trueScore);
    window.document.location.href = "native://score/" + trueScore;
};
