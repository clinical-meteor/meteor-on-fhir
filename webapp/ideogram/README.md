# clinical:example-plugin

This is an example plugin for Meteor on FHIR (and Symptomatic) that illustrates how to create a REST endpoint, database collection, server side publication, client side subscription, and a reactive user interface.  When implemented, you can ping the REST endpoint, and it will automatically update the user interface.  


#### Clone the Example Plugin      

```bash
cd webapp/packages
git clone https://github.com/clinical-meteor/example-plugin  
```

#### Customize the Plugin      

```bash
# Step 1 - Rename package folder
packages/example-plugin

# Step 2 - Update package name, description
packages/my-plugin/package.js

# Step 3 - Customize the HelloWorld Page
packages/my-plugin/client/HelloWorldPage.jsx

# Step 4 - Update your routes if you wish
packages/my-plugin/index.jsx

# Step 5 - Edit the settings file; add custom route, etc.
packages/my-plugin/configs/settings.example.jsx
```


#### Run Meteor on FHIR with your plugin  

```bash
# add your package
meteor add foo:my-plugin
meteor npm install

# run with a custom settings file
meteor --settings packages/my-plugin/configs/settings.example.json
```

