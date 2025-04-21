import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  createNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F293710',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  addIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: '#1F2937',
    resizeMode: 'contain',
  },
  addText: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fdfdfd',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 8,
  },
  detailBox: {
    marginTop: 8,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  labelText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  university: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: '#666',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#aaa',
    fontSize: 14,
  },
  shimmerCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 15,
  },
  shimmerHeaderTitle: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  shimmerIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  shimmerDetailLine: {
    height: 14,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starsRow: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#555',
  },  
});

export default styles;
