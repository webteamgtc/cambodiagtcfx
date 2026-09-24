// Shared OTP store module for secure OTP storage and verification

// In-memory OTP stores (fallback for same instance)
// Use global to ensure sharing across imports in the same process
if (!global.phoneOtpStore) {
  global.phoneOtpStore = new Map();
  global.emailOtpStore = new Map();
}
export const phoneOtpStore = global.phoneOtpStore;
export const emailOtpStore = global.emailOtpStore;

// OTP expiration time: 10 minutes
export const OTP_TTL = 10 * 60 * 1000;

// Cleanup interval: 5 minutes
export const CLEANUP_INTERVAL = 5 * 60 * 1000;

// Cleanup expired OTPs periodically
setInterval(() => {
  const now = Date.now();
  
  // Cleanup phone OTPs
  for (const [phone, data] of phoneOtpStore.entries()) {
    if (data.expiresAt < now) {
      phoneOtpStore.delete(phone);
    }
  }
  
  // Cleanup email OTPs
  for (const [email, data] of emailOtpStore.entries()) {
    if (data.expiresAt < now) {
      emailOtpStore.delete(email);
    }
  }
}, CLEANUP_INTERVAL);

// Helper function to sanitize phone number for storage key
export const sanitizePhone = (phone = "") => phone.toString().replace(/[^\d]/g, "");

// Store OTP using both in-memory and shared API endpoint
export const storeOtp = async (type, identifier, otp) => {
  const expiresAt = Date.now() + OTP_TTL;
  
  if (type === "phone") {
    const phoneKey = sanitizePhone(identifier);
    const otpData = {
      otp: otp,
      expiresAt: expiresAt,
      phone: identifier,
    };
    
    // Store in-memory (for same instance)
    phoneOtpStore.set(phoneKey, otpData);
    emailOtpStore.set(`phone_${phoneKey}`, otpData);
    
    // Also store via shared API endpoint (works across instances)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/otp-storage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "store",
          type: "phone",
          identifier: identifier,
          otp: otp,
        }),
      });
    } catch (error) {
      console.error("Failed to store OTP via API:", error);
    }
    
    console.log("OTP stored - Phone key:", phoneKey, "OTP:", otp);
  } else if (type === "email") {
    const emailKey = identifier.toLowerCase();
    const otpData = {
      otp: otp,
      expiresAt: expiresAt,
      email: identifier,
    };
    
    emailOtpStore.set(emailKey, otpData);
    
    // Also store via shared API endpoint
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/otp-storage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "store",
          type: "email",
          identifier: identifier,
          otp: otp,
        }),
      });
    } catch (error) {
      console.error("Failed to store OTP via API:", error);
    }
  }
};

// Verify OTP - check both in-memory and shared API endpoint
export const verifyOtp = async (type, identifier, otp) => {
  let storedOtpData = null;
  
  if (type === "phone") {
    const phoneKey = sanitizePhone(identifier);
    
    // Try in-memory first (same instance)
    storedOtpData = phoneOtpStore.get(phoneKey) || emailOtpStore.get(`phone_${phoneKey}`);
    
    // If not found, try shared API endpoint (cross-instance)
    if (!storedOtpData) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/otp-storage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            type: "phone",
            identifier: identifier,
            otp: otp,
          }),
        });
        
        const result = await response.json();
        if (result.success) {
          return { success: true, message: result.message };
        } else {
          return { success: false, message: result.message };
        }
      } catch (error) {
        console.error("Failed to verify OTP via API:", error);
      }
    }
  } else if (type === "email") {
    const emailKey = identifier.toLowerCase();
    storedOtpData = emailOtpStore.get(emailKey);
    
    // If not found, try shared API endpoint
    if (!storedOtpData) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/otp-storage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            type: "email",
            identifier: identifier,
            otp: otp,
          }),
        });
        
        const result = await response.json();
        if (result.success) {
          return { success: true, message: result.message };
        } else {
          return { success: false, message: result.message };
        }
      } catch (error) {
        console.error("Failed to verify OTP via API:", error);
      }
    }
  }
  
  if (!storedOtpData) {
    console.log("OTP verification failed - Phone key:", type === "phone" ? sanitizePhone(identifier) : identifier);
    return { success: false, message: "No OTP found. Please request a new OTP." };
  }
  
  if (storedOtpData.expiresAt < Date.now()) {
    // Clean up expired OTP
    if (type === "phone") {
      const phoneKey = sanitizePhone(identifier);
      phoneOtpStore.delete(phoneKey);
      emailOtpStore.delete(`phone_${phoneKey}`);
    } else {
      emailOtpStore.delete(identifier.toLowerCase());
    }
    return { success: false, message: "OTP has expired. Please request a new OTP." };
  }
  
  if (storedOtpData.otp === otp) {
    // OTP verified - remove it (one-time use)
    if (type === "phone") {
      const phoneKey = sanitizePhone(identifier);
      phoneOtpStore.delete(phoneKey);
      emailOtpStore.delete(`phone_${phoneKey}`);
    } else {
      emailOtpStore.delete(identifier.toLowerCase());
    }
    return { success: true, message: "OTP verified successfully." };
  }
  
  return { success: false, message: "Invalid OTP. Please try again." };
};

