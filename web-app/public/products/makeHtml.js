
function MakeHtml(){
        this.getProducts = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url:
                        "/products/all",
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
    

    this.makeHtml = async() => {
        let data = await this.getProducts();
        let userData = JSON.parse(localStorage.getItem("Userdata"));
        let productHolder = $("<div>").attr("id", "all-products");
        data.forEach(element => {
            if (!element.Is_sold) {
                let prods = $("<div>").attr("class", "holder");
                let descP = $("<p>").html(element.Description);
                let price = $("<h3>").html(element.Current_Price + " $");
                let bidForm = $("<form>").attr("action", "/bids/" + element.Id).attr("method", "post");
                let usernameInput = $("<input>").css("display", "none").attr("name", "UserId").attr("placeholder", "Your ID").attr("id", "userId").attr("value", userData.ID).attr('readonly', true);
                let bidInput = $("<input>").attr("id", "bidPrice").attr("placeholder", "Bid more than " + parseFloat(element.Current_Price + 2)).attr("name", "bid_price");
                let bidBtn = $("<input>").attr("type", "button").val("bid").addClass("submit");
                bidBtn.on("click", (event) => {
                    const data = {
                        bid_price: parseFloat($(event.target).prev().val()),
                        UserId: parseInt($(event.target).prev().prev().val())
                    }
                    const headers = { authorization: "Bearer " + JSON.parse(localStorage.getItem("token")) }
                    axios.post('/bids/' + element.Id, data, {
                        headers: headers

                    }).then(response => {
                        setInterval(() => {
                            location.reload();
                        }, 100)
                    }).catch(error => {
                        var errorDiv = $("<div>").addClass("err-div");
                        var msg = $("<h3>").html(error.response.data);
                        var okBtn = $("<button>").html("OK").on("click", () => {
                            location.reload();
                        })
                        errorDiv.append(msg[0]);
                        errorDiv.append(okBtn[0]);
                        root.append(errorDiv[0]);
                    });
                })
                bidForm.append(usernameInput[0]);
                bidForm.append(bidInput[0]);
                bidForm.append(bidBtn[0]);
                prods.append(descP[0]);
                prods.append(price[0]);
                prods.append(bidForm[0]);
                productHolder.append(prods[0]);
                root.append(productHolder[0]);
            }else{
                let prods = $("<div>").attr("class", "holder");
                let descP = $("<p>").html(element.Description);
                let price = $("<h3>").html(element.Current_Price + " $");
                let bidForm = $("<form>").attr("action", "/bids/" + element.Id).attr("method", "post");
                let usernameInput = $("<input>").css("display", "none").attr("name", "UserId").attr("placeholder", "Your ID").attr("id", "userId").attr("value", userData.ID).attr('readonly', true);
                let inf = $("<h4>").html("Sold");
                bidForm.append(usernameInput[0]);
                prods.append(descP[0]);
                prods.append(price[0]);
                prods.append(bidForm[0]);
                prods.append(inf);
                productHolder.append(prods[0]);
                root.append(productHolder[0]);
            }
        });
    }

}