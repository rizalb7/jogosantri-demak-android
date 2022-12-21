import {View, SafeAreaView, RefreshControl, FlatList, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import EventCard from './items/event/EventCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';
import RenderFooter from './items/layouts/RenderFooter';
import {Searchbar} from 'react-native-paper';

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
      getData('q');
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
          if (responseJson.data.festival_event_pesantren.length > 0) {
            if (status == 'q') {
              setOffset(0);
            } else {
              setOffset(offset + 1);
            }
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
    setDataSource([]);
    setIsListEnd(false);
  };

  useEffect(() => {
    getData('q');
  }, [searchQuery]);

  const ItemView = ({item, index}) => {
    return (
      <View>
        {index === 0 ? (
          <View>
            <Text style={{display: 'none'}}>{index}</Text>
          </View>
        ) : (
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
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={style.viewWrapper}>
      <View>
        <Searchbar
          placeholder="Pencarian"
          onChange={onChangeSearch}
          value={searchQuery}
          clearButtonMode="never"
          // clearIcon={'circle-outline'}
        />
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
