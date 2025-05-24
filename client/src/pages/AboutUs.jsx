import React from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  const teamMembers = [
    { name: "Amratanshu Mishra", role: "Full Stack Developer" },
    // { name: "Govind Kumar Kalvar", role: "Database & Deployment Overseer" },
    // { name: "Bakhtyar Ansari", role: "UI/UX Designer & Frontend Developer" },
    // { name: "Divyansh Pathak", role: "Quality Assurance Engineer" },
    // { name: "Gourav Kumar Panday", role: "Technical Documentation Lead" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="about-us-container">
        <header className="about-us-header">
          <h1 className="about-us-title">About My Gardeners' Forum</h1>
        </header>
        <main className="about-us-main">
          {/* <section className="about-us-section">
            <h2 className="about-us-subtitle">My Mission</h2>
            <p className="about-us-text">
              We aim to cultivate a thriving community where gardeners of all
              levels can share knowledge, exchange ideas, and grow together. My
              forum is a nurturing space for green thumbs and plant enthusiasts
              to connect and flourish.
            </p>
          </section> */}
          <section className="about-us-section">
            <h2 className="about-us-subtitle">Who I Am</h2>
            <p className="about-us-text">
              Hi, I’m Amratanshu Mishra, a passionate software developer with a
              strong foundation in full-stack development and a keen interest in
              creating smart, user-focused digital solutions. I hold a
              Bachelor’s in Computer Applications from Lucknow University and am
              currently pursuing my Master’s in Computer Applications at Amity
              University. My journey in tech has been driven by curiosity and
              the desire to build things that make life easier and more
              connected. From crafting intuitive web apps with React.js and
              Node.js to exploring machine learning applications and Android
              development, I’m always eager to learn and take on new challenges.
              This website is a reflection of my work, creativity, and
              dedication. Whether it’s a pet adoption app, a career guidance
              platform, or a rental service website, each project is built with
              care and purpose. I believe technology, when used right, can truly
              make a difference. Thank you for visiting—feel free to explore,
              connect, or collaborate!
            </p>
          </section>
          {/* <section className="about-us-section">
            <h2 className="about-us-subtitle">Our Team</h2>
            <div className="team-members-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member-card">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                </div>
              ))}
            </div>
          </section> */}
          {/* <section className="about-us-section">
            <h2 className="about-us-subtitle">Join Our Community</h2>
            <p className="about-us-text">
              Whether you're tending to your first seedling or managing a
              full-fledged garden, there's a place for you here. Share your
              experiences, seek advice, and be part of a supportive network of
              fellow gardening enthusiasts.
            </p>
            <button
              className="about-us-button"
              onClick={() => {
                navigate("/login");
                console.log("Button clicked!");
              }}
            >
              Start Growing With Us
            </button>
          </section> */}
        </main>
      </div>
      <Footer />
    </>
  );
}
