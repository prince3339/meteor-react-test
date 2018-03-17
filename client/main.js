import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import '../imports/startup/accounts-config';
import App from '../imports/ui/components/app';

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('mainContainer'));
});