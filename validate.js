define([],function(){

  var validate = {

    checkNumber: function (text) {

      var pattern = /^[0-9]+.?[0-9]*$/;

      return pattern.test(text);

    },
    isMobile: function (text) {

      var pattern = /^1[3-8]\d{9}$/;

      return pattern.test(text);

    },
    isZipCode: function(text) {

      var pattern = /^[1-9][0-9]{5}$/;

      return pattern.test(text);
    },
    isqq: function(text) {

      var pattern = /^[1-9][0-9]{4,10}$/;

      return pattern.test(text);

    },
    isWechat: function (text) {

      var pattern = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;

      return pattern.test(text);

    },
    isLicense: function (text) {

      var pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;

      return pattern.test(text);

    },
    isChinese: function (text){

      var pattern =  /[\u4E00-\u9FA5]/;

      return pattern.test(text);

    },
    isUserName: function (text) {

      var pattern = /^[a-zA-Z0-9_-]{4,16}$/;  //用户名正则，4到16位（字母，数字，下划线，减号）

      return pattern.test(text);

    },
    isURL: function (text) {

      var pattern =  /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

      return pattern.test(text);

    },

    isDate: function (text) {

      var pattrn = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;

      return pattern.test(text);

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
    isColor: function (text) {

      var pattern = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

      pattern.test(text);

    },

    isTime: function (text){

      var pattern = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/;

      return pattern.test(text);

    },

    isDateTime: function(){

      var pattern = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

      return pattern.test(text);
      
    },
    isIdCard: function(text) {
      //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
      var pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;

      return pattern.test(text);

    }
  }
})
