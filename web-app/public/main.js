let token = JSON.parse(localStorage.getItem("token"));
if (token === null) {
  main();
} else {
  let user = JSON.parse(localStorage.getItem("Userdata"));
  let body = $("body").html("");
  let loggedIn = $("<div>").addClass("logged-in");
  let info = $("<h4>").text(`Logged in as:  ${user.Username}`);
  let continueDiv = $("<div>").html("Continue").addClass("continue").on("click" , () => {
    window.location.href = "/products"
  });
  loggedIn.append(info);
  loggedIn.append(continueDiv);
  body.append(loggedIn);
}

function main() {
  var sub = $("#sub");
  var form = $("#frm");
  localStorage.removeItem("token");
  localStorage.removeItem("Userdata");

  loginRequest =  () => {
    var userName = $("#username").val();
    var password = $("#password").val();
    axios.post('/token', {
      Username: userName,
      Password: password
    }).then(async response => {
      let userData = JSON.parse(response.config.data);
      let user = {
        Username: userData.Username,
        ID: response.data.Id
      }
      localStorage.setItem("Userdata", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(response.headers.authtoken));
      window.location.href = "/products"
    }).catch(error => {
      $(".container * , a").css("display", "none");
      var errorDiv = $("<div>").addClass("err-div");
      var msg = $("<h3>").html(error.response.data.error.message);
      var okBtn = $("<button>").html("OK").on("click", () => {
        location.reload();
      })
      errorDiv.append(msg[0]);
      errorDiv.append(okBtn[0]);
      root.append(errorDiv[0]);
    });
  };



  sub.on("click", async () => {
    await loginRequest();
  })
}