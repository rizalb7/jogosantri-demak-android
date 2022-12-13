import React, {useCallback} from 'react';
import {Card, Title, Paragraph, Avatar, Text, Button} from 'react-native-paper';
import {REACT_APP_JOGO_API_URL} from '@env';
import {Linking, View} from 'react-native';

export default function PesantrenCard({props}) {
  const link =
    'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
    props.lat +
    ',' +
    props.long;
  return (
    <Card style={{marginBottom: 20}}>
      <Card.Cover
        source={{
          uri:
            REACT_APP_JOGO_API_URL + '/uploads/lokasi_pesantren/' + props.image,
        }}
      />
      <Card.Content>
        <Title
          style={{
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
            style={{paddingHorizontal: 10, fontStyle: 'italic'}}>
            {props.address}
          </Text>
        </View>
        <Paragraph style={{marginTop: 8, lineHeight: 15}}>
          {/* {props.description
            .replace(/<[^>]+>/g, '')
            .replace(/&quot;/g, '"')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')} */}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={{marginTop: -4}}>
        <Button
          onPress={useCallback(async () => await Linking.openURL(link), [link])}
          icon="map"
          mode="contained-tonal"
          buttonColor="teal"
          textColor="white"
          labelStyle={{fontSize: 16, marginHorizontal: 18}}>
          Rute Map
        </Button>
      </Card.Actions>
    </Card>
  );
}
