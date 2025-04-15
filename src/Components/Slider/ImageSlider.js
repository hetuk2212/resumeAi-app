import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';

const ImageSliders = ({ slides, onSlideChange }) => {
  const { width } = Dimensions.get('window');
  const height = width * 1.5;

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (active + 1) % slides.length;
      setActive(nextIndex);
      onSlideChange(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [active, slides.length]);

  const change = (nativeEvent) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
      onSlideChange(slide);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={(e) => change(e.nativeEvent)}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
        contentOffset={{ x: active * width, y: 0 }}
      >
        {slides.map((item, index) => (
          <Image
            key={index}
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={{ width, height, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, k) =>
          k === active ? (
            <View key={k} style={styles.activeDot} />
          ) : (
            <Text key={k} style={styles.dot}>●</Text>
          )
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    color: '#888',
    fontSize: 15,
    marginBottom: 100,
  },
  activeDot: {
    backgroundColor: '#0D5B9B',
    width: 25,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 8,
    marginTop: 6,
  },
});

export default ImageSliders;
