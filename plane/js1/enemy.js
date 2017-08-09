

//敌机
function Enemy(type){
	
	//属性
	this.ele = document.createElement("div");
	this.hp = 1; //血量 HP
	this.speed = 10; //速度
	
	this.key = parseInt(Math.random()*10000000) + "";
	this.dieImgs = []; //爆炸时的图片数组
	
	this.score = 10; //敌机的分数
	
	
	//方法
	//init
	this.init = function(){
		
		switch(type){
			//大型飞机
			case this.Enemy_Type_Large: 
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_Hp_Large;
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"];
				this.score = 30;
				break;
			 
			//中型飞机
			case this.Enemy_Type_Middle: 
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_Hp_Middle;
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"];
				this.score = 20;
				break;
			
			//小型飞机
			case this.Enemy_Type_Small: 
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"];
				this.score = 10;
				break;
			
			//如果传入了错误的参数， 则默认创建小型飞机
			default :  
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
		}
		//将当前创建的新敌机对象添加到allEnemy中
		gameEngine.allEnemy[this.key] = this;
		
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//移动
	this.move = function(){
		
		var that = this;
		var timer = setInterval(function(){
			var y = that.ele.offsetTop + that.speed;
			if (y > document.documentElement.clientHeight){
				gameEngine.ele.removeChild(that.ele); //移除敌机节点
				clearInterval(timer); //关闭定时器
				
				//将当前敌机对象从allEnemy中移除
				delete gameEngine.allEnemy[that.key];
			}
			else {
				that.ele.style.top = y + "px";
			}
		}, 30);
	}
	
	//掉一滴血
	this.hurt = function(){
		this.hp--;
		if (this.hp == 0) {
			this.boom();
			console.log(gameEngine.totalScore.innerHTML);
			gameEngine.totalScore.innerHTML = gameEngine.totalScore.innerHTML-0 + this.score;
		}
	}
	
	//爆炸
	this.boom = function(){
		//停止移动
		clearInterval(this.timer); 
		
		//爆炸动画
		var that = this;
		var i=0;
		var dieTimer = setInterval(function(){
			if (i >= that.dieImgs.length-1){
				clearInterval(dieTimer); //关闭定时器
				gameEngine.ele.removeChild(that.ele); //将敌机节点移除
				delete gameEngine.allEnemy[that.key]; //将allEnemy中对应的敌机对象删除
			}
			else {
				that.ele.style.background = "url("+ that.dieImgs[++i] +") no-repeat";
			}
		}, 100);
		
	}
	
}

Enemy.prototype = {
	Enemy_Type_Large: 1,
	Enemy_Type_Middle: 2,
	Enemy_Type_Small: 3, 
	
	Enemy_Hp_Large: 6,
	Enemy_Hp_Middle: 3,
	Enemy_Hp_Small: 1, 
	
	Enemy_Speed_Large: 3,
	Enemy_Speed_Middle: 6,
	Enemy_Speed_Small: 8, 
	
}












//敌机
/*function Enemy(type){
	this.ele = document.createElement('div');
	this.hp = 1;//血量
	this.speed = 10;//速度
	
	//
	this.init = function(){
		
		switch(type){
			case this.Enemy_Type_Large:
			this.ele.className = 'enemy_large';
			this.hp = this.Enemy_Hp_Large;
			this.speed = this.Enemy_Speed_Large;
			break;
			
			case this.Enemy_Type_Middle:
			this.ele.className = 'enemy_middle';
			this.hp = this.Enemy_Hp_Middle;
			this.speed = this.Enemy_Speed_Middle;
			break;
			
			case this.Enemy_Type_Small:
			this.ele.className = 'enemy_small';
			this.hp = this.Enemy_Hp_Small;
			this.speed = this.Enemy_Speed_Small;
			break;
			
			default:
			this.ele.className = 'enemy_small';
			this.hp = this.Enemy_Hp_Small;
			this.speed = this.Enemy_Speed_Small;
		}
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth)) + 'px';
		this.ele.style.top = - this.ele.offsetHeight + 'px';
		
		return this;
	}
	
	//move
	this.move = function(){
		//定时器
		var that = this;
		var timer = setInterval(function(){
			//改变位置
			var y = that.ele.offsetTop + that.speed;
			if(y > document.documentElement.clientHeight){
				gameEngine.ele.removeChild(that.ele);
				clearInterval(timer)
			}else{
				that.ele.style.top =  y + 'px';
			}
		},30)
	}
}
Enemy.prototype = {
	Enemy_Type_Large:1,
	Enemy_Type_Middle:2,
	Enemy_Type_Small:3,
	
	Enemy_Hp_Large:6,
	Enemy_Hp_Middle:3,
	Enemy_Hp_Small:1,
	
	Enemy_Speed_Large:3,
	Enemy_Speed_Middle:6,
	Enemy_Speed_Small:8,
}*/


















