import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SafeAreaView, View, FlatList, RefreshControl, Text} from 'react-native';
import {style} from '../style';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import PesantrenCard from './items/pesantren/PesantrenCard';
import {useScrollToTop} from '@react-navigation/native';
import RenderFooter from './items/layouts/RenderFooter';
import {Button, Provider, Searchbar} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {FormBuilder} from 'react-native-paper-form-builder';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Pesantren({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setSearchQuery('');
      setIsListEnd(false);
      getData('q');
      reset(emptyForm);
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  let emptyForm = {
    pesantren: '',
  };
  const {control, reset, setFocus, handleSubmit} = useForm({
    defaultValues: emptyForm,
    mode: 'onChange',
  });

  const [dPesantren, setDPesantren] = useState([]);
  const getDataPesantren = async () => {
    await fetch(
      REACT_APP_JOGO_API_URL + '/api/lokasi_pesantren_lite/all?limit=500',
      {
        headers: {
          'X-Api-Key': REACT_APP_JOGO_API_KEY,
          Accept: '*/*',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setDPesantren(json.data.lokasi_pesantren);
      })
      .catch(err => console.log(err));
  };

  const sendData = async data => {
    // console.log(data.pesantren);
    await fetch(
      REACT_APP_JOGO_API_URL +
        '/api/lokasi_pesantren/all?limit=1&field=user_admin&filter=' +
        data.pesantren,
      {
        headers: {
          'X-Api-Key': REACT_APP_JOGO_API_KEY,
          Accept: '*/*',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setDataSource(json.data.lokasi_pesantren);
        setIsListEnd(true);
      })
      .catch(err => console.log(err));
  };

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

  const getData = async status => {
    setOffset(0);
    if (!loading && !isListEnd) {
      const url =
        REACT_APP_JOGO_API_URL +
        '/api/lokasi_pesantren/all?limit=1&start=' +
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
          if (responseJson.data.lokasi_pesantren.length > 0) {
            // if (status == 'q') {
            //   setOffset(0);
            // } else {
            setOffset(offset + 1);
            // }
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

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    const {text} = query.nativeEvent;
    setSearchQuery(text);
    setDataSource([]);
    setIsListEnd(false);
  };

  useEffect(() => {
    getData('q');
    getDataPesantren();
  }, [searchQuery]);

  const ItemView = ({item, index}) => {
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
        {dataSource.length <= 1 ? (
          <View>
            {/* <Text style={{display: 'none'}}>{index}</Text> */}
            <Button
              mode="contained"
              buttonColor="white"
              textColor="black"
              onPress={onRefresh}
              style={{alignSelf: 'center', width: '60%'}}
              labelStyle={{fontWeight: '600'}}>
              Tampilkan Semua Pesantren
            </Button>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={style.viewWrapper}>
        {/* <View>
          <Searchbar
            placeholder="Pencarian"
            onChange={onChangeSearch}
            value={searchQuery}
            clearButtonMode="never"
            // clearIcon={'circle-outline'}
          />
        </View> */}
        <View style={{flexDirection: 'row', marginBottom: -8}}>
          <View style={{width: '75%', marginTop: 2, marginHorizontal: 4}}>
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  name: 'pesantren',
                  type: 'autocomplete',
                  rules: {
                    required: {
                      value: true,
                      message: 'Pesantren harus dipilih',
                    },
                  },
                  textInputProps: {
                    label: 'Cari Pesantren',
                  },
                  options: dPesantren,
                },
              ]}
            />
          </View>
          <Button
            style={{
              width: 85,
              height: 50,
              marginTop: 8,
              borderRadius: 4,
            }}
            labelStyle={{
              alignItems: 'center',
              marginTop: 14,
              marginHorizontal: 1,
            }}
            mode={'contained'}
            buttonColor="white"
            textColor="black"
            onPress={handleSubmit(data => sendData(data))}>
            Tampilkan
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
    </Provider>
  );
}
