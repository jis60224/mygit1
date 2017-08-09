
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}
	return obj.currentStyle[attr];
}

function move(obj,attr,target,callback){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//1.current
		var current = 0;
		if(attr == 'opacity'){
			current = Math.round(getStyle(obj,attr)*100);
		}else{

			current = parseFloat(getStyle(obj,attr));
			current = Math.round(current);
		}
		//2.speed
		var speed = (target - current)/8;
//		console.log(speed)
		speed = speed > 0 ?Math.ceil(speed) : Math.floor(speed);
		//3.临界值
		if(current == target){
			//console.log(callback)
			clearInterval(obj.timer);
			//回调函数
			
			if(callback){callback()};
			return;
		}
		//4.运动
		if(attr == 'opacity'){
			obj.style[attr] = (current + speed)/100;
			obj.style.filter = 'alpher('+attr+'='+(current + speed)+')';
		}else{
			obj.style[attr] = current + speed + 'px';
		}
	},30);
}

//封装函数
//animate(obox, {left:200, top:200, width:300, height:300});
//obj: 需要修改的元素节点
//json: 需要修改的样式属性{left:200, top:200, width:300, height:300}
//fn: 运动结束后的回调函数
function animate(obj,json,callback){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){
			var target = json[attr];
			//1.current
			var current = 0;
			if(attr == 'opacity'){
				current = Math.round(getStyle(obj,attr)*100);
			}else{
	
				current = parseFloat(getStyle(obj,attr));
				current = Math.round(current);
			}
			//2.speed
			var speed = (target - current)/10;
	//		console.log(speed)
			speed = speed > 0 ?Math.ceil(speed) : Math.floor(speed);
			//3.临界值
			if(current != target){
				//console.log(callback)
				bStop = false;
			}
			//4.运动
			if(attr == 'opacity'){
				obj.style[attr] = (current + speed)/100;
				obj.style.filter = 'alpher('+attr+'='+(current + speed)+')';
			}else{
				obj.style[attr] = current + speed + 'px';
			}
		}
		if(bStop){
			clearInterval(obj.timer);
				//回调函数
				if(callback){callback()};
		}
	},30);
}