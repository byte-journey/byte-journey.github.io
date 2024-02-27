function updateTime() {
    var now = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    var dayOfWeek = days[now.getDay()];
    var month = months[now.getMonth()];
    var dayOfMonth = now.getDate();
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Format date string
    var dateString = dayOfWeek + ', ' + month + ' ' + dayOfMonth + ', ' + year;

    // Format time string
    var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    document.getElementById('date').innerHTML = dateString;
    document.getElementById('time').innerHTML = timeString;
}

// Initial call to display date and time
updateTime();

// Update date and time every second
setInterval(updateTime, 1000);
