function menuFunc() {
    var x = document.getElementById("navSmallScreen");

    if (x.className.indexOf("myPage") == -1) {
        x.className += "myPage";
    }
    else {
        x.className = x.className.replace("myPage", "");
    }
}

var setVar = setInterval(timerFun, 1000);

function timerFun() {
    var a = new Date();
    const myTimeVar = document.getElementById("time").innerHTML = a.toLocaleTimeString(); 
}