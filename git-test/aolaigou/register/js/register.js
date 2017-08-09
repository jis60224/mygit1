

$(function(){
	
		
	
	//注册验证
	var flag1 = false,flag2 = false,flag3 = false,flag4 = false,flag5 = false,flag6= false;
	
	//账号验证
	$('.username').on('focus keyup',function(){
		$('.username-tips').html('请输入注册的手机号');
		if(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/.test($(this).val())){
			$('.username-tips').html('');
			flag1 =true;
		};
		$(this).blur(function(){
			$('.username-tips').html('');
		})
	});
	//密码验证
	$('.password').on('focus keyup',function(){
		$('.psd-tips').html('6-20位字符，可使用数字、字母和字符的组合');
		if(/^\w{6,22}$/.test($(this).val())){
			if(/^\d{6,22}$/.test($(this).val()) || /^[a-zA-Z]{6,22}$/.test($(this).val())){
				console.log(11)
				$('.psd-tips').html('该密码比较简单有被盗的风险').css('color','red');
			}
			//$('.psd-tips').html('');
			flag2 =true;
		}
		$(this).blur(function(){
			$('.psd-tips').html('');
		})
	});
	//确认密码
	$('.repsd').on('focus keyup',function(){
		$('.repsd-tips').html('请输入密码');
		if($(this).val() == $('.password').val()){
			$(this).blur(function(){
			$('.repsd-tips').html('两次密码一致');
			flag3 =true;
		})
			
		}else{
			$(this).blur(function(){
			$('.repsd-tips').html('两次密码不一致');
		})
		}
		
	})
	//验证码
	$('.code-num').click(function(){
		$(this).val(randomCode());
		reflesh();
	})
	
	$('.code').on('focus keyup',function(){
		reflesh();
		
	})
	//短信验证
	$('.msg-code').click(function(){
		$(this).val(randomNum());
	})
	
	$('.msg').on('focus keyup',function(){
		$('.msg-tips').html('请输入短信验证码');
		if($(this).val() == $('.msg-code').val()){
			$(this).blur(function(){
			$('.msg-tips').html('');
			flag5 =true;
		})
		}else{
			$(this).blur(function(){
			$('.msg-tips').html('请输入正确的短信验证码');
		})
		}
	})
	//注册按钮
	$('.btn').click(function(){
		if(flag1 && flag2 && flag3 && flag4 && flag5){
			//console.log(11)
			//ajax
			$.ajax({
				type:"get",
				url:"http://127.0.0.1/aolaigou/register/register.php",
				data:{
					username:$('.username').val(),
					password:$('.password').val()
				},
				success:function(data){
					console.log(22)
					console.log(data);
					console.log(JSON.parse(data).status);
					if(JSON.parse(data).status == 1){
						alert(JSON.parse(data).msg)
						open('../../aolaigou/login/login.html','parent')
					}else{
						alert(JSON.parse(data).msg)
					}
					
				}
			});
		}
	})
	
	
	
	function reflesh(){
		$('.code-tips').html('请输入验证码');
		if($('.code').val() == $('.code-num').val()){
			
			$('.code').blur(function(){
			$('.code-tips').html('');
			flag4 =true;
		})
		}else{
			flag4 = false;
			$('.code').blur(function(){
			$('.code-tips').html('请输入正确的验证码');
		})
		}
		}
	
	//console.log(String.fromCharCode(Math.random()<0.5 ? ((Math.random()*26)+65) : ((Math.random()*26)+97) ))
	//随机数字和字母
	function randomCode(){
		var str = '';
		for(var i =0;i<4;i++){
			str += Math.random()<0.5 ? parseInt(Math.random()*10) : String.fromCharCode(Math.random()<0.5 ? ((Math.random()*26)+65) : ((Math.random()*26)+97) );
		}
		return str;
	}
	//随机数字
	function randomNum(){
		var str = '';
		for(var i =0;i<4;i++){
			str += parseInt(Math.random()*10);
		}
		return str;
	}
})