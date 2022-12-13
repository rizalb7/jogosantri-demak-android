import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {style} from '../style';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import PesantrenCard from './items/pesantren/PesantrenCard';
import {useScrollToTop} from '@react-navigation/native';
import RenderFooter from './items/layouts/RenderFooter';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Pesantren({navigation}) {
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

  useEffect(() => getData(), []);

  const getData = () => {
    // console.log(offset);
    if (!loading && !isListEnd) {
      setLoading(true);
      //Service to get the data from the server to render
      fetch(
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
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          //Successful response from the API Call
          // console.log(responseJson.data.lokasi_pesantren.length);
          if (responseJson.data.lokasi_pesantren.length > 0) {
            setOffset(offset + 1);
            //After the response increasing the offset for the next API call.
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

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      // <Text style={styles.itemStyle}>
      //   {item.id_lokasi_pesantren}
      //   {'.'}
      //   {item.nama_lokasi.toUpperCase()}
      // </Text>
      <View>
        <PesantrenCard
          props={{
            id: item.id_lokasi_pesantren,
            image: item.file_gambar,
            title: item.nama_lokasi,
            address: item.alamat,
            description: item.deskripsi,
            lat: item.latitude_pesantren,
            long: item.longitude_pesantren,
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
