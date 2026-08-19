import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { site } from "../data/site";

export default function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Contact AbaNtu Intelligence</span>
        <h1>Tell us about the problem.</h1>
        <p>You do not need a perfect brief. Start with what is not working, who it affects and what you want to change.</p>
      </div>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SectionHeading eyebrow="Direct contact" title="Let's explore the system together." />
            <div className="contact-details">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              <span>{site.location}</span>
            </div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <label>Name<input name="name" required /></label>
            <label>Organisation<input name="organisation" /></label>
            <label>Email<input type="email" name="email" required /></label>
            <label>What are you trying to solve?<textarea name="message" rows="7" required /></label>
            <button className="button button-primary" type="submit">{sent ? "Message prepared" : "Send enquiry"}</button>
            {sent && <p className="form-note">V1 form is ready for the Django contact endpoint. Connect POST /contact/ to persist enquiries.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}