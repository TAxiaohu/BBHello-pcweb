// urlMap
var urlUtil = {
    getQueryString : function(paramName){
        var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");//构造一个含有目标函数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标函数
        if(r!=null)return  unescape(r[2]); return null;//返回参数值
    }
};

// 页面跳转加id
var goDetail = function(){
	$(".go-detail").click(function() {
	    window.location.href= $(this).attr("f-target") + "?itemId=" + $(this).attr("id");
	});
}

// 二维码滑入
var slideIn = function(){
	$(".fixedtool").hover(
		function(){
			$(".fixedtool").css("right","0px");
		},
		function(){
			$(".fixedtool").css("right","-200px");
		}
	);
}

// 发送验证码计时器
function timedCount(){ 
    $("#send-identify-code").html("发送验证码(" +c+ ")");
    c = c-1;
    t = setTimeout("timedCount()",1000);
    if (c==0) {
        clearTimeout(t);
        $("#send-identify-code").html("发送验证码");
        $("#send-identify-code").attr("onclick","sendIdfCode()");
        c=60;
    }
}


// urlMap
function getQueryStringMap(url) {
	var result = {};
	if (url) {
		var queryStr = String(url).split("?")[1];
		if (queryStr.indexOf("&") > -1) {
			var paramArr = queryStr.split("&");
			for (i=0;i<paramArr.length;i++) {
				var param = paramArr[i].split("=");
				result[param[0]] =  param[1];
			}
		} else {
			var param = queryStr.split("=");
			result[param[0]] =  param[1];
		}
	}
	return result;
}

// 自动回车事件
function autoEnter(selector){
    if (event.keyCode == 13){
        $(selector).trigger("click");
    }
}

// 退出账户
function quit() {
	quitApi(function(res){
		if (res.code === '200') {
	        window.location.href="../index.html";
	    }
	});
}

// 首页退出账户
function indexQuit() {
	quitApi(function(res){
		if (res.code === '200') {
	        window.location.href="index.html";
	    }
	});
}

// 验证手机号码正则
function mobileNumTest(num) {
	if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(num))) {
	    return false;
	}
	return true;
}

// 发送验证码
function sendIdfCode(){
    if (c!==1){
        if (mobileNumTest($("#tel").val())) {
            telData.cellphone = $("#tel").val();
            sendCodeApi(telData,function(){
            	$("#send-identify-code").removeAttr("onclick","sendIdfCode()");
                timedCount();
            });
        } else {
            $(".input-tel").css("visibility","visible");
        }
    }
    else {
        c=60;
        $("#send-identify-code").attr("onclick","sendIdfCode()");
    }
}

// page about& questions anchors link
function anchorLink() {
	if (location.hash) {
		$("li [href='"+location.hash +"']").trigger("click");
		$("li [href='"+location.hash +"']").addClass("active");
	}
}

// 当前页面的链接跳转问题
function curAnchorLink(hash) {
	$("li [href='#"+hash +"']").trigger("click");
	$("li [href='#"+hash +"']").parent().addClass("active");
}

// 图片设置
function dealImg() {
	var obj = $(".embed-responsive-img");
	for (i=0;i<obj.length;i++){
		if ($(obj.get()[i]).height()>=$(obj.get()[i]).width()) {
			$(obj.get()[i]).addClass("embed-responsive-img-w");
		} else {
			$(obj.get()[i]).addClass("embed-responsive-img-h");
		}
	}
}
// 点击头像下拉菜单
$(".down-menu").hide();
$(".avatar").click(function() {
	$(".down-menu").toggle();
});

// 用户协议--注册
$("#protocol").click(function() {
	$('#myModal').on('shown.bs.modal');
});
$("#btn-agree-protocol").click(function() {
	$('#readme').attr("checked",true);
	$("#modal-protocol .close").trigger("click");
});

