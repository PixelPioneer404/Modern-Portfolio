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
document.body.style.height = `${scrollDistance + window.innerHeight}px`;

// 6) animate the wrapper instead of the panels array
gsap.to(wrapper, {
    x: () => `-${scrollDistance}px`,
    ease: "none",
    scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        pinSpacing: true
    }
});
