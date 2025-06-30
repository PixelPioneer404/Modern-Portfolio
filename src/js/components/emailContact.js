import { contactDataManager } from './contactDataManager.js'

const emailContactForm = document.querySelector("#email-contact-form")
const emailInput = emailContactForm?.querySelector("input")
const emailNextBtn = emailContactForm?.querySelector("button")
const emailAlert = document.querySelector("#email-alert")

// Add null checks to prevent errors
if (emailContactForm && emailInput && emailNextBtn) {
    // Initialize button state on load
    window.addEventListener("load", () => {
        emailNextBtn.classList.add("opacity-40")
        emailNextBtn.classList.add("pointer-events-none")
        emailNextBtn.classList.add("cursor-not-allowed")
    })

    emailInput.addEventListener("input", () => {
        const emailValue = emailInput.value.trim()
        
        if (emailValue) {
            // Enable button when there's input
            emailNextBtn.classList.remove("opacity-40")
            emailNextBtn.classList.remove("pointer-events-none")
            emailNextBtn.classList.remove("cursor-not-allowed")

            // Only check for @ to hide alert if it was previously shown
            if (emailValue.includes("@")) {
                // Hide alert if @ is present
                if (emailAlert) {
                    emailAlert.classList.add("opacity-0")
                    emailAlert.classList.remove("opacity-100")
                }
            }
        } else {
            // Disable button when empty
            emailNextBtn.classList.add("opacity-40")
            emailNextBtn.classList.add("pointer-events-none")
            emailNextBtn.classList.add("cursor-not-allowed")
            
            // Hide alert when field is empty
            if (emailAlert) {
                emailAlert.classList.add("opacity-0")
                emailAlert.classList.remove("opacity-100")
            }
        }
    })

    // Note: Button click handling is done in index.js
    // This file only handles input events for button state and alert hiding
} else {
    console.warn("email contact form elements not found")
}