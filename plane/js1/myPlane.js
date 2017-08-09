var myPlane = {
	//属性
	ele: null,
	fireInterval: 300, //子弹的发射频率
	//方法
	inite: function() {
		this.ele = document.createElement('div');
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = 'plane';
		this.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth) / 2 + 'px';
		this.ele.style.top = gameEngine.ele.offsetHeight - this.ele.offsetHeight + 'px';
		//console.log(this.ele.style.top,this.ele.style.left,gameEngine.ele.offsetHeight,this.ele.offsetHeight)
		return this;
	},
	
	//发射子弹
	fire : function(){
		
		setInterval(function(){
			
			//创建子弹,并发射
			var bullet = new Bullet();
			bullet.init().move();
			
		}, this.fireInterval);
	},

	//move
	move: function() {
		this.ele.onmousedown = function(e) {
			e = e || event;
			var disX = e.offsetX;
			var disY = e.offsetY;

			document.onmousemove = function(e) {
				e = e || event;
				var x = e.pageX - disX - gameEngine.ele.offsetLeft;
				var y = e.pageY - disY;
				if(x < 0) x = 0;
				else if(x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = y + "px";

			}
			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
			}
		}
	}

}