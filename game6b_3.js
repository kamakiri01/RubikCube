/*6b_1ではcube._matrixとcube._rotationを使った制御だったため多軸回転が処理できなかったので、
	グローバル座標を用いた挙動の制御に切り替える

*/
enchant();

var TEXTURE_BOX = "./images/enchant9.png";
var TEXTURE_PLANE = "./images/opacity_blue.png";
var scale = 1.05; //キューブ間の隙間を出したい 1.05
var angle  =90;
var counter = 0; //タイマー用カウンター
var camrot = Math.PI/2;
var r = 0; //カメラ回転用


window.onload = function(){
	var game = new Game(640, 640);
	game.fps = 20;
// game.preload = ("~");じゃないよ！！！
	game.preload(TEXTURE_BOX, TEXTURE_PLANE);
	game.onload = function(){
		//----------3Dシーン作成
		var scene = new Scene3D();
		scene.backgroundColor = [0.1, 0.2, 0.25, 1];

//----------カメラ、光源の設定		
		//光源の設定
		var light = new DirectionalLight(); // 平行光源生成
		light.directionX =-1;            // 向き
		light.directionY = 1;
		light.directionZ = 2;
		light.color = [1.0, 1.0, 1.0];      // 色
		scene.setDirectionalLight(light);   // scene にセット
		
		//カメラ情報表示のラベル
		var info_label = new Label("");
		info_label.x = 10;
		info_label.y = 10;
	    info_label.text = "";
	    info_label.font = "25px sans bold";
	    info_label.color = "lightgreen";
//	    game.rootScene.addChild(info_label); //i系軸のデバッグ時には有効にすると便利
		
		//カメラ位置と方向を設定
		var camera = scene.getCamera();
		camera.z = 15;
		camera.y = 20;
		camera.x = 15;
		camera.centerX = 0;
		camera.centerY = 0;
		camera.centerZ = 0;

//----------ラベル
		//----------実験用関数を動かすためのラベルボタン
		
		var nlabel = new Label("");
		nlabel.x = 10;
		nlabel.y = 10;
		nlabel.font = "30px bold sans";
		nlabel.text= "popT";
		game.rootScene.addChild(nlabel);
		nlabel.addEventListener('touchmove', function(){
			console.log("onmouse");
		})
		
		var xlabel = new Label("");
		xlabel.x = 10; xlabel.y = 500;
		xlabel.font = "30px bold sans";
		xlabel.text= "rotX-0";
		game.rootScene.addChild(xlabel);
		xlabel.addEventListener('touchstart', function(){
			rotCube("x", 1.05, 90, 10);
		});

		var ylabel = new Label("");
		ylabel.x = 110; ylabel.y = 500;
		ylabel.font = "30px bold sans";
		ylabel.text= "rotY-0";
		game.rootScene.addChild(ylabel);
		ylabel.addEventListener('touchstart', function(){
			rotCube("y", 1.05, 90, 10);
		});

		var zlabel = new Label("");
		zlabel.x = 210; zlabel.y = 500;
		zlabel.font = "30px bold sans";
		zlabel.text= "rotZ-0";
		game.rootScene.addChild(zlabel);
		zlabel.addEventListener('touchstart', function(){
			rotCube("z", 1.05, 90, 10);
		});

		var xlabel_ = new Label("");
		xlabel_.x = 10; xlabel_.y = 550;
		xlabel_.font = "30px bold sans";
		xlabel_.text= "rotX-1";
		game.rootScene.addChild(xlabel_);
		xlabel_.addEventListener('touchstart', function(){
			rotCube("x", 0, 90, 10);
		});

		var ylabel_ = new Label("");
		ylabel_.x = 110; ylabel_.y = 550;
		ylabel_.font = "30px bold sans";
		ylabel_.text= "rotY-1";
		game.rootScene.addChild(ylabel_);
		ylabel_.addEventListener('touchstart', function(){
			rotCube("y", 0, 90, 10);
		});

		var zlabel_ = new Label("");
		zlabel_.x = 210; zlabel_.y = 550;
		zlabel_.font = "30px bold sans";
		zlabel_.text= "rotZ-1";
		game.rootScene.addChild(zlabel_);
		zlabel_.addEventListener('touchstart', function(){
			rotCube("z", 0, 90, 10);
		});

		var xlabel__ = new Label("");
		xlabel__.x = 10; xlabel__.y = 600;
		xlabel__.font = "30px bold sans";
		xlabel__.text= "rotX-2";
		game.rootScene.addChild(xlabel__);
		xlabel__.addEventListener('touchstart', function(){
			rotCube("x", -1.05, 90, 10);
		});

		var ylabel__ = new Label("");
		ylabel__.x = 110; ylabel__.y = 600;
		ylabel__.font = "30px bold sans";
		ylabel__.text= "rotY-2";
		game.rootScene.addChild(ylabel__);
		ylabel__.addEventListener('touchstart', function(){
			rotCube("y", -1.05, 90, 10);
		});

		var zlabel__ = new Label("");
		zlabel__.x = 210; zlabel__.y = 600;
		zlabel__.font = "30px bold sans";
		zlabel__.text= "rotZ-2";
		game.rootScene.addChild(zlabel__);
		zlabel__.addEventListener('touchstart', function(){
			rotCube("z", -1.05, 90, 10);
		});


//開始ボタン 兼 カウンター
		var exlabel = new Label("");
		exlabel.x = 380;
		exlabel.y = 20;
		exlabel.font = "50px bold sans";
		exlabel.color = "red";
		exlabel.text = "Game start!";
		game.rootScene.addChild(exlabel);
		
		
		//タッチしてゲーム開始
		exlabel.addEventListener('touchstart',function(){
			counter -= 5;
			exlabel.tl.moveTo(560, 15,20);
			
			game.rootScene.addEventListener('enterframe', function(){
				camrot += (Math.PI/2)*0.08; //カメラ回転速度0.8
				camera.x = Math.cos(camrot-0.8) * 20; //半径20で回転
				camera.z = Math.sin(camrot-0.8) * 20;
				
				if(counter > (-1) ){
					r = camrot; //主導回転との整合性を取る
					this.removeEventListener('enterframe', arguments.callee);
				};
			});
			game_start(); //シャッフル処理開始
		});
		
		//カウンタ起動、表示は一回だけ起動させたいので別イベントとした
		exlabel.addEventListener('touchstart', function(){
			game.rootScene.addEventListener('enterframe', function(){
			counter += 0.05;
			exlabel.text = Math.ceil(counter); //切捨て御免
			});
			this.removeEventListener('touchstart', arguments.callee);
		});


//----------回転行列、平行移動行列を定義する
		var theta = Math.PI/180 * 4; // 2= 方向転換の速度。大きいと局地旋回する
//----------回転行列(角度)
		var m4_rotX = function(th){
			return [
				1, 0, 0, 0,
				0, Math.cos(th), Math.sin(th), 0,
				0, -Math.sin(th), Math.cos(th), 0,
				0, 0, 0, 1
			];
		};
		var m4_rotY = function(th){
			return [
				Math.cos(th), 0, -Math.sin(th), 0,
				0, 1, 0, 0,
				Math.sin(th), 0, Math.cos(th), 0,
				0, 0, 0, 1
			]; 
		};
		var m4_rotZ = function(th){
			return [
				Math.cos(th), Math.sin(th), 0, 0,
				-Math.sin(th), Math.cos(th), 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			]; 
		};
//----------平行移動行列
		var tleng = 0.2;
		var m4_traX = [
			1,0,0,0,
		    0,1,0,0,
		    0,0,1,0,
		    0, tleng, tleng, 1
		];
		var m4_traY = [
			1,0,0,0,
		    0,1,0,0,
		    0,0,1,0,
		    tleng, 0, tleng, 1
		];
		var m4_traZ = [
			1,0,0,0,
		    0,1,0,0,
		    0,0,1,0,
		    tleng, tleng, 0, 1
		];

//----------cubeオブジェクトの配置

        //----------3x3x3ルービックキューブを表示する
        //テクスチャを用意
        var texture = new Texture();
        texture.src = TEXTURE_BOX;
        
        var fx = 0.5, fy = 0.5, fz = 0.5; //キューブのローカル座標内でテクスチャを貼る位置場所を処理する変数
        var cubes = [];
        for(var i=0; i<3; i++){ //x軸方向に３枚
        	cubes[i] = [];
        	for(var j=0; j<3; j++){ //y軸方向に３本
        		cubes[i][j] = [];
        		for(var k=0; k<3; k++){ //z軸方向に３個
        			cubes[i][j][k] = new Cube(1.0); //cube作成

					//グローバル座標における座標       			
        			cubes[i][j][k].x = 0;
        			cubes[i][j][k].y = 0;
        			cubes[i][j][k].z = 0;
        			
					//rotCube要求されるグローバル座標基準の回転をローカルで実現するために、
					//要求されたグローバル座標軸がローカルでどちらを向いているか保持するベクトル
        			cubes[i][j][k].ix = [1,0,0];
        			cubes[i][j][k].iy = [0,1,0];
        			cubes[i][j][k].iz = [0,0,1];
        			
        			//キューブを配置につける移動行列プロパティ
        			cubes[i][j][k].translate = [
        				1, 0, 0, 0,
        				0, 1, 0, 0,
        				0, 0, 1, 0,
        				(i - 1)*scale, (j - 1)*scale, (k - 1)*scale, 1
        			];
        			
        			//----------座標移動を行う
//        			mat4.multiply(cubes[i][j][k]._matrix, cubes[i][j][k].translate); //cubeをローカル座標で配置につける
					//グローバル座標で配置につける
        			cubes[i][j][k].x = (i - 1)*scale;
        			cubes[i][j][k].y = (j - 1)*scale;
        			cubes[i][j][k].z = (k - 1)*scale;
        			
        			//cubeを表面沿いに回転させる回転移動行列を津kる
        			cubes[i][j][k].rcompX = [];

        			//translateをそのまま回転に組み込むと大きすぎてキューブを離脱していしまうのでスケーリングする
        			cubes[i][j][k].sc = 0.2;	
        			
        			//テクスチャを貼る
        			cubes[i][j][k].mesh.texture = texture;

			        cubes[i][j][k].mesh.vertices = [ //テクスチャを貼るオブジェクトのローカル座標での面の座標を指定（回転方向で法線が決まる？）
			                fx, fy, fz,  -fx, fy, fz,  -fx,-fy, fz,   fx,-fy, fz,  // v0-v1-v2-v3 front
			
			                fx, fy, fz,   fx,-fy, fz,   fx,-fy,-fz,   fx, fy,-fz,  // v0-v3-v4-v5 right

			                fx, fy, fz,   fx, fy,-fz,  -fx, fy,-fz,  -fx, fy, fz,  // v0-v5-v6-v1 top

			                -fx, fy, fz,  -fx, fy,-fz,  -fx,-fy,-fz,  -fx,-fy, fz,  // v1-v6-v7-v2 left


			                -fx,-fy,-fz,   fx,-fy,-fz,   fx,-fy, fz,  -fx,-fy, fz,  // v7-v4-v3-v2 bottom

			                 fx,-fy,-fz,  -fx,-fy,-fz,  -fx, fy,-fz,   fx, fy,-fz   // v4-v7-v6-v5 back
			        ];
        
			        cubes[i][j][k].mesh.normals = [ //ローカル座標で法線の方向を指定する（テクスチャを貼る表裏を決める）
			                0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,   // v0-v1-v2-v3 front

			                1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,   // v0-v3-v4-v5 right

			                0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,   // v0-v5-v6-v1 top

			                -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,   // v1-v6-v7-v2 left

			                0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,   // v7-v4-v3-v2 bottom

			                0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1    // v4-v7-v6-v5 back
			        ];
			        cubes[i][j][k].mesh.texCoords = [ //テクスチャ画像の切り取る部分を指定する
			                0.3, 0.3,   0, 0.3,   0, 0,   0.3, 0,  // v0-v1-v2-v3 front yellow *

			                0.34, 0,   0.34, 0.32,   0.65, 0.32,   0.65, 0,  // v0-v3-v4-v5 right blue

			                0.34, 0.34,   0.65, 0.34,   0.65, 0.65,   0.34, 0.65,  // v0-v5-v6-v1 top white * 

			                0.34, 0.67,   0.65, 0.67,   0.65, 0.98,   0.34, 0.98,  // v1-v6-v7-v2 left red *

			                0.67, 0.67,   1, 0.67,   1, 1,   0.67, 1,  // v7-v4-v3-v2 bottom black * 

			                0, 0.34,   0.32, 0.34,   0.32, 0.65,   0, 0.65   // v4-v7-v6-v5 back green * 
			        ];
			        cubes[i][j][k].mesh.texture.ambient = [0.3,0.3,0.3,0.5];

        			scene.addChild(cubes[i][j][k]);
        		};
        		
        	};
        	
        }; //3x3x3キューブのforループ閉じ
        

//----------cubeの回転条件を受け取り、軸ごとに関数の振り分けを行う,spd is rotate fps. 
//					rotCube(回転軸, パネル番号, 総回転量, 毎秒回転角)
		var rotCube = function rotCube(axis, panel, angle, spd){
			if(axis === "x"){ //x軸回転させる
				game.addEventListener('enterframe', function(){
					angle -= spd;
					rotateMatrix(1, 0, 0, axis, panel, spd);
					if( angle <= 0){ 
						this.removeEventListener('enterframe', arguments.callee);
						adjust_cube();
						proxy_axis(axis, panel);
						check_serialize();
						console.log("proxy set. x");
					};

				});
			}else if(axis === "y"){ //y軸回転させる
				game.addEventListener('enterframe', function(){
					angle -= spd;
					rotateMatrix(0, 1, 0, axis, panel, spd);
					if( angle <= 0){
						this.removeEventListener('enterframe', arguments.callee);
						adjust_cube();
						proxy_axis(axis, panel);
						check_serialize();
						console.log("proxy set. y");
					};

				});
			}else if(axis === "z"){ //z軸回転させる
				game.addEventListener('enterframe', function(){
					angle -= spd;
					rotateMatrix(0, 0, 1, axis, panel, spd);

					if( angle <= 0){
						this.removeEventListener('enterframe', arguments.callee);
						adjust_cube();
						proxy_axis(axis, panel);
						check_serialize();
						console.log("proxy set. z");
					};
				});
			}
		}; // rotCube


//----------cubesを回転させる関数
		//----------この関数内で、グローバル座標で要求された回転軸は、cubesが各々で保持しているローカル座標にあわせたものに変換される
		var rotateMatrix = function rotateMatrix(rx, ry, rz,axis,panel, spd){

			for(var i=0; i<3; i++){ //x軸方向に３枚
        		for(var j=0; j<3; j++){ //y軸方向に３本
	       			for(var k=0; k<3; k++){ //z軸方向に３個
	       				if(axis == "x" && cubes[i][j][k].x == panel){ //回転軸の確認と、cubesが回るべきパネルであるか

							rotMatrix_(cubes[i][j][k], spd, 1,0,0, cubes[i][j][k].ix[0],cubes[i][j][k].ix[1],cubes[i][j][k].ix[2]);
	       					console.log("rotateX");
	       				};
	       				
	       				if(axis == "y" && cubes[i][j][k].y == panel){
	       					rotMatrix_(cubes[i][j][k], spd, 0,1,0, cubes[i][j][k].iy[0],cubes[i][j][k].iy[1],cubes[i][j][k].iy[2]);

	       					console.log("rotateY");
	       				};
	       				
	       				if(axis == "z" && cubes[i][j][k].z == panel){
	       					rotMatrix_(cubes[i][j][k], spd, 0,0,1, cubes[i][j][k].iz[0],cubes[i][j][k].iz[1],cubes[i][j][k].iz[2]);
	       					
	       					console.log("rotateZ");
	       				};	       				
	       			}
	       		}
	       	}
		}; //rotateMatrix
		
		//----------引数のcubeを回転させる行列
		//					rotMatrix_(キューブ, 回転角, グローバル座標における回転軸ベクトル, グローバル座標における回転軸をローカルで見た時の回転軸)
		var rotMatrix_ = function rotMatrix_ (target, radian, rx, ry,rz, ix,iy,iz){

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
		
//----------その他引用関数
		//----------90度回転後に小数点以下の座標ずれを直す		
		var adjust_cube = function adjust_cube(){
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
		var proxy_axis = function proxy_axis(axis, panel){
			console.log("proxy_axis active");

			for(var i=0; i<3; i++){ //x軸方向に３枚
        		for(var j=0; j<3; j++){ //y軸方向に３本
	       			for(var k=0; k<3; k++){ //z軸方向に３個

	       				if(axis == "x" && cubes[i][j][k].x == panel){ //回転軸の確認と、cubesが回るべきパネルであるか
			//x軸回転の軸の遷移
							console.log("proxy_axis_do X");
							cubes[i][j][k].iy = proxy_axis_do1(cubes[i][j][k].iy, cubes[i][j][k].ix);
							cubes[i][j][k].iz = proxy_axis_do1(cubes[i][j][k].iz, cubes[i][j][k].ix);
//							console.log(cubes[i][j][k].name + " : " + cubes[i][j][k].ix +" : "+ cubes[i][j][k].iy +" : "+ cubes[i][j][k].iz);
						};
	       				if(axis == "y" && cubes[i][j][k].y == panel){
			//y軸回転の軸の遷移	
							console.log("proxy_axis_do Y");
							cubes[i][j][k].iz = proxy_axis_do1(cubes[i][j][k].iz, cubes[i][j][k].iy);
							cubes[i][j][k].ix = proxy_axis_do1(cubes[i][j][k].ix, cubes[i][j][k].iy);
//							console.log(cubes[i][j][k].name + " : " + cubes[i][j][k].ix +" : "+ cubes[i][j][k].iy +" : "+ cubes[i][j][k].iz);

						};
						if(axis == "z" && cubes[i][j][k].z == panel){
			//z軸回転の軸の遷移	
							console.log("proxy_axis_do X");
							cubes[i][j][k].ix = proxy_axis_do1(cubes[i][j][k].ix, cubes[i][j][k].iz);
							cubes[i][j][k].iy = proxy_axis_do1(cubes[i][j][k].iy, cubes[i][j][k].iz);
						};
					}
				}
			}
		}; //proxy_axis
		
		//----------iがつくベクトルを ”Cubeのローカル系で” 回転する。
		//正確には、回すべき軸をローカル系で見立てたときに見えるベクトルを使って回す。
		var proxy_axis_do1 = function proxy_axis_do1(proxyVec, proxyaxis){

			return mat4.multiplyVec3((new Quat(proxyaxis[0],proxyaxis[1],proxyaxis[2],  -Math.PI/180 *90)).toMat4(mat4.create()), proxyVec);
		};		

//----------以下proxy関数二つはグローバル系による回転を行う。回転を重ねると二段目以降は崩れる。煮詰まったときは基準を確認すること。
		//条件分岐でなく行列で処理する
		var proxy_axis_do_ = function proxy_axis_do_(proxyVec, axis){

			if(axis === "x"){//x軸回転の軸の遷移
				console.log("proxy1 X");
				return mat4.multiplyVec3((new Quat(1,0,0,-Math.PI/180 *90)).toMat4(mat4.create()), proxyVec);

			}else if(axis === "y"){			//y軸回転の軸の遷移	
				console.log("proxy1 Y");
				return mat4.multiplyVec3((new Quat(0,1,0,-Math.PI/180 *90)).toMat4(mat4.create()), proxyVec);
				
			}else if(axis === "z"){		//z軸回転の軸の遷移	
				console.log("proxy1 Z");
				return mat4.multiplyVec3((new Quat(0,0,1,-Math.PI/180 *90)).toMat4(mat4.create()), proxyVec);
			}			
			
		};		
		//----------新しい代理ベクトルを渡す
		var proxy_axis_do = function proxy_axis_do(proxyVec, axis){

			if(axis === "x"){//x軸回転の軸の遷移
				console.log("proxy doing");
				if( array_compare(proxyVec, [0, 1, 0]) ){
					return [0,0,1];
					console.log("proxy success1 "+ proxyVec);
				}else if( array_compare(proxyVec, [0,0,1]) ){
					return [0,-1,0];
					console.log("proxy success2 "+ proxyVec);
				}else if( array_compare(proxyVec, [0,-1,0]) ){
					return [0,0,-1];
					console.log("proxy success3 "+ proxyVec);
				}else if( array_compare(proxyVec, [0,0,-1]) ){
					return [0,1,0];
					console.log("proxy success4 "+ proxyVec);

				}else if( array_compare(proxyVec, [1,0,0]) ){
					return [1,0,0];
					console.log("proxy success4 "+ proxyVec);
				}else if( array_compare(proxyVec, [-1,0,0]) ){
					return [-1,0,0];
					console.log("proxy success4 "+ proxyVec);
					
				};
			}else if(axis === "y"){			//y軸回転の軸の遷移	
				if( array_compare(proxyVec, [1,0,0]) ){
					return [0,0,-1];
				}else if( array_compare(proxyVec, [0,0,-1]) ){			
					return [-1,0,0];
				}else if( array_compare(proxyVec, [-1,0,0]) ){
					return [0,0,1];
				}else if( array_compare(proxyVec, [0,0,1]) ){
					return [1,0,0];

				}else if( array_compare(proxyVec, [0,1,0]) ){
					return [0,1,0];
					console.log("proxy success4 "+ proxyVec);
				}else if( array_compare(proxyVec, [0,-1,0]) ){
					return [0,-1,0];
					console.log("proxy success4 "+ proxyVec);
					
				};
			}else if(axis === "z"){		//z軸回転の軸の遷移	
				if( array_compare(proxyVec, [1,0,0]) ){
					return [0,1,0];
				}else if( array_compare(proxyVec, [0,1,0]) ){
					return [-1,0,0];
				}else if( array_compare(proxyVec, [-1,0,0]) ){
					return [0,-1,0];
				}else if( array_compare(proxyVec, [0,-1,0])){
					return [1,0,0];
				}else if( array_compare(proxyVec, [0,0,1]) ){
					return [0,0,1];
					console.log("proxy success4 "+ proxyVec);
				}else if( array_compare(proxyVec, [0,0,-1]) ){
					return [0,0,-1];
					console.log("proxy success4 "+ proxyVec);

				};
			}
		}; //proxy_axis_do		
		
		var array_compare = function array_compare (a1,a2){
  			if(a1.length != a2.length){
  				return false;
  			}else{
  				for(var i=0; i<a1.length; i++){
				    if(a1[i] != a2[i]){
				    	return false;
				    } 
   				}
		   return true;
  			};
 		};

		//----------シャッフル処理
		var game_start = function game_start (){

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
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			})
			.delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			}).delay(5).then(function(){
				rotCube(random_axis(), random_panel(), 90, 30);
			})
//			
			
		};
		
		//----------ゲームクリア判定、すべてのi軸が揃っていればクリア
		var check_serialize = function(){
			//ゲームが開始されている
				var ix = [0,0,0];
				var iy = [0,0,0];
				var iz = [0,0,0];

				for(var i=0; i<3; i++){ //x軸方向に３枚
	        		for(var j=0; j<3; j++){ //y軸方向に３本
		       			for(var k=0; k<3; k++){ //z軸方向に３個
//		       				ix += Math.round(cubes[i][j][k].ix[0]) + Math.round(cubes[i][j][k].ix[1]) + Math.round(cubes[i][j][k].ix[2]);
		       				vec3.add(ix, cubes[i][j][k].ix);
//		       				iy += Math.round(cubes[i][j][k].iy[0]) + Math.round(cubes[i][j][k].iy[1]) + Math.round(cubes[i][j][k].iy[2]);
		       				vec3.add(iy, cubes[i][j][k].iy);
//		       				iz += Math.round(cubes[i][j][k].iz[0]) + Math.round(cubes[i][j][k].iz[1]) + Math.round(cubes[i][j][k].iz[2]);
		       				vec3.add(iz, cubes[i][j][k].iz);
		       			}
		       		}
		       } //for
		       
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
		       		game.end(counter, score + "秒でルービックキューブを解きました！");
		       	};
			
		};

		//----------回転用の軸ベクトルを表示する：デバッグ用
		game.rootScene.addEventListener('enterframe',function(){
			var iix = 2;
			var iiy = 2;
			var iiz = 2;
			info_label.text = 
			"cube"+iix+iiy+iiz +": <br>ix:"+Math.round(cubes[iix][iiy][iiz].ix[0]) +","+Math.round(cubes[iix][iiy][iiz].ix[1]) +","+ Math.round(cubes[iix][iiy][iiz].ix[2]) 
			+",<br>iy:"
			+Math.round(cubes[iix][iiy][iiz].iy[0]) +","+Math.round(cubes[iix][iiy][iiz].iy[1]) +","+ Math.round(cubes[iix][iiy][iiz].iy[2])
			+",<br>iz:"
			+Math.round(cubes[iix][iiy][iiz].iz[0]) +","+Math.round(cubes[iix][iiy][iiz].iz[1]) +","+ Math.round(cubes[iix][iiy][iiz].iz[2]);
			
		});
		


		//カメラ回転系操作
        var oldX = 0;
//        r = Math.PI / 2;

        game.rootScene.addEventListener('touchstart', function(e) {
            oldX = e.x;
        });
        game.rootScene.addEventListener('touchmove', function(e) {
            r += (e.x - oldX) / 100 ;
            camera.x = Math.cos(r - 0.8) * 20;
            camera.z = Math.sin(r - 0.8) * 20;
            oldX = e.x;
        });
	

	};

	game.start();
};
