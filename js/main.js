// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Testimonial slider (if exists on page)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        initTestimonialSlider();
    }

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            alert('Thank you for your submission! We will contact you soon.');
            form.reset();
        });
    });
});

function initTestimonialSlider() {
    const testimonials = [
        {
            text: "A & A Global Leasing has been our trusted logistics partner for over 5 years. Their reliability and professionalism are unmatched in the industry.",
            author: "John Smith",
            role: "CEO, Smith Manufacturing"
        },
        {
            text: "Their fleet management solutions have helped us reduce operational costs by 20% while improving delivery times. Highly recommended!",
            author: "Sarah Johnson",
            role: "Operations Manager, Johnson Distributors"
        },
        {
            text: "The team at A & A Global Leasing understands our business needs and provides customized solutions that work. Excellent service!",
            author: "Michael Brown",
            role: "Supply Chain Director, Brown Enterprises"
        }
    ];

    const testimonialContainer = document.querySelector('.testimonial-slider');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialContainer.innerHTML = `
            <div class="testimonial">
                <p class="testimonial-text">"${testimonials[index].text}"</p>
                <div class="testimonial-author">${testimonials[index].author}</div>
                <div class="testimonial-role">${testimonials[index].role}</div>
            </div>
        `;
    }

    // Show first testimonial
    showTestimonial(currentTestimonial);

    // Change testimonial every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}