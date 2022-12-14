/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {id, en, registerTranslation} from 'react-native-paper-dates';

AppRegistry.registerComponent(appName, () => App);
registerTranslation('en', en);
registerTranslation('id', {
  save: 'Simpan',
  selectSingle: 'Pilih Tanggal',
  selectMultiple: 'Pilih Tanggal',
  selectRange: 'Pilih periode',
  notAccordingToDateFormat: inputFormat => `Format tanggal ${inputFormat}`,
  mustBeHigherThan: date => `Harus lebih besar dari ${date}`,
  mustBeLowerThan: date => `Harus lebih awal dari ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Harus diantara ${startDate} - ${endDate}`,
  dateIsDisabled: 'Hari tidak diperbolehkan',
  previous: 'Sebelumnya',
  next: 'Selanjutnya',
  typeInDate: 'Tipe pada tanggal',
  pickDateFromCalendar: 'Pilih tanggal dari kalender',
  close: 'Tutup',
});
