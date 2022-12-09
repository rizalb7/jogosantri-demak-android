import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import EventCard from './items/event/EventCard';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import {useScrollToTop} from '@react-navigation/native';
import {style} from '../style';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Event({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getDataEvent();
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  const [dEvent, setDEvent] = useState([]);
  const getDataEvent = async () => {
    await fetch(REACT_APP_JOGO_API_URL + '/api/festival_event_pesantren/all', {
      headers: {
        'X-Api-Key': REACT_APP_JOGO_API_KEY,
        Accept: '*/*',
      },
    })
      .then(response => response.json())
      .then(json => {
        setDEvent(json.data.festival_event_pesantren);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDataEvent();
  }, []);

  return (
    <SafeAreaView style={style.viewWrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {dEvent.length ? (
            dEvent.map((val, index) => (
              <EventCard
                key={index}
                props={{
                  id: val.id_event,
                  image: val.file,
                  title: val.judul_event,
                  date: val.tgl_event,
                  time: val.waktu_event,
                  location: val.tempat_event,
                  description: val.keterangan,
                  link: val.link_streaming,
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
