const eventDate = "2023-09-24";
const dayElem = document.getElementById("days");
const hourElem = document.getElementById("hours")
const minElem = document.getElementById("mins")
const secElem = document.getElementById("seconds")

function countDown(){
    const targetDate = new Date(eventDate);
    const todayDate = new Date();
    const totalSeconds = Math.floor((targetDate-todayDate)/1000);
    const days = Math.floor(totalSeconds/86400);
    const hours = Math.floor(totalSeconds/3600) % 24;
    const minutes = Math.floor(totalSeconds/60) % 60;
    const seconds = totalSeconds % 60;

    dayElem.innerHTML = days;
    hourElem.innerHTML = formatTime(hours);
    minElem.innerHTML = formatTime(minutes);
    secElem.innerHTML = formatTime(seconds);   
}

function formatTime(time){
    return time < 10 ? (`0${time}`):time;

}

countDown();
setInterval(countDown,1000);