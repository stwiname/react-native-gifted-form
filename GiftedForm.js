import React from 'react';
import PropTypes from 'prop-types';

import GiftedFormManager from './GiftedFormManager';

import ContainerMixin from './mixins/ContainerMixin';
import WidgetMixin from './mixins/WidgetMixin';

import TextInputWidget       from './widgets/TextInputWidget';
import TextAreaWidget        from './widgets/TextAreaWidget';
import SwitchWidget          from './widgets/SwitchWidget';
import SelectWidget          from './widgets/SelectWidget';
import OptionWidget          from './widgets/OptionWidget';
import SelectCountryWidget   from './widgets/SelectCountryWidget';
import DatePickerIOSWidget   from './widgets/DatePickerIOSWidget';
import ModalWidget           from './widgets/ModalWidget';
import SubmitWidget          from './widgets/SubmitWidget';
import SeparatorWidget       from './widgets/SeparatorWidget';
import GroupWidget           from './widgets/GroupWidget';
import NoticeWidget          from './widgets/NoticeWidget';
import ValidationErrorWidget from './widgets/ValidationErrorWidget';
import GooglePlacesWidget    from './widgets/GooglePlacesWidget';
import RowWidget             from './widgets/RowWidget';
import RowValueWidget        from './widgets/RowValueWidget';
import LoadingWidget         from './widgets/LoadingWidget';
import HiddenWidget          from './widgets/HiddenWidget';
import ErrorsWidget          from './widgets/ErrorsWidget';
import ListWidget            from './widgets/ListWidget';

export class GiftedForm extends ContainerMixin {

  static TextInputWidget       = TextInputWidget;
  static TextAreaWidget        = TextAreaWidget;
  static SwitchWidget          = SwitchWidget;
  static SelectWidget          = SelectWidget;
  static OptionWidget          = OptionWidget;
  static SelectCountryWidget   = SelectCountryWidget;
  static DatePickerIOSWidget   = DatePickerIOSWidget;
  static ModalWidget           = ModalWidget;
  static SubmitWidget          = SubmitWidget;
  static SeparatorWidget       = SeparatorWidget;
  static GroupWidget           = GroupWidget;
  static NoticeWidget          = NoticeWidget;
  static GooglePlacesWidget    = GooglePlacesWidget;
  static RowWidget             = RowWidget;
  static RowValueWidget        = RowValueWidget;
  static LoadingWidget         = LoadingWidget;
  static HiddenWidget          = HiddenWidget;
  static ValidationErrorWidget = ValidationErrorWidget;
  static ErrorsWidget          = ErrorsWidget;
  static ListWidget            = ListWidget;

  static defaultProps = {
    ...ContainerMixin.defaultProps,
    isModal: false,
    clearOnClose: false,
    validators: {},
    defaults: {},
    openModal: null,
  }

  static propTypes = {
    ...ContainerMixin.propTypes,
    isModal:      PropTypes.bool,
    clearOnClose: PropTypes.bool,
    validators:   PropTypes.object,
    defaults:     PropTypes.object,
    openModal:    PropTypes.func,
  }

  componentWillUnmount() {
    if (this.props.clearOnClose === true) {
      GiftedFormManager.reset(this.props.formName);
    }
  }

  componentWillMount() {
    // register validators
    for (let key in this.props.validators) {
      if (this.props.validators.hasOwnProperty(key)) {
        GiftedFormManager.setValidators(this.props.formName, key, this.props.validators[key]);
      }
    }

    // register defaults values
    for (let key in this.props.defaults) {
      if (this.props.defaults.hasOwnProperty(key)) {
        GiftedFormManager.updateValueIfNotSet(this.props.formName, key, this.props.defaults[key]);
      }
    }
  }

  render() {
    return this._renderContainerView();
  }
}

class GiftedFormModal extends ContainerMixin {

  static defaultProps = {
    ...ContainerMixin.defaultProps,
    isModal: true,
  }

  static propTypes = {
    ...ContainerMixin.propTypes,
    isModal: PropTypes.bool,
  }

  render() {
    return this._renderContainerView();
  }
}

module.exports = {
  GiftedForm, GiftedFormModal, GiftedFormManager,
  WidgetMixin,
};
