// JavaScript chung cho toàn bộ website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website đã tải xong!');
    
    // Thêm hiệu ứng cho menu
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Highlight menu link hiện tại
    const currentPage = window.location.pathname.split('/').pop();
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Thêm năm hiện tại vào footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Thêm loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.id = 'loading-animation';
    loadingAnimation.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2ecc71, #e74c3c);
        z-index: 9999;
        transform: translateX(-100%);
    `;
    document.body.appendChild(loadingAnimation);
    
    // Animate loading bar
    setTimeout(() => {
        loadingAnimation.style.transition = 'transform 0.5s ease-out';
        loadingAnimation.style.transform = 'translateX(-30%)';
        
        setTimeout(() => {
            loadingAnimation.style.transition = 'transform 0.3s ease-in';
            loadingAnimation.style.transform = 'translateX(0%)';
            
            setTimeout(() => {
                loadingAnimation.style.opacity = '0';
                setTimeout(() => {
                    loadingAnimation.remove();
                }, 300);
            }, 300);
        }, 500);
    }, 100);
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #3498db;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
    `;
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'scale(1)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Thêm hiệu ứng hover cho các card
    const cards = document.querySelectorAll('.exercise-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 3px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Thêm tooltip cho các icon
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.title = icon.textContent;
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + H để về trang chủ
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
        
        // Esc để đóng modal (nếu có)
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Xử lý form submit chung
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Ngăn submit nếu có input không hợp lệ
            const invalidInputs = this.querySelectorAll('input:invalid, select:invalid');
            if (invalidInputs.length > 0) {
                e.preventDefault();
                invalidInputs[0].focus();
                invalidInputs[0].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Thêm animation cho các heading
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Quan sát các heading
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(20px)';
        heading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(heading);
    });
    
    // Xử lý responsive images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dominant-baseline="central">Image</text></svg>';
        };
    });
    
    console.log('JavaScript chung đã được khởi chạy!');
});