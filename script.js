var x = document.getElementById("demo");
var mapFrame = document.getElementById("mapFrame");
var useripaddress = document.getElementById('ipaddy');
var button = document.getElementById('btn-getstarted');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    
    x.innerHTML = "Lat: " + lat + "<br>Long: " + long;
    
    var mapSrc = "https://maps.google.com/maps?q=" + lat + "," + long + "&output=embed";
    mapFrame.src = mapSrc;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

getLocation();

// IP fetch
window.onload = () => {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            useripaddress.innerHTML = ip;
        })
        .catch(error => console.log(error));

    button.addEventListener('click', geo);

    function geo() {
        console.log("geo");
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip2 = data.ip;
                console.log("ipfetch done", ip2);
            })
            .catch(error => console.log(error));
    }
};


// data

document.addEventListener("DOMContentLoaded", function () {
    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            document.getElementById('gfg').textContent = ip;
            fetchIPInfo(ip);
        })
        .catch(error => console.log(error));

    // Fetch and display more information
    function fetchIPInfo(ip) {
        fetch(`https://ipapi.co/${ip}/json/`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('lat').textContent = `Lat: ${data.latitude}`;
                document.getElementById('city').textContent = `City: ${data.city}`;
                document.getElementById('region').textContent = `Region: ${data.region}`;
                document.getElementById('organisation').textContent = `Organisation: ${data.org}`;
                document.getElementById('hostname').textContent = `Hostname: ${data.hostname}`;
                document.getElementById('timezone').textContent = `TimeZone: ${data.timezone}`;
                document.getElementById('datentime').textContent = `Date And Time: ${new Date().toLocaleString("en-US", { timeZone: data.timezone })}`;
                document.getElementById('pincode').textContent = `Pincode: ${data.postal}`;
                document.getElementById('message').textContent = `Message: ${data.postal}`;
                // You can add more information retrieval and display here
            })
            .catch(error => console.log(error));
    }
});

