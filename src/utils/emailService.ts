import emailjs from '@emailjs/browser';

// EmailJS configuration - you'll need to get these from your EmailJS account
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
  TEMPLATE_ID_CONTACT: 'YOUR_CONTACT_FORM_TEMPLATE_ID',
  TEMPLATE_ID_NEWSLETTER: 'YOUR_NEWSLETTER_TEMPLATE_ID',
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'sayyed.adil@smadev.com',
      reply_to: formData.email,
      subject: `New Contact Form Message from ${formData.name}`,
      date: new Date().toLocaleString()
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
      templateParams
    );

    if (response.status === 200) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send message. Please try again.' };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: 'An error occurred while sending your message. Please try again later.' 
    };
  }
};

export const subscribeToNewsletter = async (emailData: NewsletterData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      subscriber_email: emailData.email,
      to_email: 'sayyed.adil@smadev.com',
      subject: 'New Newsletter Subscription',
      date: new Date().toLocaleString(),
      source: 'Website Footer'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_NEWSLETTER,
      templateParams
    );

    if (response.status === 200) {
      return { success: true, message: 'Successfully subscribed to newsletter!' };
    } else {
      return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { 
      success: false, 
      message: 'An error occurred during subscription. Please try again later.' 
    };
  }
};

// Fallback function for development/demo purposes
export const simulateEmailSend = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: 'Message sent successfully! (Simulation)' };
};