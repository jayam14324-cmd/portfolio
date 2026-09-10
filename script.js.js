/* =========================================================
   STUDENT PORTFOLIO WEBSITE
   MAIN JAVASCRIPT - UPDATED
========================================================= */


/* =========================================================
   1. DOM ELEMENTS
========================================================= */

const body = document.body;
const header = document.querySelector(".header");
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const typingText = document.getElementById("typingText");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   2. EMAILJS CONFIGURATION
========================================================= */

const EMAILJS_PUBLIC_KEY = "GSvVIphnSDbzd8KFw";
const EMAILJS_SERVICE_ID = "service_ufw1wba";
const EMAILJS_TEMPLATE_ID = "template_kqzt62v";


/* =========================================================
   3. INITIALIZE EMAILJS
========================================================= */

function initializeEmailJS() {

    if (typeof emailjs === "undefined") {

        console.error(
            "EmailJS library is not loaded."
        );

        return false;
    }

    try {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

        console.log(
            "EmailJS initialized successfully."
        );

        return true;

    } catch (error) {

        console.error(
            "EmailJS initialization error:",
            error
        );

        return false;
    }
}


initializeEmailJS();


/* =========================================================
   4. CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   5. DARK / LIGHT MODE
========================================================= */

function setThemeIcon() {

    if (!themeBtn) return;

    const icon =
        themeBtn.querySelector("i");

    if (!icon) return;


    if (body.classList.contains("dark-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeBtn.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeBtn.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "dark") {

    body.classList.add(
        "dark-mode"
    );

}


setThemeIcon();


/* Theme button */

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "portfolio-theme",
                isDark
                    ? "dark"
                    : "light"
            );


            setThemeIcon();

        }
    );

}


/* =========================================================
   6. MOBILE NAVIGATION
========================================================= */

if (menuBtn && navbar) {

    menuBtn.addEventListener(
        "click",
        () => {

            navbar.classList.toggle(
                "open"
            );


            const icon =
                menuBtn.querySelector("i");


            if (
                navbar.classList.contains(
                    "open"
                )
            ) {

                if (icon) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                }


                menuBtn.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }


                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }
    );

}


/* =========================================================
   7. CLOSE MOBILE MENU
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    !navbar ||
                    !menuBtn
                ) return;


                navbar.classList.remove(
                    "open"
                );


                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }
);


/* =========================================================
   8. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !navbar ||
            !menuBtn
        ) return;


        const clickedInsideNavbar =
            navbar.contains(
                event.target
            );


        const clickedMenu =
            menuBtn.contains(
                event.target
            );


        if (
            !clickedInsideNavbar &&
            !clickedMenu &&
            navbar.classList.contains(
                "open"
            )
        ) {

            navbar.classList.remove(
                "open"
            );


            const icon =
                menuBtn.querySelector(
                    "i"
                );


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   9. HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {

    if (!header) return;


    if (window.scrollY > 50) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll
);


handleHeaderScroll();


/* =========================================================
   10. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute(
                    "id"
                );


            if (
                scrollPosition >=
                    sectionTop &&
                scrollPosition <
                    sectionTop +
                    sectionHeight
            ) {

                navLinks.forEach(
                    link => {

                        link.classList.remove(
                            "active"
                        );


                        const target =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            target ===
                            `#${sectionId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   11. TYPING ANIMATION
========================================================= */

const typingWords = [

    "Data Analyst",

    "Accounting",

    "Tech Enthusiast",

    "Problem Solver",

    "Lifelong Learner"

];


let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!typingText) return;


    const currentWord =
        typingWords[wordIndex];


    if (!isDeleting) {

        characterIndex++;


        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentWord.length
        ) {

            isDeleting = true;


            setTimeout(
                typeEffect,
                1500
            );


            return;
        }


    } else {

        characterIndex--;


        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (
            characterIndex === 0
        ) {

            isDeleting = false;


            wordIndex =
                (
                    wordIndex + 1
                ) %
                typingWords.length;

        }

    }


    const typingSpeed =
        isDeleting
            ? 50
            : 90;


    setTimeout(
        typeEffect,
        typingSpeed
    );

}


