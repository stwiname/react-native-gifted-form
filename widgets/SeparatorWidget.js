import React from 'react';
import {
  View
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class SeparatorWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'SeparatorWidget',
  }

  render() {
    return (
      <View
        style={this.getStyle('separator')}
        {...this.props}
      />
    );
  }
  
  static defaultStyles = {
    separator: {
      height: 10,
    },
  }
}
