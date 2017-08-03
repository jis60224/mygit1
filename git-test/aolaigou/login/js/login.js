$(function(){
	
	$('.btn').click(function(){
		//console.log($('#username').val()+','+$('#psd').val())
		$.post('http://127.0.0.1/aolaigou/login/login.php',{username:$('#username').val(),password:$('#psd').val()},function(data){
			//console.log(data);
			//console.log(JSON.parse(data).msg);
			if(JSON.parse(data).status == 1){
				open('../../aolaigou/index.html');
			}
		})

	})
	
	
})
