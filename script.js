document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".topbar");
  const menu = document.querySelector("[data-menu]");
  if (menu && header) {
    menu.innerHTML = "&#9776;";
    menu.setAttribute("aria-label", "Open menu");
    menu.addEventListener("click", () => {
      const open = header.classList.toggle("mobile-open");
      document.body.classList.toggle("menu-lock", open);
      menu.innerHTML = open ? "&times;" : "&#9776;";
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    header.addEventListener("click", (event) => {
      if (event.target.closest(".main-nav a, .main-nav button, .nav-actions button")) {
        header.classList.remove("mobile-open");
        document.body.classList.remove("menu-lock");
        menu.innerHTML = "&#9776;";
        menu.setAttribute("aria-label", "Open menu");
      }
    });
  }

  normalizeHeader();
  normalizeFooter();
  initMobileSearchDropdowns();
  renderAutoDashboard();
  buildAuthModal();
  prepareSmoothScroll();
  enhanceBrandStrip();
  enhanceTestimonialMarquee();
  injectContentIcons();
  prepareScrollEffects();
  wireFallbackNavigation();
  wireSocialLinks();
  wireDashboard();

  document.querySelectorAll("[data-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const group = tab.closest(".tabs");
      group?.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (form.closest(".auth-modal")) return;
      event.preventDefault();
      if (!form.reportValidity()) return;
      window.location.href = "404.html";
    });
  });

  const backTop = document.querySelector(".back-top");
  if (backTop) {
    backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
});

function normalizeHeader() {
  document.querySelectorAll(".topbar .nav-actions").forEach((actions) => {
    actions.innerHTML = `
      <button class="btn btn-sm btn-orange" type="button" data-auth-open>Sign In</button>
    `;
  });
  document.querySelectorAll(".topbar .main-nav").forEach((nav) => {
    if (nav.querySelector(".mobile-drawer-actions")) return;
    nav.insertAdjacentHTML("beforeend", `
      <div class="mobile-drawer-actions">
        <button class="btn btn-sm btn-orange" type="button" data-auth-open>Sign In</button>
      </div>
    `);
  });
}

