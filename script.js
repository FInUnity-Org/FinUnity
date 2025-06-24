
// Utility function to safely get element by ID
function safeGetElement(id) {
  try {
    return document.getElementById(id);
  } catch (error) {
    console.warn(`Element with ID '${id}' not found:`, error);
    return null;
  }
}

// Utility function to safely query selector
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element with selector '${selector}' not found:`, error);
    return null;
  }
}

// Utility function to safely query all selectors
function safeQuerySelectorAll(selector) {
  try {
    return document.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Elements with selector '${selector}' not found:`, error);
    return [];
  }
}

// Navbar scroll effect with null checks
window.addEventListener('scroll', function() {
  const navbar = safeGetElement('navbar');
  if (navbar && typeof window.scrollY !== 'undefined') {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Countdown Timer with null checks
function updateCountdown() {
  try {
    const launchDate = new Date('2025-06-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (isNaN(distance)) {
      console.warn('Invalid countdown calculation');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = safeGetElement('days');
    const hoursEl = safeGetElement('hours');
    const minutesEl = safeGetElement('minutes');
    const secondsEl = safeGetElement('seconds');

    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
      const countdownEl = safeGetElement('countdown');
      if (countdownEl) {
        countdownEl.innerHTML = '<h3 style="color: var(--accent-green);">We\'re Live! 🎉</h3>';
      }
    }
  } catch (error) {
    console.error('Error in countdown timer:', error);
  }
}

// Initialize countdown with error handling
try {
  setInterval(updateCountdown, 1000);
  updateCountdown();
} catch (error) {
  console.error('Failed to initialize countdown:', error);
}

// Smooth scroll for navigation links with null checks
try {
  const anchorLinks = safeQuerySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    if (anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          const target = safeQuerySelector(targetId);
          if (target && typeof target.scrollIntoView === 'function') {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    }
  });
} catch (error) {
  console.error('Error setting up smooth scroll:', error);
}

// Intersection Observer for animations with error handling
try {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    try {
      entries.forEach(entry => {
        if (entry && entry.target && entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    } catch (error) {
      console.error('Error in intersection observer callback:', error);
    }
  }, observerOptions);

  const animateElements = safeQuerySelectorAll('.animate-on-scroll');
  animateElements.forEach(el => {
    if (el && observer) {
      observer.observe(el);
    }
  });
} catch (error) {
  console.error('Error setting up intersection observer:', error);
}

// Mobile menu toggle with null checks
try {
  const mobileMenu = safeQuerySelector('.mobile-menu');
  const navLinks = safeQuerySelector('.nav-links');

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function() {
      try {
        if (navLinks.style.display === 'flex') {
          navLinks.style.display = 'none';
        } else {
          navLinks.style.display = 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '100%';
          navLinks.style.left = '0';
          navLinks.style.right = '0';
          navLinks.style.background = 'rgba(19, 0, 30, 0.98)';
          navLinks.style.padding = '2rem';
          navLinks.style.borderTop = '1px solid rgba(139, 92, 246, 0.2)';
        }
      } catch (error) {
        console.error('Error in mobile menu toggle:', error);
      }
    });
  }
} catch (error) {
  console.error('Error setting up mobile menu:', error);
}

// Waitlist form submission with comprehensive error handling
try {
  const waitlistForm = safeGetElement('waitlistForm');
  const emailInput = safeGetElement('emailInput');
  const waitlistCount = safeGetElement('waitlistCount');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();

      try {
        // Simulate adding to waitlist
        let currentCount = 2847; // Default fallback
        if (waitlistCount && waitlistCount.textContent) {
          const countText = waitlistCount.textContent.replace(/,/g, '');
          const parsedCount = parseInt(countText);
          if (!isNaN(parsedCount)) {
            currentCount = parsedCount;
          }
        }

        const newCount = currentCount + 1;
        if (waitlistCount) {
          waitlistCount.textContent = newCount.toLocaleString();
        }

        // Show success message
        let email = 'your email';
        if (emailInput && emailInput.value) {
          email = emailInput.value;
          emailInput.value = '';
        }

        // Create success message with error handling
        const successMsg = document.createElement('div');
        if (successMsg) {
          successMsg.style.cssText = `
                                  position: fixed;
                                  top: 50%;
                                  left: 50%;
                                  transform: translate(-50%, -50%);
                                  background: linear-gradient(135deg, var(--primary-purple), var(--dark-purple));
                                  color: white;
                                  padding: 2rem 3rem;
                                  border-radius: 1rem;
                                  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                                  z-index: 9999;
                                  text-align: center;
                                  animation: fadeIn 0.5s ease;
                              `;
          successMsg.innerHTML = `
                                  <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Welcome to the Future! 🎉</h3>
                                  <p style="margin-bottom: 1rem;">You're #${newCount} on the waitlist</p>
                                  <p style="font-size: 0.875rem; opacity: 0.8;">Check ${email} for confirmation</p>
                              `;

          document.body.appendChild(successMsg);

          setTimeout(() => {
            try {
              if (successMsg && successMsg.parentNode) {
                successMsg.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                  if (successMsg && successMsg.parentNode) {
                    document.body.removeChild(successMsg);
                  }
                }, 500);
              }
            } catch (removeError) {
              console.warn('Error removing success message:', removeError);
            }
          }, 3000);
        }
      } catch (error) {
        console.error('Error in waitlist form submission:', error);
        // Show fallback message
        alert('Thank you for joining our waitlist!');
      }
    });
  }
} catch (error) {
  console.error('Error setting up waitlist form:', error);
}

