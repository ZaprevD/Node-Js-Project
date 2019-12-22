
function ChangeData() {

    this.changeEmail = () => {
        let userData = JSON.parse(localStorage.getItem("Userdata"));
        axios.patch('/change/email/' + userData.ID, {
            Email: $("#newValue").val(),
        }, {
            headers: {
                authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        }).then(response => {
            var errorDiv = $("<div>").addClass("sucess-div");
            var msg = $("<h3>").html(response.data);
            var okBtn = $("<button>").html("OK").on("click", () => {
                location.reload();
            })
            errorDiv.append(msg[0]);
            errorDiv.append(okBtn[0]);
            root.append(errorDiv[0]);
        }).catch(error => {
            var errorDiv = $("<div>").addClass("err-div");
            var msg = $("<h3>").html(error.response.data.error.message);
            var okBtn = $("<button>").html("OK").on("click", () => {
                location.reload();
            })
            errorDiv.append(msg[0]);
            errorDiv.append(okBtn[0]);
            root.append(errorDiv[0]);
        });
    }

    this.changeAge = () => {
        let userData = JSON.parse(localStorage.getItem("Userdata"));
        let age = $("#newValue").val()
        axios.patch('/change/age/' + userData.ID, {
            Age: parseInt(age),
        }, {
            headers: {
                authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        }).then(response => {
            var errorDiv = $("<div>").addClass("sucess-div");
            var msg = $("<h3>").html(response.data);
            var okBtn = $("<button>").html("OK").on("click", () => {
                location.reload();
            })
            errorDiv.append(msg[0]);
            errorDiv.append(okBtn[0]);
            root.append(errorDiv[0]);
        }).catch(error => {
            var errorDiv = $("<div>").addClass("err-div");
            var msg = $("<h3>").html(error.response.data.error.message);
            var okBtn = $("<button>").html("OK").on("click", () => {
                location.reload();
            })
            errorDiv.append(msg[0]);
            errorDiv.append(okBtn[0]);
            root.append(errorDiv[0]);
        });
    }

    this.changePassword = () => {
        let userData = JSON.parse(localStorage.getItem("Userdata"));
        let pass = $("#newValue").val()
        axios.patch('/change/password/' + userData.ID, {
            Password: pass,
        }, {
            headers: {
                authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        }).then(response => {
            var errorDiv = $("<div>").addClass("sucess-div");
            var msg = $("<h3>").html(response.data);
            var okBtn = $("<button>").html("OK").on("click", () => {
                location.reload();
            })
            errorDiv.append(msg[0]);
            errorDiv.append(okBtn[0]);
            root.append(errorDiv[0]);
        }).catch(error => {
            console.log(error.response);
            var errorDiv = $("<div>").addClass("err-div");
            var msg = $("<h3>").html(error.response.data.error.message);
            var okBtn = $("<button>").html("OK").on("click", () => {
                location.reload();
            })
            errorDiv.append(msg[0]);
            errorDiv.append(okBtn[0]);
            root.append(errorDiv[0]);
        });
    }

}