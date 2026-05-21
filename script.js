/**
 * Campus Bites - Interactive Scripts
 * Form validation (feedback.html) & menu category filtering (menu.html)
 */

document.addEventListener('DOMContentLoaded', function () {
  initNavbarActiveState();
  initMenuFilter();
  initFeedbackForm();
});

/**
 * Highlight active nav link based on current page
 */
function initNavbarActiveState() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-campus .nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Menu category filtering for menu.html
 */
function initMenuFilter() {
  const filterBar = document.getElementById('menuFilterBar');
  const menuGrid = document.getElementById('menuGrid');

  if (!filterBar || !menuGrid) return;

  const filterButtons = filterBar.querySelectorAll('.filter-btn');
  const menuItems = menuGrid.querySelectorAll('.menu-item');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const category = button.getAttribute('data-filter');

      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });
      button.classList.add('active');

      menuItems.forEach(function (item) {
        const itemCategories = item.getAttribute('data-category');

        if (category === 'all') {
          item.classList.remove('hidden');
        } else if (itemCategories && itemCategories.split(' ').includes(category)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Feedback form validation for feedback.html
 */
function initFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const nameInput = document.getElementById('feedbackName');
  const emailInput = document.getElementById('feedbackEmail');
  const roleSelect = document.getElementById('feedbackRole');
  const commentsInput = document.getElementById('feedbackComments');
  const successMessage = document.getElementById('formSuccessMessage');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    isValid = validateRequiredField(nameInput, 'Please enter your name.') && isValid;
    isValid = validateEmailField(emailInput) && isValid;
    isValid = validateRequiredField(roleSelect, 'Please select your role.') && isValid;
    isValid = validateStarRating() && isValid;
    isValid = validateRequiredField(commentsInput, 'Please share your comments.') && isValid;

    if (isValid) {
      const rating = document.querySelector('input[name="rating"]:checked');
      const ratingValue = rating ? rating.value : 'N/A';

      if (successMessage) {
        successMessage.textContent =
          'Thank you, ' +
          nameInput.value.trim() +
          '! Your ' +
          ratingValue +
          '-star review has been received. We appreciate your feedback and will use it to make Campus Bites even better.';
        successMessage.classList.add('show');
      }

      alert(
        'Thank you for your feedback!\n\nYour ' +
          ratingValue +
          '-star review has been submitted successfully. The Campus Bites team appreciates you!'
      );

      form.reset();
      clearStarRatingVisual();
    }
  });

  [nameInput, emailInput, roleSelect, commentsInput].forEach(function (field) {
    if (!field) return;
    field.addEventListener('input', function () {
      clearFieldError(field);
    });
    field.addEventListener('change', function () {
      clearFieldError(field);
    });
  });

  const starInputs = document.querySelectorAll('input[name="rating"]');
  starInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      const ratingError = document.getElementById('ratingError');
      if (ratingError) {
        ratingError.style.display = 'none';
      }
    });
  });
}

function validateRequiredField(field, message) {
  if (!field) return true;

  const value = field.value.trim();

  if (value === '') {
    setFieldError(field, message);
    return false;
  }

  clearFieldError(field);
  return true;
}

function validateEmailField(field) {
  if (!field) return true;

  const value = field.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    setFieldError(field, 'Please enter your email address.');
    return false;
  }

  if (!emailPattern.test(value)) {
    setFieldError(field, 'Please enter a valid email address.');
    return false;
  }

  clearFieldError(field);
  return true;
}

function validateStarRating() {
  const ratingSelected = document.querySelector('input[name="rating"]:checked');
  const ratingError = document.getElementById('ratingError');

  if (!ratingSelected) {
    if (ratingError) {
      ratingError.textContent = 'Please select a star rating.';
      ratingError.style.display = 'block';
    }
    return false;
  }

  if (ratingError) {
    ratingError.style.display = 'none';
  }
  return true;
}

function setFieldError(field, message) {
  field.classList.add('is-invalid');

  let feedback = field.parentElement.querySelector('.invalid-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    field.parentElement.appendChild(feedback);
  }
  feedback.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  const feedback = field.parentElement.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = '';
  }
}

function clearStarRatingVisual() {
  const starInputs = document.querySelectorAll('input[name="rating"]');
  starInputs.forEach(function (input) {
    input.checked = false;
  });
}

