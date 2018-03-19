import React from 'react';
import { View, Text } from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class NoticeWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'NoticeWidget',
  }

  render() {
    return (
      <View>
        <View style={this.getStyle('noticeRow')}>
          <Text
            style={this.getStyle('noticeTitle')}
            {...this.props}
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
  
  static defaultStyles = {
    noticeRow: {
      paddingBottom: 10,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    noticeTitle: {
      fontSize: 13,
      color: '#9b9b9b',
    },
  }
}
