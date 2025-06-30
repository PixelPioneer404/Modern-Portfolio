import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import "./components/nameContact.js"
import "./components/emailContact.js"
import { animateSubmitBtn, updateContactMessages, resetContactFormHistory } from "./components/messageContact.js"
import { contactDataManager } from "./components/contactDataManager.js"

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

// Initialize Lenis
const lenis = new Lenis()

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.onload = () => {
    // animateNav()
    // animateSocialLabels()
    updateStatsOnLoad()
    // btnEnters()
    setupBlogNavigation() // Add blog navigation setup
    updateContactMessages() // Update contact messages based on submission history
}

// 1) grab section + wrapper
const section = document.querySelector(".worksSection");
const wrapper = section.querySelector(".wrapper");

// 2) measure padding & visible width
const style = getComputedStyle(section);
const paddingLeft = parseFloat(style.paddingLeft);
const paddingRight = parseFloat(style.paddingRight);
const visibleWidth = window.innerWidth - paddingLeft - paddingRight;

// 3) measure total width of wrapper (includes flex-gap)
const totalWidth = wrapper.scrollWidth;

// 4) how far to scroll: difference between content width & viewport-within-padding
const scrollDistance = totalWidth - visibleWidth;

// 5) give page enough vertical scroll space
// document.body.style.height = `${scrollDistance + window.innerHeight}px`;

const worksUnderline = document.querySelector("#works-underline")
const worksUnderlineParent = document.querySelector(".scroll-to-work")
let isWorkActive = false

