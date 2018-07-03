import Formio from '../../../Formio';

export default [
  {
    type: 'checkbox',
    input: true,
    key: 'allowFeatureDate',
    label: 'Allow input date in feature?',
    tooltip: 'Choose weather to allow user input date in feature or not.',
    weight: 30
  },
  {
    type: 'number',
    input: true,
    key: 'numberOfMonthesToShow',
    label: 'Number of monthes to show in Popup',
    tooltip: '',
    weight: 40
  }
];
