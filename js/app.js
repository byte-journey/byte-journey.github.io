function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + seconds;
    document.getElementById('time').innerHTML = timeString;
}

updateTime();
setInterval(updateTime, 1000);