function animateWorksUnderline() {
    if (isWorkActive) {
        gsap.to(worksUnderline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power1.inOut",
        })
    } else {
        gsap.to(worksUnderline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
}
worksUnderlineParent.addEventListener("mouseenter", () => {
    isWorkActive = true
    animateWorksUnderline()
})
worksUnderlineParent.addEventListener("mouseleave", () => {
    isWorkActive = false
    animateWorksUnderline()
})

// 6) animate the wrapper instead of the panels array
gsap.to(wrapper, {
    x: () => `-${scrollDistance}px`,
    ease: "none",
    scrollTrigger: {
        trigger: ".worksSection",
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onToggle: self => {
            if (self.isActive) {
                isWorkActive = true
                animateWorksUnderline()
            }
            else {
                isWorkActive = false;
                animateWorksUnderline()
            }
        }
    }
});

const workCardSpans = document.querySelectorAll(".work-card-span");

workCardSpans.forEach((expressJsSpan) => {
    const workCardSpanSvgPath = expressJsSpan.querySelector("svg path");

    expressJsSpan.addEventListener("mouseenter", () => {
        workCardSpanSvgPath.setAttribute("fill", "#191923");
    });

    expressJsSpan.addEventListener("mouseleave", () => {
        workCardSpanSvgPath.setAttribute("fill", "#edede9");
    });
})

var path = `M 0 48 Q 48 48 96 48`
var finalPath = `M 0 48 Q 48 48 96 48`
var stringContainer = document.querySelector("#my-name-string")
var stringPath = stringContainer.querySelector("svg path")

let isActive = false

stringPath.addEventListener("mouseenter", () => {
    isActive = true
})

stringContainer.addEventListener("mousemove", (dets) => {
    var actualHeight = dets.clientY - stringContainer.getBoundingClientRect().top;
    var actualWidth = dets.clientX - stringContainer.getBoundingClientRect().left;

    if (isActive) {
        path = `M 0 48 Q ${actualWidth} ${actualHeight} 96 48`
        gsap.to("#my-name-string svg path", {
            attr: { d: path },
            duration: 0.3
        })
    }
})

stringContainer.addEventListener("mouseleave", () => {
    isActive = false
    gsap.to("#my-name-string svg path", {
        attr: { d: finalPath },
        duration: 0.3,
        ease: "elastic.out(1, 0.3)"
    })
})

const scrollDownCueBtn = document.querySelectorAll(".scroll-to-work") //for the scroll-cue and work nav-item
const scrollToServices = document.querySelector(".scroll-to-services")

scrollDownCueBtn.forEach((el) => {
    el.addEventListener("click", () => {
        document.querySelector("#works").scrollIntoView({
            behavior: "smooth"
        })
        isWorkActive = true;
        animateWorksUnderline();
    })
})

scrollToServices.addEventListener("click", () => {
    document.querySelector("#services").scrollIntoView({
        behavior: "smooth"
    })
})

const yDist = -25
const yDur = 0.3

const socials = [
    { textSel: "#linkedin-text", iconSel: "#linkedin-icon" },
    { textSel: "#instagram-text", iconSel: "#instagram-icon" },
    { textSel: "#github-text", iconSel: "#github-icon" }
]

socials.forEach(({ textSel, iconSel }) => {
    const textEl = document.querySelector(textSel)
    const iconEl = document.querySelector(iconSel)

    textEl.addEventListener("mouseenter", () => {
        gsap.to(iconEl, {
            opacity: 1,
            y: yDist,
            duration: yDur
        })
    })

    textEl.addEventListener("mouseleave", () => {
        gsap.to(iconEl, {
            opacity: 0,
            y: 0,
            duration: yDur
        })
    })
})

const projectsCount = document.querySelector("#completed-projects-count")
const clientsCount = document.querySelector("#clients-count")
function updateStatsOnLoad() {
    gsap.to(projectsCount, {
        innerText: 200,
        duration: 1.5,
        snap: {
            innerText: 2
        }
    })

    gsap.to(clientsCount, {
        innerText: 40,
        duration: 1.5,
        snap: "innerText"
    })
}

// window.onload = updateStatsOnLoad (go to line 233)

function animateSeeMoreLabel(label, arrow, path) {
    const narrowArrowPath = `M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z`
    const wideArrowPath = `M504 -480 L320 -712 L376 -768 L616 -480 L376 -192 L320 -248 Z`

    label.addEventListener("mouseenter", () => {
        gsap.to(arrow, { x: 4, duration: 0.3 })
        gsap.to(path, { morphSVG: wideArrowPath, duration: 0.3, ease: "power1.inOut" })
    })

    label.addEventListener("mouseleave", () => {
        gsap.to(arrow, { x: 0, duration: 0.3 })
        gsap.to(path, { morphSVG: narrowArrowPath, duration: 0.3, ease: "power1.inOut" })
    })
}

const seeMoreProjectsLabel = document.querySelector("#see-more-projects-label")
const arrowContainerProjects = document.querySelector("#arrow-svg-container")
const arrowContainerProjectsPath = document.querySelector("#arrow-svg-container path")
animateSeeMoreLabel(seeMoreProjectsLabel, arrowContainerProjects, arrowContainerProjectsPath)

const scrollCueBtn = document.querySelector("#scroll-cue-btn")

scrollCueBtn.addEventListener("mouseenter", () => {
    gsap.to("#scroll-cue-btn svg", {
        rotate: 90,
        duration: 0.3,
        ease: "power1.inOut"
    })
})

scrollCueBtn.addEventListener("mouseleave", () => {
    gsap.to("#scroll-cue-btn svg", {
        rotate: -45,
        duration: 0.3,
        ease: "power1.inOut"
    })
})

function btnEnters() { //go to line 233
    gsap.from("#scroll-cue-btn", {
        opacity: 0,
        duration: 1.6,
    })
}

var DDSBtimeline = gsap.timeline() //DDS means "Designer | Developer | Socials | Book a call timeline"

const DESIGNERtxtContainer = document.querySelector("#DESIGNER-txt-container")
var DesignerTxt = DESIGNERtxtContainer.innerText
var eachEl1 = DesignerTxt.split("")
var clutter1 = ""

const DEVELOPERtxtContainer = document.querySelector("#DEVELOPER-txt-container")
var DeveloperTxt = DEVELOPERtxtContainer.innerText
var eachEl2 = DeveloperTxt.split("")
var clutter2 = ""

DESIGNERtxtContainer.textContent = ""
eachEl1.forEach((el, i) => {
    if (i === 2) {
        clutter1 += `<span class="inline-block text-stroke">${el}</span>`
    } else {
        clutter1 += `<span>${el}</span>`
    }
    DESIGNERtxtContainer.innerHTML = clutter1
})

DDSBtimeline.from("#DESIGNER-txt-container span", {
    y: 120,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
}, 0)

DEVELOPERtxtContainer.textContent = ""
eachEl2.forEach((el, i) => {
    if (i === 8) {
        clutter2 += `<span class="inline-block text-stroke">${el}</span>`
    } else {
        clutter2 += `<span>${el}</span>`
    }
    DEVELOPERtxtContainer.innerHTML = clutter2
})

DDSBtimeline.from("#DEVELOPER-txt-container span", {
    y: 120,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1
}, 0)

const bookACallTxt = document.querySelector("#book-a-call-txt")
const bookACallIcon = document.querySelector("#book-a-call-icon")
DDSBtimeline.from(bookACallTxt, { opacity: 0, duration: 1.2, ease: "power1.inOut" }, 0)
DDSBtimeline.from(bookACallIcon, {
    x: -112,
    opacity: 0,
    duration: 0.8,
    ease: "power1.inOut"
}, 0)

const socialLabels = document.querySelectorAll(".social-label")
DDSBtimeline.from(socialLabels, {
    translateY: "200%",
    opacity: 0,
    duration: 0.5,
    stagger: {
        each: 0.2,
        from: "end"   // ← now it will animate indexes [2,1,0] instead of [0,1,2]
    }
})

function showNav() {
    gsap.to("header", {
        top: "0%",
        duration: 0.5,
        ease: "power1.inOut"
    })
}

function hideNav() {
    gsap.to("header", {
        top: "-100%",
        duration: 0.5,
        ease: "power1.inOut"
    })
}

ScrollTrigger.create({ //this is for the nav control on services section
    trigger: "#works",
    start: "bottom top",
    end: "+=500%",
    scrub: 1,
    onToggle: self => {
        if (self.isActive) {
            hideNav()
            showServiceNav()
        } else {
            hideServiceNav()
        }
    },
    onLeave: () => showNav(), // show nav when scrolling down
    onLeaveBack: () => showNav(), // show nav when scrolling back up
})

const servicesSections = document.querySelectorAll(".services")

servicesSections.forEach((section) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%", //100% means full viewport height
        pin: true,
        pinSpacing: false// Helps with smoother pinning
    })
})

