import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import NgajiCard from './items/ngaji/NgajiCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Ngaji({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getDataNgaji();
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  const [dNgaji, setDNgaji] = useState([]);
  const getDataNgaji = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/pengajian_online/all?limit=1000',
      {
        headers: {
          'X-Api-Key': REACT_APP_JOGO_API_KEY,
          Accept: '*/*',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json.data.pengajian_online);
        setDNgaji(json.data.pengajian_online);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDataNgaji();
  }, []);

  return (
    <SafeAreaView style={style.viewWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {dNgaji.length ? (
            dNgaji.map((val, index) => (
              <NgajiCard
                key={index}
                props={{
                  id: val.id_pengajian,
                  image: val.file,
                  title: val.judul_kegiatan,
                  date: val.tgl_kegiatan,
                  time: val.waktu_kegiatan,
                  location: val.tempat,
                  description: val.keterangan,
                  link: val.link,
                }}
              />
            ))
          ) : (
            <Text style={{textAlign: 'center', color: 'black'}}>
              Memuat Data, cek koneksi...
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
