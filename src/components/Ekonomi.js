import {View, SafeAreaView, RefreshControl, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import EkonomiCard from './items/ekonomi/EkonomiCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';
import RenderFooter from './items/layouts/RenderFooter';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Ekonomi({navigation}) {
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
          '/api/ekonomi_mikro_pesantren/all?limit=1&start=' +
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
          if (responseJson.data.ekonomi_mikro_pesantren.length > 0) {
            setOffset(offset + 1);
            setDataSource([
              ...dataSource,
              ...responseJson.data.ekonomi_mikro_pesantren,
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
        <EkonomiCard
          props={{
            id: item.id_ekonomi_mikro,
            image: item.foto_kegiatan,
            title: item.judul_kegiatan,
            date: item.tgl_kegiatan,
            time: item.waktu_kegiatan,
            description: item.konten_kegiatan,
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
