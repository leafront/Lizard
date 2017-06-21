/**

	Lizard

	name leafront


**/




define([
	'jquery'
],function(
	$
){
	var Lizard = {

		prompt: function (obj,determine,cancel){

			var tips = obj.tips;

			var btn = obj.btn;

			var tpl = '\
			  <div class="layui-poup"></div>\
				<div class="layui-layer">\
					<div class="layui-layer-title">提示</div>\
					<div class="layui-layer-content">'+ tips +'</div>\
					<span class="layui-layer-setwin J_close"></span>\
					<div class="layui-layer-btn layui-layer-btn-">\
						<a href="javascript:;" class="layui-layer-btn0">'+ btn[0]+'</a>\
						<a href="javascript:;" class="layui-layer-btn1 J_close">'+ btn [1]+'</a>\
					</div>\
			</div>';

			$('body').append(tpl);

			$('.layui-layer').css({
				'marginLeft':-	$('.layui-layer').width() / 2,
				'marginTop':- $('.layui-layer').height() / 2
			})

			$('.layui-layer-btn0').click(function(){

				determine();

				$('.layui-poup').remove();

				$('.layui-layer').remove();

			})

			$('.J_close').click(function(){

				cancel();

				$('.layui-poup').remove();

				$('.layui-layer').remove();

			})
		},
		showToast:function(value){

			var tpl='<div class="mask"></div> <div class="mask-ui"><span>'+value+'</span></div>';

			$('body').append(tpl);

			$('.mask-ui').css({
				'marginLeft': - $('.mask-ui').width()/2,
				'marginTop': - $('.mask-ui').height()/2
			});

			setTimeout(function(){

				$('.mask-ui').remove();

				$('.mask').remove();

			},2000)
		},
		checkNumber: function (theObj) {
		  var reg = /^[0-9]+.?[0-9]*$/;
		  if (reg.test(theObj)) {
		    return true;
		  }
		  return false;
		},
		tips:function(obj){

			var eleCont = obj.ele;

			var text = obj.text;

			var eleHeight = $(eleCont).outerHeight(true);

			var eleWidth = $(eleCont).outerWidth(true);


			var tpl = '\
				<div class="tips_cont tips_top">\
					<span>'+text+'</span>\
				</div>\
			';

			$('body').append(tpl);

			var tipsWidth  = $('.tips_cont').outerWidth(true);

			var top = $(eleCont).offset().top - eleHeight - 25;

			var left = $(eleCont).offset().left - (tipsWidth - 20)/2;

			$('.tips_cont').css({'top':top,'left':left});

			setTimeout(function(){

				$('.tips_cont').remove();

			},3000);

		},
		isMobile: function (text) {

			var pattern = /^1[3-8]\d{9}$/;

			return pattern.test(text);

		},
		isZipCode: function(text){

			var pattern = /^[1-9][0-9]{5}$/;

			return pattern.test(text);
		},
		isLogin: function  () {

			var getTime = new Date().getTime();

			var expires = Lizard.getCookie('expires');

			var loginTime = Lizard.getCookie('loginTime');

			if (expires) {

				if (getTime < expires && loginTime == '1') {

					return true;

				}
			}
			return false;
		},
		checkLogin: function(){

			if (!this.isLogin()) {

				location.href= '/users/login?returnurl=' + Lizard.getPathName();

				return false;

			} else {

				return true;
			}
		},
		isEmail: function (text) {

			var pattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;

			return pattern.test(text);
		},
		isPass: function(text){

			var pattern = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,20}/i;

			return pattern.test(text)

		},
		isName: function (text) {

			var pattern = /^([\u4e00-\u9fa5]|[A-Za-z_])+$/;

			if (pattern.test(text)) {

				text = text.replace(/[\u4e00-\u9fa5]/g, '__');

				return text.length <= 20;

			} else {

				return false;

			}
		},
		isIdCard: function(text) {
			//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
			var pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;

			return pattern.test(text);

		},
		query: function(){

			var strParame = arguments[0];

			var args = new Object();

			var query = location.search.substring(1).toLowerCase(); // Get query string

			var pairs = query.split("&"); // Break at ampersand

			for (var i = 0; i < pairs.length; i++) {

				var pos = pairs[i].indexOf('='); // Look for "name=value"

				if (pos == -1) continue; // If not found, skip

				var argname = pairs[i].substring(0, pos); // Extract the name

				var value = pairs[i].substring(pos + 1); // Extract the value

				value = decodeURIComponent(value); // Decode it, if needed

				args[argname] = value; // Store as a property

			}
			if (strParame == undefined) {

				return args;

			}else {

				return args[strParame.toLowerCase()]; // Return the object
			}
		},
		queryStringify: function (obj) {
			function toQueryPair(key, value) {
		    if (typeof value == 'undefined') {
		        return key;
		    }
	    	return key + '=' + encodeURIComponent(value === null ? '': String(value));
			}
			var ret = [];

			for (var key in obj) {

			    key = encodeURIComponent(key);

			    var values = obj[key];

			    if (values && values.constructor == Array) { //数组

			        var queryValues = [];

			        for (var i = 0,
			        len = values.length,

			        value; i < len; i++) {

			            value = values[i];

			            queryValues.push(toQueryPair(key, value));
			        }
			        ret = ret.concat(queryValues);

			    } else { //字符串

			        ret.push(toQueryPair(key, values));
			    }
			}
			return ret.join('&');

		},
		countTime:function(obj,className){
			var time = 60;
			(function setTime(){
				$(obj).html(time+'秒后重新获取');

				$(obj).addClass(className);

				time--;

				$(obj).html(time+'秒后重新获取');


				$(obj).attr('disabled','disabled');

				if(time == 0) {

					$(obj).html('获取短信验证码');

					$(obj).removeClass(className);

					$(obj).removeAttr('disabled');

					clearInterval(timer);
				}
				var timer = setInterval(setTime,1000);

			})();
		},
		getDateDiff: function (dateTimeStamp){

			dateTimeStamp = Date.parse(dateStr.replace(/-/gi,"/"));
			var minute = 1000 * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var halfamonth = day * 15;
			var month = day * 30;
			var now = new Date().getTime();
			var diffValue = now - dateTimeStamp;
			if (diffValue < 0) { return; }
			var monthC = diffValue/month;
			var weekC = diffValue/(7*day);
			var dayC = diffValue/day;
			var hourC = diffValue/hour;
			var minC = diffValue/minute;
			if(monthC >= 1){
				result = "" + parseInt(monthC) + "月前";
			}
			else if(weekC >= 1){
				result = "" + parseInt(weekC) + "周前";
			}
			else if(dayC >= 1){
				result = ""+ parseInt(dayC) +"天前";
			}
			else if(hourC >= 1){
				result = ""+ parseInt(hourC) +"小时前";
			}
			else if(minC>=1){
				result = ""+ parseInt(minC) +"分钟前";
			}else
			result = "刚刚";
			return result;
		},
		getPathName:function(){

			var strUrl = document.location.toString();

			var arrObj = strUrl.split('//');

			var start = arrObj[1].indexOf('/');

			return arrObj[1].substring(start);
		},

		/**
		 * 对Date的扩展，将 Date 转化为指定格式的String
		 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
		 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
		 * eg:
		 * (new Date().getTime(,"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
		 * (new Date().getTime(,"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
		 * (new Date().getTime(,"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
		 * (new Date().getTime(,"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
		 * (new Date().getTime(,"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
		 */
		dateFormat:function(tiems,fmt){

			var date = new Date(tiems);

			var o = {
				"M+" : date.getMonth()+1, //月份
				"d+" : date.getDate(), //日
				"h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
				"H+" : date.getHours(), //小时
				"m+" : date.getMinutes(), //分
				"s+" : date.getSeconds(), //秒
				"q+" : Math.floor((date.getMonth()+3)/3), //季度
				"S" :  date.getMilliseconds() //毫秒
			};
			var week = {
				"0" : "\u65e5",
				"1" : "\u4e00",
				"2" : "\u4e8c",
				"3" : "\u4e09",
				"4" : "\u56db",
				"5" : "\u4e94",
				"6" : "\u516d"
			};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
			}
			if(/(E+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
			}
			for(var k in o){
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				}
			}
			return fmt;
		},
		//设置cookies
		setCookie:function (name,value,times) {
			var exp = new Date();
			exp.setTime(exp.getTime() +times);
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
		},
		//读取cookies
		getCookie: function (name){
			var arr,reg=RegExp
			if(arr = document.cookie.match(reg)){
				return unescape(arr[2]);

			} else {
				return null;
			}
		},

		//删除cookies
		delCookie:function (name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.getCookie(name);
      if(cval!== null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
		},
		throttle: function (func, wait, mustRun) {
			var timeout,
				startTime = new Date();

			return function() {
				var context = this,
					args = arguments,
					curTime = new Date();

				clearTimeout(timeout);
				// 如果达到了规定的触发时间间隔，触发 handler
				if(curTime - startTime >= mustRun){

					func.apply(context,args);

					startTime = curTime;

					// 没达到触发间隔，重新设定定时器
				}else{

					timeout = setTimeout(func, wait);

				}
			}
		},
		equalArray: function(a,b){

			if (a.length != b.length) return false;

			for (var i = 0; i < a.length; i++) {

				if (a[i] !== b[i]) return false;

			}
			return true;
		},
		toThousands: function(num){

		  var num = (num || 0).toString();

			var result = '';

			while( num.length > 3 ) {

				result = ',' + num.slice(-3) + result;

				num = num.slice(0,num.length - 3);

			}

			if (num) {

				result = num + result;

			}

			return result;

    }
	}
	window.Lizard = Lizard;
	return Lizard;
})
