import BaseComponent from '../base/Base';
import _ from 'lodash';
var $ = jQuery.noConflict();

export class DateResult {
  constructor(calendarType, date) {
    this.calendarType = calendarType;
    this.date = date;
  }
}
export default class DatepickerComponent extends BaseComponent {

  constructor(component, options, data) {
    super(component, options, data);
  }

  static schema(...extend) {
    return BaseComponent.schema({
      type: 'datepicker',
      label: 'Datepicker',
      key: 'datepicker',
      fields: {
        calendarType: {
          label: 'Calendar Type',
          type: 'select',
          placeholder: '',
          required: true
        },
        date: {
          label: 'Date',
          type: 'textfield',
          placeholder: '',
          required: true
        }
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Datepicker',
      group: 'advanced',
      icon: 'fa fa-plus-square',
      documentation: 'http://help.form.io/userguide/#content-component',
      weight: 100,
      schema: DatepickerComponent.schema()
    };
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  get defaultSchema() {
    return DatepickerComponent.schema();
  }

  get defaultSchema() {
    return DatepickerComponent.schema();
  }

  get calendarTypes() {
    if (this._calendarTypes) {
      return this._calendarTypes;
    }

    this._calendarTypes = [
      { value: 'gregorian', label: 'Gregorian' },
      { value: 'UmmAlQura', label: 'UmmAlQura' }
    ];
    return this._calendarTypes;
  }

  createInput(container) {

    // create div container
    const inputGroup = this.ce('div', {
      class: 'input-group row',
      style: 'width: 100%'
    });

    // build component controls (calendar type, date textbox)
    const subinputAtTheBottom = this.component.inputsLabelPosition === 'bottom';
    const [calendarTypeColumn, dateInputColumn] = this.createInputs(subinputAtTheBottom);

    inputGroup.appendChild(calendarTypeColumn);
    inputGroup.appendChild(dateInputColumn);

    const input = this.ce(this.info.type, this.info.attr);
    this.addInput(input, inputGroup);
    this.errorContainer = container;
    this.setInputStyles(inputGroup);
    container.appendChild(inputGroup);

  }

  createInputs(subinputAtTheBottom) {
    return [
      this.createCalendarTypeInput(subinputAtTheBottom),
      this.createDateInput(subinputAtTheBottom),
    ];
  }

  createCalendarTypeInput(subinputAtTheBottom) {
    const calendarTypeColumn = this.ce('div', {
      class: 'form-group col col-xs-6'
    });

    const id = `${this.component.key}-calendarType`;

    const calendarTypeLabel = !this.hideInputLabels
      ? this.ce('label', {
        for: id,
        class: _.get(this.component, 'fields.calendarType.required', false) ? 'field-required' : ''
      })
      : null;

    if (calendarTypeLabel) {
      calendarTypeLabel.appendChild(this.text(_.get(this.component, 'fields.calendarType.label', '')));
      this.setSubinputLabelStyle(calendarTypeLabel);
    }

    if (calendarTypeLabel && !subinputAtTheBottom) {
      calendarTypeColumn.appendChild(calendarTypeLabel);
    }

    const calendarTypeInputWrapper = this.ce('div');
    this.calendarTypeInput = this.ce('select', {
      class: 'form-control',
      id
    });
    this.hook('input', this.calendarTypeInput, calendarTypeInputWrapper);
    this.selectOptions(this.calendarTypeInput, 'calendarTypeOption', this.calendarTypes);
    const self = this;

    // add event when selected type changed
    this.calendarTypeInput.onchange = function () {
      // reset value of textbox
      self.dateInput.value = '';

      // set calendar to the selected type
      self.createCalendar(self.getCalendarConfig(self.calendarTypeInput.value, 'en'));

      self.updateValue();
    };

    calendarTypeInputWrapper.appendChild(this.calendarTypeInput);
    this.setSubinputStyle(calendarTypeInputWrapper);
    calendarTypeColumn.appendChild(calendarTypeInputWrapper);

    if (calendarTypeLabel && subinputAtTheBottom) {
      calendarTypeColumn.appendChild(calendarTypeLabel);
    }

    return calendarTypeColumn;
  }

  createDateInput(subinputAtTheBottom) {
    const dateColumn = this.ce('div', {
      class: 'form-group col col-xs-3'
    });

    const id = `${this.component.key}-date`;

    const dateLabel = !this.hideInputLabels
      ? this.ce('label', {
        for: id,
        class: _.get(this.component, 'fields.date.required', false) ? 'field-required' : ''
      })
      : null;

    if (dateLabel) {
      dateLabel.appendChild(this.text('Date'));
      this.setSubinputLabelStyle(dateLabel);
    }

    if (dateLabel && !subinputAtTheBottom) {
      dateColumn.appendChild(dateLabel);
    }

    const dateInputWrapper = this.ce('div');

    this.dateInput = this.ce('input', {
      class: 'form-control',
      type: 'text',
      placeholder: _.get(this.component, 'fields.date.placeholder') || (this.hideInputLabels ? this.t('Day') : ''),
      id
    });
    this.hook('input', this.dateInput, dateInputWrapper);
    this.addEventListener(this.dateInput, 'change', () => this.updateValue());

    this.createCalendar(this.getCalendarConfig('Gregorian', 'en'));

    dateInputWrapper.appendChild(this.dateInput);
    this.setSubinputStyle(dateInputWrapper);
    dateColumn.appendChild(dateInputWrapper);

    if (dateLabel && subinputAtTheBottom) {
      dateColumn.appendChild(dateLabel);
    }

    return dateColumn;
  }

  setSubinputLabelStyle(label) {
    const { inputsLabelPosition } = this.component;

    if (inputsLabelPosition === 'left') {
      _.assign(label.style, {
        float: 'left',
        width: '30%',
        marginRight: '3%',
        textAlign: 'left',
      });
    }

    if (inputsLabelPosition === 'right') {
      _.assign(label.style, {
        float: 'right',
        width: '30%',
        marginLeft: '3%',
        textAlign: 'right',
      });
    }
  }

  setSubinputStyle(input) {
    const { inputsLabelPosition } = this.component;

    if (['left', 'right'].includes(inputsLabelPosition)) {
      input.style.width = '67%';

      if (inputsLabelPosition === 'left') {
        input.style.marginLeft = '33%';
      } else {
        input.style.marginRight = '33%';
      }
    }
  }

  getCalendarConfig(calendarType, lang) {
    /*
    // for complete configuarion options, visit: http://keith-wood.name/calendarsPicker.html
    */

    lang = 'en';

    // based on user selection, check if user can select date in feature or not
    const maxDate = this.component.allowFeatureDate ? null : 0;

    const self = this;
    return {
      calendar: $.calendars.instance(calendarType, lang),
      firstDay: 0, // 0 = sunday, 1 = monday, ....
      dateFormat: 'dd/mm/yyyy',
      rangeSelect: false,
      monthsToShow: this.component.numberOfMonthesToShow ? this.component.numberOfMonthesToShow : 1,
      maxDate: maxDate,
      onSelect: date => {
        self.updateValue();
        console.log(date);
      },
      onClose: () => {

        console.log("closed");
      }
    };
  }

  createCalendar(config) {
    $(this.dateInput).calendarsPicker('destroy');
    $(this.dateInput).calendarsPicker('clear');

    $(this.dateInput).calendarsPicker(config);
  }

  getDateValue() {
    return $(this.dateInput).val();
  }

  setDateValue(dateText) {
    if (!dateText) {
      return null;
    }

    $(this.dateInput).calendarsPicker('setDate', dateText);
  }

  get emptyValue() {
    return '';
  }

  get dateInfo() {
    const date = new DateResult(this.calendarTypeInput.value, this.getDateValue());

    // retun null if date vlaue was not set
    // if (!date || !date.calendarType || !date.date) {
    //   return null;
    // }

    return date;
  }

  // getView() {
  //   debugger;
  // }

  setValueAt(index, value) {
    if (!value) {
      return null;
    }
    this.calendarTypeInput.value = value.calendarType;
    this.setDateValue(value.date);

    // write code to fill controls in case there is aa value passed.
  }
  getValueAt(index) {
    const date = this.dateInfo;
    if (date) {
      this.inputs[index].value = date;
      return date;
    }
    else {
      this.inputs[index].value = null;
      return null;
    }
  }

}
