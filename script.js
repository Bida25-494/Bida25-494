/**
 * Click & Eat — Main JavaScript
 * Active navigation, menu filtering, cart badge, form validation
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     State: Shopping cart count (session persistence via sessionStorage)
     -------------------------------------------------------------------------- */
  const CART_STORAGE_KEY = "clickEatCartCount";

  function getCartCount() {
    const stored = sessionStorage.getItem(CART_STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }

  function setCartCount(count) {
    sessionStorage.setItem(CART_STORAGE_KEY, String(count));
    updateCartBadgeUI(count);
  }

  function updateCartBadgeUI(count) {
    const badges = document.querySelectorAll(".cart-badge-count");
    badges.forEach(function (badge) {
      badge.textContent = count;
      badge.classList.add("bump");
      setTimeout(function () {
        badge.classList.remove("bump");
      }, 300);
    });
  }

  /* --------------------------------------------------------------------------
     Active navigation link highlighting
     -------------------------------------------------------------------------- */
  function setActiveNavLink() {
    let currentPage = window.location.pathname.split("/").pop() || "";
    try {
      currentPage = decodeURIComponent(currentPage);
    } catch (e) {
      /* use raw path segment */
    }
    currentPage = currentPage.split("?")[0].split("#")[0];
    if (!currentPage || currentPage.indexOf(".") === -1) {
      currentPage = "index.html";
    }
    const navLinks = document.querySelectorAll(".navbar-click-eat .nav-link[data-page]");

    navLinks.forEach(function (link) {
      const linkPage = link.getAttribute("data-page");
      if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  /* --------------------------------------------------------------------------
     Navbar scroll shadow
     -------------------------------------------------------------------------- */
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar-click-eat");
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------------
     Menu category filter (menu.html)
     -------------------------------------------------------------------------- */
  function initMenuFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item-col");

    if (!filterButtons.length || !menuItems.length) return;

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const category = btn.getAttribute("data-filter");

        filterButtons.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");

        menuItems.forEach(function (item) {
          const itemCategory = item.getAttribute("data-category");
          const subCategory = item.getAttribute("data-subcategory") || "";

          const matches =
            category === "all" ||
            itemCategory === category ||
            (category.indexOf("drinks-") === 0 && subCategory === category);

          if (matches) {
            item.classList.remove("hidden-filter");
            item.classList.add("fade-in");
          } else {
            item.classList.add("hidden-filter");
            item.classList.remove("fade-in");
          }
        });

        const subsectionTitles = document.querySelectorAll(".menu-subsection-title");
        subsectionTitles.forEach(function (title) {
          const titleFilter = title.getAttribute("data-show-for");
          if (!titleFilter) return;

          const visibleInSection = Array.from(menuItems).some(function (item) {
            if (item.classList.contains("hidden-filter")) return false;
            const sub = item.getAttribute("data-subcategory") || "";
            const cat = item.getAttribute("data-category");
            if (category === "all") return titleFilter === cat || titleFilter === sub;
            if (category.indexOf("drinks-") === 0) return sub === category && titleFilter === sub;
            return cat === category && (titleFilter === cat || titleFilter === category);
          });

          title.style.display = visibleInSection || category === "all" ? "" : "none";
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     Add to Order — cart badge + Bootstrap toast
     -------------------------------------------------------------------------- */
  function initAddToOrder() {
    const addButtons = document.querySelectorAll("button.btn-add-order");
    const toastEl = document.getElementById("cartToast");
    let toastInstance = null;

    if (toastEl && typeof bootstrap !== "undefined") {
      toastInstance = new bootstrap.Toast(toastEl, { delay: 2800 });
    }

    addButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const itemName = btn.getAttribute("data-item-name") || "Item";
        const newCount = getCartCount() + 1;
        setCartCount(newCount);

        if (toastInstance) {
          const toastBody = document.getElementById("cartToastBody");
          if (toastBody) {
            toastBody.textContent = itemName + " added to your order!";
          }
          toastInstance.show();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Feedback form validation + success modal
     -------------------------------------------------------------------------- */
  function initFeedbackForm() {
    const form = document.getElementById("feedbackForm");
    if (!form) return;

    const successModalEl = document.getElementById("feedbackSuccessModal");
    let successModal = null;
    if (successModalEl && typeof bootstrap !== "undefined") {
      successModal = new bootstrap.Modal(successModalEl);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const fullName = document.getElementById("fullName");
      const email = document.getElementById("email");
      const role = document.getElementById("role");
      const comments = document.getElementById("comments");
      const ratingInputs = form.querySelectorAll('input[name="foodRating"]');

      let isValid = true;
      form.classList.add("was-validated");

      if (!fullName.value.trim()) {
        fullName.classList.add("is-invalid");
        isValid = false;
      } else {
        fullName.classList.remove("is-invalid");
        fullName.classList.add("is-valid");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value)) {
        email.classList.add("is-invalid");
        isValid = false;
      } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
      }

      if (!role.value) {
        role.classList.add("is-invalid");
        isValid = false;
      } else {
        role.classList.remove("is-invalid");
        role.classList.add("is-valid");
      }

      const ratingSelected = Array.from(ratingInputs).some(function (r) {
        return r.checked;
      });
      const ratingWrap = document.getElementById("ratingGroup");
      if (!ratingSelected) {
        if (ratingWrap) ratingWrap.classList.add("is-invalid-group");
        isValid = false;
      } else if (ratingWrap) {
        ratingWrap.classList.remove("is-invalid-group");
      }

      if (!comments.value.trim()) {
        comments.classList.add("is-invalid");
        isValid = false;
      } else {
        comments.classList.remove("is-invalid");
        comments.classList.add("is-valid");
      }

      if (!isValid) return;

      const userName = fullName.value.trim();
      const modalUserName = document.getElementById("modalUserName");
      if (modalUserName) {
        modalUserName.textContent = userName;
      }

      if (successModal) {
        successModal.show();
      }

      form.reset();
      form.classList.remove("was-validated");
      fullName.classList.remove("is-valid");
      email.classList.remove("is-valid");
      role.classList.remove("is-valid");
      comments.classList.remove("is-valid");
      if (ratingWrap) ratingWrap.classList.remove("is-invalid-group");
    });

    const ratingInputs = form.querySelectorAll('input[name="foodRating"]');
    ratingInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        const ratingWrap = document.getElementById("ratingGroup");
        if (ratingWrap) ratingWrap.classList.remove("is-invalid-group");
      });
    });
  }

  /* --------------------------------------------------------------------------
     Deals page — Add combo to cart
     -------------------------------------------------------------------------- */
  function initDealButtons() {
    const dealButtons = document.querySelectorAll(".btn-deal-order");
    const toastEl = document.getElementById("cartToast");
    let toastInstance = null;

    if (toastEl && typeof bootstrap !== "undefined") {
      toastInstance = new bootstrap.Toast(toastEl, { delay: 2800 });
    }

    dealButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const dealName = btn.getAttribute("data-deal-name") || "Combo";
        const increment = parseInt(btn.getAttribute("data-increment") || "1", 10);
        setCartCount(getCartCount() + increment);

        if (toastInstance) {
          const toastBody = document.getElementById("cartToastBody");
          if (toastBody) {
            toastBody.textContent = dealName + " added to your order!";
          }
          toastInstance.show();
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Initialize on DOM ready
     -------------------------------------------------------------------------- */
  function init() {
    setActiveNavLink();
    initNavbarScroll();
    updateCartBadgeUI(getCartCount());
    initMenuFilter();
    initAddToOrder();
    initFeedbackForm();
    initDealButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

