import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PatientTable from '/imports/ui/workflows/patients/PatientTable';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

Session.setDefault('patientDialogOpen', false);
export class PatientPickList extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    return {
      patientDialog: {
        open: Session.get('patientDialogOpen'),
        patient: {
          display: '',
          reference: ''
        }
      }
    };
  }
  changeInput(variable, event, value){
    Session.set(variable, value);
  }
  handleOpenPatients(){
    Session.set('patientDialogOpen', true);
  }  
  handleClosePatients(){
    Session.set('patientDialogOpen', false);
  }  
  render() {
    const patientActions = [
      <FlatButton
        label="Clear"
        primary={true}
        onTouchTap={this.handleClosePatients}
      />,
      <FlatButton
        label="Select"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClosePatients}
      />
    ];
    return(
      <GlassCard>
        <CardTitle
          title="Patient Pick List"
        />
        <CardText>

          <TextField
            hintText="Jane Doe"
            errorText="Patient Search"
            onChange={this.changeInput.bind(this, 'description')}
            value={this.data.patientDialog.patient.display}
            fullWidth>
              <FlatButton
                label="Patients"
                className="patientsButton"
                primary={true}
                onTouchTap={this.handleOpenPatients}
                icon={ <AccountCircle /> }
                style={{textAlign: 'right', cursor: 'pointer'}}
              />
            </TextField>

          <Dialog
            title="Patient Search"
            actions={patientActions}
            modal={false}
            open={this.data.patientDialog.open}
            onRequestClose={this.handleClosePatients}
          >
            <CardText style={{overflowY: "auto"}}>
            <TextField
              hintText="Jane Doe"
              errorText="Patient Search"
              onChange={this.changeInput.bind(this, 'description')}
              value={this.data.patientDialog.patient.display}
              fullWidth />
              <PatientTable />
            </CardText>
          </Dialog>
        </CardText>
      </GlassCard>
    );
  }
}
ReactMixin(PatientPickList.prototype, ReactMeteorData);