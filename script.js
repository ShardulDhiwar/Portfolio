// // Mobile Menu Toggle
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });

// // Close mobile menu when clicking outside
// document.addEventListener('click', (e) => {
//     if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
//         navLinks.classList.remove('active');
//     }
// });

// // Smooth scrolling for navigation links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//             // Close mobile menu after clicking a link
//             navLinks.classList.remove('active');
//         }
//     });
// });

// // Initialize EmailJS with your public key
// emailjs.init({
//     publicKey: "SMas0nOFpQRQeQnu6",
//     limitRate: true // Enable rate limiting
// });

// // Get the contact form element
// const contactForm = document.getElementById('contact-form');

// // Add submit event listener to the form
// contactForm.addEventListener('submit', function(e) {
//     e.preventDefault();

//     // Get form data
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;

//     // Validate form data
//     if (!name || !email || !message) {
//         alert('Please fill in all fields');
//         return;
//     }

//     // Show loading state
//     const submitButton = contactForm.querySelector('button[type="submit"]');
//     const originalButtonText = submitButton.textContent;
//     submitButton.textContent = 'Sending...';
//     submitButton.disabled = true;

//     // Send email using EmailJS
//     emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
//         from_name: name,
//         from_email: email,
//         message: message,
//         to_name: "Shardul S Dhiwar",
//     })
//     .then(function(response) {
//         console.log('SUCCESS!', response.status, response.text);
//         alert('Message sent successfully!');
//         contactForm.reset();
//     })
//     .catch(function(error) {
//         console.error('FAILED...', error);
//         if (error.text.includes('Public Key')) {
//             alert('Email configuration error. Please contact the website administrator.');
//         } else {
//             alert('Failed to send message. Please try again later.');
//         }
//     })
//     .finally(function() {
//         submitButton.textContent = originalButtonText;
//         submitButton.disabled = false;
//     });
// });

// // Add scroll-based animations
// const observerOptions = {
//     threshold: 0.1
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '1';
//             entry.target.style.transform = 'translateY(0)';
//         }
//     });
// }, observerOptions);

// // Observe all sections
// document.querySelectorAll('section').forEach(section => {
//     section.style.opacity = '0';
//     section.style.transform = 'translateY(20px)';
//     section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
//     observer.observe(section);
// }); 

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
  
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
  
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navLinks.classList.remove('active');
            }
        });
    });
  
    // Initialize EmailJS properly with your actual public key
    emailjs.init("1tV1E59aUCEBtThpL");
  
    // Now define contactForm safely
    const contactForm = document.getElementById('contact-form');
  
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
  
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
  
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
  
        emailjs.send("service_31qoh5f", "template_lzsg4h8", {
            from_name: name,
            from_email: email,
            message: message,
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(function() {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
  
    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
  
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(section);
    });
  });
  
