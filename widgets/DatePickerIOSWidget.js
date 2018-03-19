import React from 'react';
import {
  View,
  DatePickerIOS,
  StyleSheet
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class DatePickerIOSWidget extends WidgetMixin {
  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'DatePickerIOSWidget',
    getDefaultDate: () => { return new Date(); }
  }

  constructor(props) {
    super(props);

    this.state = {
      ...WidgetMixin.defaultState,
      value: new Date(),
    }
  }

  componentDidMount() {
    this._onChange(this.props.getDefaultDate());
  }
  
  render() {
    return (
      <View style={this.getStyle('row')}>
        <DatePickerIOS
          style={this.getStyle('picker')}

          {...this.props}
          
          onDateChange={this._onChange.bind(this)}
          date={this.state.value}
        />
      </View>
    );
  }
  
  static defaultStyles = {
    row: {
      backgroundColor: '#FFF',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#c8c7cc',
    },
    picker: {
    },
  }
}