function normalizeFooter() {
  document.querySelectorAll(".footer").forEach((footer) => {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="footer-logo" href="index.html"><img src="assets/stackly-logo.svg" alt="Stackly"></a>
            <p>Stackly helps businesses, creators, buyers, and service professionals connect through trusted digital services.</p>
            <div class="socials"><a aria-label="Facebook"></a><a aria-label="X"></a><a aria-label="Instagram"></a><a aria-label="Google"></a><a aria-label="YouTube"></a></div>
          </div>
          <div><h3>Quick Link</h3><ul><li><a href="about-us.html">About Us</a></li><li><a href="service.html">Categories</a></li><li><a href="404.html">Create Gigs</a></li><li><a href="404.html">Pricing</a></li><li><a href="404.html">FAQ</a></li></ul></div>
          <div><h3>Featured Categories</h3><ul><li>Programming &amp; Tech</li><li>Graphics &amp; Design</li><li>Digital Marketing</li><li>Music &amp; Audio</li><li>Photo &amp; Video</li><li>Business</li></ul></div>
          <div><h3>Support</h3><ul><li>Help Center</li><li>Order Support</li><li>Seller Guide</li><li>Buyer Guide</li><li>Safety &amp; Trust</li></ul></div>
          <div class="footer-contact-col"><h3>Contact Us</h3><ul><li><b>Address:</b> No. 24, Omalur Main Road, Salem, Tamil Nadu 636009</li><li><b>Email:</b> hello@stackly.in</li><li><b>Phone:</b> +91 98765 43210</li></ul></div>
        </div>
        <div class="copyright"><span>Copyright &copy; 2026 Stackly. All rights reserved.</span><span><a href="404.html">Privacy Policy</a><a href="404.html">Terms &amp; Conditions</a></span></div>
      </div>
    `;
  });
}

function initMobileSearchDropdowns() {
  document.querySelectorAll('.search-panel select.field').forEach((select) => {
    if (select.dataset.customReady) return;
    select.dataset.customReady = 'true';

    const wrap = document.createElement('div');
    wrap.className = 'mobile-select-wrap';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-select-trigger';
    button.textContent = select.options[select.selectedIndex]?.text || 'Select';

    const list = document.createElement('div');
    list.className = 'mobile-select-list';

    Array.from(select.options).forEach((option) => {
      if (!option.value && option.disabled) return;
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'mobile-select-option';
      item.textContent = option.text;
      item.addEventListener('click', () => {
        select.value = option.value || option.text;
        button.textContent = option.text;
        wrap.classList.remove('open');
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      list.appendChild(item);
    });

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      document.querySelectorAll('.mobile-select-wrap.open').forEach((openWrap) => {
        if (openWrap !== wrap) openWrap.classList.remove('open');
      });
      wrap.classList.toggle('open');
    });

    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    wrap.appendChild(button);
    wrap.appendChild(list);
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.mobile-select-wrap.open').forEach((wrap) => wrap.classList.remove('open'));
  });
}

function enhanceBrandStrip() {
  document.querySelectorAll(".brand-strip .container").forEach((track) => {
    if (track.dataset.marqueeReady) return;
    track.dataset.marqueeReady = "true";
    track.classList.add("brand-track");
    const items = Array.from(track.children);
    for (let repeat = 0; repeat < 5; repeat += 1) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }
    track.querySelectorAll("span").forEach((item) => {
      item.classList.add("brand-item");
    });
  });
}

function enhanceTestimonialMarquee() {
  document.querySelectorAll(".testimonial-track").forEach((track) => {
    if (track.dataset.marqueeReady) return;
    track.dataset.marqueeReady = "true";
    const items = Array.from(track.children);
    for (let repeat = 0; repeat < 2; repeat += 1) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }
  });
}

function iconSvg(paths) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
}

function injectContentIcons() {
  const categoryIcons = [
    iconSvg('<path d="M4 14l10-5v10L4 14z"/><path d="M14 10.5h2.5a3.5 3.5 0 0 1 0 7H14"/><path d="M6 15l1.5 5h3L9 16.5"/>'),
    iconSvg('<path d="M8 9l-4 3 4 3"/><path d="M16 9l4 3-4 3"/><path d="M14 4l-4 16"/>'),
    iconSvg('<path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>'),
    iconSvg('<path d="M4 8h3l1.5-2h7L17 8h3v11H4V8z"/><circle cx="12" cy="13.5" r="3.5"/>'),
    iconSvg('<path d="M12 3v18"/><path d="M8 5a3 3 0 0 0-3 3c0 1 .4 1.8 1 2.4A3.8 3.8 0 0 0 5 13a4 4 0 0 0 4 4h3"/><path d="M16 5a3 3 0 0 1 3 3c0 1-.4 1.8-1 2.4a3.8 3.8 0 0 1 1 2.6 4 4 0 0 1-4 4h-3"/>'),
    iconSvg('<path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>'),
    iconSvg('<path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4a5 5 0 0 0 0-10h-4z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="9.5" cy="6.8" r=".8"/><circle cx="13" cy="6.2" r=".8"/>'),
    iconSvg('<path d="M9 6V4h6v2"/><rect x="4" y="6" width="16" height="13" rx="2"/><path d="M4 12h16"/><path d="M10 12v2h4v-2"/>'),
    iconSvg('<path d="M4 18V6"/><path d="M4 18h16"/><path d="M8 15v-4"/><path d="M12 15V8"/><path d="M16 15v-6"/>'),
    iconSvg('<circle cx="7" cy="12" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M9.7 10.7l4.6-2.4"/><path d="M9.7 13.3l4.6 2.4"/>')
  ];

  document.querySelectorAll(".category-icon").forEach((item, index) => {
    item.innerHTML = categoryIcons[index % categoryIcons.length];
    item.setAttribute("aria-label", item.closest(".category-card")?.querySelector("h3")?.textContent || "Category");
  });

  const infoIcons = [
    iconSvg('<path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/>'),
    iconSvg('<path d="M7 4l3 3-2 2c1.2 2.4 3.1 4.3 5.5 5.5l2-2 3 3-1.5 3c-.4.8-1.4 1.2-2.3.9A18 18 0 0 1 4.1 9.3C3.8 8.4 4.2 7.4 5 7l2-1z"/>'),
    iconSvg('<path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>')
  ];
  document.querySelectorAll(".info-card .mini-icon").forEach((item, index) => {
    item.innerHTML = infoIcons[index % infoIcons.length];
    item.setAttribute("aria-label", item.closest(".info-card")?.querySelector("h3")?.textContent || "Contact info");
  });
}

function prepareSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(pointer: coarse)").matches;
  if (reduceMotion || isTouch) return;
  let current = window.scrollY;
  let target = window.scrollY;
  let ticking = false;
  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
  const animate = () => {
    current += (target - current) * 0.14;
    if (Math.abs(target - current) < 0.5) current = target;
    window.scrollTo(0, current);
    if (current !== target) requestAnimationFrame(animate);
    else ticking = false;
  };
  window.addEventListener("wheel", (event) => {
    if (event.ctrlKey || event.defaultPrevented) return;
    const active = document.activeElement;
    if (active && /^(TEXTAREA|SELECT|INPUT)$/i.test(active.tagName)) return;
    event.preventDefault();
    target = Math.max(0, Math.min(maxScroll(), target + event.deltaY));
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(animate);
    }
  }, { passive: false });
  window.addEventListener("scroll", () => {
    if (!ticking) {
      current = window.scrollY;
      target = window.scrollY;
    }
  }, { passive: true });
}

function prepareScrollEffects() {
  const sections = document.querySelectorAll("main > section, .brand-strip, footer");
  sections.forEach((section) => {
    section.classList.add("reveal-section");
    section.querySelectorAll(".listing-card, .category-card, .need-card, .info-card, .blog-card, .team-card, .testimonial, .service-link-grid a, .trend-card").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 70}ms`);
      item.classList.add("reveal-child");
    });
  });
  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
  sections.forEach((section) => observer.observe(section));
}

function wireFallbackNavigation() {
  const fallbackSelector = [
    "a[href='#']",
    ".media-actions button",
    ".filterbar button",
    ".pagination a",
    ".tabs button",
    ".dashboard-card button:not([data-auth-open])",
    ".dashboard-card a[href='#']",
    ".service-columns a[href='service.html']"
  ].join(",");

  document.querySelectorAll(fallbackSelector).forEach((item) => {
    if (item.closest(".auth-modal")) return;
    if (item.matches("[data-auth-open]")) return;
    if (item.matches("[data-tab]")) return;
    item.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "404.html";
    });
  });

  document.querySelectorAll(".footer li").forEach((item) => {
    if (item.querySelector("a")) return;
    item.setAttribute("role", "link");
    item.setAttribute("tabindex", "0");
    const go = () => { window.location.href = "404.html"; };
    item.addEventListener("click", go);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        go();
      }
    });
  });
}

