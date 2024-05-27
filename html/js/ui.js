var trace = {
    IE			:!!(window.attachEvent && !window.opera),
    IE6			:((navigator.userAgent.toLowerCase().indexOf("msie 6")!=-1)&&(navigator.userAgent.toLowerCase().indexOf("msie 7")<0)),
    IE7			:(navigator.userAgent.toLowerCase().indexOf("msie 7")!=-1),
    IE9			:(navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1),
    FF			:(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1),
    Opera:  !!window.opera,
    WebKit: navigator.userAgent.indexOf("AppleWebKit/") > -1,
    Gecko:  navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),

	create : function(opts){ // create element
		var rv=(trace.IE&&!trace.IE9)? '' : document.createElement(opts.tagname);
		for(var i in opts){
			if(i!='tagname'){
				if(trace.IE&&!trace.IE9) rv+=' '+((i=='classname')? 'class' : i)+'="'+opts[i]+'"';
				else rv.setAttribute((i=='classname')? 'class' : i,opts[i]);
			}
		}
		return (trace.IE&&!trace.IE9)? document.createElement('<'+opts.tagname+rv+'>') : rv;
	},
	show : function(msg, type){
		if(!trace.area){
			trace.area = trace.create({tagname:'div',id:'trace',style:'position:fixed; left:10px; top:10px; padding:5px; background:#fff; border:1px solid red;z-index:10000;'});
			document.getElementsByTagName("body")[0].appendChild(trace.area);
		}
		trace.area.innerHTML = (type ? msg :  trace.area.innerHTML+" : "+msg);
	}
}


$(window).on('orientationchange',function(){
	setTimeout(function(){
		layerPosition();
	},100);
});
function layerPosition(){
	var st=$(window).scrollTop();
	var sh=$(window).height();
	var wh=$('#wrap').height();
	var lh=$('#layerPopup').height();
	
	if($('#layerPopup>div').hasClass('layerCenter')){
		$('#layerPopup').css({'top':st+((sh/2)-(lh/2))});
	}else{
		if(st+lh>wh){
			$('#layerPopup').css({'top':wh-lh});
		}else{
			$('#layerPopup').css({'top':st});
		}
	}
}
function layerOpen(a,b){
	var sh=$(window).scrollTop();
	$('#dim_mask').css({'background':'#000001'});
	$('#layerPopup').load(a,function(){
		$('#dim_mask').css({'z-index':'100','opacity':'0.5','background':'black'});
		$('#layerPopup').css({'z-index':'200','opacity':'1'});
		layerPosition();
	});
}
function areaClose(){
	$('#layerPopup').css({'opacity':'0'});
	$('#dim_mask').css({'opacity':'0'}).one('transitionend',function(){
		$('#wrap').css({'position':'relative','top':'0'});
		$('#layerPopup').css({'z-index':'0'}).empty();
		$('#dim_mask').css({'z-index':'0'});
	});
}

