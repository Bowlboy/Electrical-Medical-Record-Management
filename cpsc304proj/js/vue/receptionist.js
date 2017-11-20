var Receptionist = new Vue({
  el: '#receptionist',
  data: {
    patientID: null,
    searchInput : "",
    searchResults: [],
    patientInfo: {}
  },
  methods: {
    updatePatient: null,
    searchPatient: null,
    getPatient: null,
  }
})

Receptionist.updatePatient = function() {
  console.log("Updating patient");
  _this = this;
  EMR.Model.updatePatient(this.patientInfo).then(data => {
    console.log(data);
  })
}

Receptionist.searchPatient = function() {
  console.log("Searching patient");
  _this = this;
  EMR.Model.searchPatientByLastName(this.searchInput).then(data => {
    console.log(data);
    data = JSON.parse(data);
    _this.searchResults = data;
  })
}

Receptionist.getPatient = function(result) {
  _this = this;
  EMR.Model.getPatientInfo(result.patient_id).then(data => {
    data = JSON.parse(data);
    _this.patientInfo = data[0];
  })
}

