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

export default function Home({navigation}) {
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

  const headerApi = {
    headers: {
      'X-Api-Key': REACT_APP_JOGO_API_KEY,
      Accept: '*/*',
    },
  };

  const [dSlider, setDSlider] = useState([]);
  const getDataSlider = async () => {
    await fetch(REACT_APP_JOGO_API_URL + '/api/sliders/all', headerApi)
      .then(response => response.json())
      .then(json => {
        setDSlider(json.data.sliders);
      })
      .catch(err => console.log(err));
  };

  const [cPesantren, setCPesantren] = useState(0);
  const getCountPesantren = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/lokasi_pesantren/all?limit=1',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCPesantren(json.total);
      })
      .catch(err => console.log(err));
  };

  const [cEvent, setCEvent] = useState(0);
  const getCountEvent = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/festival_event_pesantren/all?limit=1',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCEvent(json.total);
      })
      .catch(err => console.log(err));
  };

  const [cNgaji, setCNgaji] = useState(0);
  const getCountNgaji = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/pengajian_online/all?limit=1',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCNgaji(json.total);
      })
      .catch(err => console.log(err));
  };

  const [cEkonomi, setCEkonomi] = useState(0);
  const getCountEkonomi = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/ekonomi_mikro_pesantren/all?limit=1',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCEkonomi(json.total);
      })
      .catch(err => console.log(err));
  };

  const [cWisata, setCWisata] = useState(0);
  const getCountWisata = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL +
        '/api/data_kota_lama/all?limit=1&filter=2&field=kode',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCWisata(json.total);
      })
      .catch(err => console.log(err));
  };

  const [cOleh, setCOleh] = useState(0);
  const getCountOleh = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL +
        '/api/data_kota_lama/all?limit=1&filter=3&field=kode',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCOleh(json.total);
      })
      .catch(err => console.log(err));
  };

  const [cMasjid, setCMasjid] = useState(0);
  const getCountMasjid = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL +
        '/api/data_kota_lama/all?limit=1&filter=1&field=kode',
      headerApi,
    )
      .then(response => response.json())
      .then(json => {
        setCMasjid(json.total);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDataSlider();
    getCountPesantren();
    getCountEvent();
    getCountNgaji();
    getCountEkonomi();
    getCountWisata();
    getCountOleh();
    getCountMasjid();
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
              count: cPesantren,
              link: 'PesantrenScreen',
              navigation,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-event.png'),
              textName: 'Event',
              textDetail: 'Daftar Event Festival Pesantren',
              count: cEvent,
              link: 'EventTab',
              navigation,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-ngaji.png'),
              textName: 'Ngaji Online',
              textDetail: 'Jadwal Pengajian dan Live Streaming',
              count: cNgaji,
              link: 'NgajiTab',
              navigation,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-ekonomi.png'),
              textName: 'Ekonomi Mikro',
              textDetail: 'Daftar Ekonomi Mikro Pesantren',
              count: cEkonomi,
              link: 'EkonomiTab',
              navigation,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-wisata.png'),
              textName: 'Wisata',
              textDetail: 'Daftar Wisata',
              count: cWisata,
              link: 'WisataScreen',
              navigation,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-oleh.png'),
              textName: 'Oleh-Oleh',
              textDetail: 'Daftar Oleh-Oleh',
              count: cOleh,
              link: 'OlehScreen',
              navigation,
            }}
          />
          <Card
            props={{
              icon: require('../../android/app/src/main/assets/icon/icon-masjid.png'),
              textName: 'Data Masjid',
              textDetail: 'Daftar Masjid',
              count: cMasjid,
              link: 'MasjidScreen',
              navigation,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
