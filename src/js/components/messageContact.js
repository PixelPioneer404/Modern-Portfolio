import { gsap } from "gsap"
import { contactDataManager } from './contactDataManager.js'

// Function to update contact start page messages based on submission history
export function updateContactMessages() {
    const hasSubmittedBefore = localStorage.getItem('contactFormSubmitted') === 'true'

    if (hasSubmittedBefore) {
        // Update messages for returning users
        const titleElement = document.querySelector('#start-contact h3')
        const subtitleElement = document.querySelector('#start-contact p')

        if (titleElement && subtitleElement) {
            titleElement.textContent = "Want to talk more?"
            subtitleElement.textContent = "Let's create a fabulous team together"
            console.log("Contact messages updated for returning user")
        } else {
            console.warn("Contact message elements not found")
        }
    } else {
        console.log("First-time user - showing default contact messages")
    }
}

// Utility function to reset contact form submission history (for testing)
export function resetContactFormHistory() {
    localStorage.removeItem('contactFormSubmitted')
    console.log("Contact form submission history reset")

    // Reset to default messages
    const titleElement = document.querySelector('#start-contact h3')
    const subtitleElement = document.querySelector('#start-contact p')

    if (titleElement) {
        titleElement.textContent = "Ready to collaborate?"
    }

    if (subtitleElement) {
        subtitleElement.textContent = "Let's create something amazing together"
    }
}

export function animateSubmitBtn() {
    const submitBtn = document.querySelector("#submit-btn")
    const submitBtnSubmit = document.querySelector("#submit-btn-submit")
    const messageField = document.querySelector("#form-message")

    // Add null check to prevent errors
    if (!submitBtnSubmit || !submitBtn) {
        console.error("Submit button elements not found!")
        return
    }

    // Collect message data before starting animation
    if (messageField && messageField.value.trim()) {
        contactDataManager.setMessage(messageField.value.trim())
        console.log("Message collected and stored:", messageField.value.trim())
    }

    // Show "Sending..." immediately and disable button
    submitBtnSubmit.textContent = "Sending..."
    submitBtn.classList.add("pointer-events-none")

    // Start the sending animation/state
    gsap.to(submitBtnSubmit, {
        opacity: 0.6,
        duration: 0.3,
        ease: "power2.out"
    })

    // Real EmailJS integration
    async function handleEmailSubmission() {
        try {
            // Validate that all data is collected
            if (!contactDataManager.isDataComplete()) {
                throw new Error("Incomplete form data")
            }

            console.log("Sending email with collected data:", contactDataManager.getFormData())

            // Send email via EmailJS using collected data
            const result = await contactDataManager.sendEmail()

            if (!result.success) {
                throw new Error(result.error)
            }

            // SUCCESS: Email sent successfully
            console.log("Email sent successfully!")

            // Mark as submitted in localStorage for future visits
            localStorage.setItem('contactFormSubmitted', 'true')

            // Success animation - show "Sent!" message
            gsap.to(submitBtnSubmit, {
                textContent: "Sent!",
                opacity: 1,
                color: "#22c55e", // Green color
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    // Wait 1 second then reset
                    setTimeout(resetSubmitButton, 1000)
                }
            })

        } catch (error) {
            // ERROR: Email sending failed
            console.error("Failed to send email:", error)

            // Error animation - show "Failed!" message
            gsap.to(submitBtnSubmit, {
                textContent: "Failed!",
                opacity: 1,
                color: "#ef4444", // Red color
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    // Wait 1 second then reset
                    setTimeout(resetSubmitButton, 1000)
                }
            })
        }
    }

    // Helper function to reset button to original state
    function resetSubmitButton() {
        submitBtnSubmit.textContent = "Submit"
        submitBtnSubmit.style.color = "" // Reset to original color

        // Re-enable button clicks
        submitBtn.classList.remove("pointer-events-none")

        gsap.to(submitBtnSubmit, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    // Start the email submission process
    handleEmailSubmission()
}