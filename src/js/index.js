import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

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
        pinSpacing: true
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

scrollDownCueBtn.forEach((el) => {
    el.addEventListener("click", () => {
        document.querySelector("#works").scrollIntoView({
            behavior: "smooth"
        })
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

const navName = document.querySelector("#nav-name")
const navItems = document.querySelectorAll(".nav-item")
const navBtn = document.querySelector("#resume")

function animateNav() {
    gsap.from(navName, {
        left: "-10%",
        duration: 1,
        ease: "power1.inOut",
    })
    gsap.from(navBtn, {
        right: "-10%",
        duration: 1,
        ease: "power1.inOut",
    })
    gsap.from(navItems, {
        yPercent: -200,
        opacity: 0,
        duration: 0.5,
        stagger: 0.3
    })
}

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

ScrollTrigger.create({
    trigger: "#works",
    start: "bottom top",
    end: "+=500%",
    scrub: 1,
    onToggle: self => {
        if (self.isActive) {
            hideNav()
        } else {
            showNav()
        }
    }
})

const servicesSections = document.querySelectorAll(".services")

servicesSections.forEach((section) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%", //100% means full viewport height
        pin: true,
        pinSpacing: false,
        // anticipatePin: 2,  // Helps with smoother pinning
    })
})