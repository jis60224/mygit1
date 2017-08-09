var gameEngine = {
		//属性
		ele: null,
		allBullet: {}, //页面上所有子弹
		allEnemy: {}, //页面上所有敌机

		totalScore: null, //总得分

		//方法
		//初始化属性
		inite: function() {
			this.ele = document.getElementById('main');
			return this;
		},

		//开始游戏
		starGame: function() {
			console.log('游戏开始');

			gameEngine.loadding(function() {
				console.log('加载完成');

				myPlane.inite().move();
				myPlane.fire(); //开火

				//监听键盘
				gameEngine.listenKeybord();

				//创建敌机
				gameEngine.createEnemy();

				//检测碰撞
				gameEngine.listeningCrash();

				//记录分数
				gameEngine.calculateScore();

				//移动背景
				gameEngine.moveBg()
			});
		},

		//记录分数
		calculateScore: function() {
			this.totalScore = document.createElement("div");
			this.totalScore.className = "score";
			gameEngine.ele.appendChild(this.totalScore);
			this.totalScore.innerHTML = "0";
			console.log(this.totalScore.innerHTML);
		},

		//碰撞检测
		listeningCrash: function() {

			//是否敌机碰撞到我的飞机
			var isCrashMyPlane = false;

			setInterval(function() {

					//遍历所有子弹
					//遍历所有敌机
					//判断每个子弹和每个敌机是否有碰撞
					for(var i in gameEngine.allEnemy) { //遍历所有敌机

						for(var j in gameEngine.allBullet) { //遍历所有子弹

							//判断每个子弹和每个敌机是否有碰撞
							if(isCrash(gameEngine.allEnemy[i].ele, gameEngine.allBullet[j].ele)) {
								//console.log("发生了碰撞");

								//让子弹爆炸，并从allBullet中移除
								gameEngine.allBullet[j].boom();
								delete gameEngine.allBullet[j];

								//让敌机受到一点伤害
								gameEngine.allEnemy[i].hurt();
							}

						}

						//判断敌机和我的飞机是否有碰撞
						if(!isCrashMyPlane && isCrash(gameEngine.allEnemy[i].ele, myPlane.ele)) {
							isCrashMyPlane = true; //碰到了我的飞机
							console.log("Game Over");

							var score = gameEngine.totalScore.innerHTML;
							var name = prompt("您的分数为:" + score + ", 请留下您的大名:");
							if(!name) { //name=null, 点击了取消
								alert("提交失败: 未输入用户名");
								location.reload();
							} else { //点击了确定

								ajax({
									type: "post",
									url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
									async: true,
									data: {
										"name": name,
										"score": score
									},
									success: function(data) {
										//console.log(data);

										//json解析
										var obj = JSON.parse(data);
										if(obj.status == 1) {
											location.href = "rank.html";
										} else {
											alert("提交失败: " + obj.msg);
											location.reload();
										}

									},
									error: function() {
										console.log("error");
									}
								})
							}
						}
					}

				//}

			}, 30);

	},

	//创建敌机
	createEnemy: function() {

		//大型飞机
		setInterval(function() {
			var flag = Math.random() > 0.5 ? true : false;
			if(flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		}, 6000);

		//中型飞机
		setInterval(function() {
			var flag = Math.random() > 0.5 ? true : false;
			if(flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}
		}, 2000);

		//小型飞机
		setInterval(function() {
			var flag = Math.random() > 0.3 ? true : false;
			if(flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		}, 1000);
	},

	//加载游戏
	loadding: function(callback) {
		//logo
		var logo = document.createElement('div');
		logo.className = 'logo';
		gameEngine.ele.appendChild(logo);

		//loading
		var load = document.createElement('div');
		load.className = 'load';
		gameEngine.ele.appendChild(load);

		//加载动画
		var arr = ['images/loading1.png', 'images/loading2.png', 'images/loading3.png'];
		var i = 0;
		var timer = setInterval(function() {
			if(i >= 2) {
				clearInterval(timer);
				gameEngine.ele.removeChild(load);
				gameEngine.ele.removeChild(logo);

				//回调函数
				callback()
			} else {
				load.style.background = 'url(' + arr[++i % 3] + ') no-repeat';
			}
		}, 500)
	},
	//监听键盘
	listenKeybord: function() {

		var xspeed = 0;
		var yspeed = 0;

		window.onkeydown = function(e) {
			e = e || event;

			if(e.keyCode == 37) { //左
				xspeed = -10;
			} else if(e.keyCode == 38) { //上
				yspeed = -10;
			} else if(e.keyCode == 39) { //右
				xspeed = 10;
			} else if(e.keyCode == 40) { //下
				yspeed = 10;
			}
		}
		window.onkeyup = function() {
			xspeed = 0;
			yspeed = 0;
		}
		setInterval(function() {
			var x = myPlane.ele.offsetLeft + xspeed;
			if(x < 0) x = 0;
			else if(x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
			}
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
		}, 30);
	},
	//移动背景图
	moveBg: function() {
		var y = 0;
		setInterval(function() {
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
	}

}