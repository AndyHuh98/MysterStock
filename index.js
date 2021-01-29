/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

function noop() {}

if (process.env.NODE_ENV !== 'development') {
  console.log = noop;
  console.error = noop;
  console.warn = noop;
}
