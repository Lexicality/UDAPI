// JavaScript source code

var host = "http://localhost:8080/";
function getScript(name, cb) {
	var script = document.createElement('script');
	if (cb) {
		cb = "?cb=" + Date.now();
	} else {
		cb = "";
	}
	script.src = host + name + cb;
	document.head.appendChild(script);
}

/*
	To run, drop this in ur dev console
	
var d=document,s=d.createElement("script");s.src="http://localhost:8080/bootstrap.js?cb="+Date.now();d.head.appendChild(s);

*/

getScript("Scripts/jquery-2.1.4.js");
getScript("Scripts/lodash.js");
getScript("Scripts/q.js");
getScript("bin/built.js", true);