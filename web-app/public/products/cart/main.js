
let userData = JSON.parse(localStorage.getItem("Userdata"));
let token = JSON.parse(localStorage.getItem("token"));
logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Userdata");
    window.location.href = "/";
}
function main() {
    var root = $("#root")
    testFnc = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "/cart/" + userData.ID,
                type: "GET",
                headers: {
                    authorization: "Bearer " + token
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
    makeHtml = async () => {
        let data = await testFnc();
        let body = $("body")[0];
        var header = $("<h1>").text("Your Cart");
        if (data.length <= 0) {
            header.html("Your Cart is Empty");
        }
        body.prepend(header[0]);
        var name = $("<h3>").html("Logged in as : " + userData.Username).css({
            float: "right",
            margin: "0 20px"
        });

        //LOG OUT
        let logoutBtn = $("<button>").html("Log Out").css({
            float: "right",
            padding: "5px"
        }).on("click", () => {
            logOut();
        });
        body.prepend(name[0]);
        body.prepend(logoutBtn[0]);
        data.forEach(element => {
            let productHolder = $("<div>").addClass("product-Holder");
            let lastPrice = $("<h4>").html("Last Price: " + element.lastPrice + "$");
            let description = $("<p>").text("Description: " + element.desc);
            let categoryName = $("<h4>").html("Category: " + element.categoryName);
            let payBtn = $("<button>").html("Pay Now").css("float", "right");
            productHolder.append(description);
            productHolder.append(lastPrice);
            productHolder.append(categoryName);
            productHolder.append(payBtn);
            root.append(productHolder);
        });

    }
    makeHtml();
}

if (token === null || userData === null) {
    logOut();
} else {
    main();
}