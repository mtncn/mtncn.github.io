$(function () {
    $("#searchInput").keyup(function (evt) {
        ChangeCoords(); //控制查询结果div坐标  
        var k = window.event ? evt.keyCode : evt.which;
        //输入框的id为searchInput，这里监听输入框的keyup事件  
        //不为空 && 不为上箭头或下箭头或回车  
        if ($("#searchInput").val() != "" && k != 38 && k != 40 && k != 13) {
            $.ajax({
                type: 'get',
                //async: false, //同步执行，不然会有问题  
                dataType: "json",
                url: "ashx/getpromodel.ashx",   //提交的页面/方法名  
                //data: "{'searchkey':'" + $("#searchInput").val() + "'}",              //参数（如果没有参数：null）  
                data: { 'searchkey': $("#searchInput").val() },
                contentType: "application/json; charset=utf-8",
                error: function (msg) {//请求失败处理函数  
                   // alert("系统繁忙...");
                },
                success: function (data) { //请求成功后处理函数。  

                    if (data!=null) {
                        var layer = "";
                        layer = "<table id='tblResult'>";
                        //$.each(objData, function (idx, item) {
                        //     layer += "<tr class='line'><td class='std'>" + item.PRO_Model + "</td></tr>";
                        // });

                        for (var i = 0; i < data.length; i++) {
                            layer += "<tr class='line'><td class='std'>" + data[i].PRO_Model + "</td></tr>";
                        }

                        layer += "</table>";

                        //将结果添加到div中      
                        $("#searchDiv").empty();
                        $("#searchDiv").append(layer);
                        //$(".line:first").addClass("hover");
                        $("#searchDiv").css("display", "");
                        //鼠标移动事件  

                        $(".line").hover(function () {
                            $(".line").removeClass("hover");
                            $(this).addClass("hover");
                        }, function () {
                            $(this).removeClass("hover");
                            //$("#searchDiv").css("display", "none");  
                        });
                        //鼠标点击事件  
                        $(".line").click(function () {
                            $("#searchInput").val($(this).text()).focus();
                            $("#searchDiv").css("display", "none");
                            $("#search_form").submit();
                        });
                    } else {
                        $("#searchDiv").empty();
                        $("#searchDiv").css("display", "none");
                    }
                }
            });
        }
        else if (k == 38) {//上箭头  
            $('#tblResult tr.hover').prev().addClass("hover");
            $('#tblResult tr.hover').next().removeClass("hover");
            $('#searchInput').val($('#tblResult tr.hover').text());
        } else if (k == 40) {//下箭头  
            $('#tblResult tr.hover').next().addClass("hover");
            $('#tblResult tr.hover').prev().removeClass("hover");
            $('#searchInput').val($('#tblResult tr.hover').text());
        }
        //else if (k == 13) {//回车  
        //    $('#searchInput').val($('#tblResult tr.hover').text());
        //    $("#searchDiv").empty();
        //    $("#searchDiv").css("display", "none");
        //}
        else {
            $("#searchDiv").empty();
            $("#searchDiv").css("display", "none");
        }
    });
    $("#searchDiv").bind("mouseleave", function () {
        $("#searchDiv").empty();
        $("#searchDiv").css("display", "none");
    });

    //load solution menu
  //  var bus2 = "<a href=\"solutions/detail-35.html\"   id=\"solu1\" onclick=\"_hmt.push(['_trackEvent', '别墅信息化一站式解决方案', 'click', 'solu1'])\">  <img src=\"picture2015/so1.jpg\"  alt=\"别墅信息化一站式解决方案\"/>";
  //  bus2 += "<h2>别墅信息化一站式解决方案</h2> </a><p>无线网络覆盖方案与无线监控系统合二为一，提供畅快淋漓的无线使用体验与全方位安全防护。</p>";
   // var bus3 = "<a href=\"solutions/detail-38.html\"   id=\"solu3\" onclick=\"_hmt.push(['_trackEvent', '子菜单_中小企业办公无线覆盖解决方案', 'click', 'solu3'])\">  <img src=\"picture2015/so3.jpg\"  alt=\"中小企业办公无线覆盖解决方案\"/>";
  //  bus3 += "<h2>中小企业办公无线覆盖解决方案</h2> </a><p>针对中小企业办公量身打造，提供稳定、快速、安全无线网络覆盖，提升工作效率，致胜在先。</p>";

  //  $(".bus2").html(bus2);

   // $(".bus3").html(bus3);

});
//设置查询结果div坐标  

