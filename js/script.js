//Togle class active hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// togle clas active search form
const searchFrom = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchFrom.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

//klik diluar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchFrom.contains(e.target)) {
    searchFrom.classList.remove("active");
  }
});

// Fungsi Pencarian Real-Time
document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector("#search-box");

  searchBox.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(keyword) ? "" : "none";
    });
  });
});

// modal box
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const openButtons = document.querySelectorAll(".item-detail-button");
  const closeButtons = document.querySelectorAll(".close-icon");
  const modals = document.querySelectorAll(".modal");
  const swiperInstances = {};

  // Fungsi untuk buka modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = "flex";

    setTimeout(() => {
      if (!swiperInstances[modalId]) {
        const swiperContainer = modal.querySelector(".swiper");
        swiperInstances[modalId] = new Swiper(swiperContainer, {
          loop: true,
          effect: "creative",
          creativeEffect: {
            prev: { translate: [0, 0, -1000], scale: 0.8 },
            next: { translate: [0, 0, -1000], scale: 0.8 },
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: modal.querySelector(".swiper-pagination"),
            clickable: true,
          },
          navigation: {
            nextEl: modal.querySelector(".swiper-button-next"),
            prevEl: modal.querySelector(".swiper-button-prev"),
          },
        });
      } else {
        swiperInstances[modalId].update();
        swiperInstances[modalId].autoplay.start();
      }
    }, 100);
  }

  // Klik tombol lihat detail
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-modal-id");
      openModal(modalId);
    });
  });

  // Klik tombol close
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = btn.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Klik di luar modal
  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
