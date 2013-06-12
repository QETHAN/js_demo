jQuery.extend = jQuery.fn.extend = function() {
	var options, 
			name,
			src,
			copy,
			copyIsArray,
			clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

			if(typeof target === "boolean") {
				deep = target;
				target = arguments[1] || {};
				i = 2;
			}

			if(typeof target !== "object" && !jQuery.isFunction(target)) {
				target = {};
			}

			//如果只传入一个参数，则认为是对jQuery扩展jQuery.extend({})
			if(length === i) {
				target = this;
				--i;//0
			}

			for(; i<length; i++) {
				if((options = arguments[i]) != null) {
					for(name in options) {
						src = target[name];
						copy = options[name];

						if(target === copy) {
							continue;
						}

						//深度拷贝 且 值是纯对象或数组， 则递归
						if(deep && copy && (jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))) {
							if(copyIsArray) {
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];
							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}

							//针对上边的情况，都是对象或者数组，再进行递归, 这次的target, copy改变为对象或数组
							target[name] = jQuery.extend(deep, clone, copy);
						} else if(copy !== undefined) {
							target[name] = copy;//直接赋值
						}
					}
				}
			}

			return target;
}

jQuery.extend({
	//将$和jQuery的控制权 都交还给另一javascript库
	noConfilict:function(deep) {

		//交出$的控制权
		if(window.$ === jQuery){
			window.$ = _$;
		})

		//交出jQuery的控制权
		if(deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	isFunction:function(obj) {
		return jQuery.type(obj) === "function";
	},

	isArray:Array.isArray || function(obj) {
		return jQuery.type(obj) === "array";
	},

// 简单的判断(判断setInterval属性)是否window对象
	isWindow:function(obj) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	// 等于null 或 不是数字 或调用window.isNaN判断
	isNaN:function(obj) {
		return obj == null || !rdigit.test(obj) || isNaN(obj);
	},

	type:function(obj) {
		return obj == null ?
			String(obj) :
			class2Type[toString.call(obj)] || "object";
	}
});

