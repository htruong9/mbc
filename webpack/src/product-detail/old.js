try {
    $(document).on("change", "#post-form", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/shop/ajaxcolour/",
            data: {
                productid: $("#productid").val(),
                size: $("#size_select").val(),
                color: colourId,
                csrfmiddlewaretoken: csrfmiddlewaretoken,
                action: "post",
            },
            data_type: "html",
            success: function (data) {
                console.log("success");
                console.log("data :>> ", data);
                updateColor(data);
                // console.log('data.rendered_table :>> ', data.rendered_table);;
                // $('#appendHere').html(data.rendered_table);
                // console.log('data :>> ', data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus);
                alert("Error: " + errorThrown);
            },
        });
    });

    function updateColor(data) {
        // Get variant
        var newVariant =
            data.find((e) => {
                return (
                    e.colour.toString() === UserSelected.Colour.id &&
                    e.size.toString() === UserSelected.Size.id
                );
            }) || data[0];

        UserSelected.Variant.title = newVariant.title;
        UserSelected.Variant.id = newVariant.variant_id;
        UserSelected.Variant.price = parseFloat(newVariant.price);
        UserSelected.Colour.title = newVariant.colour_title;
        UserSelected.Colour.id = newVariant.colour;
        productPrice = parseFloat(newVariant.price);

        const colorOption = document.querySelector(`ul.color-option`);
        colorOption.innerHTML = `<span class="text-uppercase">Colour:</span>`;
        data.forEach((e) => {
            label = document.createElement("label");
            input = document.createElement("input");
            a = document.createElement("a");
            img = document.createElement("img");
            label.style =
                "border-color: black transparent transparent transparent;";
            label.title = e.colour_title;

            input.type = "radio";
            if (variantid == e.variant_id.toString()) {
                input.setAttribute("checked", "");
                a.class = "active";
            }
            input.name = "variantid";
            input.value = e.variant_id;
            input.setAttribute("onchange", "this.form.submit();");

            img.src = e.image;
            img.style = "height: 50px";

            a.appendChild(img);
            label.appendChild(input);
            label.appendChild(a);

            colorOption.appendChild(label);
        });

        // Click left thumb
        clickLeftThumb();

        update();
    }
} catch (error) {}
