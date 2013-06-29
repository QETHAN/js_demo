var BackTop = function(btnId) {
	var btn = document.getElementById(btnId);
	var d = document.documentElement ? document.documentElement : document.body;

	window.onscroll = set;
	btn.onclick = function() {
		btn.className = 't_hide';
		window.onscroll = null;
		this.timer = setInterval(function(){
			d.scrollTop -= Math.ceil(d.scrollTop*0.8);
			if(d.scrollTop==0) {
				clearInterval(this.timer);
				window.onscroll=set;
			}
		},10);
	};

	function set() {
		btn.className = d.scrollTop > 1620 ? 't_show' : 't_hide';
	}
}