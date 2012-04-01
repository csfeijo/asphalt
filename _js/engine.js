TrrLog.enable = true;

Havano = {};
Havano.Config = {
	general : {
		fps : 35
	},
	canvas : {
		width : 800,
		height : 400
	},
	scenario : {
		sprite : {
			background : Sprite("bg_canvas.png")
		}
	},
	trees : {
		palm_tree : {
			x : 210,
			y : -100,
			sprite : Sprite("palm_tree.png")
		}
	},
	player : {
		color: '#00A',
		y : 360,
		x : 400,
		width : 32,
		height : 32,
		sprite : {
			up : Sprite("car_top.png"),
			left : Sprite("car_left.png"),
			right : Sprite("car_right.png"),
			down : Sprite("car_stop.png")
		},
		state : 'top'
	}
};

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
});

Havano.Engine = function(){
	var _canvas,
		_appName = 'game';
	
	Havano.Engine.method = this;
	
	// METDOS DO CANVAS
	this.canvasCreate = function(){
		var width         = Havano.Config.canvas.width,
			height        = Havano.Config.canvas.height,
			canvasElement = $("<canvas width='" + width + "' height='" + height + "'></canvas>"),
			lixo          = canvasElement.get(0).getContext("2d"); // Nao entendi o pq nao posso sair usando esse valor, preciso criar ele antes... (2x???)
			
		_canvas = canvasElement.get(0).getContext("2d");
	
		canvasElement.appendTo('#main');	
		
		this.canvasDraw();
		
		console.log('createCanvas');
	};

	this.canvasDraw = function(){
		_canvas.clearRect(0, 0, Havano.Config.canvas.width, Havano.Config.canvas.height);
		//Havano.Config.canvas.sprite.background.draw(0 ,0, Havano.Config.canvas.width, Havano.Config.canvas.height)
	};

	this.mainBackgroundDraw = function(){
		TrrLog.log('Bg Draw' , _appName);
		Havano.Config.scenario.sprite.background.draw(_canvas, 0, 0);
	};
	
	this.palmTreeDraw = function(data){
		TrrLog.log('Palm Tree Draw', _appName);
		Havano.Config.trees.palm_tree.sprite.draw(_canvas, Havano.Config.trees.palm_tree.x, Havano.Config.trees.palm_tree.y);
		
		if(Havano.Config.trees.palm_tree.y < Havano.Config.canvas.height){
			Havano.Config.trees.palm_tree.y += 10;
		}else{
			Havano.Config.trees.palm_tree.y = -100;
		}
		
		if(Havano.Config.trees.palm_tree.x > 60){
			Havano.Config.trees.palm_tree.x -= 3;
		}else{
			Havano.Config.trees.palm_tree.x = 210;
		}
	};
	
	// METODOS DE UPDATE DE DESENHO
	this.update = function(){
		Havano.Config.player.state = 'up';
		if (keydown.left) {
			TrrLog.log('Player Left' , _appName);
			Havano.Config.player.x -= 5;
			
			Havano.Config.player.state = 'left';
		}
		
		if (keydown.right) {
			TrrLog.log('Player Right' , _appName);
			Havano.Config.player.x += 5;
			
			Havano.Config.player.state = 'right';
		}
		/*
		if (keydown.up) {
			TrrLog.log('Player Up' , _appName);
			Havano.Config.player.y -= 5;
			
			Havano.Config.player.state = 'up';
		}
		*/
		if (keydown.down) {
			TrrLog.log('Player Down' , _appName);
			//Havano.Config.player.y += 5;
			
			Havano.Config.player.state = 'down';
		}
		
		if (keydown.space) {
			TrrLog.log('Player Space' , _appName);
			Havano.Config.player.state = 'down';
		}		
	};

	this.startListener = function(){
		
	
	
		window.setInterval(function() {
			
			Havano.Engine.method.update();
			Havano.Engine.method.canvasDraw();
			Havano.Engine.method.mainBackgroundDraw();
			Havano.Engine.method.playerDraw();
			Havano.Engine.method.palmTreeDraw();
			
			
		}, 1000/Havano.Config.general.fps);	
	};
	
	// METODOS PARA DESENHO DO PLAYER
	this.playerDraw = function(){
		TrrLog.log('Player Draw' , _appName);

		switch(Havano.Config.player.state){
			case 'up':
				Havano.Config.player.sprite.up.draw(_canvas, Havano.Config.player.x, Havano.Config.player.y);
			break;
			case 'left':
				Havano.Config.player.sprite.left.draw(_canvas, Havano.Config.player.x, Havano.Config.player.y);
			break;
			case 'right':
				Havano.Config.player.sprite.right.draw(_canvas, Havano.Config.player.x, Havano.Config.player.y);
			break;
			case 'down':
				Havano.Config.player.sprite.down.draw(_canvas, Havano.Config.player.x, Havano.Config.player.y);
			break;			
			default:
				Havano.Config.player.sprite.up.draw(_canvas, Havano.Config.player.x, Havano.Config.player.y);
			break;
		}
		
		/*
		_canvas.fillStyle = Havano.Config.player.color;
		_canvas.fillRect(Havano.Config.player.x, Havano.Config.player.y, Havano.Config.player.width, Havano.Config.player.height);
		*/
		
	};
	
	
	this.init = function(){
		this.startListener();
		this.canvasCreate();


		TrrLog.log('INIT' , _appName);
	};

};

var hv = new Havano.Engine();
hv.init();