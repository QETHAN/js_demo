var proxy = function(func,thisObject){
	return(function(){
		return func.apply(thisObject,arguments);
	});
};
var clicky = {
	wasClicked: function(){
		alert('was clicked');
	},

	addListeners: function() {
		var self = this;
		document.getElementById('clicky').addEventListener('click',proxy(this.wasClicked,this));
	}
}

clicky.addListeners();