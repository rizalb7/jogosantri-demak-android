import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SafeAreaView, View, FlatList, RefreshControl} from 'react-native';
import {style} from '../style';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import PesantrenCard from './items/pesantren/PesantrenCard';
import {useScrollToTop} from '@react-navigation/native';
import RenderFooter from './items/layouts/RenderFooter';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Pesantren({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getData();
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

  const getData = async () => {
    // console.log(offset);
    if (!loading && !isListEnd) {
      setLoading(true);
      await fetch(
        REACT_APP_JOGO_API_URL +
          '/api/lokasi_pesantren/all?limit=1&start=' +
          offset,
        {
          headers: {
            'X-Api-Key': REACT_APP_JOGO_API_KEY,
            Accept: '*/*',
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.data.lokasi_pesantren.length > 0) {
            setOffset(offset + 1);
            setDataSource([
              ...dataSource,
              ...responseJson.data.lokasi_pesantren,
            ]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ItemView = ({item}) => {
    return (
      <View>
        <PesantrenCard
          props={{
            id: item.id_lokasi_pesantren,
            image: item.file_gambar,
            title: item.nama_lokasi,
            address: item.alamat,
            desa: item.desa,
            kecamatan: item.kecamatan,
            description: item.deskripsi,
            lat: item.latitude_pesantren,
            long: item.longitude_pesantren,
            sml: item.santri_mukim_l,
            smp: item.santri_mukim_p,
            smt: item.santri_mukim_total,
            stml: item.santri_tidak_mukim_l,
            stmp: item.santri_tidak_mukim_p,
            stmt: item.santri_tidak_mukim_total,
            jl: item.jumlah_l,
            jp: item.jumlah_p,
            jt: item.jumlah_total,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={style.viewWrapper}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ListFooterComponent={<RenderFooter props={{loading}} />}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
