var cls = 2;

$("#upload").click(function(){
    window.location.href="report.html";
});
$("#loged").hide();
// 登录获取个人信息
profileApi(function(res){
    if (res.code === '200' && res.data) {
        $("#register").hide();
        $("#loged").show();
        $("#my-name").html(res.data.nickname);
        $("#user-name").html(res.data.nickname);
        $("#my-avatar").attr("src",res.data.photo?res.data.photo:"../img/avatar.png");
        if (res.data.level == 1||res.data.level == 2) {
            $("#tab-client").show();
        }
        var pageAccount = $("#pageAccount").html();
        var template = Handlebars.compile(pageAccount);
        var html = template(res.data);
        $("#account").html(html);
        var pswData = {};
        // 修改密码
        $("#change-psw").click(function() {
            $("body").append(chPswModal);
            $("#modal-ch-psw #submit-ch-psw").click(function(res) {
                $(".warn").css("visibility","hidden");
                if ($("#old-psw").val()) {
                    if ($("#new-psw").val()) {
                        if ($("#sbm-psw").val() && $("#new-psw").val() === $("#sbm-psw").val()) {
                            pswData.password = $("#old-psw").val();
                            pswData.newPassword = $("#new-psw").val();
                            changePswApi(pswData,function(res){
                                if (res.code === '200') {
                                    window.location.href="../view/login.html";
                                } else {
                                    $(".input-old-psw").css("visibility","visible");
                                }
                            });
                        } else {
                            $(".input-sbm-psw").css("visibility","visible");
                        }
                    } else {
                        $(".input-new-psw").css("visibility","visible");
                    }
                } else {
                    $(".input-old-psw").css("visibility","visible");
                }
            });
        });
    }
});
// 获取个人订单
var journeyData = {};
journeyData.data = {};
var jDealedData = {};
orderApi(function(res){
    if (res.code === '200') {
        if (res.data.items.length == 0) {
            $("#order").html("您还没有订单哦");
            return false;
        }
        for (i=0;i<res.data.items.length;i++) {
            res.data.items[i].orderStatus = stepStatusConf(res.data.items.orderStatus);
        }
        var pageOrder = $("#pageOrder").html();
        var template = Handlebars.compile(pageOrder);
        var html = template(res.data);
        $("#order").html(html);
        // 下拉行程状态
        $(".down-triangle").click(function() {
            orderId = $(this).attr("order-id");
            var thisObj = $(this);
            if (journeyData.data[orderId]){
                if (thisObj.attr("class").indexOf("active")>-1) {
                    thisObj.removeClass("active");
                    $("#"+orderId).hide();
                } else {
                    thisObj.addClass("active");
                    $("#"+orderId).show();
                }
            } else {
                if (thisObj.attr("order-id")) {
                    journeyApi(orderId,function(res){
                        if (res.code === '200' && res.data) {
                            journeyData.data[orderId] = res;
                            for (i=0;i<res.data.length;i++) {
                                res.data[i].stepStatus = stepStatusConf(res.data[i].stepStatus);
                            }
                            jDealedData.data = res.data.reverse();
                            for (i=jDealedData.data.length;i<orderJourneyArray.length;i++){
                                jDealedData.data.push(orderJourneyArray[i]);
                            }
                            var pageJourney = $("#pageJourney").html();
                            var jtemplate = Handlebars.compile(pageJourney);
                            var jhtml = jtemplate(jDealedData);
                            $("#"+orderId).html(jhtml);
                            $("li[id="+orderId+"] span[stepstatus=成功]").addClass("success");
                            $("li[id="+orderId+"] span[stepstatus=初始化]").addClass("ongoing");
                            $("li[id="+orderId+"] span[stepstatus=进行]").addClass("ongoing");
                            $("li[id="+orderId+"] span[stepstatus=finish]").parent().css("color","#9b9b9b");
                            $("li[id="+orderId+"] span[stepstatus=finish]").css("color","#fff");
                            // 上传报告按钮设置
                            // if (jDealedData.data[1].stepStatus == "初始化") {
                            //     $("li[id="+orderId+"] span[step=1]").html("<a href='report.html?orderId=" + orderId + "' class='btn btn-primary' role='button'>上传报告</a>");
                            //     $("li[id="+orderId+"] span[step=1]").removeClass("ongoing");
                            // } else if (jDealedData.data[1].stepStatus == "进行"){
                            //     $("li[id="+orderId+"] span[step=1]").html("<a href='report.html?orderId=" + orderId + "' class='btn btn-primary' role='button'>修改报告</a><span style='color-blue'>(审核中)</span>");
                            //     $("li[id="+orderId+"] span[step=1]").removeClass("ongoing");
                            // }
                            // 支付按钮设置
                            if (jDealedData.data[1].stepStatus == "进行") {
                                $("li[id="+orderId+"] span[step=1]").html("<a href='pay.html?tradeId=" + thisObj.attr("trade-id") + "&goodId=" + thisObj.attr("good-id") + "&orderId=" + thisObj.attr("order-id") + "' class='btn btn-primary' role='button'>支付体检费用</a>");
                                $("li[id="+orderId+"] span[step=1]").removeClass("ongoing");
                            }
                            // 评论设置
                            // if (jDealedData.data[11].stepStatus == "进行") {
                            //     var reviweData = {};
                            //     $("li[id=" +orderId+"] span[step=11]").parent().css("border-bottom","none");
                            //     $("li[id="+orderId+"] span[step=11]").parent().append("<div class='review-box'><textarea rows='4' maxlength='300' placeholder='51二胎很荣幸能伴您走过这段意义非凡的旅程，请花几分钟时间来评价我们的服务'></textarea><a class='btn btn-primary' role='button' style='float:right;width:100px;' id='review-now'>评论</a><p id='review-tip' class='color-blue' style='visibility:hidden'>未填写评论</p></div>");
                            //     $("li[id="+orderId+"] span[step=11]").removeClass("ongoing");
                            //     $("#review-now").click(function(){
                            //         reviweData.parent = thisObj.attr("order-id");
                            //         reviweData.content = $(".review-box textarea").val();
                            //         if (reviweData.content){
                            //             commentApi(reviweData,function(res){
                            //                 if (res.code == "200" && res.data){
                            //                     console.log("success");
                            //                     $("li[id="+orderId+"] span[step=11]").html("感谢评价，祝您好孕！");
                            //                     $(".review-box").hide();
                            //                     $(".success-title").html("评论成功");
                            //                     $("#success").trigger("click");
                            //                 } else {
                            //                     alert(res.message);
                            //                 }
                            //             });
                            //         } else if (reviweData.val().length >= 500){
                            //             $("#review-tip").css("visibility","visible");
                            //             $("#review-tip").html("感谢您的热情，字数太多，请简短描述");
                            //         } else {
                            //             $("#review-tip").css("visibility","visible");
                            //             $("#review-tip").html("未填写评论");
                            //         }
                            //     });
                            // }
                            thisObj.addClass("active");
                        }
                    });
                }
            }
        });
        // var obj = $(".down-triangle")[1];
        // obj.trigger("click");
        $($("#order .down-triangle").get(0)).trigger("click");
    }
});
// 添加客户
var clientData = {};
$("#add-client").click(function() {
    // $("body").append(orderModal);
    // 添加判断
    $(".modal #submit-add-client").click(function() {
        $(".warn").css("visibility","hidden");
        if ($("#realname").val()) {
            if ($('input:radio[name="sex"]:checked').val()) {
                if (mobileNumTest($("#tel").val())) {
                    // if ($("#note").val()) {
                    clientData.customerName = $("#realname").val();
                    clientData.customerPhone = $("#tel").val();
                    clientData.remark = $("#note").val()?$("#note").val():" ";
                    clientData.gender = $('input:radio[name="sex"]:checked').val();
                    addClientApi(clientData,function(res){
                        if (res.code === '200' && res.data) {
                            $(".modal-box .close").trigger("click");
                            $("#success").trigger("click");
                            timedClose("#modal-success .close");
                            myCustomerApi(function(res){
                                if (res.code === '200' && res.data) {
                                    $("input[type=text]").val("");
                                    $("input[type=radio]").removeAttr("checked");
                                    var pageMyCustomer = $("#pageMyCustomer").html();
                                    var template = Handlebars.compile(pageMyCustomer);
                                    var html = template(res.data);
                                    $("#myCustomer").html(html);
                                    $("td[sex=1]").html("男");
                                    $("td[sex=2]").html("女");
                                    $("td[sex=0]").html("未填写");
                                    $(".no-user").html("无订单");
                                    // 清空modal内容
                                    $("#realname").val() = "";
                                    $("#tel").val() = "";
                                    $("#note").val() = "";
                                    $('input[name="sex"]:checked').attr("checked",false);
                                }
                            });
                        } else {
                            $(".success").html("添加出错");
                            $(".success").css("visibility","visible");
                        }
                    });
                    // } else {
                    //     $(".input-note").css("visibility","visible");
                    // }
                } else {
                    $(".input-tel").css("visibility","visible");
                }
            } else {
                $(".input-sex").css("visibility","visible");
            }
        } else {
            $(".input-realname").css("visibility","visible");
        }
    });
});


// 添加评论
var commentData = {};
$("#comment").click(function() {
    // $("body").append(orderModal);
    // 添加判断
    $(".modal #submit-comment").click(function() {
        if ($("#comment").val()) {
            clientData.parent = $("#comment").val();
            clientData.content = $("#comment").val();
            commentApi(commentData,function(res){
                if (res.code === '200' && res.data) {
                    $(".success").css("visibility","visible");
                } else {
                    $(".success").html("添加出错");
                    $(".success").css("visibility","visible");
                }
            });
        } else {
            $(".input-comment").css("visibility","visible");
        }
    });
});

// 查看我的客户
myCustomerApi(function(res){
    if (res.code === '200' && res.data) {
        var pageMyCustomer = $("#pageMyCustomer").html();
        var template = Handlebars.compile(pageMyCustomer);
        var html = template(res.data);
        $("#myCustomer").html(html);
        $("td[sex=1]").html("男");
        $("td[sex=2]").html("女");
        $("td[sex=0]").html("未填写");
    }
});

// 跳转下载链接
function goForPdf(){
    window.location.href="../pdfs/agents.pdf";
}