// 预约
$("#order-now").click(function() {
	$("body").append("<div class='modal fade' id='modal-order' align='center'><div class='modal-box' height='100%'' style='width: 900px;'><a class='close' data-dismiss='modal'><img src='../img/icon-sdblock-btnclose.png'></a><div class='row'><h3 align='center' style='color: #4d4d4d;'>填写预约信息</h3></div><form class='form-horizontal'><div class='form-group'><label class='col-xs-3' for='name'>姓名</label><input type='text' class='form-control col-xs-9' id='name' placeholder='请输入姓名'><label class='col-xs-3' for='sex'>性别</label><div class='col-xs-9'><label class='radio-inline'><input type='radio' name='sex' id='female' value='2'>女</label><label class='radio-inline'><input type='radio' name='sex' id='male' value='1'>男</label></div><label class='col-xs-3' for='age'>年龄</label><input type='text' class='form-control col-xs-9' id='age' placeholder='请输入年龄'><label class='col-xs-3' for='tel'>联系电话</label><input type='tel' class='form-control col-xs-9' id='tel' placeholder='请输入手机号码'><label class='col-xs-3' for='address'>地址</label><div id='address'><select id='province' class='province form-control col-xs-4' name='province'></select><select id='city' class='city form-control col-xs-4' name='city' style='margin-left: 8%;'></select></div></div><div class='btn-order'><a href='#' class='btn btn-primary' role='button' id='order-next'>立即预约</a></div></form></div></div>");
	$('#myModal').on('shown.bs.modal');
});

// 医生简介a标签hover进去显示文字
$(".doctor-avatar").hover(
	function() {
		var index = $(this).attr("index");
		$(".doctor-desc").children()[index].style.display= "block";
	},
	function() {
		var index = $(this).attr("index");
		$(".doctor-desc").children()[index].style.display= "none";
	}
);


// tab
$('.tab-content a').click(function (e) {
	e.preventDefault()
	$(this).tab('show');
});


// the page of news navbar down triangle
$("#page-news .nav-tabs>li>a").click(function() {
	$(".down-triangle").hide();
	this.parentElement.children[1].style.display = "block";
});

// 页面跳转锚定位偏移
$(function(){
	if (location.hash) {
		targetFixed();
	}
});
function targetFixed(){
	var target = $(location.hash);
	if(target.length==1){
    	var top = target.offset().top-120;
    	if(top > 0){
        	$('html,body').animate({scrollTop:top}, 1000);
    	}
	}
}

$(".modal").height(window.screen.availHeight - 200);
$("#modal-protocol .context").height(window.screen.availHeight - 400);
$(".nav-square").height($(".nav-square").width());
$(".nav-circle").height($(".nav-circle").width());

// 获取个人信息

$("#loged").hide();
// 登录获取个人信息
var accountInfo = {};
profileApi(function(res){
    if (res.code === '200' && res.data) {
    	accountInfo = res.data;
        $("#register").hide();
        $("#loged").show();
        $(".sm-view-hidden").hide();
        $(".sm-view-show").show();
        $("#my-name").html(res.data.nickname);
        $("#my-avatar").attr("src",res.data.photo?res.data.photo:"../img/avatar.png");
    }
});

// 添加成功1秒倒计时关闭modal
function timedClose(selector){
    cls = cls-1;
    t = setTimeout("timedClose('"+selector+"')",1000);
    if (cls==0) {
        clearTimeout(t);
        $(selector).trigger("click");
        cls=2;
    }
}

var removeFromArray = function(arr,val){
    var index = $.inArray(val,arr);
    if (index >= 0)
        arr.splice(index, 1);
    return arr;
};
// 分页
function pagination(total){
	if (total>10){
        // $(".pagination").append("<li><a aria-label='Previous'><span aria-hidden='true'>上一页</span></a></li>");
        for (i=1;i<=Math.round(total/10)+1;i++) {
            $(".pagination").append("<li><a offsetid='" + (i-1)*10 + "'>"+i+"</a></li>");
        }
        // $(".pagination").append("<li><a aria-label='Next'><span aria-hidden='true'>下一页</span></a></li>");
    }
}