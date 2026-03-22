/* ============================================
   Lake Charles Tree Service - Main JavaScript
   ============================================ */

(function() {
  'use strict';

  /* --- Before/After Slider --- */
  function initSliders() {
    document.querySelectorAll('.before-after-slider').forEach(function(slider) {
      var handle = slider.querySelector('.ba-handle');
      var beforeImg = slider.querySelector('.ba-before');
      var isDragging = false;

      function updateSlider(x) {
        var rect = slider.getBoundingClientRect();
        var pos = Math.max(0, Math.min(x - rect.left, rect.width));
        var pct = (pos / rect.width) * 100;
        beforeImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        handle.style.left = pct + '%';
      }

      slider.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isDragging = true;
        updateSlider(e.clientX);
      });
      document.addEventListener('mousemove', function(e) {
        if (isDragging) updateSlider(e.clientX);
      });
      document.addEventListener('mouseup', function() {
        isDragging = false;
      });

      slider.addEventListener('touchstart', function(e) {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
      }, { passive: true });
      document.addEventListener('touchmove', function(e) {
        if (isDragging) {
          updateSlider(e.touches[0].clientX);
        }
      }, { passive: true });
      document.addEventListener('touchend', function() {
        isDragging = false;
      });
    });
  }

  /* --- Sticky Header Scroll Effect --- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var scrolled = false;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50 && !scrolled) {
        header.classList.add('scrolled');
        scrolled = true;
      } else if (window.scrollY <= 50 && scrolled) {
        header.classList.remove('scrolled');
        scrolled = false;
      }
    }, { passive: true });
  }

  /* --- Mobile Navigation --- */
  function initMobileNav() {
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- FAQ Accordion --- */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(function(item) {
      var btn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', function() {
        var isOpen = item.classList.contains('open');

        item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(other) {
          other.classList.remove('open');
          var otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* --- Contact Form (Web3Forms) --- */
  function initContactForm() {
    var form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
      .then(function(res) { return res.json(); })
      .then(function(result) {
        if (result.success) {
          window.location.href = 'thank-you.html';
        } else {
          btn.textContent = 'Error - Try Again';
          btn.disabled = false;
          setTimeout(function() { btn.textContent = originalText; }, 3000);
        }
      })
      .catch(function() {
        btn.textContent = 'Error - Try Again';
        btn.disabled = false;
        setTimeout(function() { btn.textContent = originalText; }, 3000);
      });
    });
  }

  /* --- Initialize --- */
  document.addEventListener('DOMContentLoaded', function() {
    initSliders();
    initHeader();
    initMobileNav();
    initFAQ();
    initContactForm();
  });
})();
