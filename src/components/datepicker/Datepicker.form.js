import baseEditForm from '../base/Base.form';

import DatepickerEditDisplay from './editForm/Datepicker.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: DatepickerEditDisplay
    }
  ]);
}
