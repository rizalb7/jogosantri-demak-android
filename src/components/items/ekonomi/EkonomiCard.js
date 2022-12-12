import React, {useCallback} from 'react';
import {Button, Card, Title, Paragraph, Avatar} from 'react-native-paper';
import {REACT_APP_JOGO_API_URL} from '@env';
import {Linking} from 'react-native';

export default function EkonomiCard({props}) {
  // console.log(props.image.split(',')[0]);
  const image = props.image.split(',')[0];
  return (
    <Card style={{marginBottom: 20}}>
      <Card.Cover
        source={{
          uri:
            REACT_APP_JOGO_API_URL +
            '/uploads/ekonomi_mikro_pesantren/' +
            image,
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
          <Button icon="cash-multiple" textColor="black">
            Rp {new Intl.NumberFormat('en-ID').format(props.date)}
          </Button>
        </Paragraph>
        <Paragraph>
          <Button icon="phone-classic" textColor="black">
            {props.time}
          </Button>
        </Paragraph>
        <Paragraph style={{marginTop: -8, lineHeight: 15}}>
          {props.description
            .replace(/<[^>]+>/g, '')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')}
        </Paragraph>
      </Card.Content>
    </Card>
  );
}
