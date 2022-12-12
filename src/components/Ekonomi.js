import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import EkonomiCard from './items/ekonomi/EkonomiCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Ekonomi({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getDataEkonomi();
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  const [dEkonomi, setDEkonomi] = useState([]);
  const getDataEkonomi = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/ekonomi_mikro_pesantren/all?limit=1000',
      {
        headers: {
          'X-Api-Key': REACT_APP_JOGO_API_KEY,
          Accept: '*/*',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json.data.ekonomi_mikro_pesantren);
        setDEkonomi(json.data.ekonomi_mikro_pesantren);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDataEkonomi();
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
          {dEkonomi.length ? (
            dEkonomi.map((val, index) => (
              <EkonomiCard
                key={index}
                props={{
                  id: val.id_ekonomi_mikro,
                  image: val.foto_kegiatan,
                  title: val.judul_kegiatan,
                  date: val.tgl_kegiatan,
                  time: val.waktu_kegiatan,
                  // location: val.tempat,
                  description: val.konten_kegiatan,
                  // link: val.link,
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
