function addOpts(){
    $("#year").append("<option value='0'>出生年份</option>");
    $("#month").append("<option value='0'>出生月份</option>");
    for (i=1956;i<2000;i++){
        $("#year").append("<option value='"+i+"'>"+i+"</option>");
    }
    for (i=1;i<13;i++){
        if(i<10){
            $("#month").append("<option value='0"+i+"'>"+i+"月</option>");
        } else {
            $("#month").append("<option value='"+i+"'>"+i+"月</option>");
        }
    }
}
$(function(){
    var reviewData = {};
    var context = {};
    // 填充seller模板
    var id = urlUtil.getQueryString("itemId");
    for (i=0;i<seller.sellers.length;i++) {
        if (id == seller.sellers[i].id) {
            context = seller.sellers[i];
        }
    }
    var pageSeller = $("#pageSeller").html();
    var template = Handlebars.compile(pageSeller);
    var html = template(context);
    $("#context").html(html);
    // 填充预约总数
    sellerAmountApi(id,function(res) {
        if (res.code === '200' && res.data) {
            $("#seller-amount").html(res.data);
        } else {
            $("#seller-amount").html("0");
        }
    });
    // 填充评论数
    reviewApi(id,function(res) {
        if (res.code === '200' && res.data) {
            $("#review-tab").html("评论("+res.data.items.length+")");
        }
    });
    // 预约模态框
    $("#order-now").click(function() {
        if (!accountInfo.cellphone){
            $("body").append(loginModal);
            $("#register-now").attr("href",$("#register-now").attr("href")+"?link=sellerdetail&goodId="+id);
            var data = {};
            $("#login").click(function(){
                $(".warn").css("visibility","hidden");
                if (mobileNumTest($("#tel").val())) {
                    if ($("#password").val()) {
                        data.cellphone = $("#tel").val();
                        data.password = $("#password").val();
                        loginApi(data,function(res){
                            if (res.code === '200' && res.data) {
                                $(".close").trigger("click");
                                history.go(0);
                            } else if (res.code === "401") {
                                $(".input-tel").html("用户名或密码错误");
                                $(".input-tel").css("visibility","visible");
                            }
                        });
                    } else {
                        $(".input-password").css("visibility","visible");
                    }
                } else {
                    $(".input-tel").css("visibility","visible");
                }
            });
        }
        $("body").append(orderModal);
        addOpts();
        //地区二联
        // $('.form_date').datetimepicker({
        //     language:  'zh-CN',
        //     weekStart: 1,
        //     todayBtn:  1,
        //     autoclose: 1,
        //     todayHighlight: 1,
        //     startView: 2,
        //     minView: 2,
        //     forceParse: 0
        // });
        $("#modal-order #address").citySelect({
            prov:"北京",
            nodata:"none",
        });
        // 预约判断
        var orderData = {};
        $("#modal-order #order-next").click(function() {
            $(".warn").css("visibility","hidden");
            if ($("#name").val()) {
                if ($('input:radio[name="sex"]:checked').val()) {
                    if ($("#year").val() && $("#month").val()) {
                        if (mobileNumTest($("#tel").val())) {
                            if ($("#province").val()) {
                                if ($("#city").val()) {
                                    // 创建预约单
                                    orderData.goodsId = parseInt(id);
                                    orderData.goodsPrice = context.price;
                                    orderData.goodsQuantity = 1;
                                    orderData.name = $("#name").val();
                                    orderData.birthday = $("#year").val() + $("#month").val();
                                    orderData.gender = parseInt($('input:radio[name="sex"]:checked').val());
                                    orderData.fullAddress = $("#province").val()+$("#city").val();
                                    orderData.cellphone = $("#tel").val();
                                    postOrderApi(orderData,function(res){
                                        if (res.code === '200' && res.data) {
                                            $("input[type=text]").val("");
                                            $("input[type=radio]").removeAttr("checked");
                                            $(".modal-box .close").trigger("click");
                                            $("#success").trigger("click");
                                            $("#success-sbm").click(function(){
                                                window.location.href = "my.html";
                                            });
                                            // $(".success").css("visibility","visible");
                                            // window.location.href = "my.html";
                                        } else {
                                            $(".success").html("预约出错");
                                            $(".success").css("visibility","visible");
                                        }
                                    });
                                } else {
                                    $(".input-address").css("visibility","visible");
                                }
                            } else {
                                $(".input-address").css("visibility","visible");
                            }
                        } else {
                            $(".input-tel").css("visibility","visible");
                        }
                    } else {
                        $(".input-age").css("visibility","visible");
                    }
                } else {
                    $(".input-sex").css("visibility","visible");
                }
            } else {
                $(".input-name").css("visibility","visible");
            }
        });
    });
    // 评论
    $("#review-tab").click(function() {
        if (id) {
            reviewApi(id,function(res) {
                if (res.code === '200' && res.data) {
                    reviewData = res.data;
                    var sellerReviews = $("#sellerReviews").html();
                    var reviewTemplate = Handlebars.compile(sellerReviews);
                    var reviewHtml = reviewTemplate(reviewData);
                    $("#review").html(reviewHtml);
                }
            });
        }
    });
});