function ChangeCoords() {
    //    var left = $("#searchInput")[0].offsetLeft; //获取距离最左端的距离，像素，整型  
    //    var top = $("#searchInput")[0].offsetTop + 26; //获取距离最顶端的距离，像素，整型（20为搜索输入框的高度）  
    var left = $("#searchInput").position().left; //获取距离最左端的距离，像素，整型  
    var top = $("#searchInput").position().top + 20; //获取距离最顶端的距离，像素，整型（20为搜索输入框的高度）  
    $("#searchDiv").css("left", left + "px"); //重新定义CSS属性  
    $("#searchDiv").css("top", top + "px"); //同上  
}




function jqtab(tabtit, tab_conbox, shijian) {


    $(tab_conbox).find("li").hide();
    $(tabtit).find("li:first").addClass("thistab").show();
    $(tab_conbox).find("li:first").show();



    $(tabtit).find("li").bind(shijian, function () {
        $(this).addClass("thistab").siblings("li").removeClass("thistab");
        var activeindex = $(tabtit).find("li").index(this);
        $(tab_conbox).children().eq(activeindex).show().siblings().hide();
        return false;
    });

};





$(document).ready(function () {

    String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }
    ////////////
    var IPCOM_Menu = {};

    $('.menu_part').delegate('[_t_nav]', 'mouseover', function () {
        var _nav = $(this).attr('_t_nav');
        clearTimeout(IPCOM_Menu[_nav + '_timer']);
        IPCOM_Menu[_nav + '_timer'] = setTimeout(function () {
            $('[_t_nav]').each(function () {
                $(this)[_nav == $(this).attr('_t_nav') ? 'addClass' : 'removeClass']('nav-active');
            });
            $('#' + _nav).stop(true, true).slideDown(200);
        }, 150);
    })

    $('.menu_part').delegate('[_t_nav]', 'mouseout', function () {
        var _nav = $(this).attr('_t_nav');
        clearTimeout(IPCOM_Menu[_nav + '_timer']);
        IPCOM_Menu[_nav + '_timer'] = setTimeout(function () {
            $('[_t_nav]').removeClass('nav-active');
            $('#' + _nav).stop(true, true).slideUp(200);
        }, 150);
    })

    //jqtab('#tabs', '#tab_conbox', 'click');

    ////////////

    ////////////

    function isLowIE9() {
        var e = window.navigator.userAgent.toString().toUpperCase();
        var flag = false;
        if (e.indexOf("MSIE") >= 0) {

            if (e.indexOf("MSIE 6.0") > 0) flag = true;
            if (e.indexOf("MSIE 7.0") > 0) flag = true;
            if (e.indexOf("MSIE 8.0") > 0) flag = true;

        }


        return flag;

    }



    /////////

    // SetDivToCenter();//设置居中显示

    $(window).resize(function () {



        // window.location.reload();
    })




    ////////////滚动展示返回顶部 
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('#GoToTop').fadeIn(500);
        } else {
            $('#GoToTop').fadeOut(500);
        }
    });




    //
    $("#toyear").text("1999 - " + (new Date()).getFullYear());





    //////////首页顶部搜索获取和失去焦点时
    $("#search_box #searchInput").focus(function () {

        var self = $(this);

        var curvalue = self.val().trim();
        if ("搜索" == curvalue) {
            self.val("");
        }
    }).blur(function () {

        var self = $(this);

        var curvalue = self.val().trim();
        if ("" == curvalue) {
            self.val("搜索");
        }
    });


    $("#searchInput").keyup(function (event) {

        var val = $(this).val().trim();


        if (13 == parseInt(event.keyCode)) {



            if ("" == val || "搜索" == val || val.indexOf("<") > -1 || val.indexOf(">") > -1 || val.indexOf("'") > -1 || val.indexOf("\"") > -1) {
               //alert("请输入关键字");
                $(this).focus();
            }
            else {
                $("#search_form").submit();
                return true;
            }



        }




    });
    $("#btnSearch").click(function () {

        var searchInput = $("#searchInput");
        var val = searchInput.val().trim();

        if ("" == val || "搜索" == val || val.indexOf("<") > -1 || val.indexOf(">") > -1 || val.indexOf("'") > -1 || val.indexOf("\"") > -1) {
            // alert("请输入关键字");
            searchInput.focus(); return false;
        }
        $("#search_form").submit();

    });


    /////////////
    $('#GoToTop').click(function () {
        $("html,body").animate({ scrollTop: 0 }, 300);
    })

    ///

    //以下是微信显示
    $("#footerweixin").click(function () {
        $("#erH3").text("迈腾官方微信二维码");//标题
        $("#erPdes").html("打开微信，点击右上角的“+”，选择“扫一扫”功能，<br>对准下方二维码即可。");//描述
        $("#erPic").attr("src", "/picture2015/02.jpg");//二维码图片地址
        $(".PopLayer").css("height", $("#mainbox").height()).show();//弹出背阴
        $(".PopBox").css("margin-top", "-1200px").show().animate({ "margin-top": "-300px" }, 500);//下拉内容
    });
    //以下是QQ群显示
    $("#footerQQ").click(function () {
        $("#erH3").text("迈腾官方QQ群二维码");//标题
        $("#erPdes").html("打开QQ，扫描加入迈腾粉丝群<br/>或搜索群号：84797778 ");//描述
        $("#erPic").attr("src", "/picture2015/qqq.jpg");//二维码图片地址
        $(".PopLayer").css("height", $("#mainbox").height()).show();//弹出背阴
        $(".PopBox").css("margin-top", "-1200px").show().animate({ "margin-top": "-300px" }, 500);//下拉内容
    });

    ////弹出层关闭
    $(".close").click(function () {
        $(".PopBox").animate({ "margin-top": "-1200px" }, 500, function () { $(".PopBox").hide(); $(".PopLayer").css("height", 0).hide(); });

    });



})


