



$(function() {
	
	//$('* a').removeAttr('href').css('cursor','pointer');
	
	var arr = [];
	//跳转详情页
	$('.r-bottom').on('click','li',function(i){
		console.log(arr);
		var index = $(this).index(".r-bottom li");
		var id = arr[index].id;
		
		//location.href = 'detailPage/detail.html?id='+id;
		open('detailPage/detail.html?id='+id,'_blanck');
	})
	
	//加入购物车
			
			//location.href = "detailPage/detail.html?id=" + id;
	
	
	//动态加载数据
	$.get('resource/json/goods1.json',function(data){
		arr = data;
		console.log(arr);
		for(var i in arr){
			var obj = arr[i];
			var li = $(`<li><a href="#"><img src="${obj.img}" />
						<div class="yd-msg">
							<p class="yd-pinpai">${obj.brand}</p>
							<p class="yd-goods">${obj.name}</p>
							<p class="yd-pirce">${obj.unite}${obj.price}</p>
						</div>
					</a></li>`).appendTo($('.r-bottom').eq(0));
				}
	})
	
	/*$.ajax({
		type:'get',
		url:"resource/json/goods.json",
		success:function(data){
			//console.log(data)
			 arr = data
			for(var j in arr){
				var arr1 = arr[j];
				//console.log(arr);
				fn(arr1,j)
			}
			
		}
	});*/
	//封装函数
	/*function fn(arr1,j){
		var arr2 = arr1;
		//console.log(j)
		for(var i in arr2){
			var obj = arr2[i];
			var li = $(`<li><a href="#"><img src="${obj.img}"/>
						<div class="yd-msg">
							<p class="yd-pinpai">${obj.brand}</p>
							<p class="yd-goods">${obj.name}</p>
							<p class="yd-pirce">${obj.unite}${obj.price}</p>
						</div>
					</a></li>`).appendTo($('.r-bottom').eq(j));
		}
		
	}*/
	
	//ajax 轮播图
	$.ajax({
		type: 'get',
		url: 'resource/json/lunbo.json',
		success: function(data) {
			//console.log(typeof data);
			//增删改查
			var arr = data;
			for(var j in arr) {
				var li = $('<li><a href="#"><img src="' + arr[j].src + '"></a></li>');
				$('.lunbo').append(li);

				var li = $('<li>' + ++j + '</li>')
				$('#list').append(li);
			}

			//初始化
			var i = 0;
			//透明度
			$('.lunbo li').eq(0).show().siblings().hide();
			//定时器
			var timer = setInterval(function() {
				i++
				move();
			}, 2000)
			//关闭定时器
			$('.wrap').mouseenter(function() {
				clearInterval(timer);
			})
			$('.wrap').mouseleave(function() {
				clearInterval(timer);
				timer = setInterval(function() {
					i++;
					move()
				}, 2000)
			})
			//点击
			$('#left').click(function() {
				i--;
				move();
			});
			$('#right').click(function() {
				i++;
				move();
			})
			//移入事件
			$('#list').on('mouseenter', 'li', function() {
				console.log(11)
				i = $(this).index();
				move();
			})
			//封装函数
			function move() {
				if(i >= arr.length) {
					i = 0;
				}
				if(i < 0) {
					i = 1;
				}
				//透明变化
				$('.lunbo li').each(function(index, val) {
					if(index == i) {
						$(this).fadeIn().siblings().fadeOut();

						//样式
						$('#list li').eq(i).addClass('select').siblings().removeClass('select');
					}
				})
			}
		},
		error: function(xhr, textStatus) {
			console.log(textStatus);
		}
	});

	//吸顶效果
	var top = $('#box3').offset().top;
	console.log($('#box3').offset().left);
	$(window).scroll(function() {
		var distance = $(window).scrollTop();
		if(distance >= top) {
			$('#topFix').css('display', 'block')
			$('.int').css({
				position: 'fixed',
				top: 7,
				'z-index': 3
			});
			$('.nav-all').css({
				position: 'fixed',
				top: 3,
				'z-index': 3
			});
			$('.nav-all,.l-nav').on({
				mouseenter: function() {
					$('.l-nav').css({
						position: 'fixed',
						top: 48,
						background: '#fff',
						'z-index': 3
					})
				}
		
			})			
		} else {
			$('#topFix').css('display', 'none');
			$('.int').css({
				position: 'static',
			});
			$('.nav-all').css({
				position: 'static'
			})
			$('.nav-all,.l-nav').on({
				mouseenter: function() {
					$('.l-nav').css({
						position: 'static',
						top:0,
						background: '#fff',
						'z-index': 3
					})
				}
		
			})		
		}

	})
	
	//移开消失
	$('.l-nav,.nav-all').on({
		mouseleave: function() {
			$('.l-nav').css({
				position: 'static',
				background: '#fff',
			})
		}
	})

	//到计时 秒杀
	/*var d = new Date();
	d.setHours(12);
	var h = d.getHours();
	var m = 60 - d.getMinutes();
	var s = d.getSeconds();
	//console.log(h,m,s)
	var time = h * 3600 + m * 60 + s;
	//console.log(time);
	var timer = setInterval(function() {
		--time;
		h = parseInt(time / 3600)
		m = parseInt((time / 60) % 60);
		s = parseInt(time % 60);
		$('.hour').html(h > 10 ? h : '0' + h);
		$('.min').html(m > 10 ? m : '0' + m);
		$('.sec').html(s > 10 ? s : '0' + s);
		if(time == 0) {
			$(window).reload();
		}
	}, 1000)*/
	
	var timer = setInterval(function(){
		var d1 = new Date('2017-08-10'); //活动结束时间
		var d2 = new Date(); //当前时间
		var timeInterval = parseInt( (d1-d2)/1000 ); //相差的总秒数
		//console.log(timeInterval);
		
		//活动结束
		if (timeInterval <= 0) {
			alert("活动结束");
			clearInterval(timer); //关闭定时器
			return;
		}
		
		var day = parseInt(timeInterval/(3600*24)); //天
		var hour = parseInt(timeInterval/3600) % 24; //时
		var min = parseInt(timeInterval/60) % 60; //分
		var sec = timeInterval % 60; //秒
		
		day = day>=10 ? day : '0'+day;
		hour = hour>=10 ? hour : '0'+hour;
		min = min>=10 ? min : '0'+min;
		sec = sec>=10 ? sec : '0'+sec;
		
		$('.hour').html( hour );
		$('.min').html( min );
		$('.sec').html( sec );
		
	}, 1000);

	//阴影飞进
	$('.jx').on('mouseenter mouseleave', 'li', function(e) {

		$(this).find('.shadow').slideToggle();
		console.log(11)
	})
	/*$('.jx').on('mouseleave','li',function(e){
		//增加节点
		$(this).find('.shadow').remove();
		//$('<div class="shadow"></div>').addClass('.shadow').appendTo($(this)).slideDown(1000);
	})*/

	//小轮播
	var i = 0;
	$('.gj-left').click(function() {

		if(i == -8) {
			i = 0
			$('.gj-icon').css('left', 0)
		}
		$('.gj-icon').stop().animate({
			left: 140 * --i
		})
		console.log(i)

	})
	$('.gj-right').click(function() {
		if(i == 0) {
			i = -8
			$('.gj-icon').css('left', -1120)
		}
		$('.gj-icon').stop().animate({
			left: 140 * ++i
		})
	})

	var j = 0;
	$('.yp-left').click(function() {
		console.log(11)
		if(j == -8) {
			j = 0
			$('.yp-icon').css('left', 0)
		}
		$('.yp-icon').stop().animate({
			left: 140 * --j
		})

	})
	$('.yp-right').click(function() {
		if(j == 0) {
			j = -8
			$('.yp-icon').css('left', -1120)
		}
		$('.yp-icon').stop().animate({
			left: 140 * ++j
		})

	});

	var k = 0;
	$('.btn-left').click(function() {
		console.log('left')
		if(k == -6) {
			k = 0
			$('.lunbo-icon').css('left', 0)
		}
		$('.lunbo-icon').stop().animate({
			left: 112 * --k
		})

	})
	$('.btn-right').click(function() {
		console.log('rigth')
		if(k == 0) {
			k = -6
			$('.lunbo-icon').css('left', -672)
		}
		$('.lunbo-icon').stop().animate({
			left: 112 * ++k
		})
	})
	
	//右边导航条
	$('.guaid-list').on('mouseenter','li',function(){
		$(this).css('border-left','none');
		$(this).find('.hide-txt').css('display','block').stop().animate({left:-70},300)
		
	})
	$('.guaid-list').on('mouseleave','li',function(){
		$(this).css('border-left','1px');
		$(this).find('.hide-txt').css({
			display:'none',
			left:0
		})
	})
	
	//返回顶部
	$('.guaid-list li').last().click(function(){
//		$(window).scrollTop(0);
		//var speed = 200;
		var timer = setInterval(function(){
			var curren = $(window).scrollTop();
			var speed = Math.ceil(curren/10);
			if(curren == 0){
				clearInterval(timer);
			};
			$(window).scrollTop(curren - speed);
		},30)
	})
	
	
})