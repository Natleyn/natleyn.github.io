var ore1A = document.getElementById("o1A");
var ore1B = document.getElementById("o1B");
var ore1G = document.getElementById("o1G");
//ore1B.onkeyup = calculateOreGrade(ore1B.value, ore1A.value, ore1G);
ore1B.onkeyup = function(){ calculateOreGrade(ore1B.value, ore1A.value, ore1G); };

var ore2A = document.getElementById("o2A");
var ore2B = document.getElementById("o2B");
var ore2G = document.getElementById("o2G");
ore2B.onkeyup = function(){ calculateOreGrade(ore2B.value, ore2A.value, ore2G); };


var ore3A = document.getElementById("o3A");
var ore3B = document.getElementById("o3B");
var ore3G = document.getElementById("o3G");
ore3B.onkeyup = function(){ calculateOreGrade(ore3B.value, ore3A.value, ore3G); };

var finalOreText = document.getElementById("finaloretext");
var finalItemGrade = document.getElementById("finalitemgrade");


function calculateItemGrade() {
	var oreAgrade = Math.floor(ore1B.value/ore1A.value);
	var oreBgrade = Math.floor(ore2B.value/ore2A.value);
	var oreCgrade = Math.floor(ore3B.value/ore3A.value);
	var productGrade = oreAgrade + oreBgrade + oreCgrade;
	finalOreText.innerHTML = `Final ore grade: ${productGrade}`;
	finalItemGrade.innerHTML = `Item Grade: ${Math.max(Math.min(Math.ceil(Math.floor(productGrade/100)/2),3),0)}`;
}

function calculateOreGrade(gold,oreType,gradeField) {
	gradeField.innerHTML = ""+Math.floor(gold/oreType);
}