//////设置内容居中
function SetDivToCenter() {

    var WinWidth = $(window).width() //浏览器当前窗口可视区域宽度 
    if (WinWidth < 1200) WinWidth = 1200;

    var mtn_w = $("#mtn_w1920");

    var margin = (WinWidth - 1920) / 2;
    mtn_w.css({ "margin-left": margin + "px" });



}


//加载视频

function initPlayer(playerid, videoPath, imgSrc, autoplay) {
    //if(jwplayer(playerid))return;
    autoplay = autoplay || false;
    //   var video_width = width;
    // var video_height = height;
    //var videoPath=$("#"+playerid).attr("data-video-path");
    //var imgSrc=$("#"+playerid).attr("data-img-path");
    // var skinSrc =  'jscss2015/hw/carbon.xml';
    var swfPlayer = 'jscss2015/hw/player_new.swf';


    return jwplayer(playerid).setup({
        //stretching : 'exactfit',
        // skin: skinSrc,
        aspectratio: "16:9",
        width: 640,
        height: 360,
        image: imgSrc,
        file: videoPath,
        flashplayer: swfPlayer,
        autostart: autoplay,
        ga: {}
    });
};

function PlayMP4(vurl, purl, box) {
   

    jwplayer(box).setup({
        skin: "jscss2015/jwplayer6/glow.zip",
        stretching: "fill",
        flashplayer: "jscss2015/jwplayer6/player.swf",
        image: purl,
        width: 640,
        height: 360,
        levels: [{ file: vurl }]
    });



}
