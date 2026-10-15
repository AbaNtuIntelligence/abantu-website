import { useRef, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { site } from "../data/site";
import { apiFetch } from "../services/api";

export default function Contact() {
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const submitting = useRef(false);
  const submission = useRef(null);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: String(fields.get("name") || "").trim(),
      organisation: String(fields.get("organisation") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      message: String(fields.get("message") || "").trim(),
      website: String(fields.get("website") || ""),
    };
    const fingerprint = JSON.stringify(payload);
    // Keep the same key after a network timeout; changing the content starts a
    // new submission. Nothing containing visitor details is saved to storage.
    if (!submission.current || submission.current.fingerprint !== fingerprint) {
      submission.current = { fingerprint, id: crypto.randomUUID() };
    }
    submitting.current = true;
    setState("sending");
    setFeedback("");
    try {
      const result = await apiFetch("/enquiries/", {
        method: "POST",
        body: JSON.stringify({ ...payload, submission_id: submission.current.id }),
      });
      if (!result.reference || !result.message) {
        throw new Error("The server did not confirm receipt. Please retry or use the email link.");
      }
      setState("success");
      setFeedback(result.message);
      form.reset();
      submission.current = null;
    } catch (error) {
      setState("error");
      setFeedback(error.message);
    } finally {
      submitting.current = false;
    }
  }

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
          <form className="contact-form" onSubmit={submit} aria-busy={state === "sending"}>
            <fieldset disabled={state === "sending"}>
              <legend className="contact-sr-only">Send an enquiry to AbaNtu Intelligence</legend>
              <label>Name<input name="name" autoComplete="name" maxLength={150} required /></label>
              <label>Organisation<input name="organisation" autoComplete="organization" maxLength={200} /></label>
              <label>Email<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
              <label>What are you trying to solve?<textarea name="message" rows="7" minLength={10} maxLength={10000} required /></label>
              <div className="contact-honeypot" aria-hidden="true">
                <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <p className="contact-privacy">We’ll use these details to respond to your enquiry. Please avoid including passwords or sensitive personal documents.</p>
              <button className="button button-primary" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending enquiry…" : "Start the conversation"}
              </button>
            </fieldset>
            {feedback && <p className={`contact-feedback contact-feedback-${state}`} role={state === "error" ? "alert" : "status"}>{feedback}</p>}
            {state === "error" && <a className="contact-fallback" href={`mailto:${site.email}`}>Email {site.email} directly</a>}
          </form>
        </div>
      </section>
    </main>
  );
}
