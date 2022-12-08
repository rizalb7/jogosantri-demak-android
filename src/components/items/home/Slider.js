import {View, Text, Dimensions, Image, FlatList} from 'react-native';
import React from 'react';
import {REACT_APP_JOGO_API_URL} from '@env';

export default function Slider({props}) {
  let dSlider = props.data;
  const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

  const slideList = dSlider.map((val, i) => {
    return {
      id: i,
      image: REACT_APP_JOGO_API_URL + '/uploads/sliders/' + val.file,
      title: val.name,
    };
  });

  function Slide({data}) {
    return (
      <View
        style={{
          height: 250,
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: data.image}}
          style={{
            width: windowWidth * 1,
            height: windowHeight * 1,
            resizeMode: 'contain',
            alignSelf: 'center',
            alignItems: 'center',
          }}></Image>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
              textShadowColor: 'black',
              textShadowRadius: 1,
              textShadowOffset: {width: 1, height: 1},
            }}
            numberOfLines={5}>
            {data.title}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={slideList}
      style={{flex: 1}}
      renderItem={({item}) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={true}
    />
  );
}
