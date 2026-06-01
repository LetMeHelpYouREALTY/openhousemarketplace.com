'use client'

import React, { useState } from 'react'
import { trackMetaPixelEvent } from '@/lib/facebook-pixel'
import { useForm } from 'react-hook-form'
import { Mail, Phone, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  contactType: 'buyer' | 'seller' | 'investor' | 'general'
}

interface ContactFormProps {
  className?: string
  title?: string
  description?: string
  onSuccess?: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  className = "",
  title = "Send Us a Message",
  description = "Get in touch with Dr. Jan Duffy for all your Summerlin West real estate needs",
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Determine the appropriate email address based on contact type
      let emailAddress = 'contact@openhousemarketplace.com' // default
      
      switch (data.contactType) {
        case 'buyer':
          emailAddress = 'buyers@openhousemarketplace.com'
          break
        case 'seller':
          emailAddress = 'sellers@openhousemarketplace.com'
          break
        case 'investor':
          emailAddress = 'investors@openhousemarketplace.com'
          break
        case 'general':
        default:
          emailAddress = 'contact@openhousemarketplace.com'
          break
      }

      // Send email via API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          subject: data.subject,
          message: data.message,
          contactType: data.contactType,
          toEmail: emailAddress
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error((errorData as { error?: string }).error || `HTTP ${response.status}: ${response.statusText}`)
      }

      await response.json()

      trackMetaPixelEvent('Lead', { content_name: 'contact_form', content_category: data.contactType })
      setSubmitStatus('success')
      reset() // Clear the form
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess()
        }, 2000) // Close modal after 2 seconds
      } else {
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      }

    } catch (error) {
      console.error('Email submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
      
      // Reset error message after 10 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorMessage('')
      }, 10000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h4 className="text-xl font-bold mb-4 text-gray-900">{title}</h4>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-brand-mint/40 border border-brand-mint rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-brand-teal mr-3" />
          <span className="text-brand-plum">Thank you! Your message has been sent. We'll get back to you soon.</span>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-brand-mint/40 border border-brand-mint rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-brand-teal mr-3" />
          <span className="text-brand-plum">{errorMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              type="text"
              placeholder="Your Name"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border text-gray-900 placeholder-gray-500 focus:outline-none ${
                errors.name ? 'border-brand-plum focus:border-brand-plum' : 'border-gray-300 focus:border-brand-teal'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-brand-teal">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              type="email"
              placeholder="Email Address"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border text-gray-900 placeholder-gray-500 focus:outline-none ${
                errors.email ? 'border-brand-plum focus:border-brand-plum' : 'border-gray-300 focus:border-brand-teal'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-brand-teal">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              {...register('phone', {
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              type="tel"
              placeholder="Phone Number (optional)"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border text-gray-900 placeholder-gray-500 focus:outline-none ${
                errors.phone ? 'border-brand-plum focus:border-brand-plum' : 'border-gray-300 focus:border-brand-teal'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-brand-teal">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <select 
            {...register('contactType', { 
              required: 'Please select how we can help you' 
            })}
            className={`w-full px-4 py-2 rounded-lg border text-gray-900 focus:outline-none ${
              errors.contactType ? 'border-brand-plum focus:border-brand-plum' : 'border-gray-300 focus:border-brand-teal'
            }`}
          >
            <option value="">How can we help you?</option>
            <option value="buyer">I want to buy a home</option>
            <option value="seller">I want to sell my home</option>
            <option value="investor">I'm an investor</option>
            <option value="general">General inquiry</option>
          </select>
          {errors.contactType && (
            <p className="mt-1 text-sm text-brand-teal">{errors.contactType.message}</p>
          )}
        </div>
        
        <div>
          <input
            {...register('subject', { 
              required: 'Subject is required',
              minLength: { value: 5, message: 'Subject must be at least 5 characters' }
            })}
            type="text"
            placeholder="Subject"
            className={`w-full px-4 py-2 rounded-lg border text-gray-900 placeholder-gray-500 focus:outline-none ${
              errors.subject ? 'border-brand-plum focus:border-brand-plum' : 'border-gray-300 focus:border-brand-teal'
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-brand-teal">{errors.subject.message}</p>
          )}
        </div>
        
        <div>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              {...register('message', { 
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' }
              })}
              placeholder="Your message"
              rows={4}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border text-gray-900 placeholder-gray-500 focus:outline-none resize-none ${
                errors.message ? 'border-brand-plum focus:border-brand-plum' : 'border-gray-300 focus:border-brand-teal'
              }`}
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-brand-teal">{errors.message.message}</p>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-teal hover:bg-brand-plum disabled:bg-brand-stone text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
