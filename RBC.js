var RBC = {};
RBC.CONST = {};
RBC.CONST.SCALE = 1.05;
RBC.CONST.TEXTURE_BOX =  "./images/enchant9.png";
RBC.Methods = {};

RBC.Cubes = enchant.Class.create(enchant.gl.primitive.Cube, {
        initialize: function(scale){
            enchant.gl.primitive.Cube.call(this, scale);
            if(RBC.Cubes.Texture === undefined){
                var texture = new Texture();
                texture.src = RBC.CONST.TEXTURE_BOX;
                RBC.Cubes.Texture = texture;
            }
            this.mesh.texture = RBC.Cubes.Texture;
            //テクスチャを貼る
            var fx = 0.5, fy = 0.5, fz = 0.5; //キューブのローカル座標内でテクスチャを貼る位置場所を処理する変数
            this.mesh.vertices = [ //テクスチャを貼るオブジェクトのローカル座標での面の座標を指定（回転方向で法線が決まる？）
                fx, fy, fz,  -fx, fy, fz,  -fx,-fy, fz,   fx,-fy, fz,  // v0-v1-v2-v3 front
                //fx, fy, fz,   fx,-fy, fz,   fx,-fy,-fz,   fx, fy,-fz,  // v0-v3-v4-v5 right
                fx, fy,-fz,  fx,-fy,-fz,      fx,-fy, fz,   fx, fy, fz,// v0-v3-v4-v5 right
                //fx, fy, fz,   fx, fy,-fz,  -fx, fy,-fz,  -fx, fy, fz,  // v0-v5-v6-v1 top
                 -fx, fy, fz,  -fx, fy,-fz, fx, fy,-fz,   fx, fy, fz,  // v0-v5-v6-v1 top
                -fx, fy, fz,  -fx, fy,-fz,  -fx,-fy,-fz,  -fx,-fy, fz,  // v1-v6-v7-v2 left
                -fx,-fy,-fz,   fx,-fy,-fz,   fx,-fy, fz,  -fx,-fy, fz,  // v7-v4-v3-v2 bottom
                //fx,-fy,-fz,  -fx,-fy,-fz,  -fx, fy,-fz,   fx, fy,-fz   // v4-v7-v6-v5 back
                fx, fy,-fz,   -fx, fy,-fz,    -fx,-fy,-fz, fx,-fy,-fz // v4-v7-v6-v5 back
            ];
            this.mesh.normals = [ //ローカル座標で法線の方向を指定する（テクスチャを貼る表裏を決める）v0
                0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,   // v0-v1-v2-v3 front
                1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,   // v0-v3-v4-v5 right
                0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,   // v0-v5-v6-v1 top
                -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,   // v1-v6-v7-v2 left
                0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,   // v7-v4-v3-v2 bottom
                0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1    // v4-v7-v6-v5 back
            ];
            this.mesh.texCoords = [ //テクスチャ画像の切り取る部分を指定する
                0.3, 0.3,   0, 0.3,   0, 0,   0.3, 0,  // v0-v1-v2-v3 front yellow *
                0.34, 0,   0.34, 0.32,   0.65, 0.32,   0.65, 0,  // v0-v3-v4-v5 right blue
                0.34, 0.34,   0.65, 0.34,   0.65, 0.65,   0.34, 0.65,  // v0-v5-v6-v1 top white * 
                0.34, 0.67,   0.65, 0.67,   0.65, 0.98,   0.34, 0.98,  // v1-v6-v7-v2 left red *
                0.67, 0.67,   1, 0.67,   1, 1,   0.67, 1,  // v7-v4-v3-v2 bottom black * 
                0, 0.34,   0.32, 0.34,   0.32, 0.65,   0, 0.65   // v4-v7-v6-v5 back green * 
            ];
            this.mesh.texture.ambient = [0.3,0.3,0.3,0.5];
            this.addEventListener('touchstart', function(e){
                    RBC.TouchController.startX = e.x;
                    RBC.TouchController.startY = e.y;
                    RBC.TouchController.currentX = e.x;
                    RBC.TouchController.currentY = e.y;
                    RBC.TouchController.isTouch = true;
                    RBC.Methods.getCurrentTouchCube(this, e);
            });
            this.addEventListener('touchmove', function(e){
                    RBC.TouchController.currentX = e.x;
                    RBC.TouchController.currentY = e.y;
            
            });
            this.addEventListener('touchend', function(e){
                    var x = RBC.TouchController.startX;
                    var y = RBC.TouchController.startY;
                    var dx = e.x - x;
                    var dy = e.y - y;
                    var d = Math.sqrt(dx*dx + dy*dy);
                    if(d > RBC.TouchController.judgeLength){
                        RBC.Methods.rotCurrentTouchCube(dx, dy, this, e);
                    }
                    //end
                    RBC.TouchController.startX = 0;
                    RBC.TouchController.startY = 0;
                    RBC.TouchController.isTouch = false;
            });
        }
});
RBC.TouchController = {
    isTouch: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    judgeLength: 10,

}

