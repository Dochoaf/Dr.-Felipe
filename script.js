const navbar = document.querySelector(".navbar");
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");
const overlay = document.getElementById("menuOverlay");

// SCROLL NAVBAR
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ABRIR / CERRAR MENÚ
toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
    toggle.classList.toggle("active");
    overlay.classList.toggle("active");
});

// 🔥 CLICK EN LINKS (CLAVE TOTAL)
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // 👉 SOLO prevenir si es enlace interno (#)
        if (href.startsWith("#")) {
            e.preventDefault();

            const target = document.querySelector(href);

            // cerrar menú
            nav.classList.remove("active");
            toggle.classList.remove("active");
            overlay.classList.remove("active");

            setTimeout(() => {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }, 200);
        }

        // 👉 SI NO es interno, deja que navegue normal
    });
});

// CERRAR AL HACER CLICK FUERA
document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("active");
        toggle.classList.remove("active");
        overlay.classList.remove("active");
    }
});


// ==========================
// ANIMACIONES SCROLL PRO
// ==========================

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, {
    threshold: 0.25
});

reveals.forEach(el => observer.observe(el));

/* PAGINA INICIAL CUANDO ABRO EL LINK */
window.addEventListener("load", () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});


// ==========================
// FORMULARIO CONTACTO
// ==========================

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = form.nombre.value;
    const email = form.email.value;
    const telefono = form.telefono.value;
    const mensaje = form.mensaje.value;

    const texto = `Hola, quiero agendar una cita:
Nombre: ${nombre}
Correo: ${email}
Teléfono: ${telefono}
Mensaje: ${mensaje}`;

    const url = `https://wa.me/573108941600?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");

    form.reset();
});


/* ///////////////////////// */
/* SUB SECCIONES DEL SERVICIO */
/* ///////////////////////// */

const cards = document.querySelectorAll(".service-card");
const panel = document.getElementById("servicePanel");
const contents = document.querySelectorAll(".panel-content");

let activeService = null;

function isMobile() {
    return window.innerWidth <= 768;
}

/* =========================
   LIMPIAR MOBILE
========================= */
function closeMobileDetails() {
    document.querySelectorAll(".mobile-detail").forEach(el => el.remove());
    cards.forEach(c => c.classList.remove("active"));
    activeService = null;
}

/* =========================
   CLICK CARDS
========================= */
cards.forEach(card => {

    card.addEventListener("click", () => {

        const service = card.dataset.service;

        /* =========================
           MOBILE (ACORDEÓN)
        ========================= */
        if (isMobile()) {

            const existing = card.nextElementSibling;

            // si ya está abierto → cerrar
            if (existing && existing.classList.contains("mobile-detail")) {
                existing.remove();
                card.classList.remove("active");
                activeService = null;
                return;
            }

            // cerrar otros
            closeMobileDetails();

            const content = document.querySelector(
                `.panel-content[data-content="${service}"]`
            );

            if (!content) return;

            const clone = content.cloneNode(true);
            clone.classList.add("mobile-detail");

            card.insertAdjacentElement("afterend", clone);

            // animación simple de apertura
            requestAnimationFrame(() => {
                clone.style.maxHeight = clone.scrollHeight + "px";
                clone.style.opacity = "1";
            });

            setTimeout(() => {
                clone.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 50);

            card.classList.add("active");
            activeService = service;

            return;
        }

        

        /* =========================
           DESKTOP (PANEL LATERAL)
        ========================= */

        // toggle mismo servicio
        if (activeService === service) {
            panel.classList.remove("active");
            cards.forEach(c => c.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));
            activeService = null;
            return;
        }

        activeService = service;

        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        panel.classList.add("active");

        contents.forEach(c => {
            c.classList.toggle("active", c.dataset.content === service);
        });

        setTimeout(() => {
            panel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);

    });

});

/* =========================
   RESIZE RESET
========================= */
window.addEventListener("resize", () => {
    if (!isMobile()) {
        closeMobileDetails();
    }
});


// auto active mobile

function setupAutoActive() {

    const cards = document.querySelectorAll(
        ".service-card, .contact-card"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("auto-active");
            } else {
                entry.target.classList.remove("auto-active");
            }

        });
    }, {
        rootMargin: "-48% 0px -48% 0px",
        threshold: 0
    });

    cards.forEach(card => observer.observe(card));
}

// 🔥 Ejecutar SIEMPRE (sin if)
setupAutoActive();




/* =========================
   HERO SLIDER PREMIUM
========================= */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 4500);






/* ==================================
   SLIDER NUESTRA CLÍNICA
================================== */

const clinicSlides =
document.querySelectorAll(".clinic-slide");

const clinicDots =
document.querySelectorAll(".clinic-dots .dot");

let clinicIndex = 0;

/* MOSTRAR IMAGEN */

function showClinicSlide(index){

    clinicSlides.forEach(slide =>
        slide.classList.remove("active")
    );

    clinicDots.forEach(dot =>
        dot.classList.remove("active")
    );

    clinicSlides[index].classList.add("active");
    clinicDots[index].classList.add("active");

    clinicIndex = index;
}

/* AUTO PLAY */

function nextClinicSlide(){

    clinicIndex++;

    if(clinicIndex >= clinicSlides.length){
        clinicIndex = 0;
    }

    showClinicSlide(clinicIndex);
}

/* CAMBIO AUTOMÁTICO */

let clinicInterval =
setInterval(nextClinicSlide, 5000);

/* CLICK EN LOS DOTS */

clinicDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showClinicSlide(index);

        /* reinicia el temporizador */

        clearInterval(clinicInterval);

        clinicInterval =
        setInterval(nextClinicSlide, 5000);

    });

});



/* ==================================
   SWIPE MOBILE
================================== */

let touchStartX = 0;
let touchEndX = 0;

const clinicSlider =
document.querySelector(".clinic-slider");

clinicSlider.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

clinicSlider.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe() {

    const distance = touchStartX - touchEndX;

    /* SWIPE IZQUIERDA */

    if(distance > 50){

        clinicIndex++;

        if(clinicIndex >= clinicSlides.length){
            clinicIndex = 0;
        }

        showClinicSlide(clinicIndex);
    }

    /* SWIPE DERECHA */

    if(distance < -50){

        clinicIndex--;

        if(clinicIndex < 0){
            clinicIndex = clinicSlides.length - 1;
        }

        showClinicSlide(clinicIndex);
    }

}