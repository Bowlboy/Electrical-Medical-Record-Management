Array.from(document.getElementsByClassName("tab")).forEach(element => {
	element.addEventListener("click", function(target) {
		//Toggle Color
		Array.from(document.getElementsByClassName("tab")).forEach(tab => {
			tab.style.backgroundColor = 'white';
		});
		this.style.backgroundColor = '#bdccff';

		//Toggle form display
		Array.from(document.getElementsByClassName("login-form")).forEach(loginform => {
			loginform.style.display = 'none';			
		})
		if (this.id == 'physician-tab') {
			document.getElementById('physician-login-form').style.display = 'block';
		} else if (this.id=="receptionist-tab") {
			document.getElementById('receptionist-login-form').style.display = 'block';
		} else {
			document.getElementById('patient-login-form').style.display = 'block';
		}
	});
});