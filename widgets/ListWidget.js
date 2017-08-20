var React = require('react');
var {
  View,
  Text,
  TextInput,
  PixelRatio
} = require('react-native')

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      inline: true,
      // @todo type avec suffix Widget pour all
      type: 'ListWidget',
      underlined: false,
      onTextInputFocus: (value) => value,
      onTextInputBlur: (value) => value,
      renderListItem: (value, index, removeItem) => {},
      renderAddItem: (onPress) => {},
      getDefaultItem: () => {}
    }
  },
  
  getInitialState() {
    return {
      focused: false,
    }
  },
  
  _renderTitle() {
    if (this.props.title !== '') {
      return (
        <Text 
          numberOfLines={1}
          style={this.getStyle(['textInputTitleInline'])}
        >
          {this.props.title}
        </Text>
      );      
    }
    return (
      <View style={this.getStyle(['spacer'])}/>
    );
  },

  _addItem() {
    const value = (this.state.value || []).slice();
    value.push(Object.assign({}, this.props.getDefaultItem()));
    this._onChange(value);
  },

  _removeItem(index) {
    const value = this.state.value.slice(0);
    this._onChange(value.splice(index, 1));
  },

  render() {
    return (
      <View style={this.getStyle(['rowContainer'])}>
        {
          this.state.value && this.state.value.map(this._childrenWithProps)
          //TODO add ability to remove items
        }
        {this.props.renderAddItem(this._addItem.bind(this))}
      </View>
    );
  },

  _childrenWithProps(value, index) {
    return React.Children.map(this.props.children, (child) => {
      if (!child) {
        return null;
      }
      const val = child.props && (child.props.value || child.props.name);
      return React.cloneElement(child, {
        ...child.props,
        formStyles: this.props.formStyles,
        openModal: this.props.openModal,
        formName: this.props.formName,
        navigator: this.props.navigator,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onValidation: this.props.onValidation,
        onValueChange:this.props.onValueChange,

        name: `${this.props.name}[${index}].${val}`,
        ref: `${this.props.name}[${index}].${val}`,
        value: value[val],

        onClose: this.onClose,
      });
    });
  },
  
  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    underline: {
      marginRight: 10,
      marginLeft: 10,
    },
    underlineIdle: {
      borderBottomWidth: 2,
      borderColor: '#c8c7cc',
    },
    underlineFocused: {
      borderBottomWidth: 2,
      borderColor: '#3498db',
    },
    spacer: {
      width: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    titleContainer: {
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // selfAlign: 'center',
      // backgroundColor: '#ff0000',
    },
    textInputInline: {
      fontSize: 15,
      flex: 1,
      height: 40,// @todo should be changed if underlined
      marginTop: 2,
    },
    textInputTitleInline: {
      width: 110,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
    textInputTitle: {
      fontSize: 13,
      color: '#333',
      paddingLeft: 10,
      flex: 1
    },
    textInput: {
      fontSize: 15,
      flex: 1,
      height: 40,
      marginLeft: 40,
    },
  },
});
