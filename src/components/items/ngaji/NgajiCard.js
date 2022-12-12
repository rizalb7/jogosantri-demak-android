import React, {useCallback} from 'react';
import {Button, Card, Title, Paragraph, Avatar} from 'react-native-paper';
import {REACT_APP_JOGO_API_URL} from '@env';
import {Linking} from 'react-native';

export default function NgajiCard({props}) {
  return (
    <Card style={{marginBottom: 20}}>
      <Card.Cover
        source={{
          uri:
            REACT_APP_JOGO_API_URL + '/uploads/pengajian_online/' + props.image,
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
        <Paragraph>
          <Button icon="calendar-month" textColor="black">
            {props.date}
          </Button>
        </Paragraph>
        <Paragraph>
          <Button icon="clock-time-three" textColor="black">
            {props.time}
          </Button>
        </Paragraph>
        <Paragraph>
          <Button icon="map-marker-radius" textColor="black">
            {props.location}
          </Button>
        </Paragraph>
        <Paragraph style={{marginTop: -8, lineHeight: 15}}>
          {props.description}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={{marginTop: -4}}>
        <Button
          onPress={useCallback(
            async () => await Linking.openURL(props.link),
            [props.link],
          )}
          icon="link-variant"
          mode="contained-tonal"
          buttonColor="teal"
          textColor="white"
          labelStyle={{fontSize: 16, marginHorizontal: 18}}>
          Buka Link
        </Button>
      </Card.Actions>
    </Card>
  );
}
