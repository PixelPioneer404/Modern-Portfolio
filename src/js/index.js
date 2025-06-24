import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
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

const seeMoreProjectsLabel = document.querySelector("#see-more-projects-label")
const arrowContainer = document.querySelector("#arrow-svg-container")

const narrowArrowPath = `M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z`
const wideArrowPath = `M504 -480 L320 -712 L376 -768 L616 -480 L376 -192 L320 -248 Z`

seeMoreProjectsLabel.addEventListener("mouseenter", () => {
    gsap.to(arrowContainer, { x: 4, duration: 0.3 })
    gsap.to("#arrow-svg-container path", { morphSVG: wideArrowPath, duration: 0.3, ease: "power1.inOut" })
})

seeMoreProjectsLabel.addEventListener("mouseleave", () => {
    gsap.to(arrowContainer, { x: 0, duration: 0.3 })
    gsap.to("#arrow-svg-container path", { morphSVG: narrowArrowPath, duration: 0.3, ease: "power1.inOut" })
})

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
        clutter1 += `<span class="inline-block font-clash-display font-bold text-[120px] text-stroke">${el}</span>`
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
        clutter2 += `<span class="inline-block font-clash-display font-bold text-[150px] text-stroke">${el}</span>`
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

// calculate transform-origin so zoom focuses on the center of the “O”
function setTransformOriginToO() {
    const section = document.querySelector('#blog-header');
    const oSpan = document.querySelector('.o-letter');

    const secRect = section.getBoundingClientRect();
    const oRect = oSpan.getBoundingClientRect();

    const originX = ((oRect.left + oRect.right) / 2 - secRect.left) / secRect.width * 100;
    const originY = ((oRect.top + oRect.bottom) / 2 - secRect.top) / secRect.height * 100;

    gsap.set(section, { transformOrigin: `${originX}% ${originY}%` });
}

// run on load and also on resize (in case layout shifts)
window.addEventListener('load', setTransformOriginToO);
window.addEventListener('resize', setTransformOriginToO);

// build the ScrollTrigger timeline
const blogSectiontl = gsap.timeline({
    scrollTrigger: {
        trigger: "#blog",
        start: "top top",
        end: "+=600%",       // adjust this value to control how much scroll it takes to fully zoom
        scrub: 1,
        pin: true,
        onLeave: () => showNav(), // show nav when leaving the blog section
        onEnterBack: () => hideNav() // hide nav when entering back into the blog section
    }
});

// 1) zoom way in (tweak the scale to taste)
blogSectiontl.to("#blog-header", {
    scale: 150,
    ease: "none"
});

// 2) once the text has zoomed completely out, fade in the inner content
//    we stagger this so it happens near the end of the scroll
blogSectiontl.to("#blog-content", {
    opacity: 1,
    ease: "none",
    duration: 0.2
}, "-=200%");  // start this tween 200% before the end of the timeline