$(function() {
	'user strict'
	//cookie
	/*$('.cart-btn').click(function(){
		
	})*/
	//?id=101
	var params = location.search;
	console.log(params);
	var id = fn(params, 'id');
	//console.log(id)

	//get请求
	$.get('../resource/json/goods1.json', function(d) {
		//console.log(d)
		var arr = d;
		console.log(arr)
		for(var i in arr) {
			var obj = arr[i];
			if(obj.id == id) {
				//调用函数
				fn2(obj);
			}
		}
	})
	//渲染页面
	function fn2(obj) {
		//创建节点
		//图片
		$('.smallImg').append($(`<img src="${obj.img}"/>`));
		//名称
		$('.goods-name').html($(`<span class="pinpai">${obj.brand}</span>
					<span class="name">${obj.name}</span>
					<span class="id">${obj.id}</span>`));
		//价格
		$('.price span').eq(0).after($(`<span class="unite">${obj.unite}</span>
					<span class="goods-price"><b>${obj.price}</b></span>`))

		//加入购物车插件 飞进
		$('.cart-btn').click(function() {
			//点击创建一个运动的节点
			var flyer = $(`<img src="${obj.img}" style="width: 200px;height: 200px;"/>`)
			flyer.fly({
				start: {
					left: $('.img').offset().left,
					top: $('.img').offset().top
				},
				end: {
					left: $('.cart').offset().left,
					top: $('.cart').offset().top,
					width: 0,
					height: 0
				}
			})

			//cookie 加入购物车
			//console.log('加入口物车')

			var flag = false;
			var newArr = $.cookie('cart') ? JSON.parse($.cookie('cart')) : [];
			console.log(newArr)
			for(var i in newArr) {
				//console.log(newArr[i].id == obj.id)
				if(newArr[i].id == obj.id) {
					flag = true;
					newArr[i].num++;
				}
			}
			if(!flag) {
				obj.num = 1;
				obj.checked = true;
				newArr.push(obj);
			}
			$.cookie('cart', JSON.stringify(newArr), {
				expires: 10,
				path: '/'
			});
			console.log($.cookie('cart'));

			var str = 0;
			for(var i in JSON.parse($.cookie('cart'))) {
				str += JSON.parse($.cookie('cart'))[i].num
			}
			$('#cart-num').show().val(str);

			reflesh()
		})

	}
	//购物车小点出现
	if($.cookie('cart')) {
		var str = 0;
		for(var i in JSON.parse($.cookie('cart'))) {
			str += JSON.parse($.cookie('cart'))[i].num
		}
		$('#cart-num').show().val(str);
	}

	//购物车跳转
	$('.pay-btn').click(function(){
		open('../cart/cart.html','black');
	});
	$('.guaid-list li').eq(1).click(function() {
		$('#right-guaid').animate({
			right: 0
		})
		//open('../cart/mycart.html','black');
	});
	$('.close-btn').click(function() {
		$('#right-guaid').animate({
			right: -330
		})
	})

	//购物车渲染
	reflesh();

	function reflesh() {
		var arr = $.cookie('cart');
		//先清空旧节点
		$(".g-list").empty(); 
		if(arr) {
			arr = JSON.parse($.cookie('cart'));
			if(arr.length > 0) {
				var total = 0;
				var sum = 0;
				for(var i in arr) {
					var obj = arr[i];
					var li = $('<li></li>').appendTo($('.g-list'));
					if(obj.checked) {
						$("<input class='check' type='checkbox' checked='checked' />").appendTo(li);
					} else {
						$("<input class='check' type='checkbox' />").appendTo(li);
					}
					$("<img class='g-img' src=" + obj.img + " />").appendTo(li);
					$(`<div class="g-txt">
							<p>
								<span>${obj.brang}</span>
								<span>${obj.name}</span>
								<span>${obj.id}</span>
							</p>
							<p>
								<span>${obj.unite}${obj.price}</span>
								<span>*${obj.num}</span>
							</p>
						</div>`).appendTo(li);
					//如果是选中的，则计算总价
					if(obj.checked) {
						total += obj.price * obj.num;
						sum += obj.num
					}

				}
				//显示总价
				$("#totalPrice").html(total);
				$(".gs-count").html(sum);
			}

		} else {
			console.log(11)
			$('.g-list').append($('<img src="resource/img/emty-cart.png" style="width:330px height:400px">'));
		}
	}
	//勾选
	$('.g-list').on('click','li',function(){
		var index = $(this).index('.g-list li');
		//console.log(index)
		var arr = JSON.parse($.cookie('cart'));
		arr[index].checked = !arr[index].checked;
		$.cookie('cart',JSON.stringify(arr),{expires:10,path:'/'});
		isAllCheck();
		reflesh();
	})
	//全选
	$('.allCheck').on('click',function(){
		var arr = JSON.parse($.cookie('cart'));
		
		for(var i in arr){
			if($(this).prop('checked')){
				arr[i].checked = true;
			}else{
				arr[i].checked = false;
			}
		}
		$.cookie('cart',JSON.stringify(arr),{expires:10,path:'/'});
		
		
		reflesh();
	});
	//判断全选
	isAllCheck();
	function isAllCheck(){
		var sum = 0;
		var arr = JSON.parse($.cookie('cart'));
		for(var i in arr){
			sum+=arr[i].checked;
		}
		if(sum == arr.length && arr.length !=0){
			$('.allCheck').prop('checked',true);
		}else{
			$('.allCheck').prop('checked',false);
		}
	}
	
	//截取id的函数
	function fn(params, id) {
		params = params.substring(1); //id=101
		var arr = params.split('&'); //id=101&username=zhangsan;
		for(var i in arr) {
			var arr2 = arr[i].split('=');
			if(arr2[0] == id) {
				return arr2[1];
			}
		}
		return '';
	}

	//放大镜
	$('.lb-list').on('mouseenter', 'li', function() {
		console.log(($(this).index() + 1))
		$(this).css({
			border: '1px solid red'
		});
		$('.smallImg').find('img').attr('src', 'resource/lunbo/b-l' + ($(this).index() + 1) + '.JPG');
		$('.bigImg').attr('src', 'resource/lunbo/bb-l' + ($(this).index() + 1) + '.JPG')
	});
	$('.lb-list').on('mouseleave', 'li', function() {
		$(this).css({
			border: 'none'
		});
	});

	//等比公式
	//小图width/大图width == 小区域width/大区域width
	$(".smallArea").width($(".smallImg").width() * $(".bigArea").width() / $(".bigImg").width());
	$(".smallArea").height($(".smallImg").height() * $(".bigArea").height() / $(".bigImg").height());

	//放大系数
	var scale = $(".bigImg").width() / $(".smallImg").width();

	//在小图中移动
	$(".smallImg").mousemove(function(e) {
		$(".smallArea").show(); //显示小区域
		$(".bigArea").show(); //显示大区域

		var x = e.pageX - $(".smallImg").offset().left - $(".smallArea").width() / 2;
		var y = e.pageY - $(".smallImg").offset().top - $(".smallArea").height() / 2;

		//控制不超出左右边界
		if(x < 0) {
			x = 0;
		} else if(x > $(".smallImg").width() - $(".smallArea").width()) {
			x = $(".smallImg").width() - $(".smallArea").width();
		}
		//控制不超出上下边界
		if(y < 0) {
			y = 0
		} else if(y > $(".smallImg").height() - $(".smallArea").height()) {
			y = $(".smallImg").height() - $(".smallArea").height();
		}

		//小区域移动
		$(".smallArea").css({
			left: x,
			top: y
		});

		//大图移动
		$(".bigImg").css({
			left: -scale * x,
			top: -scale * y
		});
	})

	//移除小图
	$(".smallImg").mouseleave(function() {
		$(".smallArea").hide(); //隐藏小区域
		$(".bigArea").hide(); //隐藏大区域
	})

	//导航显示
	$('.nav-all,.l-nav').on({
		mouseenter: function() {
			$('.l-nav').css({
				display: 'block'
			})
		}

	});
	$('.l-nav,.nav-all').on({
		mouseleave: function() {
			$('.l-nav').css({
				display: 'none'
			})
		}
	})

	//右边导航条
	$('#right-guaid .guaid-list').on('mouseenter', 'li', function() {
		//console.log(111)
		$(this).css('border-left', 'none');
		$(this).find('.hide-txt').css('display', 'block').stop().animate({
			left: -70
		}, 300)

	})
	$('.guaid-list').on('mouseleave', 'li', function() {
		$(this).css('border-left', '1px solid #ededed');
		$(this).find('.hide-txt').css({
			display: 'none',
			left: 0
		})
	})

	//返回顶部
	$('.guaid-list li').last().click(function() {
		//		$(window).scrollTop(0);
		//var speed = 200;
		var timer = setInterval(function() {
			var curren = $(window).scrollTop();
			var speed = Math.ceil(curren / 10);
			if(curren == 0) {
				clearInterval(timer);
			};
			$(window).scrollTop(curren - speed);
		}, 30)
	})

})