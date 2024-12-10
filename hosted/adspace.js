// adspace.js

window.onload = function() {
    var adSpace = document.getElementById('adspace');

    var leftAd = document.createElement('img');
    leftAd.src = '/assets/img/adSpace.png'; 
    leftAd.alt = 'Left Ad';
    leftAd.classList.add('ad-image', 'left');  
    adSpace.appendChild(leftAd);  

    var rightAd = document.createElement('img');
    rightAd.src = '/assets/img/adSpace.png';  
    rightAd.alt = 'Right Ad';
    rightAd.classList.add('ad-image', 'right'); 
    adSpace.appendChild(rightAd); 
};
