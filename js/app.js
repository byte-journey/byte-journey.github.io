function menuFunc() {
    var x = document.getElementById("navSmallScreen");

    if (x.className.indexOf("myPage") == -1) {
        x.className += "myPage";
    }
    else {
        x.className = x.className.replace("myPage", "");
    }
}

/*function mHover(mO) {
    mO.innerHTML = "Deeper"
}*/

/*function mOut(mO) {
    mO.innerHTML = "Explore"
}*/

document.getElementById('explore-btn').addEventListener("click", displayD);

function displayD() {
    document.getElementById('exampleP').innerHTML = Date()
}