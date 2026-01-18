// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const faqItems = document.querySelectorAll('.faq-item');

    // Accordion toggle
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedCategory = this.dataset.category;

            // Update active button
            categoryBtns.forEach(button => {
                button.classList.remove('active');
            });
            this.classList.add('active');

            // Filter FAQ items
            faqItems.forEach(item => {
                if (selectedCategory === 'all') {
                    item.classList.remove('hidden');
                } else if (item.dataset.category === selectedCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Search functionality
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();

        // Reset category filter
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        categoryBtns[0].classList.add('active');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
// Analytics tracking (optional)
function trackFaqClick(category, question) {
    console.log(`FAQ clicked: ${category} - ${question}`);
    // You can send this data to your analytics service
}