function buildAuthModal() {
  if (document.querySelector(".auth-modal")) return;
  const modal = document.createElement("div");
  modal.className = "auth-modal";
  modal.innerHTML = `
    <div class="auth-card" role="dialog" aria-modal="true" aria-label="Stackly account">
      <div class="auth-art">
        <a class="auth-logo" href="index.html"><img src="assets/stackly-logo.svg" alt="Stackly"><span>Stackly</span></a>
      </div>
      <div class="auth-form">
        <button class="auth-close" type="button" data-auth-close aria-label="Close">×</button>
        <div class="auth-toggle auth-toggle-single">
          <button class="active" type="button" data-auth-tab="login">Sign In</button>
        </div>
        <form class="auth-panel active" data-auth-panel="login" novalidate>
          <h2>Sign in</h2>
          <p>Continue to your Stackly dashboard.</p>
          <div class="auth-alert" data-auth-message></div>
          <div class="form-grid">
            <div class="auth-field role-field"><span>Role</span><input name="role" type="hidden" required><div class="role-options"><button type="button" data-role-choice="buyer">User</button><button type="button" data-role-choice="seller">Admin</button></div><small></small></div>
            <label class="auth-field"><span>Email ID</span><input name="email" type="email" placeholder="name@example.com" required><small></small></label>
            <label class="auth-field password-field"><span>Password</span><input name="password" type="password" placeholder="Enter password" required><button type="button" data-password-toggle aria-label="Show password">◉</button><small></small></label>
          </div>
          <div class="auth-meta"><label><input name="terms" type="checkbox" required> I agree to Terms & Conditions</label><a href="404.html">Forgot password?</a></div>
          <button class="btn btn-orange auth-main-btn" type="submit">Sign In</button>
          <button class="google-btn" type="button" data-google-login><img src="assets/google-logo.svg" alt="">Continue with Google</button>
          <p class="auth-switch">Don't have an account? <button type="button" data-auth-tab="signup">Sign up</button></p>
        </form>
        <form class="auth-panel" data-auth-panel="signup" novalidate>
          <h2>Create account</h2>
          <p>Start buying or selling trusted services from Salem and beyond in minutes.</p>
          <div class="auth-alert" data-auth-message></div>
          <div class="form-grid">
            <div class="auth-field role-field"><span>Role</span><input name="role" type="hidden" required><div class="role-options"><button type="button" data-role-choice="buyer">User</button><button type="button" data-role-choice="seller">Admin</button></div><small></small></div>
            <label class="auth-field"><span>Name</span><input name="name" placeholder="Full name" required><small></small></label>
            <label class="auth-field"><span>Email ID</span><input name="email" type="email" placeholder="name@example.com" required><small></small></label>
            <label class="auth-field password-field"><span>Password</span><input name="password" type="password" placeholder="Create password" required><button type="button" data-password-toggle aria-label="Show password">◉</button><small></small></label>
            <label class="auth-field password-field"><span>Confirm Password</span><input name="confirm" type="password" placeholder="Confirm password" required><button type="button" data-password-toggle aria-label="Show password">◉</button><small></small></label>
          </div>
          <div class="auth-meta"><label><input name="terms" type="checkbox" required> I agree to Terms & Conditions</label></div>
          <button class="btn btn-orange auth-main-btn" type="submit">Create Account</button>
          <button class="google-btn" type="button" data-google-login><img src="assets/google-logo.svg" alt="">Continue with Google</button>
          <p class="auth-switch">Already have an account? <button type="button" data-auth-tab="login">Sign in</button></p>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const switchPanel = (target) => {
    modal.querySelectorAll("[data-auth-tab]").forEach((item) => {
      item.classList.toggle("active", item.dataset.authTab === target);
    });
    modal.querySelectorAll("[data-auth-panel]").forEach((item) => {
      item.classList.toggle("active", item.dataset.authPanel === target);
      clearFormState(item);
    });
  };

  document.querySelectorAll("[data-auth-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      switchPanel("login");
      modal.classList.add("open");
      const role = button.dataset.authRole;
      if (role) {
        modal.querySelector(`[data-auth-panel="login"] [data-role-choice="${role}"]`)?.click();
      }
    });
  });
  modal.querySelector("[data-auth-close]").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("open");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") modal.classList.remove("open");
  });
  modal.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.authTab));
  });
  modal.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      button.textContent = showing ? "◉" : "◎";
    });
  });
  modal.querySelectorAll("[data-role-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.closest(".role-field");
      const input = field?.querySelector("input[name='role']");
      if (!field || !input) return;
      input.value = button.dataset.roleChoice;
      field.querySelectorAll("[data-role-choice]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      field.classList.remove("has-error");
      const small = field.querySelector("small");
      if (small) small.textContent = "";
    });
  });
  modal.querySelectorAll("[data-google-login]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("form");
      const role = form.elements.role.value;
      if (!role) {
        setFieldError(form.elements.role, "Role is required");
        showFormMessage(form, "Please select a role before Google login.", "error");
        return;
      }
      const email = form.elements.email?.value?.trim() || (role === "seller" ? "admin@stackly.in" : "user@stackly.in");
      localStorage.setItem("stacklyDashboardEmail", email);
      window.location.href = role === "seller" ? "seller-dashboard.html" : "buyer-dashboard.html";
    });
  });
  modal.querySelectorAll(".auth-panel").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateAuthForm(form)) return;
      if (form.dataset.authPanel === "signup") {
        showFormMessage(form, "Account created successfully.", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
        return;
      }
      const role = form.elements.role.value;
      const email = form.elements.email.value.trim();
      localStorage.setItem("stacklyDashboardEmail", email);
      showFormMessage(form, "Login successful. Opening dashboard...", "success");
      setTimeout(() => {
        window.location.href = role === "seller" ? "seller-dashboard.html" : "buyer-dashboard.html";
      }, 700);
    });
  });
}

function validateAuthForm(form) {
  clearFormState(form);
  let valid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const required = ["role", "email", "password"];
  if (form.dataset.authPanel === "signup") required.push("name", "confirm");

  required.forEach((name) => {
    const field = form.elements[name];
    if (!field || !field.value.trim()) {
      setFieldError(field, "This field is required");
      valid = false;
    }
  });

  if (form.elements.email?.value && !emailPattern.test(form.elements.email.value.trim())) {
    setFieldError(form.elements.email, "Please enter a valid email address");
    valid = false;
  }

  if (form.elements.password?.value && form.elements.password.value.length < 6) {
    setFieldError(form.elements.password, "Wrong password. Use at least 6 characters");
    valid = false;
  }

  if (form.dataset.authPanel === "signup" && form.elements.password.value !== form.elements.confirm.value) {
    setFieldError(form.elements.confirm, "Passwords do not match");
    valid = false;
  }

  if (!form.elements.terms?.checked) {
    showFormMessage(form, "Please accept the Terms & Conditions.", "error");
    valid = false;
  }

  if (!valid) showFormMessage(form, "Please fix the highlighted fields.", "error");
  return valid;
}

function setFieldError(field, message) {
  if (!field) return;
  const wrapper = field.closest(".auth-field");
  wrapper?.classList.add("has-error");
  const small = wrapper?.querySelector("small");
  if (small) small.textContent = message;
}

function clearFormState(form) {
  form.querySelectorAll(".auth-field").forEach((field) => {
    field.classList.remove("has-error");
    const small = field.querySelector("small");
    if (small) small.textContent = "";
  });
  const message = form.querySelector("[data-auth-message]");
  if (message) {
    message.textContent = "";
    message.className = "auth-alert";
  }
}

function showFormMessage(form, text, type) {
  const message = form.querySelector("[data-auth-message]");
  if (!message) return;
  message.textContent = text;
  message.className = `auth-alert ${type}`;
}

function wireSocialLinks() {
  const icons = [
    {
      label: "Facebook",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v2H6v4h3v5h4v-5h3.2l.8-4h-4V9c0-.7.3-1 1-1z"/></svg>'
    },
    {
      label: "X",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 4h3.1l-6.7 7.7L21 20h-6.1l-4.8-5.7L4.6 20H1.5l7.2-8.3L1.2 4h6.2l4.3 5.2L16.8 4zm-1.1 14h1.7L6.5 5.9H4.7L15.7 18z"/></svg>'
    },
    {
      label: "Instagram",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5-2.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg>'
    },
    {
      label: "Google",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 10.2h8.2c.1.6.2 1.2.2 1.9 0 5-3.4 8.6-8.4 8.6a8.7 8.7 0 1 1 0-17.4c2.3 0 4.2.8 5.7 2.2l-2.3 2.3a4.9 4.9 0 0 0-3.4-1.3 5.5 5.5 0 1 0 0 11c2.7 0 4.4-1.4 4.9-3.6h-4.9v-3.7z"/></svg>'
    },
    {
      label: "YouTube",
      svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C15 3.7 12 3.7 12 3.7s-3 0-6.3.2c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S2.2 9.1 2.2 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 6.1.2 6.1.2s3 0 6.3-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM10.2 15.1V8.6l5.8 3.3-5.8 3.2z"/></svg>'
    }
  ];
  document.querySelectorAll(".socials").forEach((group) => {
    group.querySelectorAll("a").forEach((link, index) => {
      const icon = icons[index % icons.length];
      link.setAttribute("href", "404.html");
      link.setAttribute("aria-label", icon.label);
      link.innerHTML = icon.svg;
    });
  });
  document.querySelectorAll(".socials a").forEach((link) => {
    link.setAttribute("href", "404.html");
  });
}

function wireDashboard() {
  updateDashboardLinks();
  updateDashboardEmail();
  setupDashboardMobile();
  document.querySelectorAll("[data-logout]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "index.html";
    });
  });
}

function setupDashboardMobile() {
  const shell = document.querySelector(".dashboard-shell");
  const topbar = shell?.querySelector(".dashboard-topbar");
  if (!shell || !topbar || topbar.querySelector("[data-dashboard-menu]")) return;
  const sidebar = shell.querySelector(".dashboard-sidebar");
  const mobileBrand = document.createElement("a");
  mobileBrand.className = "dashboard-mobile-brand";
  mobileBrand.href = "index.html";
  mobileBrand.innerHTML = `<img src="assets/stackly-logo.svg" alt="Stackly"><span>Stackly</span>`;
  const button = document.createElement("button");
  button.className = "icon-btn dashboard-menu-btn";
  button.type = "button";
  button.setAttribute("data-dashboard-menu", "");
  button.setAttribute("aria-label", "Open dashboard menu");
  button.innerHTML = "&#9776;";
  topbar.prepend(button);
  topbar.prepend(mobileBrand);
  if (sidebar && !sidebar.querySelector("[data-dashboard-close]")) {
    const close = document.createElement("button");
    close.className = "dashboard-close-btn";
    close.type = "button";
    close.setAttribute("data-dashboard-close", "");
    close.setAttribute("aria-label", "Close dashboard menu");
    close.innerHTML = "&times;";
    sidebar.prepend(close);
  }
  const closeDashboard = () => {
    shell.classList.remove("dashboard-open");
    document.body.classList.remove("menu-lock");
    button.innerHTML = "&#9776;";
    button.setAttribute("aria-label", "Open dashboard menu");
  };
  button.addEventListener("click", () => {
    const open = shell.classList.toggle("dashboard-open");
    document.body.classList.toggle("menu-lock", open);
    button.innerHTML = open ? "&times;" : "&#9776;";
    button.setAttribute("aria-label", open ? "Close dashboard menu" : "Open dashboard menu");
  });
  shell.querySelector("[data-dashboard-close]")?.addEventListener("click", closeDashboard);
  shell.querySelectorAll(".dashboard-nav a").forEach((link) => {
    link.addEventListener("click", closeDashboard);
  });
}

function updateDashboardEmail() {
  const role = document.body.classList.contains("seller-theme") || document.body.dataset.role === "seller" ? "seller" : "buyer";
  const fallback = role === "seller" ? "admin@stackly.in" : "user@stackly.in";
  const email = localStorage.getItem("stacklyDashboardEmail") || fallback;
  document.querySelectorAll(".login-email").forEach((item) => {
    item.textContent = email;
  });
  document.querySelectorAll(".avatar-sm").forEach((item) => {
    item.textContent = avatarInitial(email);
  });
}

function avatarInitial(email) {
  return (email || "U").trim().charAt(0).toUpperCase() || "U";
}

function dashboardItems(role) {
  if (role === "seller") {
    return [
      ["Dashboard", "seller-dashboard.html", "&#9638;"],
      ["My Gigs", "seller-gigs.html", "&#9635;"],
      ["My Buyers", "seller-buyers.html", "&#9817;"],
      ["Wallet", "seller-wallet.html", "&#9636;"],
      ["Files", "seller-files.html", "&#9639;"],
      ["My Reviews", "seller-reviews.html", "&#9831;"],
      ["Messages", "seller-messages.html", "&#9783;"],
      ["Notifications", "seller-notifications.html", "&#9826;"],
      ["Transactions", "seller-transactions.html", "&#8596;"],
      ["Payouts", "seller-payouts.html", "&#9873;"],
      ["Earnings", "seller-earnings.html", "&#9817;"],
      ["Settings", "seller-settings.html", "&#9881;"]
    ];
  }
  return [
    ["Dashboard", "buyer-dashboard.html", "&#9638;"],
    ["My Purchase", "buyer-purchase.html", "&#9635;"],
    ["My Sellers", "buyer-sellers.html", "&#9817;"],
    ["Favourites", "buyer-favourites.html", "&#9825;"],
    ["Wallet", "buyer-wallet.html", "&#9636;"],
    ["My Reviews", "buyer-reviews.html", "&#9831;"],
    ["Messages", "buyer-messages.html", "&#9783;"],
    ["Notifications", "buyer-notifications.html", "&#9826;"],
    ["Transactions", "buyer-transactions.html", "&#8596;"],
    ["My Profile", "buyer-profile.html", "&#9817;"],
    ["Settings", "buyer-settings.html", "&#9881;"]
  ];
}

function updateDashboardLinks() {
  const shell = document.querySelector(".dashboard-shell");
  if (!shell) return;
  const role = document.body.classList.contains("seller-theme") ? "seller" : "buyer";
  const current = location.pathname.split("/").pop() || `${role}-dashboard.html`;
  const items = dashboardItems(role);
  const nav = shell.querySelector(".dashboard-nav");
  if (!nav) return;
  nav.innerHTML = items.map(([label, href, icon]) => `
    <a class="${href === current ? "active" : ""}" href="${href}"><span>${icon}</span> ${label}</a>
  `).join("") + `<a class="logout" href="#" data-logout><span>&#8617;</span> Logout</a>`;
}

