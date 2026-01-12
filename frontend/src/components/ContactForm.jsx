import { useState } from "react";
import "../styles/ContactForm.css";

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

      const data = await res.json();
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
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Get a Quote</h2>
        <p>Tell us about your project and we’ll get back to you.</p>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          <option value="SEO">SEO</option>
          <option value="Social Media Marketing">Social Media Marketing</option>
          <option value="Google Ads">Google Ads</option>
          <option value="Web Development">Web Development</option>
        </select>

        <textarea
          name="message"
          placeholder="Tell us about your requirements..."
          value={formData.message}
          onChange={handleChange}
        />

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

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