const serviceNav = document.querySelector("#service-nav")

function showServiceNav() {
    gsap.to(serviceNav, {
        opacity: 1,
        top: 0,
        duration: 0.5,
        ease: "power1.inOut"
    })
}

function hideServiceNav() {
    gsap.to(serviceNav, {
        opacity: 0,
        top: "-100%",
        duration: 0.5,
        ease: "power1.inOut"
    })
}

//blog section nav underline animation
const blogUnderline = document.querySelector("#blog-underline")
const blogUnderlineParent = document.querySelector(".scroll-to-blog")
let isBlogActive = false

function animateBlogUnderline() {
    if (isBlogActive) {
        gsap.to(blogUnderline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power1.inOut",
        })
    } else {
        gsap.to(blogUnderline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
}
blogUnderlineParent.addEventListener("click", () => {
    document.querySelector("#blog").scrollIntoView({
        behavior: "smooth"
    })
    isBlogActive = true
    animateBlogUnderline()
})
blogUnderlineParent.addEventListener("mouseenter", () => {
    if (!isBlogActive) {
        gsap.to(blogUnderline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
})
blogUnderlineParent.addEventListener("mouseleave", () => {
    if (!isBlogActive) {
        gsap.to(blogUnderline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
})

ScrollTrigger.create({
    trigger: "#blog",
    start: "top top",
    end: "90% top",
    scrub: true,
    onToggle: self => {
        if (self.isActive) {
            isContactActive = false
            animateContactsUnderline()
            isBlogActive = true;
            showNav();
            setTimeout(animateBlogUnderline, 400); // Delay to ensure the underline animation is smooth
        } else {
            isBlogActive = false;
            animateBlogUnderline();
            isContactActive = true;
            setTimeout(animateContactsUnderline, 300) //so that the contact nav underline can be triggered as soon as blog underline gores away
        }
    },
    onLeaveBack: () => {
        isContactActive = false
        animateBlogUnderline()
    }
})

// Blog Header Navigation - moved to function for proper initialization
function setupBlogNavigation() {
    console.log("🚀 Setting up blog navigation..."); // Debug log
    const blogHeader = document.querySelector("#blog-header");
    if (!blogHeader) {
        console.error("Blog header not found!");
        return;
    }

    console.log("Blog header found:", blogHeader); // Debug log
    const blogHeaderItems = blogHeader.querySelectorAll("a");
    console.log("Found blog header items:", blogHeaderItems.length); // Debug log

    let activeNavItem = null;
    let currentActiveContent = null;

    // Debug: Log all available content div IDs
    const allContentDivs = document.querySelectorAll("#blog-content > div");
    console.log("Available content div IDs:", Array.from(allContentDivs).map(div => div.id));

    // Debug: Log all nav item text content
    console.log("Nav items text content:", Array.from(blogHeaderItems).map((item, index) => {
        const rawText = item.textContent;
        const normalizedText = rawText.trim().replace(/\s+/g, ' ');
        return `${index}: raw="${rawText}" normalized="${normalizedText}"`;
    }));

    // Function to switch blog content based on nav item
    function switchBlogContent(sectionName) {
        console.log("switchBlogContent called with:", `"${sectionName}"`); // Debug log
        const targetContent = document.getElementById(sectionName);
        console.log("Found element:", targetContent); // Debug log

        if (!targetContent) {
            console.error(`No element found with ID: "${sectionName}"`);
            return;
        }

        if (currentActiveContent === targetContent) return;

        if (currentActiveContent) {
            // Fade out current content
            gsap.to(currentActiveContent, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    currentActiveContent.style.display = "none";

                    // Show and fade in new content
                    targetContent.style.display = "grid";
                    gsap.fromTo(targetContent,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        }
                    );
                    currentActiveContent = targetContent;
                }
            });
        } else {
            // First time - just show the content
            targetContent.style.display = "grid";
            gsap.fromTo(targetContent,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );
            currentActiveContent = targetContent;
        }
    }

    // Enhanced setActiveNavItem function to include content switching
    function setActiveNavItem(targetItem) {
        // Get the section name from the clicked nav item and normalize it
        let sectionName = targetItem.textContent.trim();
        // Replace any whitespace sequences (including newlines) with single spaces
        sectionName = sectionName.replace(/\s+/g, ' ');
        console.log("setActiveNavItem called with:", `"${sectionName}"`); // Debug log

        // Reset previous active item styles
        if (activeNavItem && activeNavItem !== targetItem) {
            gsap.to(activeNavItem, {
                backgroundColor: "transparent",
                border: "1px solid transparent",
                color: "#191923",
                duration: 0.3,
                ease: "power2.out"
            });
        }

        // Set new active item
        activeNavItem = targetItem;

        // Apply active styles to the target item
        gsap.to(targetItem, {
            backgroundColor: "#191923",
            color: "#edede9",
            duration: 0.3,
            ease: "power2.out"
        });

        // Switch blog content
        switchBlogContent(sectionName);
    }

    blogHeaderItems.forEach((item, index) => {
        console.log(`Setting up nav item ${index}:`, item.textContent.trim(), "with classes:", Array.from(item.classList)); // Debug log

        // Click handler for active state
        item.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`Nav item ${index} clicked:`, item.textContent.trim()); // Debug log
            setActiveNavItem(item);
        });

        // Hover effects (only apply to non-active items)
        item.addEventListener("mouseenter", () => {
            if (item !== activeNavItem) {
                gsap.to(item, {
                    border: "1px solid #191923",
                    duration: 0.2,
                    ease: "power1.inOut"
                });
            }
        });

        item.addEventListener("mouseleave", () => {
            if (item !== activeNavItem) {
                gsap.to(item, {
                    border: "1px solid transparent",
                    duration: 0.2,
                    ease: "power1.inOut"
                });
            }
        });
    });

    // Initialize with first item active (optional)
    if (blogHeaderItems.length > 0) {
        setActiveNavItem(blogHeaderItems[0]);
    }

    // Initialize first content section
    const firstContent = document.getElementById("ALL");
    if (firstContent) {
        currentActiveContent = firstContent;
        firstContent.style.display = "grid";
    }
}

