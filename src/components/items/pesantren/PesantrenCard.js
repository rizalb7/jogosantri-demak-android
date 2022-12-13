import React, {useCallback, useState} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Avatar,
  Text,
  Button,
  Provider,
  Portal,
  Modal,
} from 'react-native-paper';
import {REACT_APP_JOGO_API_URL} from '@env';
import {Linking, StyleSheet, View} from 'react-native';

export default function PesantrenCard({props}) {
  const link =
    'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
    props.lat +
    ',' +
    props.long;

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
  };

  return (
    <Provider>
      <Card style={{marginBottom: 20, backgroundColor: 'white'}}>
        <Card.Cover
          source={{
            uri:
              REACT_APP_JOGO_API_URL +
              '/uploads/lokasi_pesantren/' +
              props.image,
          }}
        />
        <Card.Content>
          <Title
            style={{
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: 20,
              marginVertical: 10,
            }}>
            "{props.title}"
          </Title>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Avatar.Icon
              size={28}
              icon="map-marker-radius"
              style={{marginTop: 4, backgroundColor: 'teal'}}
            />
            <Text
              variant="labelMedium"
              style={{
                color: 'black',
                paddingHorizontal: 10,
                fontStyle: 'italic',
              }}>
              {props.address + ', ' + props.desa + ', ' + props.kecamatan}
            </Text>
          </View>
        </Card.Content>
        <Card.Actions style={{marginTop: -4}}>
          <Button
            icon="eye"
            textColor="darkcyan"
            style={{marginTop: 30}}
            onPress={showModal}>
            Lihat Detail
          </Button>
          <Button
            onPress={useCallback(
              async () => await Linking.openURL(link),
              [link],
            )}
            icon="map"
            mode="contained-tonal"
            buttonColor="teal"
            textColor="white"
            labelStyle={{fontSize: 16, marginHorizontal: 18}}>
            Rute Map
          </Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Santri Mukim Laki-Laki</Text>
            <Text style={styles.textDetail}>{props.sml}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Santri Mukim Perempuan</Text>
            <Text style={styles.textDetail}>{props.smp}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Santri Mukim Total</Text>
            <Text style={styles.textDetail}>{props.smt}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Santri Tidak Mukim Laki-Laki</Text>
            <Text style={styles.textDetail}>{props.stml}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Santri Tidak Mukim Perempuan</Text>
            <Text style={styles.textDetail}>{props.stmp}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Santri Tidak Mukim Total</Text>
            <Text style={styles.textDetail}>{props.stmt}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Jumlah Santri Laki-Laki</Text>
            <Text style={styles.textDetail}>{props.jl}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Jumlah Santri Perempuan</Text>
            <Text style={styles.textDetail}>{props.jp}</Text>
          </View>
          <View style={styles.viewDetail}>
            <Text style={styles.textDetail}>Jumlah Santri Total</Text>
            <Text style={styles.textDetail}>{props.jt}</Text>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  viewDetail: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textDetail: {
    color: 'black',
    margin: 2,
  },
});
