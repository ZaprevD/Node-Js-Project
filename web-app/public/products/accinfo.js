
function Account() {

    this.showAccountInfo = async () => {

        let body = $("body")[0];
        let infoWindow = $("<div>").attr("id", "info-window");
        let userData = JSON.parse(localStorage.getItem("Userdata"));
        //GETTING DATA
        data = await this.getDataForCurrentUser(userData.ID);
        let close = $("<h3>").html("X").css("color", "red").css("text-align", "right").on("click", (event) => {
            $(event.target).parent().parent().fadeOut(200);
        });
        let closeDiv = $("<div>").css({
            padding: "2px",
            width: "100%",
            textAlign: "right"
        })
        closeDiv.append(close[0]);
        let userName = $("<h2>").html("Username: " + userData.Username);
        let email = $("<h4>").html("Email: " + data.Email);
        let editMail = $("<div>").html("Edit").css("color", "red").on("click", () => {
            this.changeWindowHtml("Insert your new e-mail", "Email");
            setTimeout(() => {
                $(".window-box").fadeIn(100);
            }, 300)
        });
        let editAge = $("<div>").html("Edit").css("color", "red").on("click", () => {
            this.changeWindowHtml("Age", "Age");
            setTimeout(() => {
                $(".window-box").fadeIn(100);
            }, 300)

        });
        let changePassBtn = $("<button>").html("Change Password").on("click", () => {
            this.changeWindowHtml("New Password", "Password");
            setTimeout(() => {
                $(".window-box").fadeIn(100);
            }, 300)
        })
        let age = $("<h4>").html("Age: " + data.Age);
        infoWindow.append(closeDiv)
        infoWindow.append(userName);
        infoWindow.append(email);
        infoWindow.append(editMail);
        infoWindow.append(age);
        infoWindow.append(editAge);
        infoWindow.append(changePassBtn);
        body.append(infoWindow[0]);
    };

    //SENDING GET REQUEST TO GET INFO ABOUT THE CURRENT USER
    this.getDataForCurrentUser = (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "/user/" + id,
                type: "GET",
                headers: {
                    authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            })
        })
    }
    this.changeWindowHtml = (htm, placeholder) => {
        let body = $("body")[0];
        let windowBox = $("<div>").addClass("window-box");
        let inf = $("<h3>").html(htm);
        let newEmailInput = $("<input>").attr("placeholder", placeholder).attr("id", "newValue");
        if (placeholder === "Password") {
            newEmailInput.attr("type", "password");
        }
        let btn = $("<button>").attr("id", "save").html("Save").css({
            display: "block",
            margin: "10px auto",
            padding: "3px"
        });
        let cancel = $("<button>").html("cancel").on("click", (event) => {
            location.reload();
        })
        windowBox.append(inf[0]);
        windowBox.append(newEmailInput[0]);
        windowBox.append(btn[0]);
        windowBox.append(cancel[0]);
        body.append(windowBox[0]);
        let edit = new ChangeData();
        $("#save").on("click", async (event) => {
            if ($(event.target).prev().attr("placeholder") === "Email") {
                // CHANGE E MAIL
                await edit.changeEmail();
            } else if ($(event.target).prev().attr("placeholder") === "Password") {
                //CHANGE PASSWORD
                await edit.changePassword();
            } else if ($(event.target).prev().attr("placeholder") === "Age") {
                //CHANGE AGE
                await edit.changeAge();
            }

        })
    }
}