$(function() {	
	/*
	var touchStart=0;
	var touchMove=0;
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
		$('body').on('touchstart',function(a){
			touchStart=$(window).scrollTop();
		});
		$('body').on('touchmove',function(a){
			touchMove=$(window).scrollTop()-touchStart;

			//$('.log').html(touchMove);
			
			if(touchMove<0){
				$('#header').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
				$('#gnb').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
				$('body').addClass('up').removeClass('down');
			}else if(touchMove>0){
				$('#header').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
				$('#gnb').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
				$('body').addClass('down').removeClass('up');
			}
		});
		$(window).on('touchend',function(a){
			if($(window).scrollTop()==0){
				$('#header').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
				$('#gnb').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
				$('body').addClass('up').removeClass('down');
			}
		});
	}else{
		$(window).on('scroll',function(){
			var s=$(window).scrollTop();
			if(s==0){
				$('body').addClass('up').removeClass('down');
			}else{
				if(touchStart>s){
					$('#header').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
					$('#gnb').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
					$('body').addClass('up').removeClass('down');
				}else{
					$('#header').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
					$('#gnb').css({'-moz-transition':'0s','-webkit-transition':'0s','transition':'0s'});
					$('body').addClass('down').removeClass('up');
				}
			}
			touchStart=s;
		});
	}
	*/
	
	$('.input-initial').each(function() {
		if (isEmpty(this)) {
			$(this).addClass($(this).attr('bg'));
		}

		$(this).focus(function() {
			$(this).removeClass($(this).attr('bg'));
		}).blur(function() {
			if (isEmpty(this)) {
				$(this).addClass($(this).attr('bg'));
			}
		});
	});

	// Top Banner Rollover
	$('#header').rollover();

	// Go Top
	$('a[href=#header]').click(function(){
		$('html, body').animate({scrollTop:0}, 150);
		return false;
	});

	$('html, body').scrollTop(-1);
	
	// category 대분류 액션
	$('#left .category ul.cateList li .depth1').on('click',function(){
		var target=$(this).parent();
		var item=target.find('>ul>li').length;
		
		if(target.hasClass('active')){
			target.removeClass('active').find('>ul').css({'height':'0'});
		}else{
			target.parent().find('>.active').removeClass('active').find('>ul').css({'height':'0'});
			target.addClass('active').find('>ul').css({'height':item*40});
		}
		return false;
	});
	
	// category 중분류 열기
	
	$('#left .category ul.cateList li ul li .depth2').on('click',function(){
		$('#left .category div.cateDetail h1').empty();
		$('#left .category div.cateDetail .view').attr('href','#');
		$('#left .category div.cateDetail ul').empty();
		
		var title=$(this).html();
		var link=$(this).attr('href');
		var list=$(this).parent().find('>ul').html();
		$('#left .category div.cateDetail h1').html(title);
		$('#left .category div.cateDetail .view').attr('href',link);
		$('#left .category div.cateDetail ul').html(list);
		
		$('html,body').animate({scrollTop:0},150);
		
		$('#left .category ul.cateList').css({'-moz-transform':'translate3d(-285px,0,0)','-webkit-transform':'translate3d(-285px,0,0)','transform':'translate3d(-285px,0,0)'});
		$('#left .category div.cateDetail').css({'-moz-transform':'translate3d(0,0,0)','-webkit-transform':'translate3d(0,0,0)','transform':'translate3d(0,0,0)'}).one('transitionend',function(){
			$('#left .category ul.cateList').css({'position':'absolute'});
			$('#left .category div.cateDetail').css({'position':'relative'});
		});
		return false;
	});
	
	// category 중분류 닫기
	$('#left .category div.cateDetail .back').on('click',function(){
		$('html,body').animate({scrollTop:0},150);
		
		$('#left .category ul.cateList').css({'position':'relative','-moz-transform':'translate3d(0,0,0)','-webkit-transform':'translate3d(0,0,0)','transform':'translate3d(0,0,0)'});
		$('#left .category div.cateDetail').css({'position':'absolute','-moz-transform':'translate3d(285px,0,0)','-webkit-transform':'translate3d(285px,0,0)','transform':'translate3d(285px,0,0)'});
	});
	
	

	var first = true;
	var obj = ""; 
/*	 상단 검색어 
	$.ajax({
		type: "GET",
		url: "/mw/common/recommendSearchWord_ajax.do",
		data : {"code":"MOBILE"},
		success: function (data) {
			obj = JSON.parse(data);
			$('.search_box form[name="topSearchFrm"]').attr({"toplinkaction":obj.SearchUrl , "onSubmit" : "return validTopLink($(this).attr('toplinkaction'));"});
			$('.search_box form[name="topSearchFrm"] input[name="sword"]').val(obj.SearchWord);
			$('.search_box form[name="topSearchFrm"] input[name="sword"]').bind("focus click", function(){
				if(first){
					$(this).val('');
					$('.search_box *[name="topSearchFrm"]').attr("onSubmit","return validTopSearch(this)");
				}
				first = false;
			});
		}
	});*/
	
	if(obj != ""){
		$('.search_box form[name="topSearchFrm"] input[name="sword"]').attr("bg","txt_search");
		$('.search_box form[name="topSearchFrm"] input[name="sword"]').addClass("txt_search");
	}
	
	/*
	// no image
	// 메인
	$('.mainRecommend .img img').error().attr('src','/mw/imgs/global/no.gif');
	
	// 상품리스트
	$('.pro_list_ver .pic').error().attr('src','/mw/imgs/global/no.gif');
	
	// 상품상세
	$('.detail .thumb_big>img').error().attr('src','/mw/imgs/global/no.gif');
	
	// 장바구니/주문
	$('.in_pro .product .pic').error().attr('src','/mw/imgs/global/no.gif');
	
	// 주문내역/관심상품
	$('.cont_box .product .pic').error().attr('src','/mw/imgs/global/no.gif');
	*/
});
$(window).on('load',function(){	
	var gw=1;
	$('#gnb .stage ul li').each(function(){
		var w=$(this).width();
		gw=gw+w;
		$('#gnb .stage ul').css({'width':gw});
	});
	
	var noticeTitleW=$('#footer .notice dt').width();
	var noticeMoreW=$('#footer .notice .more').width();
	$('#footer .notice .list a').css({'margin-right':noticeMoreW,'padding-left':noticeTitleW+20});
});
$(window).on('resize',function(){
	var h=$(window).height();
	$('#left').css({'min-height':h});
	topAdSet();
});
$(window).on('scroll',function(){
	var s=$(window).scrollTop();
	var topAdH=$('#topAd').height();
	var fixed=47+topAdH;
	
	if(s>fixed){
		$('body').addClass('fixed');
	}else{
		$('body').removeClass('fixed');
	}
	
	if(s>10){
		$('#top').addClass('view');
	}else{
		$('#top').removeClass('view');
	}
});
function topAdSet(){
	
}
function topAdClose(){
	var topAdH=$('#topAd').height();
	$('#topAd').css({'margin-top':-(topAdH)}).one('transitionend',function(){
		setCookie('mwTopAd', 'done');
		$('#topAd').addClass('hidden');
	});
}

