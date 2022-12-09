import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {style} from '../../../style';
import {Badge} from 'react-native-paper';

export default function Card({props}) {
  return (
    <Pressable
      style={style.viewCard}
      onPress={() => props.navigation.navigate(props.link)}>
      {/* <Badge style={style.badgeCard}>{props.count}</Badge> */}
      <Image style={style.viewLogoCard} source={props.icon} />
      <Text style={style.textNameCard} numberOfLines={1}>
        {props.textName}
      </Text>
      <Text style={style.textDetailCard} numberOfLines={2}>
        {props.textDetail}
      </Text>
    </Pressable>
  );
}
