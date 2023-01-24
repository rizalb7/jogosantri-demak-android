import React, {useCallback} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Avatar,
  Text,
  Button,
  Badge,
} from 'react-native-paper';
import {REACT_APP_JOGO_API_URL} from '@env';
import {Linking, View} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

export default function DataKotaLamaCard({props}) {
  const link =
    'https://www.google.com/maps/dir/?api=1&origin=&destination=' +
    props.lat +
    ',' +
    props.long;

  const renderViewMore = onPress => {
    return (
      <Badge
        onPress={onPress}
        size={22}
        style={{
          marginTop: 4,
          backgroundColor: 'rgba(255,255,255,0.6)',
          color: 'black',
          alignSelf: 'flex-start',
        }}>
        Tampil Semua
      </Badge>
    );
  };
  const renderViewLess = onPress => {
    return (
      <Badge
        onPress={onPress}
        size={22}
        style={{
          marginTop: 4,
          backgroundColor: 'rgba(255,255,255,0.6)',
          color: 'black',
          alignSelf: 'flex-start',
        }}>
        Tampil Sedikit
      </Badge>
    );
  };
  return (
    <Card style={{marginBottom: 20}}>
      <Card.Cover
        source={{
          uri:
            REACT_APP_JOGO_API_URL + '/uploads/data_kota_lama/' + props.image,
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
        <ViewMoreText
          numberOfLines={4}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{}}>
          <Paragraph style={{marginTop: 8, lineHeight: 15}}>
            {props.description
              .replace(/<[^>]+>/g, '')
              .replace(/&quot;/g, '"')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/&#39;/g, "'")
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')}
          </Paragraph>
        </ViewMoreText>
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
