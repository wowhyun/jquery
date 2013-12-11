;
/*!
 * jquery.callAjax.js v.0.9
 * using jquery.js
 * Author : shyu (ysh3342 at d2.co.kr)
 * Date: 2012.03.19
 *
 * useage : $.callAjax.get.json(params);
 *
 */
var $jqXhr = null;
(function($) {
	$.callAjax = function(url) {
		var opts = {url: url};
		return doAjax(opts);
	};
	$.callAjax.get = [];
	$.callAjax.post = [];
	
	$.callAjax.dataTypes = ['json', 'xml', 'jsonp', 'html'];
	$.callAjax.defaults = {
		async : false,
		cache : false,
		type: 'GET',
		timeout : 2000,
		url : '',
		data : undefined,
		dataType : 'text',
		success : function(data, textStatus, jqXHR){
			
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$jqXhr = null;
			//if (_errMsg != undefined && _errMsg != null && _errMsg != "" )
				alert('Error => '+textStatus+'');
		},
		complete : function(jqXHR, textStatus){
			$jqXhr = null;
		},
		//asyncMsg : '처리중인 작업이 있습니다.\n계속하시겠습니까?'
		asyncMsg : ''
	};
	
	
	$.each($.callAjax.dataTypes, function(i, dataType) { 
		$.callAjax.get[dataType] = function(url, data, callback) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				callback = data;
				data = undefined;
			}
			var opts = {type: 'GET', dataType: dataType, url: url, data : data, success : callback};
			return doAjax(opts);
		};
		
		$.callAjax.post[dataType] = function(url, data, callback) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				callback = data;
				data = undefined;
			}
			var opts = {type: 'POST', dataType: dataType, url: url, data : data, success : callback};
			return doAjax(opts);
		};
	});
	
	function doAjax(opts) {
		if ($jqXhr != null && $.callAjax.defaults.async && $.callAjax.defaults.asyncMsg ) { 
			if(confirm($.callAjax.defaults.asyncMsg)){
				if($jqXhr != null) $jqXhr.abort();
				$jqXhr = null;
			} else {
				return $jqXhr;
			}
			//alert('$.callAjax.jqXhr != null');
			//return null;
		}
		
		opts = $.extend({}, $.callAjax.defaults, opts || {});
		
		return $jqXhr = jQuery.ajax(opts);
	}
})(jQuery);