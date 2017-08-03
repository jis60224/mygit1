<?php
header('Access-Control-Allow-Origin:*');
header("Content-Type:text/html;charset=utf8");

//获取数据
$username = $_GET['username'];
$password = $_GET['password'];

//类
class Res{
	public $status;
	public $msg;
}

//连接数据
$conn = new mysqli('127.0.0.1','root','','mydb1') or die('连接失败');
$sql = "select * from user where username = '$username'";
$result = $conn->query($sql);
if($result && $result->num_rows > 0){
	$res = new Res();
	$res->status = 2;
	$res->msg = '用户已存在！';
	echo json_encode($res);
}else{
	$sql2 = "insert into user(username,password) values('$username','$password')";
	$result2 = $conn->query($sql2);
	if($result2){
		$res = new Res();
		$res->status = 1;
		$res->msg = '注册成功！';
		echo json_encode($res);
	}else{
		$res = new Res();
		$res->status = 0;
		$res->msg = '注册失败！';
		echo json_encode($res);
	}
}
$conn->close();






?>