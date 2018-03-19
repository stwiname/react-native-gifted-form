import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';
var GiftedSpinner = require('react-native-gifted-spinner');

export default class LoadingWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'LoadingWidget',
    onPress: () => {},
  }

  render() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <TouchableHighlight
          onPress={this.props.onPress}
          underlayColor={this.getStyle('underlayColor').pop()}
          {...this.props} // mainly for underlayColor
        >
          <View style={this.getStyle('row')}>
            <GiftedSpinner />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  
  static defaultStyles = {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    underlayColor: '#c7c7cc',
  }
}
