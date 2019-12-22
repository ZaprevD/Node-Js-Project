function Supplier() {

    this.makeHtml = () => {
        var body = $("body")[0];
        let window = $("<div>").addClass("supplier-window");
        let desc = $("<h4>").text("Info: You must be admin to make some user supplier");
        let usernameInput = $("<input>").attr("placeholder", "Username").attr("id", "new-suppler");
        let makeSupplierBtn = $("<button>").html("Make Supplier").attr("id", "supplier-btn");
        let close = $("<h5>").html("X").on("click", (event) => {
            $(event.target).parent().parent().css("display", "none");
        });
        let closeDiv = $("<div>").attr("id", "closee");
        closeDiv.append(close);
        window.append(desc[0]);
        window.append(usernameInput[0]);
        window.append(makeSupplierBtn[0]);
        window.prepend(closeDiv[0]);
        body.append(window[0])
    };
    let userData = JSON.parse(localStorage.getItem("Userdata"));
    this.makeUpdate = () => {
        const data = {
            userId: userData.ID,
            newSupplierUsername: $("#new-suppler").val()
        };
        const headers = { authorization: "Bearer " + JSON.parse(localStorage.getItem("token")) }
        axios.patch('/newsupplier', data, {
            headers: headers

        }).then(response => {

            if (response.data) {
                var infoDiv = $("<div>").css({
                    width: "300px",
                    height: "100px",
                    border: "1px solid black",
                    background: "green",
                    position: "absolute",
                    top: "48%",
                    left: "37%",
                    textAlign: "center"
                });
                let message = $("<p>").html(response.data);
                let okBtn = $("<button>").html("OK").on("click", (event) => {
                    $(event.target).parent().hide();
                    $("#new-suppler").val("");
                })
                infoDiv.append(message[0]);
                infoDiv.append(okBtn[0]);
                $("body")[0].append(infoDiv[0]);
            }

        }).catch(error => {
            if (error.response.data.error.message) {
                var errorDiv = $("<div>").css({
                    width: "300px",
                    height: "100px",
                    border: "1px solid black",
                    background: "red",
                    position: "absolute",
                    top: "48%",
                    left: "37%",
                    textAlign: "center"
                });
                let message = $("<p>").html(error.response.data.error.message);
                let okBtn = $("<button>").html("OK").on("click", (event) => {
                    $(event.target).parent().hide();
                    $("#new-suppler").val("");
                })
                errorDiv.append(message[0]);
                errorDiv.append(okBtn[0]);
                $("body")[0].append(errorDiv[0]);
            }
        });
    }
}