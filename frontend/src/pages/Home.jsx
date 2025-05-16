// import React from "react";
// import styles from "./home.module.css";
// import Navbar from "./Navbar";
// import proctorImage from "../img/proctoringIllustration.png";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//     const theme = useSelector((state) => state.themeReducer.mode);
//     const navigate = useNavigate();

//     return (
//         <>
//             <Navbar />
//             <div className={styles.mainbox} data-theme={theme === "light" ? "" : "dark"}>
//                 <div className={styles.heroSection}>
//                     <div className={styles.left}>
//                         <h1 className={styles.burstText}>ProctorX</h1>
//                         <p className={styles.description}>
//                             ProctorX is a secure, AI-powered online proctoring system designed to uphold academic integrity during remote exams. With advanced monitoring features and comprehensive reports, educators can conduct fair assessments effortlessly.
//                         </p>
//                     </div>
//                     <div className={styles.right}>
//                         <img src={proctorImage} alt="Proctoring Illustration" className={styles.heroImage} />
//                     </div>
//                 </div>

//                 <div className={styles.featuresSection}>
//                     <h2>Why Choose ProctorX?</h2>
//                     <div className={styles.featuresGrid}>
//                         <div className={styles.featureCard}>
//                             <h4>AI-Powered Monitoring</h4>
//                             <p>Tracks suspicious behavior in real-time using advanced algorithms.</p>
//                         </div>
//                         <div className={styles.featureCard}>
//                             <h4>Detailed Reports</h4>
//                             <p>Generate comprehensive reports for every candidate post-exam.</p>
//                         </div>
//                         <div className={styles.featureCard}>
//                             <h4>Secure & Scalable</h4>
//                             <p>Built to handle exams at scale with end-to-end security.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className={styles.contact}>
//                     <h3>Contact Us</h3>
//                     <ul>
//                         <li><p>Email: support@proctorsphere.com</p></li>
//                         <li><p>Phone: +91 98765 43210</p></li>
//                         <li><p>Address: 123 Proctor Lane, Tech City, India</p></li>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// }

import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import styles from "./home.module.css";
import proctorImage from "../img/proctoringIllustration.png";

export default function Home() {
  // Get the theme from Redux store
  const theme = useSelector((state) => state.themeReducer.mode);
  
  return (
    <div className={styles.container} data-theme={theme === "light" ? "light" : "dark"}
>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.burstText}>ProctorX</h1>
          <p className={styles.heroSubtitle}>
            The intelligent proctoring solution for the modern educational institution
          </p>
          <p className={styles.heroParagraph}>
            ProctorX is a secure, AI-powered online proctoring system designed to uphold 
            academic integrity during remote exams. With advanced monitoring features and 
            comprehensive reports, educators can conduct fair assessments effortlessly.
          </p>
          {/* Buttons could be added here if needed */}
        </div>
        <div className={styles.heroImage}>
          <img src={proctorImage} alt="ProctorX proctoring illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose ProctorX?</h2>
          <p>Our comprehensive proctoring solution offers everything you need</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3>AI-Powered Monitoring</h3>
            <p>Tracks suspicious behavior in real-time using advanced algorithms and machine learning</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Detailed Reports</h3>
            <p>Generate comprehensive reports for every candidate post-exam with actionable insights</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Secure & Scalable</h3>
            <p>Built to handle exams at scale with end-to-end security and encryption</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔄</div>
            <h3>Easy Integration</h3>
            <p>Seamlessly integrates with your existing LMS and assessment platforms</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <h2>How ProctorX Works</h2>
          <p>A simple yet powerful process to ensure exam integrity</p>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineNumber}>1</div>
            <h3>Setup</h3>
            <p>Instructor configures exam settings and security parameters</p>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineNumber}>2</div>
            <h3>Identity Verification</h3>
            <p>Students verify their identity through multiple authentication methods</p>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineNumber}>3</div>
            <h3>Proctoring</h3>
            <p>AI monitors student behavior, environment, and screen activity</p>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineNumber}>4</div>
            <h3>Analysis</h3>
            <p>System generates reports highlighting potential violations</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
  <div className={styles.sectionHeader}>
    <h2>What Our Clients Say</h2>
    <p>Trusted by leading educational institutions worldwide</p>
  </div>
  <div className={styles.testimonialCards}>
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialText}>
        "ProctorX has transformed how we conduct remote assessments. The AI monitoring
        is incredibly accurate, and the detailed reports help us maintain academic integrity."
      </p>
      <div className={styles.testimonialAuthor}>
        <p className={styles.authorName}>Dr. Sadhana Kalmane</p>
        <p className={styles.authorTitle}>Dean of Academics, Tech University</p>
      </div>
    </div>
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialText}>
        "The ease of implementation and user-friendly interface make ProctorX stand out
        from other proctoring solutions. It has streamlined our online exam process and improved student satisfaction"
      </p>
      <div className={styles.testimonialAuthor}>
        <p className={styles.authorName}>Prof. Ananya Koundinya</p>
        <p className={styles.authorTitle}>IT Director, Global Education Institute</p>
      </div>
    </div>
    <div className={styles.testimonialCard}>
      <p className={styles.testimonialText}>
        "With ProctorX, we’ve significantly reduced incidents of malpractice during online exams.
        The real-time alerts and seamless integration with our LMS are game changers."
      </p>
      <div className={styles.testimonialAuthor}>
        <p className={styles.authorName}>Prof. Gourav Gowda</p>
        <p className={styles.authorTitle}>Examination Controller, Bright Future University</p>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statItem}>
          <h3>200+</h3>
          <p>Institutions</p>
        </div>
        <div className={styles.statItem}>
          <h3>1M+</h3>
          <p>Exams Proctored</p>
        </div>
        <div className={styles.statItem}>
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
        <div className={styles.statItem}>
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to transform your online assessments?</h2>
        <p>Join hundreds of institutions already using ProctorX to maintain academic integrity</p>
        {/* CTA buttons could be added here if needed */}
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h3>ProctorX</h3>
            <p>Secure, AI-powered online proctoring for academic integrity</p>
            <div className={styles.socialIcons}>
              {/* Social media icons would go here */}
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h4>Product</h4>
            <ul>
              <li>Features</li>
              <li>Security</li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Resources</h4>
            <ul>
              <li>Documentation</li>
              <li>Blog</li>
              <li>Case Studies</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className={styles.footerLinks}>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className={styles.footerContact}>
            <h4>Contact Us</h4>
            <p>Email: support@proctorx.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: 123 Proctor Lane, Tech City, India</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ProctorX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}