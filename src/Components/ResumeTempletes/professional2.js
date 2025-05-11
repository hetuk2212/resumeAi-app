import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import Toast from 'react-native-toast-message';

// ---- STATIC DATA DEFINITION ----
const staticData = {
    personalInfo: {
      fullName: "Hetuk Patel",
      email: "hetuk2212@gmail.com",
      phone: "+91 7203954483",
      address: "Vastral, Ahmedabad",
      linkedIn: "linkedin.com/in/hetuk-patel-586127240",
      objective: "Passionate and results-driven React Developer with 1.5 years of professional experience in building scalable web and mobile applications. Skilled in React.js, React Native, and backend integration with a strong focus on performance and user experience. Seeking a challenging role to contribute to innovative projects and continue growing as a full-stack developer.",
    },
    skills: {
      technical: ["React JS", "React Native","Next Js", "Node.js", "Mongo DB", "AWS", "Docker", "CI/CD"],
      soft: ["Problem Solving", "Mentoring"]
    },
    experience: [
      {
        jobTitle: "React Native Developer (Intern to Full-time)",
        company: "BM Coder",
        startDate: "Jan 2023",
        endDate: "Jun 2024",
        location: "Prahlad Nagar, Ahmedabad, India",
        desc: "Started as intern and transitioned to full-time developer, Developed clone applications including Blinkit clone and Tinder clone",
        technologiesUsed: ["React Native", "JavaScript", "Firebase", "Redux"]
      },
      {
        jobTitle: "React Developer",
        company: "PM Communications",
        startDate: "Jul 2024",
        endDate: "Dec 2024",
        location: "ISCON, Ahmedabad, India",
        desc: "Developed both web and mobile applications using React.js and React Native, Built responsive UIs and implemented state management solutions",
        technologiesUsed: ["React.js", "React Native", "JavaScript", "REST APIs"]
      },
      {
        jobTitle: "React Developer",
        company: "Tankar Solutions Pvt Ltd",
        startDate: "Dec 2024",
        endDate: "Present",
        location: "Ahmedabad, India",
        desc: "Developed web and mobile applications including a traveling app, Implemented features for booking, user profiles, and location services",
        technologiesUsed: ["React.js", "React Native", "Node.js", "MongoDB"]
      }
    ],
    education: [
      {
        degree: "Bachelor of Engineering (B.E.)",
        fieldOfStudy: "Computer Engineering",
        institution: "SAL College of Engineering",
        location: "Ahmedabad, India",
        startYear: "2021",
        endYear: "2024",
        gpa: "8.45 CGPA"
      },
      {
        degree: "Diploma",
        fieldOfStudy: "Computer Engineering",
        institution: "L.J. Polytechnic",
        location: "Ahmedabad, India",
        startYear: "2018",
        endYear: "2021",
        gpa: "8.65 CGPA"
      }
    ],
    projects: [
      {
        name: "Meditation Music Player",
        description: "Created a mindfulness app with curated meditation music playlists and timer functionality",
        technologiesUsed: ["React Native", "Audio API", "Redux"],
      },
      {
        name: "Fitness Tracker App",
        description: "Developed a workout and nutrition tracking application with exercise demos and progress analytics",
        technologiesUsed: ["React Native", "Firebase", "Google Fit API"],
      },
      {
        name: "Forex Trading App",
        description: "Developed a comprehensive forex trading platform with web (React.js/Next.js) and mobile (React Native) applications featuring real-time trading, account management, and market analytics",
        technologiesUsed: ["React Native", "React.js", "Next.js", "WebSocket", "Chart.js", "Node.js"],
      },
      {
        name: "AdStar (Celebrity Booking Platform)",
        description: "Built a full-stack celebrity booking platform with both web (React.js/Next.js) and mobile (React Native) applications featuring profile management, booking system, and payment processing",
        technologiesUsed: ["React.js", "Next.js", "React Native", "MongoDB", "Payment Gateway"],
      },
      {
        name: "TripBnG.com (Travel Booking Platform)",
        description: "Developed a complete travel booking ecosystem with web (Next.js) and mobile (React Native) applications offering flight, hotel, visa, bus, and holiday package booking functionalities",
        technologiesUsed: ["React Native", "Next.js", "React.js", "Node.js", "REST APIs"],
      }
    ],
    languages: [
      {
        language: "Gujarati",
        proficiency: "Native"
      },
      {
        language: "Hindi",
        proficiency: "Fluent"
      },
      {
        language: "English",
        proficiency: "Professional Working"
      }
    ],
   
    interests: ["Technology", "Travel", "Music", "Reading"]  };

