import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

const scrollDownCueBtn = document.querySelectorAll(".scroll-to-work")

scrollDownCueBtn.forEach((el) => {
    el.addEventListener("click", () => {
        document.querySelector("#works").scrollIntoView({
            behavior: "smooth"
        })
    })
})