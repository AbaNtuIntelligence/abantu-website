import SectionHeading from "../ui/SectionHeading";

export default function Impact() {
  const points = [
    ["01", "Start with the problem", "We map the operational, human and institutional challenge before choosing a technology."],
    ["02", "Build the system", "We turn the model into a usable digital product with a maintainable technical foundation."],
    ["03", "Create room to grow", "We design modularly so a useful first release can become a larger platform over time."],
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Our philosophy" title="Technology should solve something." text="AbaNtu Intelligence exists because digital transformation is most valuable when it makes a real system work better for real people." />
        <div className="three-grid">
          {points.map(([n, title, text]) => (
            <div className="principle" key={n}>
              <span>{n}</span><h3>{title}</h3><p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}