var orderModal = "<div class='modal fade' id='modal-order' align='center'>"+
"<div class='modal-box' height='100%'>"+
"<a class='close' data-dismiss='modal'><img src='../img/icon-sdblock-btnclose.png'></a>"+
"<div class='row'>"+
"<h3 align='center' style='color: #4d4d4d;'>填写预约信息</h3></div>"+
"<form class='form-horizontal'>"+
"<div class='form-group'><label class='col-xs-3' for='name'>姓名</label>"+
"<input type='text' class='form-control col-xs-9' id='name' placeholder='请输入姓名'>"+
"<div class='col-xs-3'></div><div class='col-xs-9 warn input-name'>请输入姓名</div>"+
"<label class='col-xs-3' for='sex'>性别</label>"+
"<div class='col-xs-9'>"+
"<label class='radio-inline'><input type='radio' name='sex' id='female' value='2'>女</label>"+
"<label class='radio-inline'><input type='radio' name='sex' id='male' value='1'>男</label></div>"+
"<div class='col-xs-3'></div><div class='col-xs-9 warn input-sex'>请选择性别</div>"+
"<label class='col-xs-3' for='age'>出生日期</label>"+
"<select id='year' class='year form-control col-xs-4' name='year'></select>"+
"<select id='month' class='month form-control col-xs-4' name='month' style='margin-left: 8%;'></select>"+
"<div class='col-xs-3'></div><div class='col-xs-9 warn input-age'>年龄需要在16~60岁之间</div>"+
"<label class='col-xs-3' for='tel'>联系电话</label>"+
"<input type='tel' class='form-control col-xs-9' id='tel' placeholder='请输入手机号码'>"+
"<div class='col-xs-3'></div><div class='col-xs-9 warn input-tel'>请输入手机号码</div>"+
"<label class='col-xs-3' for='address'>地区</label>"+
"<div id='address'><select id='province' class='province form-control col-xs-4' name='province'></select>"+
"<select id='city' class='city form-control col-xs-4' name='city' style='margin-left: 8%;'></select></div>"+
"<div class='col-xs-3'></div><div class='col-xs-9 warn input-address'>请选择地区</div><div class='col-xs-3'></div><div class='col-xs-9 warn success'></div>"+
"</div><div class='btn-order'><a class='btn btn-primary' role='button' id='order-next'>立即预约</a></div></form></div></div>"


// "<div class='input-group date form_date col-xs-9' data-date='' id='age' data-date-format='yyyy-MM-dd' data-link-field='dtp_input2' data-link-format='yyyy-mm-dd'><input class='form-control' size='16' type='text' value='' readonly=''><span class='input-group-addon'><span class='glyphicon glyphicon-remove'></span></span><span class='input-group-addon'><span class='glyphicon glyphicon-calendar'></span></span></div>"+