import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {Images} from '../../Assets/Images';
import styles from './style';

const Downloads = () => {
  // Sample list of downloaded resumes
  const resumes = [
    {
      id: '1',
      name: 'John Doe Resume',
      date: 'March 7, 2025',
      file: 'Resume_John.pdf',
    },
    {
      id: '2',
      name: 'Jane Smith Resume',
      date: 'March 6, 2025',
      file: 'Resume_Jane.pdf',
    },
    {
      id: '3',
      name: 'Michael Lee Resume',
      date: 'March 5, 2025',
      file: 'Resume_Michael.pdf',
    },
  ];

  const handleOpen = file => {
    console.log(`Opening file: ${file}`);
  };

  const handleDownload = file => {
    console.log(`Downloading file: ${file}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Download & View</Text>

      <FlatList
        data={resumes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={Images.pdf} style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>Downloaded on {item.date}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleOpen(item.file)}>
                <Image source={Images.view} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDownload(item.file)}
                style={styles.downloadBtn}>
                <Image source={Images.downloaded} style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Downloads;
