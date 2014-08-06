/**
 * TotalStorage
 *
 * Copyright (c) 2012 Jared Novack & Upstatement (upstatement.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Total Storage is the conceptual the love child of jStorage by Andris Reinman, 
 * and Cookie by Klaus Hartl -- though this is not connected to either project.
 */

!function(t,e){var r,o,n="test";if("localStorage"in window)try{o="undefined"==typeof window.localStorage?e:window.localStorage,r="undefined"==typeof o||"undefined"==typeof window.JSON?!1:!0,window.localStorage.setItem(n,"1"),window.localStorage.removeItem(n)}catch(a){r=!1}t.totalStorage=function(e,r){return t.totalStorage.impl.init(e,r)},t.totalStorage.setItem=function(e,r){return t.totalStorage.impl.setItem(e,r)},t.totalStorage.getItem=function(e){return t.totalStorage.impl.getItem(e)},t.totalStorage.getAll=function(){return t.totalStorage.impl.getAll()},t.totalStorage.deleteItem=function(e){return t.totalStorage.impl.deleteItem(e)},t.totalStorage.impl={init:function(t,e){return"undefined"!=typeof e?this.setItem(t,e):this.getItem(t)},setItem:function(e,n){if(!r)try{return t.cookie(e,n),n}catch(a){}var l=JSON.stringify(n);return o.setItem(e,l),this.parseResult(l)},getItem:function(e){if(!r)try{return this.parseResult(t.cookie(e))}catch(n){return null}var a=o.getItem(e);return this.parseResult(a)},deleteItem:function(e){if(!r)try{return t.cookie(e,null),!0}catch(n){return!1}return o.removeItem(e),!0},getAll:function(){var e=[];if(r)for(var n in o)n.length&&e.push({key:n,value:this.parseResult(o.getItem(n))});else try{for(var a=document.cookie.split(";"),l=0;l<a.length;l++){var i=a[l].split("="),u=i[0];e.push({key:u,value:this.parseResult(t.cookie(u))})}}catch(c){return null}return e},parseResult:function(t){var e;try{e=JSON.parse(t),"undefined"==typeof e&&(e=t),"true"==e&&(e=!0),"false"==e&&(e=!1),parseFloat(e)==e&&"object"!=typeof e&&(e=parseFloat(e))}catch(r){e=t}return e}}}(jQuery);