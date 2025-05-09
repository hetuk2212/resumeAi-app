import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import Toast from 'react-native-toast-message';

const Simple1 = ({data}) => {
  const [pdfPath, setPdfPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const fullName = data.personalInfo.fullName;
  const [firstName, lastName] = fullName.split(' ');
  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = async () => {
    setLoading(true);
    // Convert the data into HTML content for the resume
    const education = data.education
      .map(
        edu => `
        <li>${edu.course} at ${edu.university} (${edu.startYear} - ${edu.endYear}) - Grade: ${edu.grade}</li>
      `,
      )
      .join('');

    const experience = data.experience
      .map(
        exp => `
        <li>
          <strong>${exp.position}</strong> at ${exp.company} (${new Date(
          exp.startDate,
        ).toLocaleDateString()} - ${new Date(exp.endDate).toLocaleDateString()})
          <p>${exp.description}</p>
        </li>
      `,
      )
      .join('');

    const skills = data.skills
      .map(skill => `<li>${skill.skillName}</li>`)
      .join('');
    const projects = data.projects
      .map(
        project =>
          `<li><strong>${project.title}</strong>: ${project.description}</li>`,
      )
      .join('');
    const interests = data.interests
      .map(interest => `<li>${interest.interest}</li>`)
      .join('');
    const achievements = data.achievements
      .map(achievement => `<li>${achievement.achievement}</li>`)
      .join('');
    const languages = data.languages
      .map(language => `<li>${language.language}</li>`)
      .join('');
    const activities = data.activities
      .map(activity => `<li>${activity.activity}</li>`)
      .join('');

      const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              background: #fff;
              color: #222;
              margin: 0;
              padding: 0;
            }
            @page {
              margin-top: 60px;
              margin-bottom: 36px;
              margin-left: 36px;
              margin-right: 36px;
            }
            @page:first {
              margin-top: 36px;
            }
            .container {
              max-width: 700px;
              margin: 36px auto;
              padding: 42px 48px;
              background: #fff;
              border: 1px solid #222;
            }
            .header {
              border-bottom: 2px solid #222;
              padding-bottom: 12px;
              margin-bottom: 28px;
              text-align: left;
            }
            .name {
              font-size: 2.2em;
              font-weight: bold;
              letter-spacing: 1px;
              color: #111;
              margin: 0;
            }
            .contact {
              font-size: 1em;
              margin-top: 6px;
              color: #444;
            }
            .section {
              margin-bottom: 26px;
            }
            .section-title {
              font-size: 1.12em;
              font-weight: bold;
              letter-spacing: 1px;
              color: #111;
              border-bottom: 1px solid #ddd;
              padding-bottom: 3px;
              margin-bottom: 12px;
              text-transform: uppercase;
            }
            ul {
              list-style-type: disc;
              margin-left: 22px;
              padding-left: 0;
            }
            li {
              margin-bottom: 7px;
              font-size: 1em;
              line-height: 1.5;
            }
            .job-title {
              font-weight: bold;
              color: #111;
            }
            .company {
              font-style: italic;
              color: #222;
            }
            .dates {
              float: right;
              color: #666;
              font-size: 0.97em;
            }
            .clear {
              clear: both;
            }
            .cover-letter-section {
              page-break-before: always;
            }
            .cover-letter {
              border-left: 3px solid #222;
              padding-left: 14px;
              margin-top: 8px;
              color: #222;
              font-style: italic;
              background: #fafafa;
              font-size: 1.08em;
              line-height: 1.7;
            }
            .cover-header {
              margin-bottom: 16px;
              color: #555;
              font-style: normal;
            }
            .cover-footer {
              margin-top: 24px;
              color: #555;
              font-style: normal;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="name">${data.personalInfo.fullName}</div>
              <div class="contact">
                ${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.address}
              </div>
            </div>
      
            <div class="section">
              <div class="section-title">Education</div>
              <ul>
                ${data.education
                  .map(
                    edu => `
                  <li>
                    <span class="job-title">${edu.course}</span>, <span class="company">${edu.university}</span>
                    <span class="dates">${edu.startYear} - ${edu.endYear}</span>
                    <div class="clear"></div>
                    Grade: <strong>${edu.grade}</strong>
                  </li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Experience</div>
              <ul>
                ${data.experience
                  .map(
                    exp => `
                  <li>
                    <span class="job-title">${exp.position}</span>, <span class="company">${exp.company}</span>
                    <span class="dates">${new Date(exp.startDate).toLocaleDateString()} - ${new Date(exp.endDate).toLocaleDateString()}</span>
                    <div class="clear"></div>
                    <span>${exp.description}</span>
                  </li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Skills</div>
              <ul>
                ${data.skills.map(skill => `<li>${skill.skillName}</li>`).join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Projects</div>
              <ul>
                ${data.projects
                  .map(
                    project => `
                  <li>
                    <span class="job-title">${project.title}</span>: ${project.description}
                  </li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Interests</div>
              <ul>
                ${data.interests.map(interest => `<li>${interest.interest}</li>`).join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Achievements</div>
              <ul>
                ${data.achievements.map(achievement => `<li>${achievement.achievement}</li>`).join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Languages</div>
              <ul>
                ${data.languages.map(language => `<li>${language.language}</li>`).join('')}
              </ul>
            </div>
      
            <div class="section">
              <div class="section-title">Activities</div>
              <ul>
                ${data.activities.map(activity => `<li>${activity.activity}</li>`).join('')}
              </ul>
            </div>
          </div>
      
          <!-- Cover Letter on a new page -->
          <div class="container cover-letter-section">
            <div class="section-title">Cover Letter</div>
            <div class="cover-letter">
              <div class="cover-header">
                ${data.coverLetter.date ? `<div>${data.coverLetter.date}</div>` : ''}
                ${data.coverLetter.recipient ? `<div>${data.coverLetter.recipient}</div>` : ''}
              </div>
              <div>
                ${data.coverLetter.content}
              </div>
              <div class="cover-footer">
                Sincerely,<br/>
                <strong>${data.personalInfo.fullName}</strong>
              </div>
            </div>
          </div>
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
  
      try {
        setDownloading(true);
  
        // Create downloads directory if it doesn't exist
        const downloadsDir = Platform.select({
          android: `${RNFS.ExternalStorageDirectoryPath}/Download`,
          ios: RNFS.DocumentDirectoryPath,
        });
  
        // Check if downloads directory exists, create if not
        const dirExists = await RNFS.exists(downloadsDir);
        if (!dirExists) {
          await RNFS.mkdir(downloadsDir);
        }
  
        const fileName = `Resume_${fullName.replace(/\s+/g, '_')}.pdf`;
        const destinationPath = `${downloadsDir}/${fileName}`;
  
        // Check if file exists and delete if it does
        const fileExists = await RNFS.exists(destinationPath);
        if (fileExists) {
          await RNFS.unlink(destinationPath);
        }
  
        // Copy the file to downloads
        await RNFS.copyFile(pdfPath, destinationPath);
  
        if (Platform.OS === 'android') {
          // Scan the file so it appears in Downloads immediately
          await RNFS.scanFile(destinationPath);
        }
  
        Toast.show({
          type: 'success',
          text1: 'Resume successfully downloaded!',
          text2: `Resume saved to Downloads as ${fileName}`,
          position: 'bottom',
        });
      } catch (error) {
        console.error('PDF Download Error:', error);
        showToast('Failed to save PDF to Downloads');
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
        <Text style={{fontSize: 20, marginBottom: 20}}>Preview Resume</Text>
  
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
              source={{uri: pdfPath, cache: true}}
              style={{flex: 1}}
              onError={error => console.log(error)}
            />
          </View>
        ) : (
          <Text style={{color: 'red'}}>Failed to generate PDF</Text>
        )}
  
        <TouchableOpacity
          onPress={downloadPDF}
          style={{
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Download Resume</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default Simple1;
  