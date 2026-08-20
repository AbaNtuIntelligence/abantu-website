import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { site } from "../data/site";

export default function Contact() {
  const [sent, setSent] = useState(false);
  function submit(e) { e.preventDefault(); setSent(true); }

  return (
    <main className="page">
      <div className="container page-intro">
        <span className="eyebrow">Start with intelligence</span>
        <h1>Bring us the problem, not the perfect brief.</h1>
        <p>Tell us what is not working, who it affects, what information already exists and what you want to become possible. We can determine what should remain human, what should be digital and where AI may add value.</p>
      </div>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SectionHeading eyebrow="Direct contact" title="Let's understand the system together." />
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
            <button className="button button-primary" type="submit">{sent ? "Message prepared" : "Start the conversation"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