RBC.Methods.createCubes = function(){
    var scene = enchant.Core.instance.currentScene3D;
    RBC.cubes = [];
    var scale = RBC.CONST.SCALE;
    for(var i=0; i<3; i++){ //x軸方向に３枚
        RBC.cubes[i] = [];
        for(var j=0; j<3; j++){ //y軸方向に３本
            RBC.cubes[i][j] = [];
            for(var k=0; k<3; k++){ //z軸方向に３個
                RBC.cubes[i][j][k] = new RBC.Cubes(1.0); //cube作成
                //グローバル座標における座標       			
                RBC.cubes[i][j][k].x = 0;
                RBC.cubes[i][j][k].y = 0;
                RBC.cubes[i][j][k].z = 0;
                //rotCube要求されるグローバル座標基準の回転をローカルで実現するために、
                //要求されたグローバル座標軸がローカルでどちらを向いているか保持するベクトル
                RBC.cubes[i][j][k].ix = [1,0,0];
                RBC.cubes[i][j][k].iy = [0,1,0];
                RBC.cubes[i][j][k].iz = [0,0,1];

                //キューブを配置につける移動行列プロパティ
                RBC.cubes[i][j][k].translate = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    (i - 1)*scale, (j - 1)*scale, (k - 1)*scale, 1
                ];
                //----------座標移動を行う
                //        			mat4.multiply(cubes[i][j][k]._matrix, cubes[i][j][k].translate); //cubeをローカル座標で配置につける
                //グローバル座標で配置につける
                RBC.cubes[i][j][k].x = (i - 1)*scale;
                RBC.cubes[i][j][k].y = (j - 1)*scale;
                RBC.cubes[i][j][k].z = (k - 1)*scale;
                //cubeを表面沿いに回転させる回転移動行列を津kる
                RBC.cubes[i][j][k].rcompX = [];
                //translateをそのまま回転に組み込むと大きすぎてキューブを離脱していしまうのでスケーリングする
                RBC.cubes[i][j][k].sc = 0.2;	
                scene.addChild(RBC.cubes[i][j][k]);
                //メンバーに配列位置を組み込む
                RBC.cubes[i][j][k].i = i;
                RBC.cubes[i][j][k].j = j;
                RBC.cubes[i][j][k].k = k;
            }
        }
    }
};
//@param
//axis "x" or "y" or "z"
//panel 0, 1.05, -1.05
//angle 90
//spd 10~100about
//何軸で、どのパネルを、何度、どの速さで回すか
RBC.Methods.rotCube = function(axis, panel, angle, spd){
    var core = enchant.Core.instance;
    if(axis === "x"){ //x軸回転させる
        core.addEventListener('enterframe', function(){
                angle -= spd;
                RBC.Methods.rotateMatrix(1, 0, 0, axis, panel, spd);
                if( Math.abs(angle) <= 0){ 
                    this.removeEventListener('enterframe', arguments.callee);
                    RBC.Methods.adjust_cube();
                    RBC.Methods.proxy_axis(axis, panel);
                    check_serialize();
                    console.log("proxy set. x");
                }
        });
    }else if(axis === "y"){ //y軸回転させる
        core.addEventListener('enterframe', function(){
                angle -= spd;
                RBC.Methods.rotateMatrix(0, 1, 0, axis, panel, spd);
                if( Math.abs(angle) <= 0){
                    this.removeEventListener('enterframe', arguments.callee);
                    RBC.Methods.adjust_cube();
                    RBC.Methods.proxy_axis(axis, panel);
                    check_serialize();
                    console.log("proxy set. y");
                }
        });
    }else if(axis === "z"){ //z軸回転させる
        core.addEventListener('enterframe', function(){
                angle -= spd;
                RBC.Methods.rotateMatrix(0, 0, 1, axis, panel, spd);

                if( Math.abs(angle) <= 0){
                    this.removeEventListener('enterframe', arguments.callee);
                    RBC.Methods.adjust_cube();
                    RBC.Methods.proxy_axis(axis, panel);
                    check_serialize();
                    console.log("proxy set. z");
                }
        });
    }
};
RBC.Methods.rotateMatrix = function(rx, ry, rz,axis,panel, spd){
    var cubes = RBC.cubes;
    for(var i=0; i<3; i++){ //x軸方向に３枚
        for(var j=0; j<3; j++){ //y軸方向に３本
            for(var k=0; k<3; k++){ //z軸方向に３個
                if(axis === "x" && cubes[i][j][k].x === panel){ //回転軸の確認と、cubesが回るべきパネルであるか
                    RBC.Methods.rotMatrix_(cubes[i][j][k], spd, 1,0,0, cubes[i][j][k].ix[0],cubes[i][j][k].ix[1],cubes[i][j][k].ix[2]);
                    console.log("rotateX");
                }
                if(axis === "y" && cubes[i][j][k].y === panel){
                    RBC.Methods.rotMatrix_(cubes[i][j][k], spd, 0,1,0, cubes[i][j][k].iy[0],cubes[i][j][k].iy[1],cubes[i][j][k].iy[2]);
                    console.log("rotateY");
                }
                if(axis === "z" && cubes[i][j][k].z === panel){
                    RBC.Methods.rotMatrix_(cubes[i][j][k], spd, 0,0,1, cubes[i][j][k].iz[0],cubes[i][j][k].iz[1],cubes[i][j][k].iz[2]);
                    console.log("rotateZ");
                }	       				
            }
        }
    }
}; //rotateMatrix
RBC.Methods.rotMatrix_ = function rotMatrix_ (target, radian, rx, ry,rz, ix,iy,iz){

    //----------位置の回転行列群
    var rad = Math.PI/180 * (radian);
    var V3_cube = [target.x, target.y, target.z, 1];
    var M4_Tra = [
        rx^2 * (1 - Math.cos(rad)) + Math.cos(rad), rx * ry * (1 - Math.cos(rad)) + rz *Math.sin(rad), rx * rz * (1 - Math.cos(rad)) - ry * Math.sin(rad), 0,
        rx * ry * (1 - Math.cos(rad)) - rz * Math.sin (rad), ry^2 * (1 - Math.cos(rad)) + Math.cos(rad), ry * rz * (1 - Math.cos(rad)) + rx * Math.sin(rad), 0,
        rx * rz * (1 - Math.cos(rad)) + ry * Math.sin(rad), ry * rz * (1 - Math.cos(rad)) - rx * Math.sin(rad), rz^2 * (1 - Math.cos(rad)) + Math.cos(rad), 0,
        0,0,0,1
    ];
    //----------回転行列をクォータニオンから求める場合
    M4_Traq_ = (new Quat(rx,ry,rz,rad)); //クォータニオンを用意
    M4_Traq  = M4_Traq_.toMat4(mat4.create()); //行列に変換する
    mat4.multiplyVec3(M4_Traq, V3_cube); //任意軸回転行列4D、クォータニオンから取り出したもの
    //----------得られた座標の代入
    target.x = V3_cube[0];
    target.y = V3_cube[1];
    target.z = V3_cube[2];
    //----------姿勢を回転方向にあわせて回す
    target.rotationApply(new Quat(ix, iy, iz, Math.PI/180 * radian));
};
RBC.Methods.adjust_cube = function adjust_cube(){
    var cubes = RBC.cubes;
    var scale = RBC.CONST.SCALE;
    for(var i=0; i<3; i++){ //x軸方向に３枚
        for(var j=0; j<3; j++){ //y軸方向に３本
            for(var k=0; k<3; k++){ //z軸方向に３個
                console.log("rounded");
                cubes[i][j][k].x = Math.round(cubes[i][j][k].x) * scale; 
                cubes[i][j][k].y = Math.round(cubes[i][j][k].y) * scale;
                cubes[i][j][k].z = Math.round(cubes[i][j][k].z) * scale;
            }
        }
    }			
};
//----------回転によるローカル座標軸の変化を吸収する代理軸の管理
RBC.Methods.proxy_axis = function proxy_axis(axis, panel){
    var cubes = RBC.cubes;
    console.log("proxy_axis active");
    for(var i=0; i<3; i++){ //x軸方向に３枚
        for(var j=0; j<3; j++){ //y軸方向に３本
            for(var k=0; k<3; k++){ //z軸方向に３個
                if(axis === "x" && cubes[i][j][k].x === panel){ //回転軸の確認と、cubesが回るべきパネルであるか
                    //x軸回転の軸の遷移
                    console.log("proxy_axis_do X");
                    cubes[i][j][k].iy = RBC.Methods.proxy_axis_do1(cubes[i][j][k].iy, cubes[i][j][k].ix);
                    cubes[i][j][k].iz = RBC.Methods.proxy_axis_do1(cubes[i][j][k].iz, cubes[i][j][k].ix);
                }
                if(axis === "y" && cubes[i][j][k].y === panel){
                    //y軸回転の軸の遷移	
                    console.log("proxy_axis_do Y");
                    cubes[i][j][k].iz = RBC.Methods.proxy_axis_do1(cubes[i][j][k].iz, cubes[i][j][k].iy);
                    cubes[i][j][k].ix = RBC.Methods.proxy_axis_do1(cubes[i][j][k].ix, cubes[i][j][k].iy);
                }
                if(axis === "z" && cubes[i][j][k].z === panel){
                    //z軸回転の軸の遷移	
                    console.log("proxy_axis_do X");
                    cubes[i][j][k].ix = RBC.Methods.proxy_axis_do1(cubes[i][j][k].ix, cubes[i][j][k].iz);
                    cubes[i][j][k].iy = RBC.Methods.proxy_axis_do1(cubes[i][j][k].iy, cubes[i][j][k].iz);
                }
            }
        }
    }
}; //proxy_axis
//----------iがつくベクトルを ”Cubeのローカル系で” 回転する。
//正確には、回すべき軸をローカル系で見立てたときに見えるベクトルを使って回す。
RBC.Methods.proxy_axis_do1 = function(proxyVec, proxyaxis){
    return mat4.multiplyVec3((new Quat(proxyaxis[0],proxyaxis[1],proxyaxis[2],  -Math.PI/180 *90)).toMat4(mat4.create()), proxyVec);
};		
RBC.Methods.array_compare = function array_compare (a1,a2){
    if(a1.length !== a2.length){
        return false;
    }else{
        for(var i=0; i<a1.length; i++){
            if(a1[i] !== a2[i]){
                return false;
            } 
        }
        return true;
    }
};
RBC.Methods.getCurrentTouchCube = function(cube,e ){
    //ここでキューブのタッチされた面を検出する
    console.log({cx:cube.x, cy:cube.y, cz:cube.z})
    var r = worldToScreen(cube.x, cube.y, cube.z);
    console.log(r);
};
RBC.Methods.rotCurrentTouchCube = function(dx, dy, cube, e){
    var r = worldToScreen(cube.x, cube.y, cube.z);
    if(RBC.TouchController.startX < r.x){
        console.log("touch Left");
    }else{
        console.log("touch Right");
    }

    if(dx < 0 && Math.abs(dx) > Math.abs(dy)){
        console.log("move Left");
        RBC.Methods.rotCube("y", cube.y, -90, -10);
        console.log("cube.y is " + cube.y);
    }else if(Math.abs(dx) > Math.abs(dy)){
        console.log("move Right");
        RBC.Methods.rotCube("y", cube.y, 90, 10);
        console.log("cube.y is " + cube.y);
    }
    if(dy < 0 && Math.abs(dx) <= Math.abs(dy)){
        console.log("move Up");
    }else if(Math.abs(dx) <= Math.abs(dy)){
        console.log("move Down");
    }
};


