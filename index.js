import { AppRegistry } from 'react-native';
import StateConnector from './StateConnector';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => StateConnector);
