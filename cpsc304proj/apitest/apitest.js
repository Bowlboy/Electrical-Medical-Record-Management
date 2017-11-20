//bind listeners Later move to vue.js

Model = new Model();

document.getElementById("get").onclick = function() {
  Model.getPatientInfo(2).then(data => {
    console.log(data);
  })
}

document.getElementById("post").onclick = function() {
  patientData = {
    firstname: "Winson",
    lastname: "S",
    phone: "7781231234",
    address: "1234 East Mall",
    gender: "Male",
    email: "winson@email.com",
    birthdate: "96-01-01"
  }
  Model.insertPatient(patientData).then((data) => {
    console.log(data);
  })

}