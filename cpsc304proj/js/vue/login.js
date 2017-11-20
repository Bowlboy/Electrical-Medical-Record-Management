/* The control panel is on the right. */
var Login = new Vue({
  el: '#login',
  data: {
    tab: 'physician',
    id: ""
  },
  methods: {
    toggleTab: null,
    login: null
  },

})

Login.toggleTab = function (tab) {
  console.log("Toggle tab");
  this.tab = tab;
}

Login.login = function () {
    console.log("Signing in");
    _this = this;
    if (this.id.length == 0) {
      alert("You haven't entered an id");
    }
    loginData = {
      id: this.id
    }
    EMR.Model.login(this.tab, loginData).then(data => {
      data = JSON.parse(data);
      console.log(data[0]);
      //TODO::Change token to actual token instead of just id
      if (data[0]) {
        localStorage.setItem('token', data[0].token);
        console.log("/" + _this.tab + ".html");
        localUrl = "/" + _this.tab + ".html";
        window.location.href = localUrl;
      } else {
        alert("ID not found");
      }      
    });
}