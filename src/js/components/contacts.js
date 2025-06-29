import { gsap } from "gsap"

const contactTl = gsap.timeline({ paused: true })

const readyPageBtn = document.querySelector("#ready-page-btn")
const namePageBtn = document.querySelector("#name-page-btn")
const emailPageBtn = document.querySelector("#email-page-btn")
const submitBtn = document.querySelector("#submit-btn")

contactTl.set("#contact-content", { autoAlpha: 0 })

contactTl.to("#start-contact", { autoAlpha: 1 })
  .addPause()
  .to("#start-contact", { xPercent: -100, autoAlpha: 0 })
  .fromTo("#name-contact", { xPercent: 100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1 })
  .addPause()
  .to("#name-contact", { xPercent: -100, autoAlpha: 0 })
  .fromTo("#email-contact", { xPercent: 100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1 })
  .addPause()
  .to("#email-contact", { xPercent: -100, autoAlpha: 0 })
  .fromTo("#message-contact", { xPercent: 100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1 })
  .addPause()
  .to("#message-contact", { xPercent: -100, autoAlpha: 0 })
  .fromTo("#start-contact", { xPercent: 100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1 })



readyPageBtn.addEvencontactTlistener("click", () => {
    contactTl.play()
})
namePageBtn.addEvencontactTlistener("click", () => {
    contactTl.play()
})
emailPageBtn.addEvencontactTlistener("click", () => {
    contactTl.play()
})
submitBtn.addEvencontactTlistener("click", () => {
    // TODO: call the function imported from message components to show the thank you dialog and adding a send new message btn
    console.log("Submit button clicked");
})

contactTl.play()