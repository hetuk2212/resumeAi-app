import {StyleSheet} from 'react-native';
import Color from '../../../Theme/Color';

const getStyles = theme =>
  StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: theme.white,
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
    color: theme.black,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  addIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: theme.black,
    resizeMode: 'contain',
  },
  addText: {
    color: theme.black,
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: theme.resumeListCardBackground,
    padding: 16,
    borderRadius: 10,
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
    color: theme.black,
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.black,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: Color.primary,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.black,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: theme.smallText,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default getStyles;
