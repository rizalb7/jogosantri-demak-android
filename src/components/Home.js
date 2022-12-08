import SplashScreen from 'react-native-splash-screen';
import {useCallback, useEffect, useRef, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';
import {style} from '../style';
import {useScrollToTop} from '@react-navigation/native';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import Slider from './items/home/Slider';
import Card from './items/home/Card';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({props}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  const [dSlider, setDSlider] = useState([]);
  const getDataSlider = async () => {
    await fetch(REACT_APP_JOGO_API_URL + '/api/sliders/all', {
      headers: {
        'X-Api-Key': REACT_APP_JOGO_API_KEY,
        Accept: '*/*',
      },
    })
      .then(response => response.json())
      .then(json => {
        setDSlider(json.data.sliders);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDataSlider();
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={style.viewWrapper}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Slider props={{data: dSlider}} />
        <View style={style.viewData}>
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-pesantren.png'),
              textName: 'Pesantren',
              textDetail: 'Detail Pesantren',
              count: 0,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-event.png'),
              textName: 'Event',
              textDetail: 'Daftar Event Festival Pesantren',
              count: 0,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-ngaji.png'),
              textName: 'Ngaji Online',
              textDetail: 'Jadwal Pengajian dan Live Streaming',
              count: 0,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-ekonomi.png'),
              textName: 'Ekonomi Mikro',
              textDetail: 'Daftar Ekonomi Mikro Pesantren',
              count: 0,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-wisata.png'),
              textName: 'Wisata',
              textDetail: 'Daftar Wisata',
              count: 0,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-oleh.png'),
              textName: 'Oleh-Oleh',
              textDetail: 'Daftar Oleh-Oleh',
              count: 0,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-masjid.png'),
              textName: 'Data Masjid',
              textDetail: 'Daftar Masjid',
              count: 0,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
