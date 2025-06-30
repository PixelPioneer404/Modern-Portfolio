import { gsap } from "gsap"

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
    const submitBtnSubmit = document.querySelector("#submit-btn-submit")
    
    // Add null check to prevent errors
    if (!submitBtnSubmit) {
        console.error("Submit button element not found!")
        return
    }
    
    let messageTl = gsap.timeline({ paused: true })

    // Show "Sending..." immediately
    submitBtnSubmit.textContent = "Sending..."

    // Start the sending animation/state
    messageTl.to(submitBtnSubmit, {
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out"
    })

    // Simulate async emailJS operation with try-catch
    async function handleEmailSubmission() {
        try {
            // TODO: Replace this with actual emailJS implementation
            // Example: await emailjs.send('service_id', 'template_id', templateParams)

            // Simulate async operation for now (2000ms delay)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Change this to reject() to test error handling
                    resolve("Email sent successfully")
                }, 2000)
            })

            // SUCCESS: Email sent successfully
            console.log("Email sent successfully!")
            
            // Mark as submitted in localStorage for future visits
            localStorage.setItem('contactFormSubmitted', 'true')

            // Success animation - show "Sent!" message
            messageTl
                .to(submitBtnSubmit, {
                    textContent: "Sent!",
                    opacity: 1,
                    color: "#22c55e", // Green color
                    duration: 0.3,
                    ease: "power2.out"
                })
                // Wait for 1000ms before resetting
                .to({}, { duration: 1 })
                .call(resetSubmitButton)

        } catch (error) {
            // ERROR: Email sending failed
            console.error("Failed to send email:", error)

            // Error animation - show "Failed!" message
            messageTl
                .to(submitBtnSubmit, {
                    textContent: "Failed!",
                    opacity: 1,
                    color: "#ef4444", // Red color
                    duration: 0.3,
                    ease: "power2.out"
                })
                // Wait for 1000ms before resetting
                .to({}, { duration: 1 })
                .call(resetSubmitButton)
        }
    }

    // Helper function to reset button to original state
    function resetSubmitButton() {
        submitBtnSubmit.textContent = "Submit"
        submitBtnSubmit.style.color = "" // Reset to original color

        gsap.to(submitBtnSubmit, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    // Start the email submission process
    handleEmailSubmission()

    // Play the initial animation
    messageTl.play()
}