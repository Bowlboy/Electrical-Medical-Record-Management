
 Model = new Model();
 var id = localStorage.getItem("token")
 

function openTab(evt, ChosName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(ChosName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("ca").onclick = 

document.getElementById("tr").onclick = function() {
	
	var tout = document.getElementById('trout');
	//var pidtr = document.getElementById("pidtr").value;
	var pidtr = id;
	tout.innerHTML = "";
	//data = Model.getAppointmentInfo(pidtr)//.then(data => {
	Model.getTestData(pidtr).then(data => {
		console.log(data);
		var obj = JSON.parse(data);
		
		tout.innerHTML = "<tr><th>Lab Id</th><th>Description</th><th>First Name</th><th>Last Name</th><th>Order Date</th><th>Status</th><th>Result</th></tr>";
		
		for (i = 0; i < obj.length; i++) { 
		var lid = obj[i].lab_id;
		var desc = obj[i].description;
		var fname = obj[i].firstname;
		var lname = obj[i].lastname;
		var date = obj[i].lab_order_date;
		var stat = obj[i].status;
		var res = obj[i].result;
		
		//console.log(test);
			tout.innerHTML += "<tr><td>" + lid +"</td><td>" + desc +"</td><td>"+ fname +"</td><td>"+ lname +"</td><td>"+ date +"</td><td>"+ stat +"</td><td>"+ res +"</td></tr>";
		}
		
		if (obj.length <= 0){
			tout.innerHTML = "You have no test";
		}
		
  })
}
