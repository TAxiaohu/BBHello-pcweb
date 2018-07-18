var chNumModal = "<div class='modal fade' id='modal-ch-num' align='center'>
<div class='modal-box' height='100%' style='width: 600px;'>
<a class='close' data-dismiss='modal'>
    <img src='../img/icon-sdblock-btnclose.png'>
</a>
<div class='row'>
    <h3 align='center' style='color: #4d4d4d;'>修改号码</h3>
</div>
<form class='form-horizontal'>
    <div class='form-group'>
        <label class='col-xs-3' for='old-num'>旧密码</label>
        <input type='text' class='form-control col-xs-9' id='old-num' placeholder='请输入原密码'>
        <div class='col-xs-3'></div><div class='col-xs-9 warn input-old-num'>原密码错误</div>
        <label class='col-xs-3' for='new-num'>新密码</label>
        <input type='text' class='form-control col-xs-9' id='new-num' placeholder='请输入新密码'>
        <div class='col-xs-3'></div><div class='col-xs-9 warn input-new-num'>请输入新密码</div>
        <label class='col-xs-3' for='sbm-num'>确认密码</label>
        <input type='text' class='form-control col-xs-9' id='sbm-num' placeholder='再次输入新密码'>
        <div class='col-xs-3'></div><div class='col-xs-9 warn input-sbm-num'>两次密码不一致</div>
        <div class='col-xs-3'></div><div class='col-xs-9 warn success' style="font-size: 16px;">修改成功</div>
    </div>
    <div class='btn-submit'>
        <a href='#' class='btn btn-primary' role='button' id='submit-ch-num'>确认</a>
    </div>
</form>
</div>
</div>