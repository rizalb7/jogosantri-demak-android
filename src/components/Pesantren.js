import React, {useState, useEffect, useCallback, useRef} from 'react';
import {SafeAreaView, View, FlatList, RefreshControl, Text} from 'react-native';
import {style} from '../style';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import PesantrenCard from './items/pesantren/PesantrenCard';
import {useScrollToTop} from '@react-navigation/native';
import RenderFooter from './items/layouts/RenderFooter';
import {Button, Provider, Searchbar} from 'react-native-paper';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

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
      // reset({cari: ''});
      setRefreshing(false);
    });
  }, []);
  // --Scroll To Top, click icon tab--
  const ref = useRef(null);
  useScrollToTop(ref);

  // const {control, reset, setFocus, handleSubmit} = useForm({
  //   defaultValues: {cari: ''},
  //   mode: 'onChange',
  // });

  // const [dPesantren, setDPesantren] = useState([]);
  // const getDataPesantren = async () => {
  //   await fetch(
  //     REACT_APP_JOGO_API_URL + '/api/lokasi_pesantren/all?limit=300',
  //     {
  //       headers: {
  //         'X-Api-Key': REACT_APP_JOGO_API_KEY,
  //         Accept: '*/*',
  //       },
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(json => {
  //       const data = json.data.lokasi_pesantren;
  //       let arr = [];
  //       data.map((val, index) => {
  //         let datas = {};
  //         datas.value = val.id_lokasi_pesantren;
  //         datas.label = val.nama_lokasi;
  //         arr.push(datas);
  //       });
  //       setDPesantren(arr);
  //     })
  //     .catch(err => console.log(err));
  // };

  // const handleSearch = async data => {
  //   await fetch(
  //     REACT_APP_JOGO_API_URL +
  //       '/api/lokasi_pesantren/all?limit=1&field=id_lokasi_pesantren&filter=' +
  //       data.cari,
  //     {
  //       headers: {
  //         'X-Api-Key': REACT_APP_JOGO_API_KEY,
  //         Accept: '*/*',
  //       },
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(json => {
  //       const data = json.data.lokasi_pesantren;
  //       setDataSource(data);
  //       setIsListEnd(true);
  //       setLoading(false);
  //     })
  //     .catch(err => console.log(err));
  // };

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

  const getData = async status => {
    // console.log(url);
    // console.log('loading=' + loading + '--end=' + isListEnd);
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
          console.log(url);
          if (responseJson.data.lokasi_pesantren.length > 0) {
            if (status == 'q') {
              console.log(loading + '_0_' + isListEnd);
              setOffset(0);
            } else {
              console.log(loading + '_1_' + isListEnd);
              setOffset(offset + 1);
            }
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

  const onSearch = () => {
    setIsListEnd(false);
    getData('q');
  };

  useEffect(() => {
    getData('q');
    // getDataPesantren();
  }, [searchQuery]);

  const ItemView = ({item, index}) => {
    return (
      <View>
        {index === 0 ? (
          <View>
            <Text style={{display: 'none'}}>{index}</Text>
          </View>
        ) : (
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
        )}
      </View>
    );
  };

  const [text, setText] = useState('');

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
      {/* <View
        style={{
          flexDirection: 'row',
          height: 50,
          padding: 4,
          marginBottom: 20,
        }}>
        <Provider>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                name: 'cari',
                type: 'autocomplete',
                rules: {
                  required: {
                    value: true,
                    message: 'Pencarian harus dipilih',
                  },
                },
                textInputProps: {
                  label: 'Pencarian',
                },
                options: dPesantren,
              },
            ]}
          />
        </Provider>
        <Button
          mode="contained-tonal"
          buttonColor="snow"
          labelStyle={{padding: 5, fontSize: 16, marginHorizontal: 5}}
          style={{height: 50, marginLeft: 4, marginTop: 6, borderRadius: 6}}
          onPress={handleSubmit(data => handleSearch(data))}>
          Tampilkan
        </Button>
      </View> */}
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
