$(function() {
	//是否有cookie
	/*var arr = $.cookie('cart');
	if(arr){
		
		
		console.log(arr)
		$('.c-head,.c-list').css('display','none');
		$('.c-head1,.total-msg').css('display','block');
	}else{
		console.log(11)
		$('.c-head,.c-list').css('display','block');
		$('.c-head1,.total-msg').css('display','none');
	}*/
	//获取cookie中的购物车数据
	reflesh()

	function reflesh() {
		var arr = $.cookie('cart');
		if(arr) {
			$('.c-head,.c-list').css('display', 'none');
			//$('.c-head1,.total-msg').css('display', 'block');
			arr = JSON.parse(arr);
			//清空旧节点
			$('.c-massage').empty().append($(`<tr border='1'>
							<th width="60">全选</th>
							<th width="60">订单商品</th>
							<th width="60">单价</th>
							<th width="60">数量</th>
							<th width="60">优惠</th>
							<th width="60">小计</th>
							<th width="60">操作</th>
						</tr>`));
			if(arr.length > 0) {
			$('.c-head1,.total-msg').css('display', 'block');
				var total = 0;
				var count = 0;
				//添加节点
				//console.log(arr)
				
				for(var i in arr) {
					
					var obj = arr[i];
					var sum = obj.num*obj.price;
					//console.log(sum)
					var tr = $('<tr></tr>').appendTo('tbody');
					if(obj.checked) {
						$('<td><input class="check" type="checkbox" checked="checked"/></td>').appendTo(tr);
					} else {
						$('<td><input class="check" type="checkbox" /></td>').appendTo(tr);
					}
					$(`<td><div class="g-msg">
										<div class="g-img"><img src="${obj.img}" alt="" /></div>
										<div class="g-m">
											<a class="g-txt" href="#">${obj.brand}&nbsp;${obj.name}&nbsp;${obj.id}</a>
										</div>
									</div></td>`).appendTo(tr);
									
					$(`<td><span class="g-price1">${obj.unite}${obj.price}</span></td>`).appendTo(tr);
					$(`<td><ul class="i-list">
										<li><input class="cut" type="button" value="-" /></li>
										<li><input type="text" value="${obj.num}" /></li>
										<li><input class="add" type="button" value="+" /></li>
									</ul></td>`).appendTo(tr);
					$('<td><span class="youhui">¥0.00</span></td>').appendTo(tr);
					$(`<td><span class="g-price">${obj.unite}${sum}.00</span></td>`).appendTo(tr);
					$(`<td><p><a href="#">移入收藏夹</a></p>
									<p><a href="#" class="delete">刪除</a></p></td>`).appendTo(tr);

					//如果选中就加上价格
					if(obj.checked) {
						total += obj.price * obj.num;
						count += obj.num;
					}
				}

				//显示总价
				$('#totalPrice').html(total+'.00');
				$('.num,.c-num').html(count);
			} else {
				$('#totalPrice').html(0);
				$('.c-head,.c-list').css('display', 'block');
				$('.c-head1,.total-msg,.c-massage').css('display', 'none');
				
			}
		} else {
			$('.c-head,.c-list').css('display', 'block');
			$('.c-head1,.total-msg').css('display', 'none');
			console.log('购物车空空如也？')
		}
	}

	//各种操作
	//删除
	$('.c-massage').on('click', '.delete', function() {
		if(confirm('您确定删除该购物车明细记录吗？')){
			
		
		var index = $(this).index('.c-massage .delete');
		var arr = JSON.parse($.cookie('cart'));
		arr.splice(index, 1);
		$.cookie('cart', JSON.stringify(arr), {
			expires: 10,
			path: '/'
		});

		isAllCheck(); //是否全选了
		reflesh();
		//console.log($.cookie())
		};
	})
	//加
	$('.c-massage').on('click', '.add', function() {
		var index = $(this).index('.c-massage .add');
		var arr = JSON.parse($.cookie('cart'));
		arr[index].num++;
		$.cookie('cart', JSON.stringify(arr), {
			expires: 10,
			path: '/'
		});

		reflesh();
	})
	//减
	$('.c-massage').on('click', '.cut', function() {
		var index = $(this).index('.c-massage .cut');
		var arr = JSON.parse($.cookie('cart'));
		//console.log(arr[index])
		arr[index].num--;
		if(arr[index].num <= 1) {
			arr[index].num = 1;
		}
		$.cookie('cart', JSON.stringify(arr), {
			expires: 10,
			path: '/'
		});

		reflesh();
	})
	//勾选
	$('.c-massage').on('click', '.check', function() {
		var index = $(this).index('.c-massage .check');
		var arr = JSON.parse($.cookie('cart'));
		arr[index].checked = !arr[index].checked;
		$.cookie('cart', JSON.stringify(arr), {
			expires: 10,
			path: '/'
		});

		isAllCheck();
		reflesh();
	})

	//点击全选
	$('#allCheck').click(function() {
		var arr = JSON.parse($.cookie('cart'));
		for(var i in arr) {
			if($(this).prop('checked')) {
				arr[i].checked = true;
			} else {
				arr[i].checked = false;
			}
		}
		$.cookie('cart', JSON.stringify(arr), {
			expires: 10,
			path: '/'
		});

		reflesh();
	})

	//判断是否全选
	isAllCheck();

	function isAllCheck() {
		var arr = JSON.parse($.cookie('cart'));
		var sum = 0;
		for(var i in arr) {
			sum += arr[i].checked;
		}
		if(sum == arr.length && arr.length != 0) {
			$('#allCheck').prop('checked', true);
		} else {
			$('#allCheck').prop('checked', false);
		}
	}

	//删除选中
	$('.deleteSelect').click(function() {

		var arr = JSON.parse($.cookie('cart'));
		var newArr = [];
		for(var i in arr) {
			if(arr[i].checked == false) {
				newArr.push(arr[i]);
			}
		}
		$.cookie('cart', JSON.stringify(newArr), {
			expires: 10,
			path: '/'
		});

		isAllCheck();
		reflesh();
	})
	
	//支付跳转
	$('.pay').click(function(){
		location.href = 'https://auth.alipay.com/login/index.htm';
	})

})