if (typingText) {

    setTimeout(
        typeEffect,
        1000
    );

}


/* =========================================================
   12. BACK TO TOP BUTTON
========================================================= */

function handleBackToTop() {

    if (!backToTop) return;


    if (window.scrollY > 500) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop
);


handleBackToTop();


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   13. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(

        ".section-heading, " +
        ".about-grid, " +
        ".timeline-item, " +
        ".skill-category, " +
        ".project-card, " +
        ".certificate-card, " +
        ".achievement-card, " +
        ".resume-box, " +
        ".contact-grid"

    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "active"
            );

        }
    );

}


/* =========================================================
   14. SKILL BAR ANIMATION
========================================================= */

const progressBars =
    document.querySelectorAll(
        ".progress span"
    );


if ("IntersectionObserver" in window) {

    const skillObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const bar =
                                entry.target;


                            const width =
                                bar.style.width;


                            bar.style.width =
                                "0%";


                            setTimeout(
                                () => {

                                    bar.style.width =
                                        width;

                                },
                                150
                            );


                            observer.unobserve(
                                bar
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.5
            }

        );


    progressBars.forEach(
        bar => {

            skillObserver.observe(
                bar
            );

        }
    );

}


/* =========================================================
   15. CONTACT FORM - EMAILJS
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* -----------------------------------------
               Get form values
            ----------------------------------------- */

            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const email =
                document.getElementById(
                    "email"
                )?.value.trim();


            const subject =
                document.getElementById(
                    "subject"
                )?.value.trim();


            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            /* -----------------------------------------
               Validation
            ----------------------------------------- */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showNotification(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            if (!validateEmail(email)) {

                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            /* -----------------------------------------
               Check EmailJS
            ----------------------------------------- */

            if (
                typeof emailjs ===
                "undefined"
            ) {

                console.error(
                    "EmailJS library is not loaded."
                );


                showNotification(
                    "Email service is not loaded. Please refresh the page.",
                    "error"
                );

                return;
            }


            /* -----------------------------------------
               Re-initialize EmailJS safely
            ----------------------------------------- */

            try {

                emailjs.init({
                    publicKey:
                        EMAILJS_PUBLIC_KEY
                });

            } catch (error) {

                console.error(
                    "EmailJS initialization failed:",
                    error
                );

            }


            /* -----------------------------------------
               Submit Button
            ----------------------------------------- */

            const submitBtn =
                contactForm.querySelector(
                    ".submit-btn"
                );


            const originalButtonHTML =
                submitBtn
                    ? submitBtn.innerHTML
                    : "";


            if (submitBtn) {

                submitBtn.disabled =
                    true;


                submitBtn.innerHTML = `
                    <span>Sending...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;

            }


            /* -----------------------------------------
               Current Date & Time
            ----------------------------------------- */

            const contactTime =
                new Date().toLocaleString(
                    "en-IN",
                    {
                        dateStyle: "medium",
                        timeStyle: "short"
                    }
                );


            /* -----------------------------------------
               EmailJS Template Parameters
            ----------------------------------------- */

            const templateParams = {

                name: name,

                email: email,

                subject: subject,

                message: message,

                contactTime: contactTime

            };


            console.log(
                "EmailJS sending data:",
                templateParams
            );


            /* -----------------------------------------
               SEND EMAIL
            ----------------------------------------- */

            try {

                const response =
                    await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        templateParams
                    );


                console.log(
                    "EmailJS Success:",
                    response
                );


                /* -------------------------------------
                   SUCCESS
                ------------------------------------- */

                showNotification(
                    `Thanks ${name}! Your message has been sent successfully.`,
                    "success"
                );


                /* Clear form */

                contactForm.reset();


            } catch (error) {

                console.error(
                    "=============================="
                );

                console.error(
                    "EMAILJS ERROR"
                );

                console.error(
                    "=============================="
                );

                console.error(
                    "Full Error:",
                    error
                );

                console.error(
                    "Error Status:",
                    error?.status
                );

                console.error(
                    "Error Text:",
                    error?.text
                );


                let errorMessage =
                    "Sorry! Your message could not be sent. Please try again.";


                /* -------------------------------------
                   Specific Error Messages
                ------------------------------------- */

                if (
                    error?.status === 400
                ) {

                    errorMessage =
                        "Email service rejected the request. Please check your EmailJS template.";

                } else if (
                    error?.status === 401
                ) {

                    errorMessage =
                        "EmailJS authorization failed. Please check your Public Key.";

                } else if (
                    error?.status === 404
                ) {

                    errorMessage =
                        "EmailJS Service or Template was not found. Please check your IDs.";

                } else if (
                    error?.status === 429
                ) {

                    errorMessage =
                        "Too many requests. Please wait a moment and try again.";

                }


                showNotification(
                    errorMessage,
                    "error"
                );


            } finally {

                /* -------------------------------------
                   Restore Button
                ------------------------------------- */

                if (submitBtn) {

                    submitBtn.disabled =
                        false;


                    submitBtn.innerHTML =
                        originalButtonHTML;

                }

            }

        }
    );

}


/* =========================================================
   16. EMAIL VALIDATION
========================================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );

}


/* =========================================================
   17. NOTIFICATION SYSTEM
========================================================= */

function showNotification(
    message,
    type = "success"
) {

    const existing =
        document.querySelector(
            ".custom-notification"
        );


    if (existing) {

        existing.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "custom-notification";


    notification.innerHTML = `

        <div class="notification-icon">

            <i class="fa-solid ${
                type === "success"
                    ? "fa-check"
                    : "fa-circle-exclamation"
            }"></i>

        </div>

        <div class="notification-message">

            ${message}

        </div>

        <button
            class="notification-close"
            aria-label="Close notification">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(
        () => {

            notification.classList.add(
                "show"
            );

        }
    );


    const closeButton =
        notification.querySelector(
            ".notification-close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                removeNotification(
                    notification
                );

            }
        );

    }


    setTimeout(
        () => {

            removeNotification(
                notification
            );

        },
        5000
    );

}


