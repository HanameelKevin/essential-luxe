"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';

const steps = [
  { id: 'basic', label: 'Product Details', description: 'Tell us what you are looking for.' },
  { id: 'source', label: 'Origin Country', description: 'Where should we source it from?' },
  { id: 'shipping', label: 'Delivery Method', description: 'Choose your shipping speed.' },
  { id: 'final', label: 'Review & Submit', description: 'Almost there!' },
];

export default function ImportRequest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    sourceCountry: 'China',
    shippingMethod: 'Air',
    quantity: 1,
    notes: '',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-12">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-12 px-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center w-full relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-all duration-500 ${
                idx <= currentStep ? 'bg-black text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-400'
              }`}>
                {idx + 1}
              </div>
              <span className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap transition-colors ${
                idx === currentStep ? 'text-black opacity-100' : 'text-gray-400 opacity-60'
              }`}>
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-[2px] bg-gray-200 -z-0 transition-all duration-500 ${
                  idx < currentStep ? 'bg-black' : ''
                }`} style={{ width: 'calc(100% - 40px)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 min-h-[500px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-light text-black">Product Details</h2>
                    <p className="text-gray-400 mt-2">{steps[0].description}</p>
                  </div>
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Product Name</label>
                      <input
                        type="text"
                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        placeholder="e.g. iPhone 15 Pro Max Gold"
                        value={formData.productName}
                        onChange={(e) => setFormData({...formData, productName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Description / Link</label>
                      <textarea
                        rows={4}
                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        placeholder="Describe the item or paste a URL from the store..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-light text-black">Origin Country</h2>
                    <p className="text-gray-400 mt-2">{steps[1].description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['China', 'USA'].map((country) => (
                      <div
                        key={country}
                        onClick={() => setFormData({...formData, sourceCountry: country})}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-center ${
                          formData.sourceCountry === country ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg font-medium">{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-light text-black">Delivery Method</h2>
                    <p className="text-gray-400 mt-2">{steps[2].description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'Air', label: 'Air Shipping', time: '~15 Days', desc: 'Fast & Premium' },
                      { id: 'Sea', label: 'Sea Shipping', time: '35–45 Days', desc: 'Cost-effective Bulk' },
                    ].map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setFormData({...formData, shippingMethod: method.id})}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-left ${
                          formData.shippingMethod === method.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className="block text-lg font-medium">{method.label}</span>
                        <span className="block text-sm text-gray-500">{method.time}</span>
                        <span className="block text-xs text-gray-400 mt-1">{method.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-light text-black">Review & Submit</h2>
                    <p className="text-gray-400 mt-2">{steps[3].description}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Product</span> <span className="font-medium">{formData.productName || 'Not specified'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Source</span> <span className="font-medium">{formData.sourceCountry}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Shipping</span> <span className="font-medium">{formData.shippingMethod}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Quantity</span> <span className="font-medium">{formData.quantity}</span></div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Additional Notes</label>
                    <textarea
                      rows={3}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                      placeholder="Any specific requirements or instructions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-black'
              }`}
            >
              Back
            </button>
            <button
              onClick={currentStep === steps.length - 1 ? () => alert('Request Submitted!') : nextStep}
              className="bg-black text-white px-10 py-3 rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {currentStep === steps.length - 1 ? 'Submit Request' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
