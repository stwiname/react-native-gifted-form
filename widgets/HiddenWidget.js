import React from 'react';
import {
  View
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class HiddenWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'HiddenWidget',
  }

  componentDidMount() {
    this._onChange(this.props.value);
  }

  render() {
    return null;
  }
}
