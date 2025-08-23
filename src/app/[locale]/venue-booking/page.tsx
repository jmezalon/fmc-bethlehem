'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, Users, MapPin, Phone, Mail, User, FileText, CheckCircle } from 'lucide-react';

export default function VenueBookingPage() {
  const t = useTranslations('venue-booking');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    organization: '',
    
    // Event Details
    eventType: '',
    eventTitle: '',
    eventDescription: '',
    expectedAttendees: '',
    
    // Date & Time
    preferredDate: '',
    alternateDate: '',
    startTime: '',
    endTime: '',
    setupTime: '',
    
    // Requirements
    audioVisual: false,
    catering: false,
    decorations: false,
    parking: false,
    security: false,
    
    // Additional Information
    specialRequirements: '',
    previousEvents: '',
    budget: '',
  });

  const eventTypes = [
    { value: 'wedding', label: 'Wedding Ceremony' },
    { value: 'funeral', label: 'Funeral Service' },
    { value: 'concert', label: 'Concert/Musical Event' },
    { value: 'conference', label: 'Conference/Meeting' },
    { value: 'celebration', label: 'Celebration/Reception' },
    { value: 'community', label: 'Community Event' },
    { value: 'other', label: 'Other' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/venue-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit booking request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your booking request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Submitted</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your venue booking request. We have received your information and will contact you within 2-3 business days to discuss your event details and availability.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Next Steps:</strong> Our events coordinator will review your request and contact you to discuss pricing, availability, and any special requirements for your event.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '', email: '', phone: '', organization: '',
                  eventType: '', eventTitle: '', eventDescription: '', expectedAttendees: '',
                  preferredDate: '', alternateDate: '', startTime: '', endTime: '', setupTime: '',
                  audioVisual: false, catering: false, decorations: false, parking: false, security: false,
                  specialRequirements: '', previousEvents: '', budget: '',
                });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Venue Booking Request</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FMC Bethlehem is available for special events including weddings, funerals, concerts, conferences, and community gatherings. Please fill out this form to request booking information.
          </p>
        </div>

        {/* Venue Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-6 w-6 mr-2 text-blue-600" />
            Venue Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Capacity & Features</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Main sanctuary: 200-250 seated</li>
                <li>• Fellowship hall: 100-150 seated</li>
                <li>• Audio/visual equipment available</li>
                <li>• Piano and sound system</li>
                <li>• Kitchen facilities</li>
                <li>• Parking for 80+ vehicles</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Available Services</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Event coordination assistance</li>
                <li>• Setup and cleanup support</li>
                <li>• Security services (if needed)</li>
                <li>• Catering kitchen access</li>
                <li>• Decorating permissions</li>
                <li>• Flexible scheduling options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-6 w-6 mr-2 text-blue-600" />
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization (if applicable)
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Event Details
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="expectedAttendees" className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Number of Attendees *
                  </label>
                  <input
                    type="number"
                    id="expectedAttendees"
                    name="expectedAttendees"
                    value={formData.expectedAttendees}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title/Name *
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description *
                </label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe your event, its purpose, and any special considerations..."
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Date & Time Preferences
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="alternateDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Date
                </label>
                <input
                  type="date"
                  id="alternateDate"
                  name="alternateDate"
                  value={formData.alternateDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Start Time *
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Event End Time *
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="setupTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Setup Time Needed (hours before event)
                </label>
                <input
                  type="number"
                  id="setupTime"
                  name="setupTime"
                  value={formData.setupTime}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2 hours"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-2 text-blue-600" />
              Services & Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { name: 'audioVisual', label: 'Audio/Visual Equipment' },
                { name: 'catering', label: 'Kitchen/Catering Access' },
                { name: 'decorations', label: 'Decorating Permissions' },
                { name: 'parking', label: 'Parking Coordination' },
                { name: 'security', label: 'Security Services' },
              ].map(item => (
                <label key={item.name} className="flex items-center">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name as keyof typeof formData] as boolean}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements or Requests
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any special needs, accessibility requirements, or specific requests..."
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Budget Range (optional)
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $500-$1000"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting Request...' : 'Submit Booking Request'}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              We will contact you within 2-3 business days to discuss your event.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