function topAdHidden(){
	var h=$('#topAd').height();
	$('#topAd').css({'height':'0','-moz-transition':'0.3s','-webkit-transition':'0.3s','transition':'0.3s'}).one('transitionend webkitTransitionEnd oTransitionEnd',function(){
		setCookie('mwTopAd', 'done');
		$('#topAd').addClass('hidden');
	});
}
var leftSclT;
function left(){
	searchClose();
	leftSclT=$(window).scrollTop();
	$('#left').css({'left':'0'}).one('transitionend',function(){
		$('#left').css('padding','0 100% 0 0');
	});
	$('searchlayer').attr('style','');
	$('#fixedMenu').addClass('ico_01');
	$('body').addClass('leftmode');
}
function leftClose(){
	/*$('#left').css({'padding':'0','left':'-100%'}).one('transitionend',function(){
		$(window).scrollTop(leftSclT);
	});*/
	$('#left').attr('style','');
	$('#fixedMenu').removeClass('ico_01');
	$('body').removeClass('leftmode');
}

function searchLayer(a){
	leftClose();
	$('.searchlayer').css({'left':'0'}).one('transitionend',function(){
		$('.searchlayer').css('padding','0 100% 0 0');
	});
	$('#left').attr('style','');
	$('#fixedMenu').addClass('on');
	$('body').addClass('leftmode');
}

function searchClose(){
	$('.searchlayer').attr('style','');
	$('#fixedMenu').removeClass('on');
	$('body').removeClass('leftmode');
}

