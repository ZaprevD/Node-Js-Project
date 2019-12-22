
let token = JSON.parse(localStorage.getItem("token"));
if (token != null) {
    main();
} else {
    $("h1").css("display", "none");
    $("button").css("display", "none");
    let root = $("#root");
    var errorDiv = $("<div>").addClass("err-div");
    var msg = $("<h3>").html("Something Went wrong please try again latter");
    var okBtn = $("<button>").html("OK").on("click", () => {
        window.location.href = "/";
    })
    errorDiv.append(msg);
    errorDiv.append(okBtn);
    root.append(errorDiv);
}

function main() {
    async function makeHtml() {
        let userData = JSON.parse(localStorage.getItem("Userdata"));
        let cartPage = $("<button>").attr("id", "cart").html("My Cart").on("click" , () => {
            window.location.href = "/products/cart/cart.html"
        });
        let name = $("<h3>").html("Logged in as: " + userData.Username).css("float", "right");
        let logoutBtn = $("<button>").css("float", "right").html("Log Out").on("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("Userdata");
            window.location.href = "/";
        });
        let root = $("#root");
        root.prepend(name)
        root.prepend(cartPage);
        root.prepend(logoutBtn);
        let productHolder = $("<div>").attr("id", "all-products");
        root.append(productHolder);
        var makehtml1 = new MakeHtml();
        makehtml1.makeHtml();
        $("#close").on("click", (event) => {
            $(".hidden").css("display", "none");
        })

        showCategories = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url:
                        "/categories",
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
                });
            });
        };

        getCategory = async () => {
            let hidenDiv = $(".hidden");
            let categories = await showCategories();
            for (var i = 0; i < categories.length; i++) {
                let category = $("<h3>").html(categories[i].Id + " : " + categories[i].Name);
                hidenDiv.append(category);
            };

        };
        $("#user").val(userData.Username).css("display", "none");
        addNewProduct = () => {
            const data = {
                yourUserName: $("#user").val(),
                Description: $("#desc").val(),
                Current_Price: parseFloat($("#price").val()),
                CategoryId: parseInt($("#category").val())
            };
            const headers = { authorization: "Bearer " + JSON.parse(localStorage.getItem("token")) }
            axios.post('/new/', data, {
                headers: headers

            }).then(response => {
                setTimeout(() => {
                    location.reload();
                }, 100)
            }).catch(error => {
                var errorDiv = $("<div>").addClass("err-div");
                var msg = $("<h3>").html(error.response.data);
                if (msg.html() == "") {
                    msg.html("Description must be more than 8 letters");
                }
                var okBtn = $("<button>").html("OK").on("click", () => {
                    location.reload();
                })
                errorDiv.append(msg);
                errorDiv.append(okBtn);
                root.append(errorDiv);
            });
        }
        let supplier = new Supplier();
        supplier.makeHtml();
        $("#create-supplier").on("click", () => {
            $(".supplier-window").toggle();
        })

        $("#supplier-btn").on("click", () => {
            supplier.makeUpdate();
        })

        //INFO BUTTON
        let accInfo = new Account();
        accInfo.showAccountInfo();
        $("#account-info").on("click", () => {
            $("#info-window").toggle(500);
        })

        $("#add-product").on("click", () => {
            $(".hidden").css("display", "block");
        });
        $("#sub").on("click", async () => {
            await addNewProduct();
            $("#desc").val("");
            $("#price").val("");
            $("#category").val("");
        })
        getCategory();
    }
    makeHtml();
}