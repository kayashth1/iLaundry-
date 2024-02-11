// const stripe_key = process.env.stripe_key;
document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.getElementById('payBtn');

    if (payBtn) {
        payBtn.addEventListener('click', async () => {
            try {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                
                // Check if cart is empty
                if (cartItems.length === 0) {
                    console.error('Cart is empty');
                    return;
                }

                console.log('Request Data:', cartItems);

                const response = await fetch('/stripe-checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer pk_test_51OXsEpSBoERWRPWyAHmN3lIhXrJAn6UU6HSWIcBwAPY8NOZ8fCht1KDj2qmdJCyNq1AvJIHAPwCQa1karKcoglFC00A1AQlrAm`,
                    },
                    body: JSON.stringify({
                        items: cartItems
                    })
                });

                if (!response.ok) {
                    throw new Error(`Fetch error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                location.href = data.url;
                clearcart();
            } catch (error) {
                console.error('Fetch error:', error);
            }
        });
    } else {
        console.error("Element with ID 'payBtn' not found");
    }


        // Set the speed of the scroll (in milliseconds)
        var scrollSpeed = 500;
    
        // Select the cart content container
        var cartContent = document.querySelector('.cart-content');
    
        // Attach the scroll event to the container
        cartContent.addEventListener('wheel', function(e) {
            e.preventDefault();
    
            // Calculate the new scrollTop position
            var scrollTop = cartContent.scrollTop + e.deltaY;
    
            // Animate the scroll to the new position
            smoothScroll(cartContent, scrollTop, scrollSpeed);
        });
    
        function smoothScroll(element, targetPosition, duration) {
            var startTime = performance.now();
            var startScrollTop = element.scrollTop;
            var distance = targetPosition - startScrollTop;
    
            function step(currentTime) {
                var elapsed = currentTime - startTime;
                var progress = Math.min(elapsed / duration, 1);
                var newPosition = startScrollTop + distance * easeInOutCubic(progress);
    
                element.scrollTop = newPosition;
    
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }
    
            requestAnimationFrame(step);
        }
    
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

    
    
});