// Add floating animation to feature cards on hover with error handling
try {
  const featureCards = safeQuerySelectorAll('.feature-card');
  featureCards.forEach(card => {
    if (card) {
      card.addEventListener('mouseenter', function() {
        try {
          this.style.transition = 'transform 0.3s ease';
          this.style.transform = 'scale(1.05)';
        } catch (error) {
          console.warn('Error applying hover animation:', error);
        }
      });
      card.addEventListener('mouseleave', function() {
        try {
          this.style.transform = 'scale(1)';
        } catch (error) {
          console.warn('Error removing hover animation:', error);
        }
      });
    }
  });
} catch (error) {
  console.error('Error setting up feature card animations:', error);
}

// Parallax effect for hero section with comprehensive checks
window.addEventListener('scroll', () => {
  try {
    const scrolled = window.pageYOffset;
    const hero = safeQuerySelector('.hero');
    const heroContent = safeQuerySelector('.hero-content');

    if (hero && heroContent && typeof scrolled === 'number' && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.transform = `translateY(${scrolled * -0.2}px)`;
      heroContent.style.opacity = Math.max(0, 1 - (scrolled * 0.001));
    }
  } catch (error) {
    console.warn('Error in parallax effect:', error);
  }
});

// Easter egg for early supporters with error handling
try {
  let clickCount = 0;
  const logo = safeQuerySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      try {
        clickCount++;
        if (clickCount === 7) {
          alert('You found the secret! Use code "EARLYBIRD" for 75% off when we launch!');
          clickCount = 0;
        }
      } catch (error) {
      }
    });
  }
} catch (error) {
  console.error('Error setting up easter egg:', error);
}

// Global error handler for any uncaught errors
window.addEventListener('error', function(e) {
  console.warn('Caught error:', e.error || e.message);
  // Prevent the error from breaking the page
  return true;
});

// Typing effect for AI chat demonstration
function typeMessage(element, message, delay = 50) {
  let index = 0;
  element.textContent = '';
  const timer = setInterval(() => {
    if (index < message.length) {
      element.textContent += message[index];
      index++;
    } else {
      clearInterval(timer);
    }
  }, delay);
}

// Enhanced AI demo with multiple interactions
function startAIDemo() {
  const aiVisual = document.querySelector('.ai-visual');
  if (!aiVisual || aiVisual.classList.contains('demo-started')) return;

  aiVisual.classList.add('demo-started');

  const chatMessage = aiVisual.querySelector('.chat-message p');
  const chatResponse = aiVisual.querySelector('.chat-response p');

  if (chatMessage && chatResponse) {
    // Store original messages
    const originalQuestion = chatMessage.textContent;
    const originalAnswer = chatResponse.textContent;

    // Start typing the question
    setTimeout(() => {
      typeMessage(chatMessage, originalQuestion, 60);
    }, 500);

    // Start typing the response after question is done
    setTimeout(() => {
      typeMessage(chatResponse, originalAnswer, 40);
    }, 3000);
  }
}

// Trigger AI demo when section becomes visible
const aiDemoObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startAIDemo();
    }
  });
}, { threshold: 0.3 });

// Observe AI section for demo trigger
try {
  const aiSection = document.querySelector('.ai-visual');
  if (aiSection) {
    aiDemoObserver.observe(aiSection);
  }
} catch (error) {
  console.warn('AI demo observer setup failed:', error);
}

// Add hover effect to AI chat
try {
  const aiChat = document.querySelector('.ai-chat');
  if (aiChat) {
    aiChat.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 30px 60px rgba(139, 92, 246, 0.25)';
    });
    aiChat.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.15)';
    });
  }
} catch (error) {
  console.warn('AI chat hover effects failed:', error);
}

