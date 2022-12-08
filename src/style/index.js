import {StatusBar, StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'lightgrey',
  },
  viewData: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  viewCard: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 2,
    shadowRadius: 4,
    width: 170,
    // height:110,
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 4,
    margin: 8,
  },
  viewLogoCard: {
    width: 60,
    height: 60,
  },
  badgeCard: {
    position: 'absolute',
    top: -12,
    left: 75,
    backgroundColor: 'teal',
  },
  textNameCard: {
    color: 'black',
    width: 120,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
    // lineHeight: 13,
    marginTop: -2,
    // marginHorizontal: 8,
  },
  textDetailCard: {
    color: 'black',
    width: 120,
    fontSize: 11,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 12,
    marginTop: 2,
  },
});