function renderAutoDashboard() {
  const root = document.querySelector("[data-dashboard-root]");
  if (!root) return;
  const role = document.body.dataset.role || "buyer";
  const page = document.body.dataset.page || "dashboard";
  document.body.classList.add("dashboard-page", role === "seller" ? "seller-theme" : "buyer-theme");
  root.innerHTML = `
    <div class="dashboard-shell">
      <aside class="dashboard-sidebar">
        <div class="dashboard-logo"><a href="index.html"><img src="assets/stackly-logo.svg" alt="Stackly"></a></div>
        <nav class="dashboard-nav"></nav>
      </aside>
      <main class="dashboard-main">
        ${dashboardTopbar(role)}
        <section class="dashboard-content">${renderDashboardPage(role, page)}</section>
      </main>
    </div>
  `;
  updateDashboardLinks();
}

function dashboardTopbar(role) {
  const email = localStorage.getItem("stacklyDashboardEmail") || (role === "seller" ? "admin@stackly.in" : "user@stackly.in");
  const label = role === "seller" ? "Admin Dashboard" : "User Dashboard";
  return `
    <div class="dashboard-topbar">
      <span class="wallet-chip">&bull; Wallet Balance : $6658</span>
      <div class="dashboard-actions">
        <a class="tab" href="${role === "seller" ? "seller-dashboard.html" : "buyer-dashboard.html"}">${label}</a>
        <span class="login-email">${email}</span>
        <span class="avatar-sm">${avatarInitial(email)}</span>
      </div>
    </div>
  `;
}

