import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    borderColor: '#eee',
    borderWidth: 1,
    height: '100%',
    width: '100%',
  },
  titleText: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 2,
  },
  textCenter: {
    margin: 5,
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
  },
  textRight: {
    marginTop: -10,
    marginRight: 10,
    textAlign: 'right',
  },

  btnFlix: {
    left: 0,
    bottom: 10,
    width: '100%',
    // flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    position: 'absolute',
  }
})