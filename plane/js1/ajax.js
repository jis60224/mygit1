
//创建xhr对象的函数
function createXHR(){
	if (window.XMLHttpRequest){ //IE7+,谷歌, 火狐等
	 	return new XMLHttpRequest();
	}
	return new ActiveXObject("Microsoft.XMLHTTP"); //IE6
}


/*
		 	ajax({
				type: "get", 
				url: "http://60.205.181.47/myPHPCode2/checkname.php", 
				data: {regname:"张三", age:33},
				async: true,
				
				success: function(){
					console.log("success");
				},
				error: function(){
					console.log("error");
				}
			});
 * */
//封装ajax函数
function ajax(obj){
	
	//1, xhr对象
	var xhr = createXHR();
	
	var paramStr = getParam(obj.data);  
	//console.log(paramStr);
	
	if (obj.type == "get"){
		obj.url += paramStr.length>0 ? ("?" + paramStr) : "";
	}
	
	//2, open
	xhr.open(obj.type, obj.url, obj.async);
	
	//3, send
	if (obj.type == "get"){
		xhr.send(null);
	}
	else if (obj.type == "post"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		xhr.send(paramStr);
	}
	
	//4, 得到数据
	if (obj.async){ //异步
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				callBack();
			}
		}
	}
	else { //同步
		callBack();
	}
	
	function callBack(){
		if (xhr.status == 200) { //请求成功
			if (obj.success){
				obj.success(xhr.responseText); //回调, 并返回响应数据
			}
		}
		else { //请求失败
			if (obj.error){
				obj.error(xhr.status); //回调, 并返回状态码
			}
		}
	}
	
	
}

//{regname:"张三", age:33}  => "regname=张三&age=33"
function getParam(paramObj){
	var arr = [];
	for (var i in paramObj){
		var str = i + "=" + paramObj[i];
		arr.push(str);
	}
	return arr.join("&");
}