const Professional2 = () => {
  const [pdfPath, setPdfPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Use static data
  const data = staticData;
  const fullName = data.personalInfo.fullName;
  const [firstName, lastName] = fullName.split(' ');

  useEffect(() => {
    generatePDF();
    // eslint-disable-next-line
  }, []);

  const generatePDF = async () => {
    setLoading(true);
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
          line-height: 1.5;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 0;
          background-color: #ffffff;
        }
        .page {
          padding-top: 30px;
          padding-left: 30px;
          padding-right: 30px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 20px;
        }
        .name-container {
          flex: 2;
        }
        .name {
          font-size: 32px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 5px;
          letter-spacing: -0.5px;
        }
        .title {
          font-size: 16px;
          color: #7f8c8d;
          font-weight: 500;
          margin-bottom: 15px;
        }
        .contact-info {
          flex: 1;
          text-align: right;
          font-size: 13px;
          color: #555;
          line-height: 1.6;
        }
        .contact-info div {
          margin-bottom: 1px;
        }
        .section {
          margin-bottom: 10px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 2px solid #f0f0f0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .subsection {
          margin-bottom: 10px;
        }
        .subsection-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .job-title {
          font-weight: 600;
          font-size: 16px;
          color: #2c3e50;
        }
        .company {
          font-weight: 500;
          color: #3498db;
        }
        .date {
          color: #7f8c8d;
          font-size: 14px;
        }
        .location {
          font-style: italic;
          color: #7f8c8d;
          font-size: 14px;
          margin-bottom: 5px;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin-bottom: 8px;
          position: relative;
        }
        li:before {
          content: "•";
          color: #3498db;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 5px;
        }
        .skill-category {
          margin-bottom: 15px;
        }
        .skill-category-title {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        .skill-item {
          background-color: #f5f7fa;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 13px;
          color: #2c3e50;
          font-weight: 500;
        }
        .tech-used {
          font-size: 13px;
          color: #7f8c8d;
          margin-left:10px;
          font-style: italic;
        }
        .project-link {
          color: #3498db;
          text-decoration: none;
          font-size: 13px;
        }
        .education-degree {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .education-institution {
          font-weight: 500;
          color: #555;
        }
        .certification-name {
          font-weight: 600;
          margin-bottom: 3px;
        }
        .certification-org {
          color: #555;
          font-size: 14px;
        }
        .certification-date {
          color: #7f8c8d;
          font-size: 13px;
        }
        .language-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .language-name {
          font-weight: 500;
        }
        .language-proficiency {
          color: #7f8c8d;
        }
          .years{
          display: flex;,
        gap:1px;
          justify-content: start;
          }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="header">
          <div class="name-container">
            <div class="name">${fullName}</div>
            <div class="title">React Developer</div>
          </div>
          <div class="contact-info">
            <div>${data.personalInfo.email}</div>
            <div>${data.personalInfo.phone}</div>
            <div>${data.personalInfo.address}</div>
            ${data.personalInfo.linkedIn ? `<div>LinkedIn: ${data.personalInfo.linkedIn}</div>` : ''}
            ${data.personalInfo.github ? `<div>GitHub: ${data.personalInfo.github}</div>` : ''}
          </div>
        </div>
    
        ${data.personalInfo.objective ? `
        <div class="section">
          <div class="section-title">Profile</div>
          <p>${data.personalInfo.objective}</p>
        </div>
        ` : ''}
    
        <div class="section">
          <div class="section-title">Technical Skills</div>
          <div class="skills-container">
            ${data.skills.technical.map(skill => `
              <div class="skill-item">${skill}</div>
            `).join('')}
          </div>
        </div>
    
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${data.experience.map(exp => `
          <div class="subsection">
            <div class="subsection-header">
              <div>
                <span class="job-title">${exp.jobTitle}</span>
                <span class="company">, ${exp.company}</span>
              </div>
              <div class="date">${exp.startDate} — ${exp.endDate || 'Present'}</div>
            </div>
            <div class="location">${exp.location}</div>
            <ul>
              <p>${exp.desc}</p>
            </ul>
            ${exp.technologiesUsed ? `
            <div class="tech-used">Technologies: ${exp.technologiesUsed.join(', ')}</div>
            ` : ''}
          </div>
          `).join('')}
        </div>
    
        <div class="section">
          <div class="section-title">Education</div>
          ${data.education.map(edu => `
          <div class="subsection">
            <div class="education-degree">${edu.degree} in ${edu.fieldOfStudy}</div>
            <div class="education-institution">${edu.institution}</div>
            <div class="location">${edu.location}</div>
            <div class="years"><div class="date">${edu.startYear} — ${edu.endYear}</div>
            ${edu.gpa ? `<div class="tech-used">GPA: ${edu.gpa}</div>` : ''}</div>
          </div>
          `).join('')}
        </div>
    
        <div class="section">
          <div class="section-title">Projects</div>
          ${data.projects.map(project => `
          <div class="subsection">
            <div class="subsection-header">
              <div class="job-title">${project.name}</div>
              ${project.date ? `<div class="date">${project.date}</div>` : ''}
            </div>
            <p>${project.description}</p>
            ${project.technologiesUsed ? `
            <div class="tech-used">Technologies: ${project.technologiesUsed.join(', ')}</div>
            ` : ''}
            ${project.link ? `<div><a href="${project.link}" class="project-link">View Project</a></div>` : ''}
          </div>
          `).join('')}
        </div>
    
        
    
        ${data.languages.length > 0 ? `
        <div class="section">
          <div class="section-title">Languages</div>
          ${data.languages.map(lang => `
          <div class="language-item">
            <div class="language-name">${lang.language}</div>
            <div class="language-proficiency">${lang.proficiency}</div>
          </div>
          `).join('')}
        </div>
        ` : ''}
    
        ${data.interests.length > 0 ? `
        <div class="section">
          <div class="section-title">Interests</div>
          <div class="skills-container">
            ${data.interests.map(int => `
              <div class="skill-item">${int}</div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </body>
    </html>
        `;
    

    try {
      const options = {
        html: htmlContent,
        fileName: `Resume_${fullName.replace(/\s+/g, '_')}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      setPdfPath(file.filePath);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF');
      setLoading(false);
    }
  };

  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 29) {
          return true;
        }
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download files',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const downloadPDF = async () => {
    if (!pdfPath) return;

    try {
      setDownloading(true);

      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission denied', 'Cannot save file without permission');
        return;
      }

      let destinationPath;
      let fileName = `Resume_${fullName.replace(/\s+/g, '_')}.pdf`;

      if (Platform.OS === 'android') {
        if (Platform.Version >= 29) {
          destinationPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        } else {
          destinationPath = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;
        }
      } else {
        destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      }

      const dirPath = destinationPath.substring(0, destinationPath.lastIndexOf('/'));
      await RNFS.mkdir(dirPath);

      if (await RNFS.exists(destinationPath)) {
        await RNFS.unlink(destinationPath);
      }

      await RNFS.copyFile(pdfPath, destinationPath);

      if (Platform.OS === 'android') {
        await RNFS.scanFile(destinationPath);
      }

      Toast.show({
        type: 'success',
        text1: 'Resume Downloaded!',
        text2: `Saved to Downloads folder`,
        position: 'bottom',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Download error:', error);
      Toast.show({
        type: 'error',
        text1: 'Download Failed',
        text2: 'Please try again or check storage permissions',
        position: 'bottom',
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Preview Resume</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : pdfPath ? (
        <View
          style={{
            width: '100%',
            height: 500,
            borderWidth: 1,
            borderColor: '#ddd',
          }}>
          <Pdf
            source={{ uri: pdfPath, cache: true }}
            style={{ flex: 1 }}
            onError={error => console.log(error)}
          />
        </View>
      ) : (
        <Text style={{ color: 'red' }}>Failed to generate PDF</Text>
      )}

      <TouchableOpacity
        onPress={downloadPDF}
        disabled={downloading}
        style={{
          backgroundColor: downloading ? 'gray' : 'green',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}>
        {downloading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', fontSize: 16 }}>Download Resume</Text>
        )}
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default Professional2;