//----------シャッフル処理
var game_start = function(){
    //----------x,y,zのいずれかを返す関数
    var random_axis = function(){
        var num = Math.round(Math.random()*100)%3; //0~2
        if(num == 0){
            return "x";
        }else if(num == 1){
            return "y";
        }else{
            return "z";
        }
    };
    //----------パネルを返す
    var random_panel = function(){
        return (Math.round(Math.random()*100)%3 -1) * scale;
    };

    //なんでかloop()やrepeat()がうまく働かないので手書き
    exlabel.tl.then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    })
    .delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    }).delay(5).then(function(){
            RBC.Methods.rotCube(random_axis(), random_panel(), 90, 30);
    })
    //			

};

var worldToScreen = function(x, y, z){
    var mul = function(m1, m2) {
        return mat4.multiply(m1, m2, mat4.create());
    }
    var core = enchant.Core.instance;
    var scene = core.currentScene3D;
    var camera = scene.getCamera();
    // プロジェクション行列
    var pm = mat4.perspective(20, core.width / core.height, 1.0, 1000.0);
    // ビュー行列
    var vm = mat4.lookAt([ camera.x, camera.y, camera.z ], 
        [camera.centerX, camera.centerY, camera.centerZ ], 
        [camera.upVectorX, camera.upVectorY, camera.upVectorZ ]);

    var v = [ x, y, z, 1 ];
    var sc = mat4.multiplyVec4(mul(pm, vm), [ x, y, z, 1 ]);

    var scX = (1 - (-sc[0] / sc[3])) * (core.width / 2);
    var scY = (1 - (sc[1] / sc[3])) * (core.height / 2);

    return {x:scX, y:scY};
};

