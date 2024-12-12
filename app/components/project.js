"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useDisclosure } from "@nextui-org/modal";
import ProjectModal from "./project-modal";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, urls }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full rounded-lg overflow-hidden">
      <Image
        src={src}
        fill
        // width={400}
        // height={400}
        alt="fefa"
        className="absolute left-0 top-0 size-full object-center object-cover z-0"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-black/80">{title}</h1>
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onOpen}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 "
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20 text-white" />
            <p className="relative z-20 text-white">See details</p>
          </div>
        )}
      </div>
      <ProjectModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        content={description}
        title={title}
        urls={urls}
      />
    </div>
  );
};

export default function Projects() {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-28">
          <p className="text-lg text-blue-50">Projects</p>
          <p className="max-w-md  text-lg text-blue-50 opacity-50">
            Hi Dan,
            <br />
            This ePortfolio site is under development.
            <br />
            Here is the Project section, please click on the "See Details"
            button to see each Portfolio items description
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
            title="Penetration Testing"
            description={
              <>
                <>
                  1. What is it?
                  <br />
                  This project involved conducting penetration tests on
                  simulated IT environments to evaluate their security posture.
                  The goal was to identify vulnerabilities, exploit them to
                  demonstrate potential risks, and provide actionable
                  recommendations to mitigate these security flaws. The tests
                  included activities like network scanning, SQL injection,
                  command injection, and privilege escalation.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />
                  I chose this item because it showcases my ability to identify
                  and address security vulnerabilities in IT systems, an
                  essential skill in today’s cybersecurity landscape. It
                  highlights my practical knowledge in web security and
                  demonstrates my capacity to work through complex real-world
                  scenarios involving multiple attack vectors. This project also
                  reflects the depth of my technical expertise and my commitment
                  to securing digital infrastructures. <br />
                  <br />
                  3. Which Technical Skills are being demonstrated?
                  <br />
                  - Network Security: Conducted network scans using tools like
                  nmap to identify open ports and services
                  <br />
                  - Web Application Security: Used tools like dirb and nikto to
                  uncover misconfigurations and vulnerabilities in web
                  applications. <br />
                  - Exploitation Techniques: Performed SQL injection, command
                  injection, and privilege escalation to gain unauthorized
                  access and root privileges.
                  <br />- Penetration Testing Frameworks: Utilized tools like
                  Metasploit, Hydra, and Searchsploit for testing and
                  exploitation.
                  <br />- Linux Administration: Leveraged Kali Linux for testing
                  environments and manipulated file systems and processes during
                  exploits.
                </>
              </>
            }
            isComingSoon
            urls={[
              "https://eportfolio-asset.s3.us-east-2.amazonaws.com/Kali.jpg",
            ]}
          />
        </BentoTilt>

        <div className="md:grid h-[210vh] w-full md:grid-cols-2 md:grid-rows-5 flex flex-col gap-2 md:gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={<>Triptale</>}
              description={
                <>
                  1. What is it?
                  <br />
                  Triptale is a travel diary app built with Kotlin and Jetpack
                  Compose that simplifies travel planning and storytelling. It
                  allows users to discover new places using the Google Places
                  API, save locations locally and remotely, plan trips, and
                  share travel stories with the community.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />
                  I chose this project because it combines my passion for travel
                  with my technical skills in Android development. Triptale
                  addresses real-life challenges faced by travelers, such as
                  finding attractions, organizing trips, and sharing
                  experiences, and it allowed me to explore advanced features
                  like API integration and database synchronization while
                  building something meaningful and practical. <br />
                  <br />
                  3. Which Technical Skills are being demonstrated?
                  <br />
                  - Android Development: Built the app using Jetpack Compose for
                  a modern, declarative UI.
                  <br />
                  - API Integration: Integrated Google Places and Directions
                  APIs for seamless location discovery and trip planning. <br />
                  - Database Management: Managed local data with Room Database
                  and synchronized it with Firebase for cross-device
                  accessibility.
                  <br />- System Design: Designed a scalable architecture to
                  handle conflicts between local and remote storage.
                  <br />- Map Functionality: Utilized Google Maps to provide
                  users with a detailed view of nearby attractions and trip
                  directions.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/Triptale_home_screen.png",
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/Triptale_saved_screen.png",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:ms-0">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={"OWASP Top 10 Report"}
              description={
                <>
                  1. What is it?
                  <br />
                  This report focuses on the OWASP Top 10 vulnerabilities within
                  the context of a Next.js application. It provides a detailed
                  exploration of each vulnerability, examples of how they might
                  manifest in a web application, and specific mitigation
                  strategies. The documentation also reflects on challenges
                  faced and insights gained during the research process.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />
                  I chose this item to highlight my understanding of web
                  application security and my ability to integrate these
                  principles into real-world development scenarios. The report
                  demonstrates my proactive approach to identifying and
                  addressing vulnerabilities, ensuring robust and secure
                  applications. <br />
                  <br />
                  3. Which Technical Skills are being demonstrated?
                  <br />
                  - Web Application Security: In-depth analysis of the OWASP Top
                  10 vulnerabilities, including Broken Access Control,
                  Injection, and Security Misconfiguration.
                  <br />- Next.js Security Practices: Explored built-in features
                  like output escaping in JSX and secure routing to address
                  common vulnerabilities.
                  <br />
                  - Secure Development: Designed role-based access control
                  (RBAC) and implemented input validation to mitigate threats
                  like Injection and SSRF.
                  <br />- Cryptographic Controls: Applied best practices for
                  encrypting sensitive data and securely managing environment
                  variables.
                  <br />- Tooling Proficiency: Evaluated and used tools like
                  Clerk, NextAuth.js, and Content Security Policy (CSP) for
                  enhanced security.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/OWASP_TOP_10.png",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={<>Expense Management App</>}
              description={
                <>
                  1. What is it?
                  <br />
                  The Expense Management App is a web application built with
                  Next.js that helps users manage their finances by tracking
                  expenses and incomes. It features user authentication, data
                  visualization through bar charts, and intuitive interfaces for
                  financial record-keeping.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />
                  I selected this project to demonstrate my ability to develop a
                  practical and user-centric application using modern web
                  development practices. It combines functionality, security,
                  and data visualization, showcasing my technical versatility
                  and focus on delivering a seamless user experience. <br />
                  <br />
                  3. Which Technical Skills are being demonstrated?
                  <br />
                  - Full-Stack Development: Utilized Next.js for both frontend
                  and backend integration, with server-side rendering and API
                  routes for data handling.
                  <br />- User Authentication: Implemented secure authentication
                  using Clerk for user session management.
                  <br />
                  - Data Visualization: Created dynamic bar charts for expense
                  and income analysis using Chart.js.
                  <br />- Database Management: Structured financial data
                  efficiently, supporting both income and expense tracking
                  features.
                  <br />- Responsive Design: Ensured the app is fully functional
                  and visually appealing on different devices.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/expense_management_app.png",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={<>Full-Stack E-Commerce Platform</>}
              description={
                <>
                  1. What is it?
                  <br />
                  This project is a user-friendly e-commerce website built with
                  Ruby on Rails, featuring essential shopping functionalities
                  and an admin dashboard. The platform includes features like
                  product filtering, user authentication, order processing, and
                  a secure image management system.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />
                  I chose this project to showcase my ability to develop a
                  comprehensive web application that integrates multiple modern
                  technologies. It highlights my skills in building scalable
                  solutions and tackling real-world challenges in e-commerce
                  development. <br />
                  <br />
                  3. Which Technical Skills are being demonstrated?
                  <br />
                  - Backend Development: Used Ruby on Rails to create a robust
                  and scalable e-commerce platform.
                  <br />- Database Design: Designed and implemented a relational
                  database using PostgreSQL to manage products, orders, and user
                  data efficiently.
                  <br />
                  - Payment Integration: Implemented secure payment processing
                  using Stripe for seamless transactions.
                  <br />- Admin Management: Integrated Active Admin to manage
                  the database, user roles, and backend functionality
                  effectively.
                  <br />- Docker & Deployment: Containerized the application
                  using Docker for streamlined local hosting and deployment.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/fullstack.png",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:ms-0">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={<>Cloud Infrastructure Final Project</>}
              description={
                <>
                  1. What is it?
                  <br />
                  This project involved deploying and managing Nextcloud, an
                  open-source file-sharing and collaboration platform, on AWS.
                  The solution integrated AWS services such as EC2, S3, EFS, and
                  CloudWatch for deployment, storage, monitoring, and disaster
                  recovery. The project emphasized scalability, security, and
                  reliability by implementing best practices in cloud
                  infrastructure design.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />I chose this project to
                  demonstrate my ability to design and implement cloud-based
                  solutions for real-world applications. The project allowed me
                  to apply theoretical knowledge to practical challenges,
                  showcasing my proficiency in cloud services, security
                  auditing, and disaster recovery planning. <br />
                  <br />
                  3. Which Technical Skills are being demonstrated?
                  <br />
                  - Cloud Infrastructure Design: Set up a Virtual Private Cloud
                  (VPC) with secure subnets and configured security groups for
                  controlled access.
                  <br />- AWS Services Integration: Utilized EC2 for hosting, S3
                  for object storage, EFS for persistent configuration storage,
                  and CloudWatch for monitoring and alerting.
                  <br />
                  - Disaster Recovery: Designed and documented backup and
                  recovery processes using AWS Backup and lifecycle policies for
                  data retention.
                  <br />- Automation: Used Docker to containerize Nextcloud and
                  configured persistent volumes for storage consistency.
                  <br />
                  -Networking: Configured Dynamic DNS and Elastic IP for
                  seamless accessibility and scalability.
                  <br />
                  -Security Practices: Conducted a security audit using
                  Nextcloud’s security tools and AWS best practices to address
                  vulnerabilities and ensure secure access.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/msedge_NVQzka6nl0.png",
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/msedge_hy0nv90IEU.png",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={<>Plugged In Networking Event</>}
              description={
                <>
                  1. What is it?
                  <br />
                  The Plugged In Networking Event is a professional networking
                  session organized to bring together individuals from the tech
                  community to exchange insights, discuss industry trends, and
                  foster meaningful connections. The event I attended featured
                  Robert Craig from Canada Life Centre, who shared expert advice
                  on enhancing LinkedIn profiles and provided actionable tips
                  for professional networking. The session included lively
                  discussions and opportunities for attendees to connect and
                  expand their professional network.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />I chose this item
                  because it reflects my commitment to professional growth and
                  networking. The event provided valuable insights into building
                  an impactful LinkedIn profile and demonstrated my proactive
                  approach to engaging with industry professionals and staying
                  updated on career development strategies. <br />
                  <br />
                  3. Which Soft/Human Skills are being demonstrated?
                  <br />
                  - Networking: Actively engaged with peers and professionals
                  during the event, building connections and expanding my
                  network.
                  <br />- Communication: Participated in discussions about
                  LinkedIn optimization, exchanging ideas and learning from
                  others' experiences.
                  <br />
                  - Adaptability: Gained new perspectives on professional
                  branding and implemented actionable advice to improve my
                  online presence.
                  <br />- Continuous Learning: Showed a willingness to learn and
                  apply strategies for career development and effective
                  networking.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/plugged_in.png",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <BentoCard
              src="https://eportfolio-asset.s3.us-east-2.amazonaws.com/2665820.jpg"
              title={<>Inspire Conference</>}
              description={
                <>
                  1. What is it?
                  <br />
                  The Inspire Conference at Red River College is an event
                  designed to provide insights into various fields within
                  technology through speaker sessions and networking
                  opportunities. The conference featured topics like branding,
                  rapid app development, and streamlined local development
                  practices, delivered by industry professionals.
                  <br />
                  <br />
                  2. Why did you choose this item? <br />I chose this event
                  because it broadened my understanding of different aspects of
                  technology, from branding to development practices, and
                  provided hands-on learning experiences. It also encouraged me
                  to step out of my comfort zone and engage with professionals
                  in meaningful discussions, enhancing my learning beyond the
                  classroom. <br />
                  <br />
                  3. Which Soft/Human Skills are being demonstrated?
                  <br />
                  - Networking: Took the initiative to connect with
                  professionals during breaks, expanding my perspective and
                  building confidence in professional interactions.
                  <br />- Proactive Learning: Actively participated in
                  discussions and practical sessions, gaining insights into
                  branding, app development, and automation in software
                  projects.
                  <br />
                  - Adaptability: Overcame initial intimidation to engage with
                  attendees and speakers, making the most of the networking
                  opportunities.
                  <br />- Reflection and Growth: Recognized the value of
                  preparing for future conferences by researching speakers and
                  planning specific questions for more engaging discussions.
                </>
              }
              isComingSoon
              urls={[
                "https://eportfolio-asset.s3.us-east-2.amazonaws.com/inspired_conference.jpg",
              ]}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
              </h1>

              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
