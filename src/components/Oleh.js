import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import DataKotaLamaCard from './items/data_kota_lama/DataKotaLamaCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Oleh({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getDataOleh();
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  const [dOleh, setDOleh] = useState([]);
  const getDataOleh = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL +
        '/api/data_kota_lama/all?limit=1000&filter=3&field=kode',
      {
        headers: {
          'X-Api-Key': REACT_APP_JOGO_API_KEY,
          Accept: '*/*',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        // console.log(json.data.data_kota_lama);
        setDOleh(json.data.data_kota_lama);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDataOleh();
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
          {dOleh.length ? (
            dOleh.map((val, index) => (
              <DataKotaLamaCard
                key={index}
                props={{
                  id: val.id,
                  image: val.foto_lama,
                  title: val.nama_pemilik,
                  address: val.alamat,
                  description: val.deskripsi,
                  lat: val.latitude,
                  long: val.longitude,
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
