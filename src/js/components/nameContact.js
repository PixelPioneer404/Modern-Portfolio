const nameContactForm = document.querySelector("#name-contact-form")
const nameInput = nameContactForm?.querySelector("input")
const nameNextBtn = nameContactForm?.querySelector("button")

// Add null checks to prevent errors
if (nameContactForm && nameInput && nameNextBtn) {
    // Initialize button state on load
    window.addEventListener("load", () => {
        nameNextBtn.classList.add("opacity-40")
        nameNextBtn.classList.add("pointer-events-none")
        nameNextBtn.classList.add("cursor-not-allowed")
    })

    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim()) {
            // Enable button
            nameNextBtn.classList.remove("opacity-40")
            nameNextBtn.classList.remove("pointer-events-none")
            nameNextBtn.classList.remove("cursor-not-allowed")
        } else {
            // Disable button
            nameNextBtn.classList.add("opacity-40")
            nameNextBtn.classList.add("pointer-events-none")
            nameNextBtn.classList.add("cursor-not-allowed")
        }
    })
} else {
    console.warn("Name contact form elements not found")
}