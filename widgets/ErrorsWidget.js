import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class ErrorsWidget extends WidgetMixin {

  static defaultStyles = {
    errorContainer: {
      padding: 10,
    },
    errorText: {
      color: '#ff0000',
    },
  }

  render() {
    var errors = this.props.form.state.errors;
    if (errors.length > 0) {
      return (
        <View
          style={this.getStyle('errorContainer')}
        >
          <Text
            style={this.getStyle('errorText')}
          >
            {errors.join('\n')}
          </Text>
        </View>
      );
    }
    return null;
  }
}
