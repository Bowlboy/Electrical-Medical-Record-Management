var Physician = new Vue({
  el: '#physician',
  data: {
    id: null,
    patientID: null,
    searchInput : "Naisbitt",
    searchResults: [],
    patientInfo: {},
    allergies:[],
    medications: [],
    drugInfo: {},
    vaccines:[],
    immunizedPatients: [],
    showImmunizedPatients: true,
    tab: 'patient-info',
    allergyInput: "",
    prescriptionName: "amlodipine",
    prescriptionDate: "2017-11-19",
    prescriptionQuantity: 50

  },
  methods: {
  },

})

Physician.id = localStorage.token;
Physician.updatePatient = function() {
  console.log("Updating patient");
  _this = this;
  EMR.Model.updatePatient(this.patientInfo).then(data => {
    console.log(data);
  })
}

Physician.searchPatient = function() {
  console.log("Searching patient");
  _this = this;
  EMR.Model.searchPatientByLastName(this.searchInput).then(data => {
    console.log(data);
    data = JSON.parse(data);
    _this.searchResults = data;
  })
}

Physician.getPatient = function(result) {
  _this = this;

  this.patientID = result.patient_id;
  EMR.Model.getPatientInfo(result.patient_id).then(data => {
    data = JSON.parse(data);
    _this.patientInfo = data[0];
  })

  EMR.Model.getMedication(result.patient_id).then(data => {
    console.log(data);
    data = JSON.parse(data);

    _this.medications = data;
  })

  EMR.Model.getDrugInfo().then(data => {
    data = JSON.parse(data);

    _this.drugInfo = {};
    data.forEach(element => {
      _this.drugInfo[element.drug_name] = element.count;
    });
  })

  EMR.Model.getAllergies(result.patient_id).then(data => {
    console.log(data);
    data = JSON.parse(data);
    _this.allergies = data;
  })

  EMR.Model.getVaccinations(result.patient_id).then(data => {
    console.log(data);
    data = JSON.parse(data);
    _this.vaccines = data;
  })
}

Physician.getCount = function(drugName) {
  alert(drugName + "was prescribed to " + this.drugInfo[drugName] + " patients.");
}

Physician.toggleTab = function(tab) {
  this.tab = tab;
}

Physician.hideImmunizedPatients = function() {
  this.showImmunizedPatients = true;
}

Physician.getImmunizedPatients = function() {
  _this = this;
  this.showImmunizedPatients = false;
  if (this.immunizedPatients.length !== 0) return;
  

  EMR.Model.getImmunizedPatients().then(data => {
    data = JSON.parse(data);
    _this.immunizedPatients = data;
  });
}

Physician.addAllergy = function() {
  console.log(this.allergyInput);
  console.log(this.patientID);
  _this = this;
  allergyData = {
    "patient_id": this.patientID,
    "allergen": this.allergyInput
  }
  EMR.Model.addAllergy(allergyData).then(data=> {
    console.log(data);
    _this.allergies.push({"allergen":_this.allergyInput});
    _this.allergyInput = "";    
  }) 
}

Physician.addPrescription = function() {
  _this = this;
  prescriptionData = {
    "drug_name": this.prescriptionName,
    "quantity": this.prescriptionQuantity,
    "prescription_date": this.prescriptionDate,
    "patient_id": this.patientID,
    "employee_id": this.id
  }
  console.log(prescriptionData);
  EMR.Model.addPrescription(prescriptionData).then(data=> {
    console.log(data);
    _this.medications.push({"drug_name":_this.prescriptionName});
  }) 
}



/*EMR.Model.getPatientInfo(10000).then(data => {
  console.log(data);
});*/
//EMR.Model.getAllergies();
//EMR.Model.getMedicatoin();
//EMR.Model.getVaccinations();