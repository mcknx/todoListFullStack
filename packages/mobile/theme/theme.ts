// src/theme/theme.ts

import {StyleSheet} from 'react-native';
import {TextStyle} from 'react-native';

export const typography: {
  title: TextStyle;
  subtitle: TextStyle;
  cardTitle: TextStyle;
  optionTitle: TextStyle;
  optionDescription: TextStyle;
  buttonText: TextStyle;
  tabButtonText: TextStyle;
} = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabButtonText: {
    fontSize: 12,
  },
};
export const colors = {
  primary: '#007AFF',
  background: '#121212',
  card: '#1E1E1E',
  text: {
    primary: '#FFFFFF',
    secondary: '#BBBBBB',
  },
  tabBar: {
    background: '#333',
    border: '#444',
    active: '#444',
    inactive: 'rgba(255, 255, 255, 0.5)',
  },
};

export const layout = {
  padding: 20,
  borderRadius: 8,
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    minWidth: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding,
    minWidth: '100%',
  },
  title: {
    ...typography.title,
    color: colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius,
    padding: layout.padding,
    width: '100%',
    marginBottom: 20,
  },
  cardTitle: {
    ...typography.cardTitle,
    color: colors.text.primary,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: layout.borderRadius,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonOutline: {
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: layout.borderRadius,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    
  },
  buttonText: {
    ...typography.buttonText,
    color: colors.text.primary,
  },
});
