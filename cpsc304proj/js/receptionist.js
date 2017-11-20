
 Model = new Model();
 var id = localStorage.getItem("token")


function openTab(evt, ChosName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="content" and hide them
    tabcontent = document.getElementsByClassName("content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="actionlinks" and remove the class "active"
    tablinks = document.getElementsByClassName("actionlinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(ChosName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("ap").onclick = function() {
  
  var apout = document.getElementById('apout');
  var fname = document.getElementById('apfname').value;
  var lname = document.getElementById('aplname').value;
  var pnum = document.getElementById('apphone').value;
  var adr = document.getElementById('apaddress').value;
  var gen = document.querySelector('input[id="apgender"]:checked').value;
  var mail = document.getElementById('apemail').value;
  var bday = document.getElementById('apbirthdate').value;
  
  apout.innerHTML = ""; 
  var patientData = {
    firstname: fname,
    lastname: lname,
    phone: pnum,
    address: adr,
    gender: gen,
    email: mail,
    birthdate: bday
  }
  
  // console.log(patientData);
  Model.insertPatient(patientData).then((data) => {
    console.log(data);
	apout.innerHTML = "This is what the DB run  " + data; 
		
  })
}

document.getElementById("apbp").onclick = function() {
  
  var apbpout = document.getElementById('apbpout');
  var cid = document.getElementById('apbpcid').value;
  var lid = document.getElementById('apbplid').value;
  var time = document.getElementById('apbptime').value;
  var date = document.getElementById('apbpdate').value;
  var pid = document.getElementById('apbppid').value;
  
  apbpout.innerHTML = "";
  
		
  var PData = {
    clinic_id: cid,
    license_number: lid,
    startTime: time,
    appointmentDate: date,
    patient_id: pid,
  }
  
   console.log(PData);
  Model.insertAppointmentByPatient(PData).then((data) => {
    console.log(data);
	apbpout.innerHTML = "This is what the DB run " + data; 
		
  })
}

document.getElementById("dp").onclick = function() {
  
  var dpout = document.getElementById('dpout');
  var pid = document.getElementById('dppid').value;
  dpout.innerHTML = "";
  
		
  var PData = {
    patient_id: pid,
  }
  
   console.log(PData);
  Model.deletePatient(PData).then((data) => {
    console.log(data);
	dpout.innerHTML = "This is what the DB run " + data; 
		
  })
}

document.getElementById("ca").onclick = function() {
  		
  /* var gout = document.getElementById('gout');
  var pid = document.getElementById('gpid').value;

  
  Model.getAppointmentInfo(pid).then((data) => {
		var obj = JSON.parse(data);
		//var length = obj.length;
		
		//console.log(length)
		gout.innerHTML = "<tr><th>Clinic ID</th><th>Lincense ID</th><th>Time</th><th>Date</th><th>Physician</th></tr>";
		for (i = 0; i < obj.length; i++) { 
			
			var cid = obj[i].clinic_id;
			var lid = obj[i].license_number;
			var aptime = obj[i].starttime;
			var apdate = obj[i].appointment_date;
			var dname = obj[i].first_name + " " + obj[i].last_name;
			
			gout.innerHTML += "<tr><td>" + cid +"</td><td>" + lid +"</td><td>"+ aptime +"</td><td>"+ apdate +"</td><td>"+ dname +"</td></tr><button>CANCEL</button>";
		}
		
		if (obj.length <= 0){
			gout.innerHTML = "You have no appointment";
		}
  }) */
  
  var caout = document.getElementById('caout');
  var cid = document.getElementById('cacid').value;
  var lid = document.getElementById('calid').value;
  var time = document.getElementById('catime').value;
  var date = document.getElementById('cadate').value;
  
  caout.innerHTML = "";
  
		
  var PData = {
    clinic_id: cid,
	license_number: lid,
	startTime: time,
	appointmentDate: date
  }
  
   console.log(PData);
  Model.deleteAppointment(PData).then((data) => {
    console.log(data);
	caout.innerHTML = "This is what the DB run " + data; 
		
  })
}


document.getElementById("le").onclick = function() {
  
  var leout = document.getElementById('leout');
  var id = document.getElementById('lead').value;
  leout.innerHTML = "";
  
  

  
  Model.getEmployeeById(id).then(data => {
    console.log(data);
	
	var obj = JSON.parse(data);
	
		
		leout.innerHTML = "<tr><th>Name</th><th>Phone#</th></tr>";
		

		for (i = 0; i < obj.length; i++) { 
		var name = obj[i].firstname;
		var phone = obj[i].phone;
		
		//console.log(test);
			leout.innerHTML += "<tr><td>" + name +"</td><td>" + phone +"</td></tr>";
		}
		
		if (obj.length <= 0){
			leout.innerHTML = "No Employee Found";
		}
		
  })
}


document.getElementById("ae").onclick = function() {
  
  var aeout = document.getElementById('aeout');
  var rl = "physician";
  var fname = document.getElementById('aefname').value;
  var lname = document.getElementById('aelname').value;
  var date = document.getElementById('aedate').value;
  var hour = document.getElementById('aeh').value;
  var cid = document.getElementById('aecid').value;
  
  aeout.innerHTML = "";
  
		
  var PData = {
    role: rl,
    firstname: fname,
    lastname: lname,
    start_date: date,
	hours: hour,
    clinic_id: cid
  }
  
   console.log(PData);
  Model.insertPhysician(PData).then((data) => {
    console.log(data);
	aeout.innerHTML = "This is what the DB run " + data; 
		
  })
}

/*document.getElementById("up").onclick = function() {
  
  var upout = document.getElementById('upout');
  var pid = document.getElementById('uppid').value;
  var fname = document.getElementById('upfname').value;
  var lname = document.getElementById('uplname').value;
  var pnum = document.getElementById('upphone').value;
  var adr = document.getElementById('upaddress').value;
  var gen = document.querySelector('input[id="upgender"]:checked').value;
  var mail = document.getElementById('upemail').value;
  var bday = document.getElementById('upbirthdate').value;
  var patientData = {
	patient_id: pid,
    firstname: fname,
    lastname: lname,
    phone: pnum,
    address: adr,
    gender: gen,
    email: mail,
    birthdate: bday
  }
  
  console.log(patientData);
  Model.updatePatient(patientData).then((data) => {
    console.log(data);
	upout.innerHTML = "This is what the DB run  " + data; 
		
  })
}*/

