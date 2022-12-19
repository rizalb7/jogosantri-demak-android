import {View, SafeAreaView, RefreshControl, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import EventCard from './items/event/EventCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';
import RenderFooter from './items/layouts/RenderFooter';
import {Button, Searchbar} from 'react-native-paper';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Event({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setSearchQuery('');
      setIsListEnd(false);
      getData(1);
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

  const getData = async status => {
    if (status === 1) {
      setOffset(0);
    }
    if (!loading && !isListEnd) {
      const url =
        REACT_APP_JOGO_API_URL +
        '/api/festival_event_pesantren/all?limit=1&start=' +
        offset +
        '&filter=' +
        searchQuery;
      setLoading(true);
      await fetch(url, {
        headers: {
          'X-Api-Key': REACT_APP_JOGO_API_KEY,
          Accept: '*/*',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(url);
          if (responseJson.data.festival_event_pesantren.length > 0) {
            setOffset(offset + 1);
            setDataSource([
              ...dataSource,
              ...responseJson.data.festival_event_pesantren,
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

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    const {text} = query.nativeEvent;
    setSearchQuery(text);
  };

  const onSearch = () => {
    setDataSource([]);
    setIsListEnd(false);
    getData(1);
  };

  useEffect(() => {
    getData();
  }, []);

  const ItemView = ({item}) => {
    return (
      <View>
        <EventCard
          props={{
            id: item.id_event,
            image: item.file,
            title: item.judul_event,
            date: item.tgl_event,
            time: item.waktu_event,
            location: item.tempat_event,
            description: item.keterangan,
            link: item.link_streaming,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={style.viewWrapper}>
      <View style={{flexDirection: 'row', marginVertical: 8}}>
        <Searchbar
          placeholder="Ketik Keyword"
          onChange={onChangeSearch}
          value={searchQuery}
          style={{width: '80%', marginLeft: 4}}
          clearButtonMode="never"
          // clearIcon={'circle-outline'}
          // onSubmitEditing={onSearch}
        />
        <Button
          mode="contained-tonal"
          buttonColor="black"
          textColor="white"
          labelStyle={{padding: 5, fontSize: 16, marginHorizontal: 5}}
          style={{height: 52, marginLeft: 6, borderRadius: 4}}
          onPress={onSearch}>
          CARI
        </Button>
      </View>
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