/* =========================================================
   18. REMOVE NOTIFICATION
========================================================= */

function removeNotification(
    notification
) {

    if (!notification) return;


    notification.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            if (
                notification &&
                notification.parentNode
            ) {

                notification.remove();

            }

        },
        300
    );

}


/* =========================================================
   19. NOTIFICATION STYLES
========================================================= */

const notificationStyles =
    document.createElement(
        "style"
    );


notificationStyles.textContent = `

.custom-notification {

    position: fixed;

    top: 95px;

    right: 25px;

    z-index: 99999;

    display: flex;

    align-items: center;

    gap: 12px;

    min-width: 300px;

    max-width: 420px;

    padding: 14px 16px;

    border: 1px solid var(--border);

    border-radius: 13px;

    color: var(--text);

    background: var(--bg-secondary);

    box-shadow: var(--shadow-lg);

    opacity: 0;

    visibility: hidden;

    transform: translateX(30px);

    transition: 0.3s ease;

}


.custom-notification.show {

    opacity: 1;

    visibility: visible;

    transform: translateX(0);

}


.notification-icon {

    width: 35px;

    height: 35px;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

    border-radius: 9px;

    color: var(--primary);

    background:
        rgba(99, 102, 241, 0.1);

}


.notification-message {

    flex: 1;

    font-size: 12px;

    font-weight: 600;

}


.notification-close {

    width: 28px;

    height: 28px;

    display: flex;

    align-items: center;

    justify-content: center;

    border: none;

    border-radius: 7px;

    color: var(--text-light);

    background: transparent;

    cursor: pointer;

}


.notification-close:hover {

    color: var(--text);

    background: var(--bg-tertiary);

}


@media (max-width: 500px) {

    .custom-notification {

        left: 15px;

        right: 15px;

        min-width: 0;

        max-width: none;

    }

}

`;



