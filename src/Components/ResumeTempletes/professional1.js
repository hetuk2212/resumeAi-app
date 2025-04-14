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

const professional1 = ({data}) => {
  const [pdfPath, setPdfPath] = useState(null);
  const [loading, setLoading] = useState(true);
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
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    
    <!-- Google Fonts Link -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,300,700" rel="stylesheet" type="text/css">
    
    <style>
        * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  height: 100%;  
}

body {
  min-height: 100%;  
  background: #eee;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: #222;
  font-size: 14px;
  line-height: 26px;
  padding-bottom: 50px;
}

.container {
  background: #fff;
  margin: 0px auto 0px; 
  box-shadow: 1px 1px 2px #DAD7D7;
  border-radius: 3px;  
  padding: 40px;
}

.header {
  margin-bottom: 30px;
  
  .full-name {
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  
  .first-name {
    font-weight: 700;
  }
  
  .last-name {
    font-weight: 300;
  }
  
  .contact-info {
    margin-bottom: 20px;
  }
  
  .email ,
  .phone {
    color: #999;
    font-weight: 300;
  } 
  
  .separator {
    height: 10px;
    display: inline-block;
    border-left: 2px solid #999;
    margin: 0px 10px;
  }
  
  .position {
    font-weight: bold;
    display: inline-block;
    margin-right: 10px;
    text-decoration: underline;
  }
}


.details {
  line-height: 20px;
  
  .section {
    margin-bottom: 40px;  
  }
  
  .section:last-of-type {
    margin-bottom: 0px;  
  }
  
  .section__title {
    letter-spacing: 2px;
    color: #54AFE4;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  
  .section__list-item {
    margin-bottom: 40px;
  }
  
  .section__list-item:last-of-type {
    margin-bottom: 0;
  }
  
  .left ,
  .right {
    vertical-align: top;
    display: inline-block;
  }
  
  .left {
    width: 60%;    
  }
  
  .right {
    tex-align: right;
    width: 39%;    
  }
  
  .name {
    font-weight: bold;
  }
  
  a {
    text-decoration: none;
    color: #000;
    font-style: italic;
  }
  
  a:hover {
    text-decoration: underline;
    color: #000;
  }
  
  .skills {
    
  }
    
  .skills__item {
    margin-bottom: 10px;  
  }
  
  .skills__item .right {
    input {
      display: none;
    }
    
    label {
      display: inline-block;  
      width: 20px;
      height: 20px;
      background: #C3DEF3;
      border-radius: 20px;
      margin-right: 3px;
    }
    
    input:checked + label {
      background: #79A9CE;
    }
  }
}









    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <div class="full-name">
            <span class="first-name">${firstName}</span> 
            <span class="last-name">${lastName}</span>
        </div>
        <div class="contact-info">
            <span class="email">Email: </span>
            <span class="email-val">${data.personalInfo.email}</span>
            <span class="separator"></span>
            <span class="phone">Phone: </span>
            <span class="phone-val">${data.personalInfo.phone}</span>
        </div>

        <div class="about">
            <span class="position">Front-End Developer </span>
            <span class="desc">
                I am a front-end developer with more than 3 years of experience writing HTML, CSS, and JS. I'm motivated, result-focused, and seeking a successful team-oriented company with the opportunity to grow. 
            </span>
        </div>
    </div>

    <div class="details">
        <div class="section">
            <div class="section__title">Experience</div>
            <div class="section__list">
                <div class="section__list-item">
                    <div class="left">
                        <div class="name">KlowdBox</div>
                        <div class="addr">San Fr, CA</div>
                        <div class="duration">Jan 2011 - Feb 2015</div>
                    </div>
                    <div class="right">
                        <div class="name">Front-End Developer</div>
                        <div class="desc">Developed web applications using HTML, CSS, and JavaScript.</div>
                    </div>
                </div>
                <div class="section__list-item">
                    <div class="left">
                        <div class="name">Akount</div>
                        <div class="addr">San Monica, CA</div>
                        <div class="duration">Jan 2011 - Feb 2015</div>
                    </div>
                    <div class="right">
                        <div class="name">Front-End Developer</div>
                        <div class="desc">Built interactive user interfaces and optimized website performance.</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Education Section -->
        <div class="section">
            <div class="section__title">Education</div>
            <div class="section__list">
                <div class="section__list-item">
                    <div class="left">
                        <div class="name">Sample Institute of Technology</div>
                        <div class="addr">San Fr, CA</div>
                        <div class="duration">Jan 2011 - Feb 2015</div>
                    </div>
                    <div class="right">
                        <div class="name">Bachelor of Science in Computer Science</div>
                        <div class="desc">Graduated with honors, specializing in front-end development.</div>
                    </div>
                </div>
                <div class="section__list-item">
                    <div class="left">
                        <div class="name">Akount</div>
                        <div class="addr">San Monica, CA</div>
                        <div class="duration">Jan 2011 - Feb 2015</div>
                    </div>
                    <div class="right">
                        <div class="name">Fr Developer</div>
                        <div class="desc">Learned full-stack development and honed problem-solving skills.</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Projects Section -->
        <div class="section">
            <div class="section__title">Projects</div>
            <div class="section__list">
                <div class="section__list-item">
                    <div class="name">DSP</div>
                    <div class="text">Developed a responsive front-end web application for managing data streams. <a href="https://example.com">View project</a></div>
                </div>
                <div class="section__list-item">
                    <div class="name">E-Commerce Website</div>
                    <div class="text">Created a full-stack e-commerce platform with React and Node.js.</div>
                </div>
            </div>
        </div>

        <!-- Skills Section -->
        <div class="section">
            <div class="section__title">Skills</div>
            <div class="skills">
                <div class="skills__item">
                    <div class="left">
                        <div class="name">JavaScript</div>
                    </div>
                    <div class="right">
                        <input id="ck1" type="checkbox" checked/>
                        <label for="ck1"></label>
                        <input id="ck2" type="checkbox" checked/>
                        <label for="ck2"></label>
                        <input id="ck3" type="checkbox"/>
                        <label for="ck3"></label>
                        <input id="ck4" type="checkbox"/>
                        <label for="ck4"></label>
                        <input id="ck5" type="checkbox"/>
                        <label for="ck5"></label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Interests Section -->
        <div class="section">
            <div class="section__title">Interests</div>
            <div class="section__list">
                <div class="section__list-item">Football, programming.</div>
            </div>
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

export default professional1;
