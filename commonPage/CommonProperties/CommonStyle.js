/**
 * Created by supervons on 2018/12/20.
 * 通用样式
 * CommonStyle
 */

import {
  StyleSheet,
  Dimensions
  } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CommonStyle = StyleSheet.create({
      buttonStyle:{
        marginTop:15
      }
});

module.exports = CommonStyle;
