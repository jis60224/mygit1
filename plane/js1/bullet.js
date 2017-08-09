

//子弹
//构造函数
function Bullet(){
	
	//属性
	this.ele = document.createElement("div");
	this.key = parseInt(Math.random()*100000000) + ""; //key
	
	//方法
	this.init = function(){
		//将新创建的子弹对象添加到allBullet中
		gameEngine.allBullet[this.key] = this;
		
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	}
	
	//移动
	this.move = function(){
		
		var that = this;
		this.timer = setInterval(function(){
			//var that =this;
			var y = that.ele.offsetTop - 8;
			if (y < -18) {
				clearInterval(that.timer); //关闭定时器
				gameEngine.ele.removeChild(that.ele); // 移除子弹节点
				
				//当子弹从页面上移除，则同将allBullet中的对应子弹对象删除
				delete gameEngine.allBullet[that.key];
			}
			else {
				that.ele.style.top = y + "px";
			}
		}, 30);
	}
	
	//爆炸
	this.boom = function(){
		//停止移动
		clearInterval(this.timer); 
		
		this.ele.className = "bullet-die";
		
		//爆炸动画
		var dieImgs = ["images/die1.png", "images/die2.png"];
		var i = 0;
		var that = this;
		var dieTimer = setInterval(function(){
			if (i >= 1){
				clearInterval(dieTimer); //关闭定时器
				gameEngine.ele.removeChild(that.ele); //移除子弹节点
			}
			else 
			that.ele.style.background = "url("+ dieImgs[++i] +") no-repeat";
		},100);
	}
	
	
}