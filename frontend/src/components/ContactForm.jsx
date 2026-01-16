import "../styles/ContactForm.css";
import { useState } from "react";

const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "none",
    utm_campaign: params.get("utm_campaign") || "none",
  };
};

const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  serviceInterest: "",
  message: "",
  consent: false,
  ...getUTMParams(),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
  setFormData({ ...formData, consent: e.target.checked });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ✅ 3. Consent check INSIDE submit */
    if (!formData.consent) {
      alert("Please provide consent to proceed");
      return;
    }

    if (onSuccess) onSuccess();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();

let data;
try {
  data = JSON.parse(text);
} catch {
  throw new Error("Server returned non-JSON response");
}

if (!res.ok) throw new Error(data.error || "Request failed");

      if (!res.ok) throw new Error(data.error);

      alert("Message sent successfully");

      /* ✅ 4. Reset but keep UTMs */
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceInterest: "",
        message: "",
        consent: false,
        ...getUTMParams(),
      });

    } catch (err) {
      alert("Something went wrong ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-wrapper">
      <div className="contact-card">

        {/* LEFT PANEL */}
        <div className="contact-left">
          <h2>Contact Information</h2>
          <p>
            We’ll create high-quality linkable content and
            build at least 40 high-authority.
          </p>

          <div className="contact-item">
            📞 <span>+8801779177686</span>
          </div>
          <div className="contact-item">
            📞 <span>+9886783686</span>
          </div>
          <div className="contact-item">
            ✉️ <span>support@metric.com</span>
          </div>
          <div className="contact-item">
            📍 <span>New York, USA</span>
          </div>

          <div className="circle-bg"></div>
        </div>

        {/* RIGHT PANEL */}
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="field">
                <label>Your Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
              </div>

              <div className="field">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field full">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              /><br/>
              <label>Select Service</label>
              <select
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                className="styled-select"

              >
                <option value="">Select Service</option>
                <option value="SEO">SEO</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Web Development">Web Development</option>
              </select>

              </div>
            <div className="field full">
              <label className="message-label">Message</label>
              <textarea
                name="message"
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={handleChange}
              /> 
              <br/>
              <div className="consent">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  required
                />
                <label>
                  I agree to the{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>{" "}
                  and consent to be contacted.
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit Request"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
