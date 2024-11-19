// landing.js
document.querySelectorAll('.boton').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('data-href');
        
        const loader = document.querySelector('.loader-overlay');
        const loaderText = document.querySelector('.loader-text');
        
        // Create container for Lottie animation
        let animContainer = loader.querySelector('.lottie-container');
        if (!animContainer) {
            animContainer = document.createElement('div');
            animContainer.className = 'lottie-container';
            loader.insertBefore(animContainer, loaderText);
        }
        
        // Load and play animation with error handling
        try {
            animation = lottie.loadAnimation({
                container: animContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                // Fix path using forward slashes
                path: './MAINLOGIN/json/loading.json'
            });

            // Add error handler
            animation.addEventListener('data_failed', () => {
                console.error('Failed to load animation JSON');
            });
            
            // Show loader
            loader.style.display = 'flex';
            void loader.offsetWidth;
            loader.classList.add('active');
            loaderText.classList.add('active');
            
            // Redirect after animation
            setTimeout(() => {
                if (animation) {
                    animation.destroy();
                    animation = null;
                }
                
                loader.classList.remove('active');
                loaderText.classList.remove('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 1000);
            }, 2000);
        } catch (error) {
            console.error('Animation error:', error);
            // Fallback to direct redirect if animation fails
            window.location.href = href;
        }
    });
});