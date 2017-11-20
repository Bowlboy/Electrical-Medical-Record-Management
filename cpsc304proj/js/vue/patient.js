var Patient = new Vue({
  el: '#patient',
  data: {
    tab: "appointment",
    id: 0,
    appointments: [],
    testResults: []
  },
  methods: {
  }
})
Patient.id = localStorage.getItem("token")


Patient.toggleTab = function(tab) {
  this.tab = tab;
}

Patient.checkAppointment = function() {
  _this = this;
  EMR.Model.getAppointmentInfo(this.id).then(data=> {
    console.log(data);
    data = JSON.parse(data);
    _this.appointments = data;
  })
}

Patient.getTestResult = function() {
  _this = this;
  EMR.Model.getTestData(this.id).then(data=> {
    console.log(data);
    _this.testResults = JSON.parse(data);
  })
}

Patient.cancelAppointment = function(index) {
  console.log(index);
  appointment = this.appointments[index];
  _this = this;

  appointmentData = {
    clinic_id: appointment.clinic_id,
    license_number: appointment.license_number,
    startTime: appointment.starttime,
    appointmentDate: appointment.appointment_date,
    patient_id: this.id
  }

  EMR.Model.deleteAppointment(appointmentData).then(data => {
    data = JSON.parse(data);
    if (data.code == 200) {
      _this.appointments.splice(0, 1);
    }
  });
}
