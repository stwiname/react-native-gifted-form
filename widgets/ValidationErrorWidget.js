import React from 'react';
import {
  View,
  Text
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class ValidationErrorWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'ValidationErrorWidget',
  }

  render() {
    return (
      <View>
        <View style={this.getStyle('validationErrorRow')}>
          <Text
            style={this.getStyle('validationError')}
            {...this.props}
          >
            {this.props.message}
          </Text>
        </View>
      </View>
    );
  }

  static defaultStyles = {
    validationErrorRow: {
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    validationError: {
      fontSize: 12,
      color: '#ff001A',
    },
  }
}
