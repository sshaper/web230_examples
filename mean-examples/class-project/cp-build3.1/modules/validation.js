"use strict";

/* THIS MODULE ACCEPTS TWO ARGUMENTS THE DATA TO BE CHECKED AND A STRING THAT IS THE REGEX TO USE.  IT CHECKS WHAT WAS ENTERED AGAINST THE REGEX THAT IS PRE-WRITTEN IN THE FUNCTION  AND RETURNS EITHER TRUE OR FALSE. */

exports.validate = function(value, regex) {
    switch(regex){
      case "email" : return email(value); break;
      case "password" : return password(value); break;
      case "name" : return name(value); break;
      case "address" : return address(value); break;
      case "state" : return state(value); break;
      case "zip" : return zip(value); break;
      case "namets" : return namets(value); break;
      case "alphaNum" : return alphaNum(value); break;
      case "phone" : return phone(value);break;
      case "phoneOpt" : return phoneOpt(value);break;
      case "dateFormat" : return dateFormat(value);break;
      case "text": return text(value);break;
      case "number": return number(value);break;
      default : console.log('not found');
    }
}

function email(email){
  var regex = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$','i');

  return regex.test(email);
}

/*THIS IS PRETTY WEAK FOR A PASSWORD BUT IT BASICALLY ONLY CHECK FOR ALPHA CHARACTERS */
function password(password){
  var regex = new RegExp('^[a-z]+$','i');
  
  return regex.test(password);
}

function name(name){
  var regex = new RegExp('^[a-z0-9 ]+$','i');
  return regex.test(name);
}

function alphaNum(str){
  var regex = new RegExp('^[a-z0-9]+$','i');
  return regex.test(str);
}

function address(address){
  var regex = new RegExp('^[a-z0-9\,\. ]+$','i');
  return regex.test(address);
}

function state(state){
  var regex = new RegExp('^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$');
  return regex.test(state);
}

function zip(zip){
  var regex = new RegExp('^[1-9]{1}[0-9]{4}$');
  return regex.test(zip);
}

/* THIS IS A CUSTOM STRING THAT STORES A NAME AND TIMESTAMP */
function namets(namets){
  var regex = new RegExp('^[a-z0-9]+$','i');
  return regex.test(namets);
}

function phone(phone){
  var regex = new RegExp('^[0-9]{3}\.[0-9]{3}\.[0-9]{4}$','i');
  return regex.test(phone);  
}

/* THIS CHECKS FOR AN OPTIONAL PHONE NUMBER */
function phoneOpt(phone){
  if(phone === ""){
    return true;
  }
  else {
    var regex = new RegExp('^[0-9]{3}\.[0-9]{3}\.[0-9]{4}$','i');
    return regex.test(phone);  
  }
}

function dateFormat(dateFormat){
  var regex = new RegExp('^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$','g');
  return regex.test(dateFormat);  
}

function text(text){
  var regex = new RegExp('^[a-z0-9\\, \' \. \; \,]+$','i');
  return regex.test(text);  
}
function number(number){
  var regex = new RegExp('^([0-9]{1,4})$|^([0-9]{1,4}\.[0-9]{0,2})$|^(\.[0-9]{0,2})$');
  return regex.test(number);
}


