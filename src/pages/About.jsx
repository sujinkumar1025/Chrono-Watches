function About() {
  return (
    <div className="about-page">

      {/* SECTION 1 — STORY */}
      <section className="about-story">
        <div className="about-container">

          <div className="about-left">
            <div className="about-eyebrow">Our Story</div>

            <h2 className="about-title">
              Crafted Beyond <em>Time</em>
            </h2>

            <p className="about-text">
              We don’t just create watches — we craft timeless experiences.
              Every piece reflects precision, heritage, and modern elegance.
            </p>

            <p className="about-text">
              From luxury icons to performance-driven designs, our collections
              are built for those who value detail, durability, and distinction.
            </p>
          </div>

          <div className="about-right">
            <div className="about-timeline">
              <div className="eyebrow-sm">Our Journey</div>
              <div className="timeline-heading">A legacy built <em>through time</em></div>
              <div className="timeline-sub">
                From a single vision to a global collection — every milestone shaped who we are.
              </div>
              <div className="timeline">
                {[
                  { year: "2010", title: "The First Timepiece", desc: "Founded in Geneva, our first collection of 12 watches sold out in 48 hours.", active: true },
                  { year: "2014", title: "Global Expansion", desc: "Opened flagship boutiques in London, Tokyo, and New York." },
                  { year: "2018", title: "Master Certification", desc: "Became the first independent retailer to achieve full horological authentication." },
                  { year: "2022", title: "10,000 Owners", desc: "Reached 10,000 happy owners across 42 countries worldwide." },
                  { year: "2025", title: "The Digital Era", desc: "Launched our curated online platform — bringing luxury timepieces to collectors everywhere." },
                ].map((item) => (
                  <div className={`timeline-item ${item.active ? "active" : ""}`} key={item.year}>
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — VALUES */}
      <section className="about-values">
        <div className="about-container">

          <div className="value-card">
            <h3>Precision</h3>
            <p>Engineered with unmatched accuracy and attention to detail.</p>
          </div>

          <div className="value-card">
            <h3>Luxury</h3>
            <p>Designed with premium materials and timeless aesthetics.</p>
          </div>

          <div className="value-card">
            <h3>Innovation</h3>
            <p>Blending tradition with cutting-edge watchmaking.</p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — CRAFT */}
      <section className="about-craft">
        <div className="about-container about-craft-grid">

          <div className="craft-image">⚙️</div>

          <div>
            <h2 className="about-title">Built with Purpose</h2>

            <p className="about-text">
              Each timepiece undergoes rigorous design and testing to ensure
              durability, performance, and elegance.
            </p>

            <p className="about-text">
              Our commitment is simple — deliver watches that last a lifetime.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4 — TRUST */}
      <section className="about-trust">
        <div className="about-container about-trust-row">

          <div>
            <div className="trust-num">10K+</div>
            <div className="trust-label">Customers</div>
          </div>

          <div>
            <div className="trust-num">4.9★</div>
            <div className="trust-label">Rating</div>
          </div>

          <div>
            <div className="trust-num">5 Years</div>
            <div className="trust-label">Warranty</div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default About;