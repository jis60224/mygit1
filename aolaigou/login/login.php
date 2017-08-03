<?php

header('Access-Control-Allow-Origin:*');
header("Content-Type:text/html;charset=utf8");

//获取数据
$username = $_POST['username'];
$password = $_POST['password'];

class Res{
	public $status;
	public $msg;
}

//连接数据库
$conn = new mysqli('127.0.0.1','root','','mydb1') or die('连接失败');
$sql = "select * from user where username='$username' and password ='$password'";
$result = $conn->query($sql);
if($result && $result->num_rows>0){
	$res = new Res();
	$res->status = 1;
	$res->msg = '登陆成功';
	echo json_encode($res);
}else{
	$res = new Res();
	$res->status = 0;
	$res->msg = '登陆失败';
	echo json_encode($res);
}


















?>