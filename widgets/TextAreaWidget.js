import React from 'react';
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import WidgetMixin from '../mixins/WidgetMixin';

export default class TextAreaWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'TextAreaWidget',
  }

  render() {
    return (
      <View style={this.getStyle('textAreaRow')}>
        <TextInput
          style={this.getStyle('textArea')}
          multiline={true}

          {...this.props}
          
          onFocus={() => this.props.onFocus(true)}
          onChangeText={this._onChange.bind(this)}
          value={this.state.value}
        />
      </View>
    );
  }
  
  static defaultStyles = {
    textAreaRow: {
      backgroundColor: '#FFF',
      height: 120,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#c8c7cc',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    textArea: {
      fontSize: 15,
      flex: 1,
    },
  }
}
