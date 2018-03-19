import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import WidgetMixin from '../mixins/WidgetMixin';
import Button from 'apsl-react-native-button';
import GiftedFormManager from '../GiftedFormManager';

export default class SubmitWidget extends WidgetMixin {

  static defaultProps = {
    ...WidgetMixin.defaultProps,
    type: 'SubmitWidget',
    onSubmit: () => {},
    preSubmit: () => {},
    isDisabled: false,
    activityIndicatorColor: 'black',
    requiredMessage: '{TITLE} is required',
    notValidMessage: '{TITLE} is not valid',
  }

  static propTypes = {
    ...WidgetMixin.propTypes,
    onSubmit: PropTypes.func,
    preSubmit: PropTypes.func,
    isDisabled: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    requiredMessage: PropTypes.string,
    notValidMessage: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      ...WidgetMixin.defaultState,
      isLoading: false,
    }
  }

  clearValidationErrors() {
    this.props.form.setState({errors: []});
  }

  _postSubmit(errors = []) {
    errors = !Array.isArray(errors) ? [errors] : errors;

    this.setState({
      isLoading: false,
    });
    this.props.form.setState({errors});
  }

  _doSubmit() {
    this.props.preSubmit();

    this.clearValidationErrors()
    var validationResults = GiftedFormManager.validate(this.props.formName);
    var values = GiftedFormManager.getValues(this.props.formName);

    if (validationResults.isValid === true) {
      this.setState({
        isLoading: true,
      });
      this.props.onSubmit(true, values, validationResults, this._postSubmit.bind(this), this.props.navigator);
    } else {
      var errors = GiftedFormManager.getValidationErrors(
        validationResults,
        this.props.notValidMessage,
        this.props.requiredMesage
      );
      this.props.form.setState({errors: errors});
      this.props.onSubmit(false, values, validationResults, this._postSubmit.bind(this), this.props.navigator);
    }
  }

  render() {
    return (
      <View style={this.getStyle('submitButtonWrapper')}>
        <Button
          ref='submitButton'
          style={this.getStyle('submitButton')}
          textStyle={this.getStyle('textSubmitButton')}
          disabledStyle={this.getStyle('disabledSubmitButton')}

          isLoading={this.state.isLoading}
          isDisabled={this.props.isDisabled}
          activityIndicatorColor={this.props.activityIndicatorColor}

          {...this.props}

          onPress={() => this._doSubmit()}
        >
          {this.props.title}
        </Button>
      </View>
    );
  }

  static defaultStyles = {
    submitButton: {
      margin: 10,
      backgroundColor: '#3498db',
      borderWidth: 0,
      borderRadius: 0,
      height: 40,
    },
    disabledSubmitButton: {
      opacity: 0.5,
    },
    textSubmitButton: {
      color: 'white',
      fontSize: 15,
    },
  }
}