//three js globe
const canvas = document.querySelector("#globe-canvas")
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
scene.add(camera)
camera.position.z = 3.6;

// === Create Globe Lines ===
const radius = 2;
const latSegments = 20;
const lonSegments = 20;
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

// Latitude Lines (horizontal rings)
for (let i = 1; i < latSegments; i++) {
    const theta = (i / latSegments) * Math.PI;
    const ringRadius = radius * Math.sin(theta);
    const y = radius * Math.cos(theta);

    const ringPoints = [];
    const points = 64; // smooth ring

    for (let j = 0; j <= points; j++) {
        const phi = (j / points) * 2 * Math.PI;
        const x = ringRadius * Math.cos(phi);
        const z = ringRadius * Math.sin(phi);
        ringPoints.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const ring = new THREE.LineLoop(geometry, lineMaterial);
    scene.add(ring);
}

// Longitude Lines (vertical curves)
for (let i = 0; i < lonSegments; i++) {
    const phi = (i / lonSegments) * 2 * Math.PI;
    const curvePoints = [];

    for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI;
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);
        curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curve = new THREE.Line(geometry, lineMaterial);
    scene.add(curve);
}

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
renderer.setClearColor(0x000000, 0); // transparent background
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

window.addEventListener("resize", () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

function animate() {
    window.requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera)
}
animate()

