const URL = "http://www.ugrad.cs.ubc.ca/~t6c0b/";



function Model() {  
}

/**
 * A promisified request function. To be used internally.
 * @param  {JSON} opts - {
 *                         type : {String} - The type of request, defaults to 'GET',
 *                         url  : {String} - The URL to make a request to *       
 *                         data : {JSON}   - a JSON data to send. For post requests                  
 *                       }
 * @return {Promise}
 */
Model.prototype._request = function (opts) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open(opts.type || 'GET', opts.url, true)
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      })
    }

    //If POST, preprocess data
    if (opts.type == "POST") {
      //Send the proper header information along with the request
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      //encode data
      data = opts.data
      params = typeof data == 'string' ? data : Object.keys(data).map(
                  function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
              ).join('&');


      xhr.send(params);
    } else {
      xhr.send()
    }
    
  })
}

/** 
  - Grab patient info by id
  @return Promise
*/
Model.prototype.getPatientInfo = function (id) {
  url=URL + 'patient/get/' + id;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

/** 
  - Add new patient
  @return Promise
*/
Model.prototype.insertPatient = function (patientData) {
  url=URL + 'patient/add';
  return this._request({
    type: 'POST',
    url: url,
    data: patientData
 })
}


Model.prototype.login = function (type, loginData) {

  url = URL + type + '/login';
  console.log(url);
  return this._request({
    type: 'POST',
    url: url,
    data: loginData
  })

}

/** 
  - Grab appointment info by id
  @return Promise
*/
Model.prototype.getAppointmentInfo = function (id) {
  //sample = {
  //  appointment_date: "check",
  //  appointment_time: "later",
  //  physician_name: "hahah",
  //  test_result: "hihihi" 
  //};
  
  //return sample
  url=URL + 'patient/appointment/' + id;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

/** 
  - Grab appointment info by id
  @return Promise
*/
Model.prototype.getTestData = function (id) {
  url=URL + 'patient/test/' + id;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

Model.prototype.getMedication = function (id) {
  
  url = URL+'patient/medication/' + id;
  console.log(url);

  return this._request({
    type: 'GET',
    url: url
  })
}

Model.prototype.getDrugInfo = function () {
  url=URL + 'drug/group';
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

/** 
  - Grab appointment info by id
  @return Promise
*/
Model.prototype.searchPatientByLastName = function (lastname) {

  url=URL + 'patient/search/' + lastname;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

/** 
  - Update Patient table
  @return Promise
*/
Model.prototype.updatePatient = function (patientData) {

  url=URL + 'patient/update';
  console.log(url);
  
  return this._request({
    type: 'POST',
    url: url,
    data: patientData
 })
}



Model.prototype.insertAppointmentByPatient = function (Data) {
  url=URL + 'appointment/add';
  return this._request({
    type: 'POST',
    url: url,
    data: Data
 })
}

Model.prototype.deletePatient = function (Data) {
  console.log(Data);
  url=URL + 'patient/delete';
  return this._request({
    type: 'POST',
    url: url,
    data: Data
 })
}

Model.prototype.deleteAppointment = function (Data) {
  url=URL + 'appointment/delete';
  return this._request({
    type: 'POST',
    url: url,
    data: Data
 })
}

Model.prototype.getAllergies = function (id) {
  url=URL + 'patient/allergies/' + id;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

Model.prototype.getVaccinations = function (id) {
  url=URL + 'patient/vaccinations/' + id;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

Model.prototype.getImmunizedPatients = function() {
  url = URL + 'patient/immunized';
  return this._request({
    type: 'GET',
    url: url
  })
}

Model.prototype.getEmployeeById = function (id) {
  url=URL + 'employee/lookup/' + id;
  console.log(url);
  
  return this._request({
    type: 'GET',
    url: url
 })
}

Model.prototype.insertPhysician = function (Data) {
  url=URL + 'employee/add';
  return this._request({
    type: 'POST',
    url: url,
    data: Data
 })
}


Model.prototype.addAllergy = function(allergyData) {
  url=URL + 'patient/allergy';
  return this._request({
    type: 'POST',
    url: url,
    data: allergyData
 })  
}

Model.prototype.addPrescription = function(prescriptionData) {
  url=URL + 'patient/prescription';
  return this._request({
    type: 'POST',
    url: url,
    data: prescriptionData
 })  
}