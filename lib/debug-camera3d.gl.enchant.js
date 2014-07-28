/**
 * phi
 */

if (enchant.gl) {
    
    (function(){
        
        /**
         * @scope enchant.gl.DebugCamera.prototype
         */
        enchant.gl.DebugCamera = enchant.Class.create(enchant.gl.Camera3D, {
            
            /**
             * デバッグ用カメラ
             * @constructs
             * @extends enchant.gl.Camera3D
             * @memo    上ベクトルもいじればグワングワンなるけど, 酔うといけないのでとりあえずこれでいく.
             */
            initialize: function() {
                enchant.gl.Camera3D.call(this);
                this.direction = vec3.create([0, 0, 1]);
            },
            
            /**
             * 向きベクトルから Eye を更新
             */
            updateEyeFromDirection: function() {
                this.x = this.centerX + this.direction[0]*this.distance;
                this.y = this.centerY + this.direction[1]*this.distance;
                this.z = this.centerZ + this.direction[2]*this.distance;
            },
            
            /**
             * 向きベクトルから Cnt を更新
             */
            updateCntFromDirection: function() {
                this.centerX = this.x + this.direction[0]*this.distance;
                this.centerY = this.y + this.direction[1]*this.distance;
                this.centerZ = this.z + this.direction[2]*this.distance;
                return this;
            },
            
            /**
             * 横回転
             */
            _rotateTransversal: function(angle) {
                var modelView = mat4.create();
                mat4.identity(modelView);
                mat4.rotate(modelView, angle*Math.PI/180, [0, 1, 0]);
                mat4.multiplyVec3(modelView, this.direction);
                
                return this;
            },
            
            /**
             * 縦回転
             */
            _rotateLongitudinal: function(angle) {
                // クォータニオン
                var q = quat4.create([0, 0, 0, 1]);
                
                // left ベクトルを作成
                var a = vec3.create([ -this.direction[2], 0, this.direction[0] ]);
                vec3.normalize(a);
                
                // left を軸として angle 回転するクォータニオンを作成
                var halftheta   = angle*Math.PI/180 * 0.5;
                var halfsin     = Math.sin(halftheta);
                q[3] = Math.cos(halftheta);
                q[0] = a[0] * halfsin;
                q[1] = a[1] * halfsin;
                q[2] = a[2] * halfsin;
                
                // 向きベクトルをqで回転
                quat4.multiplyVec3(q, this.direction);
            },
            
            /**
             * キーの情報に応じてカメラを更新する
             */
            updateByKey: function(input) {
                if (input.a) {
                    // 注視点移動
                    var left = vec3.create([ -this.direction[2], 0, this.direction[0] ]);
                    vec3.normalize(left);
                    var up = vec3.create();
                    vec3.cross(this.direction, left, up);
                    vec3.normalize(up);
                    
                    if (input.left) { this.centerX += left[0]; this.centerY += left[1]; this.centerZ += left[2]; }
                    if (input.right){ this.centerX -= left[0]; this.centerY -= left[1]; this.centerZ -= left[2]; }
                    if (input.up)   { this.centerX -= up[0]; this.centerY -= up[1]; this.centerZ -= up[2]; }
                    if (input.down) { this.centerX += up[0]; this.centerY += up[1]; this.centerZ += up[2]; }
                }
                else if (input.b) {
                    // ズームイン/ズームアウト
                    if (input.left  || input.up)    this.distance -= 1;
                    if (input.right || input.down)  this.distance += 1;
                }
                else {
                    // 回転
                    if (input.right)this._rotateTransversal( 2);
                    if (input.left) this._rotateTransversal(-2);
                    if (input.up)   this._rotateLongitudinal( 1);
                    if (input.down) this._rotateLongitudinal(-1);
                }
                
                this.updateEyeFromDirection();
                
                return this;
            },
            
            /**
             * マウス情報に応じてカメラを更新する
             */
            updateByMouse: function(input, dx, dy) {
                
                if (!dx || !dy) return ;
                
                if (input.a) {
                    // 注視点移動
                    var left = vec3.create([ -this.direction[2], 0, this.direction[0] ]);
                    vec3.normalize(left);
                    var up = vec3.create();
                    vec3.cross(this.direction, left, up);
                    vec3.normalize(up);
                    
                    this.centerX += left[0]*dx;
                    this.centerY += left[1]*dx;
                    this.centerZ += left[2]*dx;
                    
                    this.centerX -= up[0]*dy;
                    this.centerY -= up[1]*dy;
                    this.centerZ -= up[2]*dy;
                }
                else if (input.b) {
                    // ズームイン/ズームアウト
                    this.distance += dy*4;
                }
                else {
                    // 回転
                    this._rotateTransversal(-dx*4);
                    this._rotateLongitudinal(dy*2);
                }
                this.updateEyeFromDirection();
                
                return this;
            },
            
            /**
             * 更新
             */
            update: function(input, dx, dy) {
                this.updateByKey(input);
                this.updateByMouse(input, dx, dy);
                return this;
            },
            
            /**
             * リセット
             */
            reset: function() {
                this.centerX = this.centerY = this.centerZ = 0;
                this.distance = 64;
                this.updateEyeFromDirection();
            },
            
            /**
             * アングルから向きベクトルをセット
             * @param   {Number}    theta   縦の角度
             * @param   {NUmber}    phi     横の角度
             */
            setDirectionFromAngle:  function(theta, phi)
            {
                var thetaRad = theta*Math.PI/180;
                var phiRad   = phi*Math.PI/180;
                this.direction[0] = Math.cos(thetaRad) * Math.sin(phiRad);
                this.direction[1] = Math.sin(thetaRad);
                this.direction[2] = Math.cos(thetaRad) * Math.cos(phiRad);
                
                return this;
            }
        });
        
        /**
         * 向きベクトル
         * @type    Number
         */
        enchant.gl.DebugCamera.prototype.direction = null;
        /**
         * Eye と Cnt との距離
         * @type    Number
         */
        enchant.gl.DebugCamera.prototype.distance  = 64;
        
    })();
    
}