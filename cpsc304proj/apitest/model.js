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
  //url=WEATHER_URL+'lat='+_this.locn[0]+'&lon='+_this.locn[1]+'&APPID=2e60f385594c20c6365716650c5e8a78';
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
Model.prototype.insertPatient = function (data) {
  //url=WEATHER_URL+'lat='+_this.locn[0]+'&lon='+_this.locn[1]+'&APPID=2e60f385594c20c6365716650c5e8a78';
  url=URL + 'patient/add';
  return this._request({
    type: 'POST',
    url: url,
    data: patientData
 })
}