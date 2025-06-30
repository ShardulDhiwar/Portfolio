document.addEventListener("DOMContentLoaded", () => {
    // Declare emailjs variable
    const emailjs = window.emailjs
  
    // Initialize EmailJS with your public key
    if (typeof emailjs !== "undefined") {
      emailjs.init("1tV1E59aUCEBtThpL") // Replace with your actual public key
    }
  
    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        hamburger.classList.toggle("active")
      })
  
      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove("active")
          hamburger.classList.remove("active")
        }
      })
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
          if (navLinks) {
            navLinks.classList.remove("active")
          }
          if (hamburger) {
            hamburger.classList.remove("active")
          }
        }
      })
    })
  
    // Projects Carousel
    let currentSlide = 0
    const slides = document.querySelectorAll(".project-slide")
    const indicators = document.querySelectorAll(".indicator")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
  
    function showSlide(index) {
      // Hide all slides
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })
  
      // Remove active class from all indicators
      indicators.forEach((indicator) => {
        indicator.classList.remove("active")
      })
  
      // Show current slide
      if (slides[index]) {
        slides[index].classList.add("active")
      }
      if (indicators[index]) {
        indicators[index].classList.add("active")
      }
  
      // Update navigation buttons
      if (prevBtn) prevBtn.disabled = index === 0
      if (nextBtn) nextBtn.disabled = index === slides.length - 1
    }
  
    function nextSlide() {
      if (currentSlide < slides.length - 1) {
        currentSlide++
        showSlide(currentSlide)
      }
    }
  
    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--
        showSlide(currentSlide)
      }
    }
  
    // Event listeners for carousel navigation
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)
  
    // Indicator click events
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })
  
    // Auto-play carousel
    let autoPlayInterval
  
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          nextSlide()
        } else {
          currentSlide = 0
          showSlide(currentSlide)
        }
      }, 5000)
    }
  
    function stopAutoPlay() {
      clearInterval(autoPlayInterval)
    }
  
    // Start auto-play if carousel exists
    if (slides.length > 0) {
      startAutoPlay()
  
      // Pause auto-play on hover
      const projectsWrapper = document.querySelector(".projects-wrapper")
      if (projectsWrapper) {
        projectsWrapper.addEventListener("mouseenter", stopAutoPlay)
        projectsWrapper.addEventListener("mouseleave", startAutoPlay)
      }
  
      // Initialize carousel
      showSlide(0)
    }
  
    // Contact Form with EmailJS
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("name")?.value
        const email = document.getElementById("email")?.value
        const message = document.getElementById("message")?.value
  
        if (!name || !email || !message) {
          showNotification("Please fill in all fields", "error")
          return
        }
  
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const originalButtonText = submitButton?.innerHTML
        if (submitButton) {
          submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
          submitButton.disabled = true
        }
  
        // Check if EmailJS is available
        if (typeof emailjs !== "undefined") {
          // Send email using EmailJS
          emailjs
            .send("service_31qoh5f", "template_lzsg4h8", {
              from_name: name,
              from_email: email,
              message: message,
              to_name: "Shardul",
            })
            .then((response) => {
              console.log("SUCCESS!", response.status, response.text)
              showNotification("Message sent successfully! I'll get back to you soon.", "success")
              contactForm.reset()
            })
            .catch((error) => {
              console.error("FAILED...", error)
              showNotification("Failed to send message. Please try again or contact me directly.", "error")
            })
            .finally(() => {
              if (submitButton && originalButtonText) {
                submitButton.innerHTML = originalButtonText
                submitButton.disabled = false
              }
            })
        } else {
          // Fallback - simulate form submission
          setTimeout(() => {
            showNotification("Message sent successfully! (Demo mode)", "success")
            contactForm.reset()
            if (submitButton && originalButtonText) {
              submitButton.innerHTML = originalButtonText
              submitButton.disabled = false
            }
          }, 2000)
        }
      })
    }
  
    // Notification system
    function showNotification(message, type = "info") {
      // Remove existing notifications
      const existingNotifications = document.querySelectorAll(".notification")
      existingNotifications.forEach((notification) => notification.remove())
  
      const notification = document.createElement("div")
      notification.className = `notification notification-${type}`
      notification.innerHTML = `
        <div class="notification-content">
          <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
          <span>${message}</span>
        </div>
      `
  
      // Add notification styles
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        ${type === "success" ? "background: linear-gradient(135deg, #10b981, #059669);" : ""}
        ${type === "error" ? "background: linear-gradient(135deg, #ef4444, #dc2626);" : ""}
        ${type === "info" ? "background: linear-gradient(135deg, #3b82f6, #2563eb);" : ""}
      `
  
      document.body.appendChild(notification)
  
      // Animate in
      setTimeout(() => {
        notification.style.transform = "translateX(0)"
      }, 100)
  
      // Auto remove after 5 seconds
      setTimeout(() => {
        notification.style.transform = "translateX(100%)"
        setTimeout(() => {
          notification.remove()
        }, 300)
      }, 5000)
    }
  
    // Add CSS for notification content
    const style = document.createElement("style")
    style.textContent = `
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `
    document.head.appendChild(style)
  })
  
