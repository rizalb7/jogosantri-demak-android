import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useController, useForm} from 'react-hook-form';
import {Button, Provider} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';
import {REACT_APP_JOGO_API_URL, REACT_APP_JOGO_API_KEY} from '@env';
import qs from 'querystring';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function DaftarSantri({navigation}) {
  // --Refresh Page--
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      reset(emptyForm);
      setRefreshing(false);
    });
  }, []);
  let emptyForm = {
    nama_santri: '',
    tgl_lahir: new Date(),
    alamat: '',
    jenis_kelamin: '',
    telepon: '',
    jenis_sekolah: '',
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
    let date = new Date();
    const dateNow =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();
    const tglLahir =
      data.tgl_lahir.getFullYear() +
      '-' +
      (data.tgl_lahir.getMonth() + 1) +
      '-' +
      data.tgl_lahir.getDate();
    await fetch(REACT_APP_JOGO_API_URL + '/api/pendaftaran_santri_baru/add', {
      method: 'POST',
      headers: {
        'X-Api-Key': REACT_APP_JOGO_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify({
        tgl_daftar: dateNow,
        nama_santri: data.nama_santri,
        tgl_lahir: tglLahir,
        alamat: data.alamat,
        jenis_kelamin: data.jenis_kelamin,
        telepon: data.telepon,
        jenis_sekolah: data.jenis_sekolah,
        pesantren: data.pesantren,
      }),
    })
      .then(json => {
        alert('Data Terkirim');
        reset(emptyForm);
      })
      .catch(err => alert('Gagal Terkirim'));
  };

  useEffect(() => {
    getDataPesantren();
  }, []);

  return (
    <Provider>
      <SafeAreaView style={styles.containerStyle}>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.headingStyle}>Pendaftaran Santri Baru</Text>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: 'text',
                name: 'nama_santri',

                rules: {
                  required: {
                    value: true,
                    message: 'Nama harus diisi',
                  },
                },
                textInputProps: {
                  label: 'Nama',
                },
              },
              {
                name: 'tgl_lahir',
                type: 'custom',
                JSX: DatePick,
              },
              {
                type: 'text',
                name: 'alamat',
                rules: {
                  required: {
                    value: true,
                    message: 'Alamat harus diisi',
                  },
                },
                textInputProps: {
                  label: 'Alamat',
                },
              },
              {
                name: 'jenis_kelamin',
                type: 'select',
                rules: {
                  required: {
                    value: true,
                    message: 'Jenis Kelamin harus dipilih',
                  },
                },
                textInputProps: {
                  label: 'Jenis Kelamin',
                },
                options: [
                  {
                    value: 'L',
                    label: 'Laki-Laki',
                  },
                  {
                    value: 'P',
                    label: 'Perempuan',
                  },
                ],
              },
              {
                type: 'text',
                name: 'telepon',
                rules: {
                  required: {
                    value: true,
                    message: 'No Telepon harus diisi',
                  },
                },
                textInputProps: {
                  label: 'No Telepon',
                  keyboardType: 'numeric',
                },
              },
              {
                name: 'jenis_sekolah',
                type: 'select',
                rules: {
                  required: {
                    value: true,
                    message: 'Jenis Sekolah harus dipilih',
                  },
                },
                textInputProps: {
                  label: 'Jenis Sekolah',
                },
                options: [
                  {
                    value: 'SD',
                    label: 'SD',
                  },
                  {
                    value: 'IBTIDAIYAH',
                    label: 'IBTIDAIYAH',
                  },
                  {
                    value: 'SMP',
                    label: 'SMP',
                  },
                  {
                    value: 'MTS',
                    label: 'MTS',
                  },
                  {
                    value: 'SMA',
                    label: 'SMA',
                  },
                  {
                    value: 'MA',
                    label: 'MA',
                  },
                  {
                    value: 'LAINNYA',
                    label: 'LAINNYA',
                  },
                ],
              },
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
                  label: 'Pesantren',
                },
                options: dPesantren,
              },
            ]}
          />
          <Button
            mode={'contained'}
            onPress={handleSubmit(data => sendData(data))}>
            Kirim
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

function DatePick(props) {
  const {name, rules, shouldUnregister, defaultValue, control} = props;
  const {field} = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <View>
      <DatePickerInput
        locale="id"
        label="Tanggal Lahir"
        value={field.value}
        onChange={
          d => field.onChange(d)
          // d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
        }
        inputMode="start"
        mode="outlined"
        calendarIcon="calendar-month-outline"
        defaultValue={new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'darkcyan',
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default DaftarSantri;
