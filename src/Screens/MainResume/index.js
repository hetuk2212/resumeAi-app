import React, {useState, useRef, useEffect} from 'react';
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

const MainResume = () => {
  const [pdfPath, setPdfPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = async () => {
    setLoading(true);
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            .info { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Dummy Resume</h1>
          <h2 class="info">Name: John Doe</h2>
          <p class="info">Email: johndoe@example.com</p>
          <p class="info">Phone: +1234567890</p>
          <h3>Experience:</h3>
          <ul>
            <li>Software Engineer at XYZ Corp (2019 - Present)</li>
            <li>Intern at ABC Ltd. (2018 - 2019)</li>
          </ul>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'DummyResume',
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
        ? `/storage/emulated/0/Download/DummyResume.pdf`
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
            width: '90%',
            height: 400,
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

export default MainResume;
