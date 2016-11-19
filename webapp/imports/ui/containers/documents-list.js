import { composeWithTracker } from 'react-komposer';
import { Documents } from '../../api/documents/documents.js';
import { DocumentsList } from '/imports/ui/components/documents-list.js';
import { Loading } from '/imports/ui/components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('documents');
  if (subscription.ready()) {
    const documents = Documents.find().fetch();
    onData(null, { documents });
  }
};

export default composeWithTracker(composer, Loading)(DocumentsList);
