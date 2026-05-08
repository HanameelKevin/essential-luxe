"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./NewOrder.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Check, 
  MapPin, 
  Plane, 
  Ship, 
  Hash, 
  FileText, 
  Send,
  Loader2,
  X
} from "lucide-react";

const STEPS = [
  "Details & Image",
  "Source",
  "Shipping",
  "Quantity",
  "Notes",
  "Confirm"
];

export default function NewOrder() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    imageUrl: "",
    sourceLocation: "",
    shippingMethod: "",
    quantity: 1,
    notes: ""
  });

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "essential_luxe"); // You'll need to set this up in Cloudinary

    try {
      // For this demo, we'll use a local API route that would handle Cloudinary
      // In a real app, you'd upload directly to Cloudinary or via your server
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setFormData({ ...formData, imageUrl: result.url });
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/dashboard?ordered=true");
      } else {
        const error = await res.json();
        alert(error.message || "Failed to submit order");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.productName && formData.description;
      case 1: return formData.sourceLocation !== "";
      case 2: return formData.shippingMethod !== "";
      case 3: return formData.quantity > 0;
      case 4: return true; // Notes are optional
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      
      <main className="container">
        <div className={styles.orderFlowContainer}>
          <div className={styles.flowHeader}>
            <h1>Create New Request</h1>
            <div className={styles.progressTracker}>
              {STEPS.map((step, i) => (
                <div key={i} className={`${styles.progressStep} ${i <= currentStep ? styles.active : ""} ${i < currentStep ? styles.completed : ""}`}>
                  <div className={styles.stepDot}>
                    {i < currentStep ? <Check size={12} /> : i + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.stepContent}
              >
                {currentStep === 0 && (
                  <div className={styles.stepFields}>
                    <div className={styles.formGroup}>
                      <label>Product Name</label>
                      <input 
                        type="text" 
                        value={formData.productName}
                        onChange={(e) => setFormData({...formData, productName: e.target.value})}
                        placeholder="e.g. Luxury Velvet Sofa"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Description</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe the item in detail (size, color, material...)"
                        rows={4}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Product Image (Optional)</label>
                      <div className={styles.imageUploadArea}>
                        {formData.imageUrl ? (
                          <div className={styles.imagePreview}>
                            <img src={formData.imageUrl} alt="Preview" />
                            <button onClick={() => setFormData({...formData, imageUrl: ""})} className={styles.removeImage}>
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label className={styles.uploadPlaceholder}>
                            {uploadingImage ? (
                              <Loader2 className={styles.spinner} />
                            ) : (
                              <>
                                <Upload size={32} />
                                <span>Click to upload image</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                              </>
                            )}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className={styles.selectionGrid}>
                    <h2>Where is the product located?</h2>
                    <div className={styles.options}>
                      <button 
                        className={`${styles.optionBtn} ${formData.sourceLocation === "China" ? styles.selected : ""}`}
                        onClick={() => setFormData({...formData, sourceLocation: "China"})}
                      >
                        <MapPin />
                        <span>China</span>
                      </button>
                      <button 
                        className={`${styles.optionBtn} ${formData.sourceLocation === "USA" ? styles.selected : ""}`}
                        onClick={() => setFormData({...formData, sourceLocation: "USA"})}
                      >
                        <MapPin />
                        <span>USA</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={styles.selectionGrid}>
                    <h2>Choose Shipping Method</h2>
                    <div className={styles.options}>
                      <button 
                        className={`${styles.optionBtn} ${formData.shippingMethod === "Air" ? styles.selected : ""}`}
                        onClick={() => setFormData({...formData, shippingMethod: "Air"})}
                      >
                        <Plane />
                        <div className={styles.optionInfo}>
                          <span>Air Shipping</span>
                          <small>~15 Days Timeline</small>
                        </div>
                      </button>
                      <button 
                        className={`${styles.optionBtn} ${formData.shippingMethod === "Sea" ? styles.selected : ""}`}
                        onClick={() => setFormData({...formData, shippingMethod: "Sea"})}
                      >
                        <Ship />
                        <div className={styles.optionInfo}>
                          <span>Sea Shipping</span>
                          <small>35–45 Days Timeline</small>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className={styles.stepFields}>
                    <h2>Quantity</h2>
                    <div className={styles.formGroup}>
                      <label>How many items?</label>
                      <div className={styles.quantityInput}>
                        <button onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}>-</button>
                        <input 
                          type="number" 
                          value={formData.quantity}
                          onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                        />
                        <button onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}>+</button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className={styles.stepFields}>
                    <h2>Additional Notes</h2>
                    <div className={styles.formGroup}>
                      <label>Any specific instructions?</label>
                      <textarea 
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="e.g. Fragile item, gift wrapping needed, or link to product..."
                        rows={6}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className={styles.confirmationReview}>
                    <h2>Review Your Request</h2>
                    <div className={styles.reviewGrid}>
                      <div className={styles.reviewItem}>
                        <span>Product</span>
                        <p>{formData.productName}</p>
                      </div>
                      <div className={styles.reviewItem}>
                        <span>Source</span>
                        <p>{formData.sourceLocation}</p>
                      </div>
                      <div className={styles.reviewItem}>
                        <span>Shipping</span>
                        <p>{formData.shippingMethod} (~{formData.shippingMethod === 'Air' ? '15' : '35-45'} days)</p>
                      </div>
                      <div className={styles.reviewItem}>
                        <span>Quantity</span>
                        <p>{formData.quantity}</p>
                      </div>
                    </div>
                    {formData.imageUrl && (
                      <div className={styles.reviewImage}>
                        <img src={formData.imageUrl} alt="Product" />
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className={styles.formActions}>
              <button 
                className={styles.backBtn} 
                onClick={handleBack}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ArrowLeft size={18} /> Back
              </button>
              
              {currentStep === STEPS.length - 1 ? (
                <button 
                  className={styles.submitBtn} 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className={styles.spinner} /> : <>Submit Order <Send size={18} /></>}
                </button>
              ) : (
                <button 
                  className={styles.nextBtn} 
                  onClick={handleNext}
                  disabled={!isStepValid() || uploadingImage}
                >
                  Next <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