function renderDashboardPage(role, page) {
  const buyerPages = {
    purchase: renderPurchase,
    sellers: renderSellers,
    favourites: renderFavourites,
    wallet: renderWallet,
    reviews: renderReviews,
    messages: renderMessages,
    notifications: renderNotifications,
    transactions: renderTransactions,
    profile: renderProfile,
    settings: renderSettings
  };
  const sellerPages = {
    gigs: () => renderPurchase("My Gigs"),
    buyers: () => renderSellers("My Buyers"),
    wallet: renderWallet,
    files: () => renderFilesPage("Files"),
    reviews: renderReviews,
    messages: renderMessages,
    notifications: renderNotifications,
    transactions: renderTransactions,
    payouts: () => renderWallet("Payouts"),
    earnings: () => renderTransactions("Earnings"),
    settings: renderSettings
  };
  const map = role === "seller" ? sellerPages : buyerPages;
  return (map[page] || (() => `<h1>${titleCase(page)}</h1><div class="dashboard-card profile-text">This Stackly dashboard page is ready.</div>`))();
}

function titleCase(text) {
  return text.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderPurchase(title = "My Purchases") {
  return `
    <h1>${title}</h1>
    <div class="dash-toolbar"><div class="dash-filter-group"><button class="dash-select">22 Jun 26 - 22 Jun 26</button><button class="dash-select">By Status</button><button class="dash-select">Seller</button><button class="dash-select">Payment Method</button></div><input class="dash-input" placeholder="Search"></div>
    <div class="dash-table-wrap"><table class="dash-table"><thead><tr><th>ID</th><th>Uploaded For</th><th>Purchase On</th><th>Seller</th><th>Feedback</th><th>Cancel</th><th>Amount</th><th>Payment Mode</th><th>Status</th><th>Action</th></tr></thead><tbody>
      ${serviceRows().map((item, index) => `<tr><td>#PR${120 - index}</td><td><div class="table-service"><img src="${item.img}" alt="">${item.title}</div></td><td>${item.date}</td><td>${item.seller}</td><td>${index % 3 ? "Pending" : "Write Review"}</td><td>Cancel</td><td>$${[2000,2600,1800,2700][index % 4]}</td><td>${["Wallet","Paypal","COD"][index % 3]}</td><td><span class="status-pill ${["","blue","yellow","green"][index % 4]}">${["New","Processing","Pending","Completed"][index % 4]}</span></td><td>⊙</td></tr>`).join("")}
    </tbody></table></div><div class="pager"><a>‹</a><a class="active">1</a><a>›</a></div>
  `;
}

function renderSellers(title = "My Sellers") {
  const sellers = [
    ["Sophia Chen", "UI/UX Designer", "team-2.webp", "Switzerland", 45],
    ["Ethan Reynolds", "Software Engineer", "team-3.webp", "Malaysia", 12],
    ["Isabella Martinez", "Cybersecurity Analyst", "team-6.webp", "USA", 15],
    ["Liam Carter", "FinTech Innovator", "team-5.webp", "Turkey", 22],
    ["Sam Taylor", "Software Engineer", "team-8.webp", "Malaysia", 12],
    ["Ivia Rivera", "Finance Manager", "team-4.webp", "Singapore", 21],
    ["Noah Pate", "Data Analyst", "team-7.webp", "UAE", 39],
    ["Ava Thompson", "Crypto", "team-1.webp", "Switzerland", 22],
    ["James Lawson", "Design", "team-9.webp", "Uruguay", 16]
  ];
  return `<h1>${title}</h1><div class="seller-card-grid">${sellers.map((seller) => `<article class="dashboard-card seller-mini-card"><img src="assets/${seller[2]}" alt="${seller[0]}"><h3>${seller[0]}</h3><p>${seller[1]}</p><div class="row-sub">${seller[3]} <span class="eyebrow">•</span> Total Gigs : ${seller[4]}</div></article>`).join("")}</div><div class="center" style="margin-top:28px"><button class="btn btn-dark">Load More</button></div>`;
}

function renderFavourites() {
  return `<div class="dash-toolbar"><h1>Favourites</h1><button class="btn btn-orange">Remove All</button></div><div class="fav-grid">${serviceRows().slice(0, 9).map((item, index) => `
    <article class="listing-card"><div class="media"><img src="${item.img}" alt="${item.title}"><div class="media-actions"><button class="icon-btn">♥</button></div></div><div class="listing-body"><div class="meta-line"><span>${item.cat}</span></div><h3>${item.title}</h3><div class="card-foot"><span class="price">$${[780,350,830,650,750,800,680,960,850][index]}</span><span class="delivery">Delivery in ${index === 1 ? "2 days" : "1 day"}</span></div></div></article>
  `).join("")}</div><div class="center" style="margin-top:28px"><button class="btn btn-dark">Load More</button></div>`;
}

function renderWallet(title = "Wallet") {
  return `<h1>${title}</h1><div class="wallet-summary"><div class="wallet-metrics"><div><p>Amount in Wallet</p><strong>$1,302.50</strong></div><div><p>Total Credit</p><strong>$9,292.50</strong></div><div><p>Total Debit</p><strong>$1,541.21</strong></div><div><p>Withdrawn</p><strong>$8,874.21</strong></div></div><div><button class="btn btn-dark">Add Payment</button> <button class="btn btn-orange">Withdraw</button></div></div><div class="dash-toolbar"><div class="dash-filter-group"><button class="dash-select">Reason</button><button class="dash-select">Transaction Type</button></div></div>${transactionTable("wallet")}`;
}

function renderReviews() {
  const reviews = [["Aaron Markram", "Exceptional Service!", "John provided top-notch service, exceeding our expectations.", "team-3.webp"], ["Betty Cheng", "Outstanding Work!", "Sarah's expertise in graphic design brought our vision to life.", "team-6.webp"], ["Oliver", "Great Experience!", "Creative, professional, and delivered on time.", "team-2.webp"], ["Richard", "Highly!", "Mike was a pleasure to work with. 5 stars!", "team-5.webp"]];
  return `<h1>Reviews</h1><div class="dash-toolbar"><button class="dash-select">22 Jun 26 - 22 Jun 26</button></div><div class="review-list">${reviews.map((review) => `<article class="dashboard-card review-item"><img class="avatar-photo" src="assets/${review[3]}" alt="${review[0]}"><div><h3>${review[0]}</h3><div class="stars">★★★★★ <span class="row-sub">5.0 2 days ago</span></div><div class="row-title">${review[1]}</div><p>${review[2]}</p></div><a class="negative" href="#">⌫</a></article>`).join("")}</div><div class="center" style="margin-top:28px"><button class="btn btn-dark">Load more</button></div>`;
}

function renderMessages() {
  return `<h1>Messages</h1><div class="message-layout"><section class="dashboard-card chat-list"><div class="panel-head"><h2>All Chats</h2></div><div class="chat-search"><input class="dash-input" placeholder="Search" style="width:100%"></div>${["Mark Williams","Elizabeth Sosa","Michael Howard","Horace Keene","Hollis Tran"].map((name, index) => `<div class="chat-person ${index === 0 ? "active" : ""}"><img class="avatar-photo" src="assets/team-${index + 1}.webp" alt=""><div><div class="row-title">${name}</div><div class="row-sub">${index === 1 ? "Typing..." : "Have you called them?"}</div></div><small>${index === 1 ? "Yesterday" : "10:20 PM"}</small></div>`).join("")}</section><section class="dashboard-card chat-window"><div class="chat-head"><div class="profile-left"><img class="avatar-photo" src="assets/team-5.webp" alt=""><div><h3>Mark Williams</h3><p>Last Seen at 07:15 PM</p></div></div><div><button class="round-btn">⌕</button> <button class="round-btn">⋮</button></div></div><div class="chat-body"><div><b>Mark Williams</b><span class="row-sub"> 8:16 PM</span><div class="bubble">Hello @Alex Thank you for the beautiful web design ahead schedule.</div></div><div class="bubble right">▶ 0:05</div><div><b>Mark Williams</b><span class="row-sub"> 8:16 PM</span><div class="bubble">https://www.youtube.com/watch?v=GCmL3mS0Psk</div></div></div><div class="chat-compose"><input class="dash-input" placeholder="Type your message here..."><button class="btn btn-orange">➤</button></div></section></div>`;
}

function renderNotifications() {
  const notes = [["John", "Your Order Has Been Confirmed!", "Your order for Logo Design Service has been successfully placed.", "team-3.webp"], ["Michael", "Your Order Has Been Delivered!", "The seller has submitted the completed work.", "team-2.webp"], ["Emma", "Your Payment successfully!", "Your payment has been successfully processed.", "team-6.webp"], ["Daniel", "Your Order Has Been Confirmed!", "The seller will begin working soon.", "team-5.webp"], ["Wick", "Your Order Has Been Confirmed!", "Your order has been successfully placed.", "team-7.webp"]];
  return `<div class="dash-toolbar"><h1>Notifications</h1><div class="dash-filter-group"><button class="dash-select">Mark all as read</button><button class="dash-select negative">Delete all</button></div></div><button class="dash-select" style="margin-bottom:30px">Jan 2024</button><div class="notification-page-list">${notes.map((note, index) => `<article class="dashboard-card notification-card"><img class="avatar-photo" src="assets/${note[3]}" alt=""><div><h3>${note[0]}, <span class="row-sub">${note[1]}</span></h3><p>${note[2]}</p></div><div>${index === 0 ? '<button class="btn btn-dark">Decline</button> <button class="btn btn-orange">Accept</button>' : ""} <span class="row-sub">2 mins ago</span></div></article>`).join("")}</div>`;
}

function renderTransactions(title = "Transactions") {
  return `<h1>${title}</h1><div class="dash-grid-4" style="margin-bottom:28px"><div class="dashboard-card metric-card"><span class="metric-icon">↔</span><div><p>Total Transactions</p><strong>325</strong><div class="change-box"><span class="positive">↗ 6.78%</span> from last month</div></div></div><div class="dashboard-card metric-card"><span class="metric-icon orange">↑</span><div><p>Total Credits</p><strong>$25,850.00</strong><div class="change-box"><span class="positive">↗ 4.29%</span> from last month</div></div></div><div class="dashboard-card metric-card"><span class="metric-icon red">↓</span><div><p>Total Debits</p><strong>$15,500.00</strong><div class="change-box"><span class="positive">↗ 12.8%</span> from last month</div></div></div><div class="dashboard-card metric-card"><span class="metric-icon blue">$</span><div><p>Pending Payments</p><strong>$1,800.00</strong><div class="change-box"><span class="positive">↗ 7.36%</span> from last month</div></div></div></div><h2>Transactions List</h2><div class="dash-toolbar"><div class="dash-filter-group"><button class="dash-select">Transaction Type</button><button class="dash-select">03-04-2025</button></div><input class="dash-input" placeholder="Search"></div>${transactionTable("transactions")}<div class="pager"><a>‹</a><a class="active">1</a><a>›</a></div>`;
}

function renderProfile() {
  return `<h1>My Profile</h1><section class="dashboard-card profile-hero"><div class="profile-left"><img src="assets/team-7.webp" alt=""><div><h3>Adrian Revolt</h3><p>California, US</p><div class="stars">★ <span class="row-sub">Ratings 5.0 (45 Reviews)</span></div></div></div><button class="btn btn-dark">Edit Profile</button></section>${profileSection("Personal Details", [["Name","David Wilson"],["Email","davidwilson@example.com"],["Phone","+1(452) 125-6789"],["Date","25 Jan 2024"],["Speaks","English, Portuguese"],["Member Since","25 Jan 2024"]])}${profileSection("Address Details", [["Country","United States"],["City","California"],["State","Los Angeles"],["Address Line","1234 Sunset Blvd, Apt 56B"],["Postal Code","90026"]])}<section class="dashboard-card profile-section"><div class="panel-head"><h2>About Me</h2></div><div class="profile-text"><p>Hello, Greetings! My name is Adrian, a professional service buyer who uses Stackly to connect with trusted digital experts. I love what I do and value reliable project delivery.</p></div></section>`;
}

function profileSection(title, items) {
  return `<section class="dashboard-card profile-section"><div class="panel-head"><h2>${title}</h2></div><div class="profile-grid">${items.map((item) => `<div><b>${item[0]}</b><p>${item[1]}</p></div>`).join("")}</div></section>`;
}

function renderSettings() {
  const input = (label, type = "input") => `<label>${label} *${type === "textarea" ? '<textarea placeholder="Type here..."></textarea>' : '<input>'}</label>`;
  return `<h1>Settings</h1><section class="dashboard-card settings-panel"><div class="settings-tabs"><button class="btn btn-dark">Profile</button><button class="tab">Account Settings</button></div><div class="settings-box"><h2>Personal Information</h2><div class="settings-form">${input("First Name")}${input("Last Name")}${input("Email")}${input("Phone Number")}${input("Date Of Birth")}${input("Gender")}${input("Country")}${input("State")}${input("City")}${input("Address")}</div></div><div class="settings-box"><h2>Change Email</h2><div class="settings-form">${input("Current Email")}${input("New Email")}${input("Confirm Email")}</div></div><div class="settings-box"><h2>Other Information</h2><div class="settings-form">${input("Job Title")}${input("Language Known")}${input("Tags")}${input("About You","textarea")}${input("Why Work With Me","textarea")}</div></div><div class="settings-actions"><button class="tab">Cancel</button><button class="btn btn-orange">Save Changes</button></div></section>`;
}

function renderFilesPage(title) {
  return `<h1>${title}</h1><section class="dashboard-card"><div class="panel-head"><h2>Files</h2><a href="#">View All</a></div><div class="file-list">${["Document.pdf","Logo.png","Worklog.png","Alter.png","Reportfile.png"].map((file, index) => `<div class="file-row"><span class="file-type">${file.split(".").pop().toUpperCase()}</span><div><div class="row-title">${file}</div><div class="row-sub">Update on: ${11 - index} Jan 2025</div></div><span>⇩</span></div>`).join("")}</div></section>`;
}

function transactionTable(type) {
  return `<div class="dash-table-wrap"><table class="dash-table"><thead><tr><th>${type === "wallet" ? "ID" : "Transaction ID"}</th><th>Uploaded For</th><th>${type === "wallet" ? "Payment Gateway" : "Date"}</th><th>${type === "wallet" ? "Date & Time" : "Type"}</th><th>Type</th><th>Amount</th><th>Action</th></tr></thead><tbody>${serviceRows().map((item, index) => `<tr><td>#${type === "wallet" ? "WT" : "TXN-20250321-00123"}${120 - index}</td><td><div class="table-service"><img src="${item.img}" alt="">${item.title}</div></td><td>${type === "wallet" ? ["Paypal","Stripe"][index % 2] : item.date}</td><td>${type === "wallet" ? "22 May 2025 10:50PM" : (index % 2 ? '<span class="status-pill green">credit</span>' : '<span class="status-pill red">Debit</span>')}</td><td><span class="status-pill ${index % 2 ? "green" : "red"}">${index % 2 ? "Credit" : "Debit"}</span></td><td>${index % 2 ? "+" : "-"}$${[154,1154,6547,1454,545][index % 5]}</td><td>⊙</td></tr>`).join("")}</tbody></table></div>`;
}

function serviceRows() {
  return [
    { title: "I will do designing and executing targeted email campaigns", img: "assets/service-9.webp", cat: "Software Development", date: "22 Mar 2025", seller: "Isla Harrington" },
    { title: "I will develop openai, dalle, chat gpt app for mobile", img: "assets/service-3.webp", cat: "Ecommerce-Seo", date: "18 Mar 2025", seller: "Ethan Mercer" },
    { title: "I will do professional lifestyle and product photography", img: "assets/service-2.webp", cat: "Music & Audio", date: "06 Mar 2025", seller: "Mira Caldwell" },
    { title: "Embedded Android & AOSP customizations...", img: "assets/service-4.webp", cat: "Programming & Tech", date: "26 Feb 2025", seller: "Julian Hayes" },
    { title: "I will do implementing chatbots on websites or messaging apps", img: "assets/service-5.webp", cat: "Chatbot Integration", date: "17 Feb 2025", seller: "Maxwell Thornton" },
    { title: "I will do integrating AR elements into marketing strategies for customers...", img: "assets/service-6.webp", cat: "AR Marketing", date: "02 Feb 2025", seller: "Tessa Langley" },
    { title: "Managing and optimizing paid advertising campaigns for search...", img: "assets/service-7.webp", cat: "PPC Advertising", date: "29 Jan 2025", seller: "Noelle Vance" },
    { title: "I will do collaborating with influencers to promote products an...", img: "assets/service-8.webp", cat: "Influence Marketing", date: "15 Jan 2025", seller: "Caleb Sutton" },
    { title: "I will do creating and promoting video content to engage audiences", img: "assets/home-listing-6.webp", cat: "Email Marketing", date: "05 Jan 2025", seller: "Selene Draper" }
  ];
}
