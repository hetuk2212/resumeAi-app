import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

const Simple1 = ({ data }) => {
  const [pdfPath, setPdfPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = async () => {
    setLoading(true);

    // Convert the data into HTML content for the resume
    const education = data.education.map(
      (edu) => `
        <li>${edu.course} at ${edu.university} (${edu.startYear} - ${edu.endYear}) - Grade: ${edu.grade}</li>
      `
    ).join('');

    const experience = data.experience.map(
      (exp) => `
        <li>
          <strong>${exp.position}</strong> at ${exp.company} (${new Date(exp.startDate).toLocaleDateString()} - ${new Date(exp.endDate).toLocaleDateString()})
          <p>${exp.description}</p>
        </li>
      `
    ).join('');

    const skills = data.skills.map(skill => `<li>${skill.skillName}</li>`).join('');
    const projects = data.projects.map(project => `<li><strong>${project.title}</strong>: ${project.description}</li>`).join('');
    const interests = data.interests.map(interest => `<li>${interest.interest}</li>`).join('');
    const achievements = data.achievements.map(achievement => `<li>${achievement.achievement}</li>`).join('');
    const languages = data.languages.map(language => `<li>${language.language}</li>`).join('');
    const activities = data.activities.map(activity => `<li>${activity.activity}</li>`).join('');

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            .info { margin-bottom: 10px; }
            ul { list-style-type: none; padding: 0; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <h1>${data.personalInfo.fullName}'s Resume</h1>
          <h2 class="info">Personal Information</h2>
          <p>Email: ${data.personalInfo.email}</p>
          <p>Phone: ${data.personalInfo.phone}</p>
          <p>Address: ${data.personalInfo.address}</p>

          <h2 class="info">Education</h2>
          <ul>${education}</ul>

          <h2 class="info">Experience</h2>
          <ul>${experience}</ul>

          <h2 class="info">Skills</h2>
          <ul>${skills}</ul>

          <h2 class="info">Projects</h2>
          <ul>${projects}</ul>

          <h2 class="info">Interests</h2>
          <ul>${interests}</ul>

          <h2 class="info">Achievements</h2>
          <ul>${achievements}</ul>

          <h2 class="info">Languages</h2>
          <ul>${languages}</ul>

          <h2 class="info">Activities</h2>
          <ul>${activities}</ul>

          <h2 class="info">Cover Letter</h2>
          <p>${data.coverLetter.content}</p>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'Resume',
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

  const downloadPDF = async () => {
    if (!pdfPath) return;

    const downloadPath =
      Platform.OS === 'android'
        ? `/storage/emulated/0/Download/Resume.pdf`
        : pdfPath;

    try {
      if (Platform.OS === 'android') {
        await RNFS.copyFile(pdfPath, downloadPath);
      }
      Alert.alert('PDF Saved', `Saved to: ${downloadPath}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save PDF');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Preview Resume</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : pdfPath ? (
        <View style={{ width: '90%', height: 400, borderWidth: 1, borderColor: '#ddd' }}>
          <Pdf source={{ uri: pdfPath, cache: true }} style={{ flex: 1 }} onError={(error) => console.log(error)} />
        </View>
      ) : (
        <Text style={{ color: 'red' }}>Failed to generate PDF</Text>
      )}

      <TouchableOpacity
        onPress={downloadPDF}
        style={{
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Download Resume</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Simple1;