document.head.appendChild(
    notificationStyles
);


/* =========================================================
   20. PROJECT CARD MICRO INTERACTION
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <= 850
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (
                        (y - centerY) /
                        centerY
                    ) * -2;


                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 2;


                card.style.transform =
                    `translateY(-8px)
                     perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   21. SMOOTH SCROLL FOR ANCHOR LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );


/* =========================================================
   22. IMAGE FALLBACK
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                }
            );

        }
    );


/* =========================================================
   23. READING PROGRESS BAR
========================================================= */

if (
    !document.getElementById(
        "scrollProgress"
    )
) {

    const progress =
        document.createElement(
            "div"
        );


    progress.id =
        "scrollProgress";


    document.body.appendChild(
        progress
    );


    const updateProgress =
        () => {

            const max =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percent =
                max > 0
                    ? (
                        window.scrollY /
                        max
                    ) * 100
                    : 0;


            progress.style.width =
                percent + "%";

        };


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();

}


/* =========================================================
   24. EXTRA PORTFOLIO STYLES
========================================================= */

const portfolioStyles =
    document.createElement(
        "style"
    );


portfolioStyles.textContent = `

#scrollProgress {

    position: fixed;

    top: 0;

    left: 0;

    width: 0;

    height: 3px;

    z-index: 100000;

    background:
        linear-gradient(
            90deg,
            #6366f1,
            #8b5cf6,
            #ec4899
        );

}


.portfolio-stats {

    width:
        min(1100px, 100%);

    margin:
        0 auto 24px;

    padding:
        0 20px;

    display:
        grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap:
        14px;

    box-sizing:
        border-box;

}


.portfolio-stat {

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    gap:
        10px;

    padding:
        15px;

    border:
        1px solid
        rgba(128,128,128,.18);

    border-radius:
        14px;

    background:
        rgba(128,128,128,.05);

    transition:
        .25s ease;

}


.portfolio-stat:hover {

    transform:
        translateY(-3px);

    box-shadow:
        0 12px 28px
        rgba(0,0,0,.08);

}


.portfolio-stat i {

    font-size:
        18px;

}


.portfolio-stat strong {

    font-size:
        18px;

}


.message-counter {

    display:
        block;

    margin-top:
        6px;

    text-align:
        right;

    font-size:
        12px;

    opacity:
        .65;

}


.contact-form-status {

    margin-bottom:
        10px;

    font-size:
        13px;

    font-weight:
        600;

}


.whatsapp-float {

    position:
        fixed;

    right:
        24px;

    bottom:
        88px;

    z-index:
        9998;

    display:
        flex;

    align-items:
        center;

    gap:
        9px;

    padding:
        13px 18px;

    border-radius:
        50px;

    color:
        #fff;

    background:
        #25D366;

    text-decoration:
        none;

    font-size:
        13px;

    font-weight:
        700;

    box-shadow:
        0 10px 30px
        rgba(37,211,102,.3);

    transition:
        .25s ease;

}


.whatsapp-float i {

    font-size:
        20px;

}


.whatsapp-float:hover {

    transform:
        translateY(-4px);

    box-shadow:
        0 15px 35px
        rgba(37,211,102,.4);

}


@media(max-width:700px) {

    .portfolio-stats {

        grid-template-columns:
            1fr;

        padding:
            0 10px;

    }


    .whatsapp-float {

        right:
            16px;

        bottom:
            74px;

        width:
            52px;

        height:
            52px;

        padding:
            0;

        justify-content:
            center;

        border-radius:
            50%;

    }


    .whatsapp-float span {

        display:
            none;

    }

}

`;



document.head.appendChild(
    portfolioStyles
);