//see more posts
const seeMorePostsLabel = document.querySelector("#see-more-posts-label")
const arrowContainerBlog = document.querySelector("#arrow-svg-container-blog")
const arrowContainerBlogPath = document.querySelector("#arrow-svg-container-blog path")
animateSeeMoreLabel(seeMorePostsLabel, arrowContainerBlog, arrowContainerBlogPath)

//contacts section
const contactUnderline = document.querySelector("#contact-underline")
const contactUnderlineParent = document.querySelector(".scroll-to-contact")
let isContactActive = false

function animateContactsUnderline() {
    if (isContactActive) {
        gsap.to(contactUnderline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power1.inOut",
        })
    } else {
        gsap.to(contactUnderline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
}
contactUnderlineParent.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({
        behavior: "smooth"
    })
})
contactUnderlineParent.addEventListener("mouseenter", () => {
    if (!isContactActive) {
        gsap.to(contactUnderline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
})
contactUnderlineParent.addEventListener("mouseleave", () => {
    if (!isContactActive) {
        gsap.to(contactUnderline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power1.inOut",
        })
    }
})

//Don't remove this becuase it is insicating that the contact section nav auto underline functionality is not implemented by here, it is integrated by the blog section 
// ScrollTrigger.create({
//     trigger: "#contact",
//     start: "top top",
//     end: "90% top",
//     scrub: true,
//     onLeaveBack: () => {
//         isContactActive = false
//         animateContactsUnderline();
//     }
// })


//contact section functionality
const contactTl = gsap.timeline({ paused: true })

const readyPageBtn = document.querySelector("#ready-page-btn")
const namePageBtn = document.querySelector("#name-page-btn")
const emailPageBtn = document.querySelector("#email-page-btn")
const submitBtn = document.querySelector("#submit-btn")
const nameField = document.querySelector("#form-username")
const emailField = document.querySelector("#form-email")
const emailAlert = document.querySelector("#email-alert")

// Contact form keyboard handler - centralized and clean
let currentContactStep = 'start' // Track current step: 'start', 'name', 'email', 'message'
let keyboardHandlerActive = false

function handleContactKeyboard(event) {
    // Only handle Enter key
    if (event.key !== 'Enter') return
    
    // Only handle if we're in a contact form context
    const contactSection = document.querySelector('#contact')
    if (!contactSection) return
    
    // Check if contact section is visible (rough check)
    const contactRect = contactSection.getBoundingClientRect()
    const isContactVisible = contactRect.top < window.innerHeight && contactRect.bottom > 0
    if (!isContactVisible) return
    
    // Prevent default form submission
    event.preventDefault()
    
    try {
        switch (currentContactStep) {
            case 'start':
                if (readyPageBtn) {
                    console.log("Enter pressed - transitioning to name page")
                    readyPageBtn.click()
                }
                break
                
            case 'name':
                if (namePageBtn && nameField && nameField.value.trim()) {
                    console.log("Enter pressed - transitioning to email page")
                    namePageBtn.click()
                }
                break
                
            case 'email':
                if (emailPageBtn && emailField && emailField.value.trim()) {
                    console.log("Enter pressed - validating email and transitioning")
                    emailPageBtn.click()
                }
                break
                
            case 'message':
                if (submitBtn) {
                    // Check if submit button is not disabled
                    if (submitBtn.classList.contains('pointer-events-none')) {
                        console.log("Enter pressed but submit button is disabled (sending in progress)")
                        return
                    }
                    
                    const messageField = document.querySelector("#form-message")
                    if (messageField && messageField.value.trim()) {
                        console.log("Enter pressed - submitting form")
                        submitBtn.click()
                    }
                }
                break
                
            default:
                console.warn("Unknown contact step:", currentContactStep)
        }
    } catch (error) {
        console.error("Error in keyboard handler:", error)
    }
}

// Initialize keyboard handler - single global listener
function initContactKeyboardHandler() {
    if (keyboardHandlerActive) return // Prevent multiple listeners
    
    document.addEventListener('keydown', handleContactKeyboard)
    keyboardHandlerActive = true
    console.log("Contact keyboard handler initialized")
}

// Cleanup keyboard handler if needed
function cleanupContactKeyboardHandler() {
    if (!keyboardHandlerActive) return
    
    document.removeEventListener('keydown', handleContactKeyboard)
    keyboardHandlerActive = false
    console.log("Contact keyboard handler cleaned up")
}

// Initialize contact section on page load
window.addEventListener('load', () => {
    // Set initial state immediately when page loads
    gsap.set(["#name-contact", "#email-contact", "#message-contact"], {
        opacity: 0,
        xPercent: 100
    })
    gsap.set("#start-contact", {
        opacity: 1,
        xPercent: 0
    })
    
    // Initialize keyboard handler and set initial step
    currentContactStep = 'start'
    initContactKeyboardHandler()

    console.log("Contact section initialized")
})

// Build the timeline for page transitions
contactTl
    // Transition from start-contact to name-contact
    .to("#start-contact", {
        xPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
    })
    .fromTo("#name-contact",
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.3"
    )
    .call(() => {
        // Focus name field when name page is visible
        if (nameField) nameField.focus()
        // Update current step for keyboard handler
        currentContactStep = 'name'
    })
    .addPause()

    // Transition from name-contact to email-contact
    .to("#name-contact", {
        xPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
    })
    .call(() => {
        // Clear name field after user has moved away from name page
        if (nameField) {
            nameField.value = ''
        }
    })
    .fromTo("#email-contact",
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.3"
    )
    .call(() => {
        // Focus email field when email page is visible
        if (emailField) emailField.focus()
        // Update current step for keyboard handler
        currentContactStep = 'email'
    })
    .addPause()

    // Transition from email-contact to message-contact
    .to("#email-contact", {
        xPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
    })
    .call(() => {
        // Clear email field after user has moved away from email page
        if (emailField) {
            emailField.value = ''
        }
        // Focus message field when message page is visible
        if (formMessage) formMessage.focus()
        // Update current step for keyboard handler
        currentContactStep = 'message'
    })
    .fromTo("#message-contact",
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.3"
    )
    .addPause()

    // Transition from message-contact back to start-contact (loop)
    .to("#message-contact", {
        xPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
    })
    .call(() => {
        // Update contact messages BEFORE start screen becomes visible
        // This ensures the text change happens while the screen is transitioning
        updateContactMessages()
        
        // Clear all form fields after user has moved away from message page
        // This ensures a clean slate for the next form cycle
        const messageField = document.querySelector("#form-message")
        const placeholder = document.querySelector("#form-message-placeholder")
        
        if (messageField) {
            messageField.value = ''
        }
        if (placeholder) {
            placeholder.style.display = 'flex'
        }
        
        // Also clear name and email fields to ensure clean state
        if (nameField) {
            nameField.value = ''
        }
        if (emailField) {
            emailField.value = ''
        }
    })
    .fromTo("#start-contact",
        { xPercent: 100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.3"
    )
    .call(() => {
        // Reset timeline to beginning so it can be restarted
        contactTl.progress(0).pause()
        // Reset to start step for keyboard handler
        currentContactStep = 'start'
        console.log("Timeline reset to beginning")
    })

// Event listeners with null checks
if (readyPageBtn) {
    readyPageBtn.addEventListener("click", () => {
        console.log("Ready button clicked - transitioning to name page")
        contactTl.play()
    })
}

if (namePageBtn) {
    namePageBtn.addEventListener("click", () => {
        console.log("Name button clicked - transitioning to email page")
        contactTl.play()
    })
}

if (emailPageBtn) {
    emailPageBtn.addEventListener("click", () => {
        const emailValue = emailField.value.trim()
        
        if (!emailValue.includes("@")) {
            emailAlert.classList.remove("opacity-0")
            emailAlert.classList.add("opacity-100")
        } else {
            console.log("Email button clicked - storing email and transitioning to message page")
            
            // Store email data (field will be cleared in timeline after transition)
            contactDataManager.setEmail(emailValue)
            
            // Proceed to next step
            contactTl.play()
        }
    })
}

if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        console.log("Submit button clicked - transitioning back to start")
        animateSubmitBtn()
        setTimeout(()=>{
            contactTl.play()
        }, 3000)
    })
}

//message placeholder
const formMessage = document.querySelector("#form-message")
const formMessagePlaceholder = document.querySelector("#form-message-placeholder")

// Add null checks to prevent errors
if (formMessage && formMessagePlaceholder) {
    formMessage.addEventListener("focus", () => {
        formMessagePlaceholder.style.display = "none"
    })

    formMessage.addEventListener("blur", () => {
        if (!formMessage.value.trim()) {
            formMessagePlaceholder.style.display = "flex"
        }
    })

    // Also handle input event for real-time updates
    formMessage.addEventListener("input", () => {
        if (formMessage.value.trim()) {
            formMessagePlaceholder.style.display = "none"
        } else {
            formMessagePlaceholder.style.display = "flex"
        }
    })
}

// Make resetContactFormHistory available globally for testing purposes
// You can call resetContactFormHistory() in the browser console to test
window.resetContactFormHistory = resetContactFormHistory

// Cleanup on page unload (optional safety measure)
window.addEventListener('beforeunload', () => {
    cleanupContactKeyboardHandler()
})