import {ActivityIndicator, StyleSheet, View} from 'react-native';

const RenderFooter = ({props}) => {
  return (
    //Footer View with Loader
    <View style={styles.footer}>
      {props.loading ? (
        <ActivityIndicator color="black" style={{margin: 15}} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default RenderFooter;