/* =========================================================
   25. PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );


        console.log(
            "Student Portfolio loaded successfully."
        );


        console.log(
            "EmailJS contact form initialized."
        );

    }
);



/* =====================================================
   REAL AI CHATBOT
   ===================================================== */

(function () {

    "use strict";

    const MOHIT_AI_BACKEND_URL = "YOUR_BACKEND_URL";

    const aiToggle =
        document.getElementById("aiChatToggle");

    const aiWindow =
        document.getElementById("aiChatWindow");

    const aiClose =
        document.getElementById("aiChatClose");

    const aiForm =
        document.getElementById("aiChatForm");

    const aiInput =
        document.getElementById("aiChatInput");

    const aiMessages =
        document.getElementById("aiChatMessages");


    /* ===============================
       OPEN CHAT
    =============================== */

    function openAIChat() {

        if (!aiWindow)
            return;

        aiWindow.classList.add("open");

        aiWindow.setAttribute(
            "aria-hidden",
            "false"
        );

        aiInput?.focus();
    }


    /* ===============================
       CLOSE CHAT
    =============================== */

    function closeAIChat() {

        if (!aiWindow)
            return;

        aiWindow.classList.remove("open");

        aiWindow.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    /* ===============================
       TOGGLE CHAT
    =============================== */

    aiToggle?.addEventListener(
        "click",
        function () {

            if (
                aiWindow?.classList.contains(
                    "open"
                )
            ) {
                closeAIChat();
            }

            else {
                openAIChat();
            }

        }
    );


    /* ===============================
       CLOSE BUTTON
    =============================== */

    aiClose?.addEventListener(
        "click",
        closeAIChat
    );


    /* ===============================
       ADD MESSAGE
    =============================== */

    function addAIMessage(
        text,
        type = "bot"
    ) {

        if (!aiMessages)
            return;

        const message =
            document.createElement("div");

        message.className =
            type === "user"
                ? "ai-message user-message"
                : "ai-message bot-message";

        message.textContent = text;

        aiMessages.appendChild(message);

        aiMessages.scrollTop =
            aiMessages.scrollHeight;
    }


    /* ===============================
       TYPING MESSAGE
    =============================== */

    function addTypingMessage() {

        if (!aiMessages)
            return null;

        const typing =
            document.createElement("div");

        typing.className =
            "ai-message bot-message ai-typing";

        typing.textContent =
            "Thinking...";

        aiMessages.appendChild(typing);

        aiMessages.scrollTop =
            aiMessages.scrollHeight;

        return typing;
    }


    /* ===============================
       ASK REAL AI
    =============================== */

    async function askMohitAI(question) {

        try {

            const response =
                await fetch(
                    `${MOHIT_AI_BACKEND_URL}/api/chat`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            message: question
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "AI request failed"
                );

            }


            return (
                data.reply ||
                "Sorry, I could not generate a response."
            );

        }

        catch (error) {

            console.error(
                "MOHIT AI ERROR:",
                error
            );

            return (
                "Sorry 😕 AI Assistant is temporarily unavailable. Please try again later."
            );

        }

    }


    /* ===============================
       SEND MESSAGE
    =============================== */

    aiForm?.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const question =
                aiInput?.value.trim();


            if (!question)
                return;


            /* USER MESSAGE */

            addAIMessage(
                question,
                "user"
            );


            /* CLEAR INPUT */

            aiInput.value = "";


            /* TYPING */

            const typing =
                addTypingMessage();


            /* ASK AI */

            const reply =
                await askMohitAI(
                    question
                );


            /* REMOVE TYPING */

            typing?.remove();


            /* AI REPLY */

            addAIMessage(
                reply,
                "bot"
            );

        }
    );


    /* ===============================
       SUGGESTION BUTTONS
    =============================== */

    document
        .querySelectorAll(
            ".ai-suggestions button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (!aiInput)
                            return;


                        const question =
                            button.dataset.question ||
                            button.textContent.trim();


                        aiInput.value =
                            question;


                        aiForm?.requestSubmit();

                    }
                );

            }
        );


})();