function gnbMove(a){
	var w=$('#gnb .stage').width();
	var gw=$('#gnb .stage ul').width();
	var s=$('#gnb .stage').scrollLeft();
	var n='';
	$('#gnb .stage ul li').each(function(){
		var p=$(this).position().left-1;
		var w=$(this).width();
		var left=p+w;
		if(s>=p){
			if(s<=left){
				n=$(this);
			}
		}
	});
	if(a=='prev'){
		if(s==0){

		}else{
			var focus=n.prev().position().left;
			$('#gnb .stage').stop().animate({scrollLeft:focus},150);
		}
	}
	if(a=='next'){
		if(s==gw-w){
		}else{
			var focus=n.next().position().left;
			$('#gnb .stage').stop().animate({scrollLeft:focus},150);
		}
	}
	/*
	var w=$('#gnb .stage').width();
	var gw=$('#gnb .stage ul').width();
	if(a=='prev'){
		$('#gnb .stage').stop().animate({scrollLeft:'0'},300);
	}
	if(a=='next'){
		$('#gnb .stage').stop().animate({scrollLeft:gw-w},300);
	}
	*/
}
/*
function gnbActive(a){
	var number=a-1;
	$('#gnb .stage ul li').eq(number).addClass('active');
	$(window).on('load',function(){
		var position=$('#gnb .stage ul li').eq(number).position().left;
		$('#gnb .stage').scrollLeft(position);
	});
}*/

$(function() {
	var hrefLocation = $(location).attr('href');

	$('#gnb .stage a').each(function() {
		var hrefGnb = $(this).attr('href');

		if (hrefLocation.indexOf(hrefGnb) > -1 || hrefGnb.indexOf(hrefLocation) > -1) {
			var $li = $(this).parent().addClass('active');
			$(window).on('load', function() {
				var left = $li.position().left;
				$li.closest('.stage').scrollLeft(left);				
			});
			return false;
		}
	});
});

$(function() {
	// 관심상품
	$('.wishbox .wish').on('click', function() {
		var $obj = $(this),
			$row = $obj.closest('.ui-goods'),
			cateIdx = $row.find('input[name="cateIdx"]').val(),
			goodsNo = $row.find('input[name="goodsNo"]').val(),
			wishIs = $row.find('input[name="wishIs"]').val();

		if ($row.length <= 0) return false;
		
		$.laybox.ajax({
			type: "POST",
			dataType: "json",
			url: "../mypage/wish_act_ajax.do",
			data: {
				mode: 'ADD_CART',
				gno: goodsNo, 
				cate: cateIdx
			},
			error: function (request, status, error) {
				console.log(request.responseText);
			},
			success: function (data) {
				if (data.result.code == 9) {
					gotoLogin();
					return false;
				} 
				else if (data.result.code > 0) {
					alert(data.result.msg);
					return false;
				}

				if (data.result.wish.toNumeric() > 0) {
					$obj.addClass('active');
					//alert("관심상품에 추가 되었습니다.");
					//return false;
				} else {
					$obj.removeClass('active');
					if ( wishIs == "Y" )
						location.reload();
					return false;
				}
			}
		}, {
			type: 'ajax',
			source: '../common/ajax/wish_ajax.do',
			borderSize: 0,
			canvasPadding: 0,
			canvasBgColor: null,
			close: false
		});
	});
	/*setTimeout(function(){
		resizeImg();
	},200);
	$(window).resize(function(){
		resizeImg();
	});*/
});

/*function  resizeImg(){
	$('.productbox .productlist').each(function(){
		var target=$(this).find('.imgbox img');
		var w=target.outerWidth();
		target.css({'height':w});
		console.log(w);
	});
}*/

// 2023.07.19 수정
// 주문자 정보 > 금융할인
$(document).ready(function() {
    $(".financial_dc_btn").click(function() {
      $(this).toggleClass("on");
    });
});