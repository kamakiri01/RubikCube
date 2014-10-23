enchant();

    var TEXTURE_BOX = "enchant9.png";
window.onload = function(){
    var core = new Core(512, 512);

    core.preload(TEXTURE_BOX);
    core.onload = function(){
        RBC.Methods.initScene3d();



        RBC.Methods.initGameCamera();
        RBC.Methods.createCubes();

        initTestScene();
    };
    core.start();
};

var check_serialize = function(){};
var initTestScene = function(){
    var game = enchant.Core.instance;
    var rotCube = RBC.Methods.rotCube;

		var xlabel = new Label("");
		xlabel.x = 10; xlabel.y = 100;
		xlabel.font = "30px bold sans";
		xlabel.text= "rotX-0";
		game.rootScene.addChild(xlabel);
		xlabel.addEventListener('touchstart', function(){
			rotCube("x", 1.05, 90, 10);
		});

		var ylabel = new Label("");
		ylabel.x = 110; ylabel.y = 100;
		ylabel.font = "30px bold sans";
		ylabel.text= "rotY-0";
		game.rootScene.addChild(ylabel);
		ylabel.addEventListener('touchstart', function(){
			rotCube("y", 1.05, 90, 10);
		});

		var zlabel = new Label("");
		zlabel.x = 210; zlabel.y = 100;
		zlabel.font = "30px bold sans";
		zlabel.text= "rotZ-0";
		game.rootScene.addChild(zlabel);
		zlabel.addEventListener('touchstart', function(){
			rotCube("z", 1.05, 90, 10);
		});

		var xlabel_ = new Label("");
		xlabel_.x = 10; xlabel_.y = 150;
		xlabel_.font = "30px bold sans";
		xlabel_.text= "rotX-1";
		game.rootScene.addChild(xlabel_);
		xlabel_.addEventListener('touchstart', function(){
			rotCube("x", 0, 90, 10);
		});

		var ylabel_ = new Label("");
		ylabel_.x = 110; ylabel_.y = 150;
		ylabel_.font = "30px bold sans";
		ylabel_.text= "rotY-1";
		game.rootScene.addChild(ylabel_);
		ylabel_.addEventListener('touchstart', function(){
			rotCube("y", 0, 90, 10);
		});

		var zlabel_ = new Label("");
		zlabel_.x = 210; zlabel_.y = 150;
		zlabel_.font = "30px bold sans";
		zlabel_.text= "rotZ-1";
		game.rootScene.addChild(zlabel_);
		zlabel_.addEventListener('touchstart', function(){
			rotCube("z", 0, 90, 10);
		});

		var xlabel__ = new Label("");
		xlabel__.x = 10; xlabel__.y = 200;
		xlabel__.font = "30px bold sans";
		xlabel__.text= "rotX-2";
		game.rootScene.addChild(xlabel__);
		xlabel__.addEventListener('touchstart', function(){
			rotCube("x", -1.05, 90, 10);
		});

		var ylabel__ = new Label("");
		ylabel__.x = 110; ylabel__.y = 200;
		ylabel__.font = "30px bold sans";
		ylabel__.text= "rotY-2";
		game.rootScene.addChild(ylabel__);
		ylabel__.addEventListener('touchstart', function(){
			rotCube("y", -1.05, 90, 10);
		});

		var zlabel__ = new Label("");
		zlabel__.x = 210; zlabel__.y = 200;
		zlabel__.font = "30px bold sans";
		zlabel__.text= "rotZ-2";
		game.rootScene.addChild(zlabel__);
		zlabel__.addEventListener('touchstart', function(){
			rotCube("z", -1.05, 90, 10);
		});



}
