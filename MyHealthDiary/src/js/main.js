
/* function toggleMenu() {
    let menu = document.querySelector(".nav-links");
    menu.classList.toggle("active");
 } */

console.log("löytyykö nappi" , document.querySelector(".add-diary"));

document.querySelector(".add-diary").addEventListener("click", function() {
    window.location.href = "diary.html";
});

document.querySelector(".add-activity").addEventListener("click", function() {
    window.location.href = "activity.html";
});

document.querySelector(".add-cycle").addEventListener("click", function() {
    window.location.href = "menstrual.html";
});


