// Contact Data Manager - Handles all form data collection and EmailJS integration
class ContactDataManager {
    constructor() {
        this.formData = {
            name: '',
            email: '',
            message: ''
        }
        this.initializeEmailJS()
    }

    // Initialize EmailJS with your credentials
    initializeEmailJS() {
        // TODO: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('tz7YrArNb_QP7kc1i')
    }

    // Store name data (field cleared in timeline after transition)
    setName(name) {
        this.formData.name = name
        console.log('Name stored:', name)
    }

    // Store email data - field clearing handled in index.js after validation
    setEmail(email) {
        this.formData.email = email
        console.log('Email stored:', email)
    }

    // Store message data (field cleared in timeline after transition)
    setMessage(message) {
        this.formData.message = message
        console.log('Message stored:', message)
    }

    // Get all collected data
    getFormData() {
        return { ...this.formData }
    }

    // Send email via EmailJS
    async sendEmail() {
        try {
            // Template parameters for EmailJS
            const templateParams = {
                from_name: this.formData.name,
                from_email: this.formData.email,
                message: this.formData.message,
                to_name: 'Rajbeer Saha', // Your name
                reply_to: this.formData.email
            }

            console.log('Sending email with data:', templateParams)

            // TODO: Replace these with your actual EmailJS credentials
            const response = await emailjs.send(
                'service_sudul45',    // Replace with your EmailJS service ID
                'template_4cix1a9',   // Replace with your EmailJS template ID
                templateParams
            )

            console.log('Email sent successfully:', response)
            
            // Clear the stored data after successful send
            this.clearData()
            
            return { success: true, response }

        } catch (error) {
            console.error('Failed to send email:', error)
            return { success: false, error }
        }
    }

    // Clear all stored data (fields are cleared individually during the form flow)
    clearData() {
        this.formData = {
            name: '',
            email: '',
            message: ''
        }
        
        console.log('Form data cleared')
    }

    // Validate if all required data is collected
    isDataComplete() {
        return this.formData.name.trim() !== '' && 
               this.formData.email.trim() !== '' && 
               this.formData.message.trim() !== ''
    }
}

// Create global instance
export const contactDataManager = new ContactDataManager()
