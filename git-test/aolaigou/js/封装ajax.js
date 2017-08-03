//
function createXHR() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	return new ActiveXObject('Microsoft.XMLHTTP');
}
/*
 ajax({
 	type:'get',
 	async:true,
 	url:'http://127.0.0.1?name=zhangsan&age=12'
 	data:{
 		name:'zhangsan',
 		age:'23'
 	},
 	success:function(data){
 		console.log(data);
 	},
 	error:function(data){
 		console.log(data);
 	}
 })
 * */
function ajax(obj) {
	//1.xhr
	var xhr = createXHR();

	//2.open
	obj.type = obj.type || 'get';
	obj.async = obj.async == undefined ? true : obj.async;
	var params = getParamStr(obj.data); //参数

	if(obj.type.toLocaleLowerCase() == 'get') {
		obj.url += params.length == 0 ? '' : ('?' + params); //看参数是否为零
	}
	xhr.open(obj.type, obj.url, obj.async);

	//3.send
	if(obj.type.toLocaleLowerCase() == 'get') {
		xhr.send(null);
	} else if(obj.type.toLocaleLowerCase() == 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(params);
	}
	//4.获取数据
	if(obj.async) { //同步
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				callback()
			}
		}

	} else { //异步
		callback();
	}

	//回调函数
	function callback() {
		if(xhr.status == 200) {
			//成功回调
			if(obj.success){
				obj.success(xhr.responseText);
			}
		}else{
			//失败回调
			if(obj.error){
				obj.error(xhr.status)
			}
		}
	}

}

function getParamStr(obj) {
	var arr = [];
	for(var key in obj) {
		var str = encodeURIComponent( key) + '=' + decodeURIComponent(obj[key]);
		arr.push(str);
	}
	return arr.join('&');
}