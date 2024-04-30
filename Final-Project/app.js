//Type.js animation
var typed = new Typed(".texts",{
    strings: ["COLLEGE STUDENT", "BEGINNER CIVIL ENGINEER", "RESEARCH ASSISTANT", "UX/UI Learner"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

//scroll sections
let sections = document.querySelectorAll('.page');
let navLinks  = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
}

//Contact form submission
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('number').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('content').value
        };

        console.log("Form Data Submitted:", formData);
    });
});


