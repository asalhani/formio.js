import baseEditForm from '../base/Base.form';

import DatepickerEditDisplay from './editForm/Datepicker.edit.display';
import DatepickerEditConfig from './editForm/Datepicker.edit.config';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: DatepickerEditDisplay
    },
    {
      label: 'Date Configuarion',
      key: 'config',
      weight: 5,
      components: DatepickerEditConfig
    }
  ]);
}
