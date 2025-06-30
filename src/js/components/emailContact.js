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
        if (emailInput.value.trim()) {
            // Enable button
            emailNextBtn.classList.remove("opacity-40")
            emailNextBtn.classList.remove("pointer-events-none")
            emailNextBtn.classList.remove("cursor-not-allowed")

            if (emailInput.value.includes("@")) {
                emailAlert.classList.add("opacity-0")
                emailAlert.classList.remove("opacity-100")
            }
        } else {
            // Disable button
            emailNextBtn.classList.add("opacity-40")
            emailNextBtn.classList.add("pointer-events-none")
            emailNextBtn.classList.add("cursor-not-allowed")
        }
    })
} else {
    console.warn("email contact form elements not found")
}