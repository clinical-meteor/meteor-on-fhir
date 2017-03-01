Template.configureLoginServiceDialogForFhirVault.base_url = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForFhirVault.fields = function () {
  return [
    {
      property: 'clientId',
      label: 'API Key (Client ID)'
    },
    {
      property: 'secret',
      label: 'Secret Key'
    },
    {
      property: 'baseUrl',
      label: 'Target Base URL'
    },
    {
      property: 'loginUrl',
      label: 'Target Login URL'
    }
  ];
};
