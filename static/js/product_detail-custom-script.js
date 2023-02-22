// const CurrencySymbol = "£"
// const csrfmiddlewaretoken = document.querySelector(`input[name="csrfmiddlewaretoken"]`).value

// const selectedProductElement = document.getElementById("SelectedProduct");
// const productSelectElements = document.querySelectorAll(".product-options select");
// // const productCheckboxInputElements = document.querySelectorAll(".product-options input[type='checkbox']");

// const additionalPositionElement = document.querySelector(".additional-position")
// const sizeSelectElement = document.querySelector('.size-option select#size_select')
// const additionalPositionSelectElement = additionalPositionElement.querySelector('#additional-position__select')
// const logoTextSelectElements = document.querySelectorAll('.logo-text__select')
// const additionalNameSelectElement = document.querySelector('#additional-name__select')

// const logoFileUploadElements = document.querySelectorAll("input.file-upload-input")
// // const logoFilePreviewElement = document.getElementById("file-upload__preview")
// // const logoFileUploadLabelElement = document.querySelector('.custom-file-label')

// const mainPositionSelectElement = document.querySelector('.position-options select#position')
// const positionCheckboxElements = document.querySelectorAll('.position-checkbox')
// const additionalNamePositionCheckboxElements = document.querySelectorAll('.additional-name-position-checkbox')
// const dataCheckedPositionElement = document.querySelector('#data-checked-position')

// const hasDataPriceElements = document.querySelectorAll('[data-price]')

// const orderSumElement = document.querySelector('#order-sum')
// const priceSumElement = orderSumElement.querySelector('#price-sum')
// const vouchersSumElement = orderSumElement.querySelector('#sum_vouchers')

// const quantityInputElement = document.querySelector(`input[name="quantity"]`)
// // const additionalNameInputElement = document.querySelector('input#input__additional-name')
// // const additionalNameMaxLength = 10
// const requireTextOptionInputElement = document.getElementById('require_text_option__input')
// const additionalTextOptionInputElement = document.getElementById('text_option__input')

// const fontInputElements = document.querySelectorAll('.font-input')
// const colorInputElements = document.querySelectorAll('.color-input')

// var UserSelected = {
//     "Product": {
//         "id": ""
//     },
//     "Variant": {
//         "title" : "",
//         "id" : "",
//         "price": 0
//     },
//     "Colour": {
//         "title" : "",
//         "id" : ""
//     },
//     "Size": {
//         "title" : "",
//         "id" : ""
//     },
//     "Position": {

//     },
//     "Require_logo_text": {
//         "is_require": false,
//         "selected": false,
//         "image_id": false,
//         "image_src": false,
//         "file": false,
//         "text": '',
//         "font": '',
//         "color": '',
//         "setup": '',
//         "price": 0
//     },
//     "Additional_position": {
//         "selected": false,
//     },
//     "Additional_logo_text": {
//         "selected": false,
//         "image_id": false,
//         "image_src": false,
//         "file": false,
//         "text": '',
//         "font": '',
//         "color": '',
//         "price": 0
//     },
//     "Additional_name": {
//         "selected": false,
//         "name": "",
//         "positions": {}
//     },
//     "Quantity": 1,
//     "Delivery_Fee": 7.99,

//     "Each_item_price": 0,
//     "All_items_price": 0,
//     "Each_item_price_after_discount": 0,
//     "All_items_price_after_discount": 0,
//     "Total_price": 0,

//     // {
//     //     type: "Additional_name",
//     //     discount_value: 1,
//     // }
//     "Discount": {
//         "Require_logo_text": 0,
//         "Additional_logo_text": 0,
//         "Delivery_Fee": 0,
//         "Each_item_price": 0,
//         "All_items_price": 0,
//     },
//     resetDiscount: function() {
//         this.Discount = {
//             "Require_logo_text": 0,
//             "Additional_logo_text": 0,
//             "Delivery_Fee": 0,
//             "Each_item_price": 0,
//             "All_items_price": 0,
//         }
//     }
// };

// getEachItemPrice = () => {
//     return new Promise((resolve, reject) => {
//         try {
//             var result = UserSelected.Variant.price

//             // if (UserSelected.Additional_logo_text.selected) {
//             //     var str = UserSelected.Additional_logo_text.price
//             //     result +=  parseFloat(str) 
//             //     console.log(`Updated price: ${parseFloat(str)}  (Additional ${UserSelected.Additional_logo_text.selected})`)
//             // }

//             Object.entries(UserSelected.Position).forEach(e => {
//                 var str = e[1].additionalPrice
//                 result += parseFloat(str)
//             })

//             Object.entries(UserSelected.Additional_name.positions).forEach ( e => {
//                 var str = e[1].additionalPrice
//                 result += parseFloat(str)
//             })

//             UserSelected.Each_item_price = result
//             resolve(result)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// getAllItemPrice = () => { 
//     return new Promise((resolve, reject) => {
//         getEachItemPrice()
//             .then(value => {
//                 try {
//                     var result = 0
//                     UserSelected.Quantity = parseInt(document.querySelector(`input[name="quantity"]`).value)
//                     result = value * UserSelected.Quantity
//                     // if (UserSelected.Require_logo_text.is_require) {
//                     //     var str = UserSelected.Require_logo_text.price
//                     //     result += parseFloat(str)
//                     // }
//                     UserSelected.All_items_price = result
//                     resolve(result)
//                 } catch (error) {
//                     reject(error)
//                 }
//             })
//             .catch(error => reject(error))
//     })
// }

// getTotalPrice = () => {
//     return new Promise((resolve, reject) => {
//         getAllItemPrice()
//             .then(value => {
//                 var result = value
//                 // var result = value + UserSelected.Delivery_Fee
//                 resolve(result)
//             })
//             .catch(error => reject(error))
//     })
// }

// getEachItemPriceAfterDiscount = () => {
//     return new Promise((resolve, reject) => {
//         try {
//             var result = UserSelected.Variant.price

//             // if (UserSelected.Additional_logo_text.selected) {
//             //     var str = UserSelected.Additional_logo_text.price
//             //     result += ( parseFloat(str) - parseFloat(UserSelected.Discount.Additional_logo_text) )
//             //     console.log(`Updated price: ${parseFloat(str)}  (Additional ${UserSelected.Additional_logo_text.selected})`)
//             // }

//             Object.entries(UserSelected.Position).forEach(e => {
//                 var str = e[1].additionalPrice
//                 result += parseFloat(str)
//             })

//             Object.entries(UserSelected.Additional_name.positions).forEach ( e => {
//                 var str = e[1].additionalPrice
//                 result += parseFloat(str)
//             })

//             result -= parseFloat(UserSelected.Discount.Each_item_price)

//             UserSelected.Each_item_price_after_discount = result
//             resolve(result)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// getAllItemPriceAfterDiscount = () => { 
//     return new Promise((resolve, reject) => {
//         getEachItemPriceAfterDiscount()
//             .then(value => {
//                 try {
//                     var result = 0
//                     UserSelected.Quantity = parseInt(document.querySelector(`input[name="quantity"]`).value)
//                     result = value * UserSelected.Quantity
//                     // if (UserSelected.Require_logo_text.is_require) {
//                     //     var str = UserSelected.Require_logo_text.price
//                     //     result += parseFloat(str) - parseFloat(UserSelected.Discount.Require_logo_text)
//                     // }
//                     UserSelected.All_items_price_after_discount = result
//                     resolve(result)
//                 } catch (error) {
//                     reject(error)
//                 }
//             })
//             .catch(error => reject(error))
//     })
// }

// getTotalPriceAfterDiscount = () => {
//     return new Promise((resolve, reject) => {
//         getAllItemPriceAfterDiscount()
//             .then(value => {
//                 var result = value
//                 // var result = value + UserSelected.Delivery_Fee
//                 // result -= UserSelected.Discount.Delivery_Fee
//                 resolve(result)
//             })
//             .catch(error => reject(error))
//     })
// }


// const sumVariantPriceElement = orderSumElement.querySelector('#sum_variant-price');
// const sumColourElement = orderSumElement.querySelector('#sum_colour');
// const sumSizeElement = orderSumElement.querySelector('#sum_size');
// const sumPositionElement = orderSumElement.querySelector('#sum_position');
// const sumAdditionalPositionElement = orderSumElement.querySelector('#sum_additional-position');
// const sumAdditionalLogoTextElement = orderSumElement.querySelector('#sum_additional-logo-text');
// const sumAdditionalNameElement = orderSumElement.querySelector('#sum_additional-name');
// const sumRequireLogoTextElement = orderSumElement.querySelector('#sum_require-logo-text');
// const sumDeliveryFeeElement = orderSumElement.querySelector('#sum_delivery-fee');
// const sumVoucherElement = orderSumElement.querySelector('#sum_vouchers');

// // Init
// (() => {
//     var e 

//     UserSelected.Product.id = productId
//     UserSelected.Variant.title = variantTitle
//     UserSelected.Variant.id = variantId
//     UserSelected.Colour.id = colourId
//     UserSelected.Colour.title = colourTitle

//     // Set variant price
//     UserSelected.Variant.price = variantPrice

//     // Set default value for main position select 
//     e = mainPositionSelectElement.querySelector(`option[value="${mainPositionSelectElement.value}"]`)
//     UserSelected.Position[mainPositionSelectElement.value] = {
//         type: 'main',
//         title: e.dataset.title,
//         additionalPrice: e.dataset.price
//     }
//     // Hide position checkboxs that value equal to main position 
//     const allSameCheckboxValue = document.querySelectorAll(`.position-checkbox[name='${mainPositionSelectElement.value}']`)
//     allSameCheckboxValue.forEach(e => {
//         const checkboxContainer = e.closest('.checkbox-container')
//         checkboxContainer.style.display = 'none'
//     })

//     // Set default value for size
//     e = sizeSelectElement.querySelector(`option[value="${sizeSelectElement.value}"]`)
//     UserSelected.Size = {
//         title: e.textContent,
//         id: e.value
//     }

//     // Remove Large position in additional name
//     const PositionToRemove = ['LF', 'LB']
//     additionalNamePositionCheckboxElements.forEach(e => {
//         if (PositionToRemove.includes(e.name)) {
//             e.closest('.checkbox-container').remove()
//         }
//     })

//     // 
//     e = document.querySelector('.require-logo-text-options .logo-text__select')
//     if (e) {
//         UserSelected.Require_logo_text.is_require = isRequire
//         UserSelected.Require_logo_text.selected = e.querySelector(`option[value="${e.value}"]`).value === '1' ? 'logo' : 'text'
//         UserSelected.Require_logo_text.price = e.querySelector(`option[value="${e.value}"]`).dataset.price
//     }
    
//     update()

//     // Color
//     if (location.search.includes('selectvariant')) {
//         // clickLeftThumb()
//     }
// })()


// var isUpdating = false
// function update() {
//     if (!isUpdating) {
//         isUpdating = true
//         try {
//             console.log("On update")
//             clearAllChild(vouchersSumElement)
//             var tmpContainer, additionalPrice, positions;
//             // var totalPrice = UserSelected.getTotalPrice()

//             // Variant price
//             sumVariantPriceElement.querySelector('.value').textContent = toMoneyString(UserSelected.Variant.price, true)

//             // Colour
//             sumColourElement.querySelector('.value').textContent = UserSelected.Colour.title

//             // Size
//             sumSizeElement.querySelector('.value').textContent = UserSelected.Size.title

//             // Position
//             positions = getPositionByType('main')
//             additionalPrice = addtionalPriceToText(UserSelected.Position[positions[0]].additionalPrice)
//             sumPositionElement.querySelector('.value').textContent = UserSelected.Position[positions[0]].title + additionalPrice

//             // Additional position
//             if (UserSelected.Additional_position.selected) {
//                 sumAdditionalPositionElement.querySelector('.value').innerHTML = ''
//                 const positions = getPositionByType('Additional position')
//                 positions.forEach((e, i) => {
//                     const element = document.createElement('div')
//                     element.className = `sub-value`
//                     element.textContent = UserSelected.Position[e].title + addtionalPriceToText(UserSelected.Position[e].additionalPrice)
//                     sumAdditionalPositionElement.querySelector('.value').appendChild(element)
//                 })
//                 sumAdditionalPositionElement.style.display = 'block'
//             } else {
//                 sumAdditionalPositionElement.style.display = 'none'
//             }


//             // Require logo/text
//             if (UserSelected.Require_logo_text.is_require && UserSelected.Require_logo_text.selected) {
//                 sumRequireLogoTextElement.innerHTML = ''
//                 const selectedType = UserSelected.Require_logo_text.selected
//                 var value, img
//                 if (selectedType == 'logo') {
//                     value = false
//                     img = UserSelected.Require_logo_text.image_src
//                 } else if (selectedType == 'text') {
//                     value = requireTextOptionInputElement.value
//                 }
//                 sumRequireLogoTextElement.appendChild(createPairContainerElement(`${capitalizeFirstLetter(selectedType)}`, value, img))
//                 // sumRequireLogoTextElement.appendChild(createPairContainerElement(` Setup ${selectedType}`, (CurrencySymbol + UserSelected.Require_logo_text.price)))
//                 const positions = getPositionByType("Require_logo_text")
//                 positions.forEach((e, i) => {
//                     sumRequireLogoTextElement.appendChild(createPairContainerElement('Position', UserSelected.Position[e].title + addtionalPriceToText(UserSelected.Position[e].additionalPrice)))
//                 })
//                 sumRequireLogoTextElement.style.display = 'block'
//             } else {
//                 sumAdditionalLogoTextElement.style.display = 'none'
//             }

//             // Additional logo/text
//             if (UserSelected.Additional_logo_text.selected) {
//                 sumAdditionalLogoTextElement.innerHTML = ''
//                 const selectedType = UserSelected.Additional_logo_text.selected
//                 if (selectedType == 'logo') {
//                     value = false
//                     img = UserSelected.Additional_logo_text.image_src
//                 } else if (selectedType == 'text') {
//                     value = additionalTextOptionInputElement.value
//                 }
//                 sumAdditionalLogoTextElement.appendChild(createPairContainerElement(`Additional ${selectedType}`, value, img))
//                 // sumAdditionalLogoTextElement.appendChild(createPairContainerElement(`Additional ${selectedType}`, (CurrencySymbol + UserSelected.Additional_logo_text.price)))
//                 const positions = getPositionByType("Additional logo text")
//                 positions.forEach((e, i) => {
//                     sumAdditionalLogoTextElement.appendChild(createPairContainerElement('Position', UserSelected.Position[e].title + addtionalPriceToText(UserSelected.Position[e].additionalPrice)))
//                 })
//                 sumAdditionalLogoTextElement.style.display = 'block'
//             } else {
//                 sumAdditionalLogoTextElement.style.display = 'none'
//             }


//             // Additional name
//             if (UserSelected.Additional_name.selected) {
//                 sumAdditionalNameElement.innerHTML = ''
//                 sumAdditionalNameElement.appendChild(createPairContainerElement(`Additional name`, 'Free'))
//                 const positions = Object.entries(UserSelected.Additional_name.positions)
//                 positions.forEach((e, i) => {
//                     sumAdditionalNameElement.appendChild(createPairContainerElement('Position', e[1].title + addtionalPriceToText(e[1].additionalPrice)))
//                 })
//                 sumAdditionalNameElement.style.display = 'block'
//             } else {
//                 sumAdditionalNameElement.style.display = 'none'
//             }

//             // Delivery fee
//             sumDeliveryFeeElement.querySelector('.value').textContent = UserSelected.Delivery_Fee === 'free' ? 'Free' : CurrencySymbol + UserSelected.Delivery_Fee

//             // Price
//             // UserSelected.getTotalPrice()

//             getTotalPrice()
//                 .then(value => {
//                     priceSumElement.querySelector('.value').textContent = CurrencySymbol + value.toFixed(2).toString()
//                     UserSelected.resetDiscount()
//                     $.ajax({
//                         url: '/voucher/get_auto_apply_vouchers',
//                         type: 'get',
//                         data: flattenObject(UserSelected, true),
//                         success: function(data){
//                             console.log('vouchers :>> ', data);
                            
//                             if (data.length > 0) {
//                                 var totalPrice = value

//                                 data.forEach(voucher => {
//                                     addVoucher(voucher)
//                                 })
//                                 getTotalPriceAfterDiscount()
//                                     .then(value => {
//                                         priceSumElement.querySelector('.value').textContent = `${CurrencySymbol}${totalPrice.toFixed(2).toString()} -> ${CurrencySymbol}${value.toFixed(2).toString()}`

//                                         // Require logo/text
//                                         if (UserSelected.Require_logo_text.is_require && UserSelected.Require_logo_text.selected) {
//                                             sumRequireLogoTextElement.innerHTML = ''
//                                             const selectedType = UserSelected.Require_logo_text.selected
//                                             sumRequireLogoTextElement.appendChild(createPairContainerElement(capitalizeFirstLetter(selectedType), (CurrencySymbol + (UserSelected.Require_logo_text.price - UserSelected.Discount.Require_logo_text) )))
//                                             const positions = getPositionByType("Require_logo_text")
//                                             positions.forEach((e, i) => {
//                                                 sumRequireLogoTextElement.appendChild(createPairContainerElement('Position', UserSelected.Position[e].title + addtionalPriceToText(UserSelected.Position[e].additionalPrice)))
//                                             })
//                                             sumRequireLogoTextElement.style.display = 'block'
//                                         } else {
//                                             sumAdditionalLogoTextElement.style.display = 'none'
//                                         }

//                                         // Delivery fee
//                                         sumDeliveryFeeElement.querySelector('.value').textContent =  CurrencySymbol + (UserSelected.Delivery_Fee - UserSelected.Discount.Delivery_Fee)
//                                     }) 
//                             }
//                         },
//                         error: function(XMLHttpRequest, textStatus, errorThrown) { 
//                             alert("Status: " + textStatus); alert("Error: " + errorThrown); 
//                         } 
//                     })
//                 })
//                 .catch(error => {
//                     console.log('error :>> ', error);
//                 })
//         } catch (error) {
//             console.log('error :>> ', error);
//         } finally {
//             isUpdating = false
//         }
//     }
    
// }


// const FOR_REQUIRE_LOGO_TEXT = 'Require_logo_text'
// const FOR_ADDITIONAL_LOGO_TEXT = 'Additional_logo_text'
// const FOR_DELIVERY_FEE = 'Delivery_Fee'
// const FOR_EACH_ITEM = 'Each_item_price'
// const FOR_ALL_ITEM = 'All_items_price'

// function addVoucher(voucher) {
//     voucher.value = parseFloat(voucher.value)
//     var forField = voucher.for_field
//     var currentPrice = forField === FOR_REQUIRE_LOGO_TEXT ? UserSelected.Require_logo_text.price
//                     : forField === FOR_ADDITIONAL_LOGO_TEXT ? UserSelected.Additional_logo_text.price
//                     : forField === FOR_DELIVERY_FEE ? UserSelected.Delivery_Fee
//                     : forField === FOR_EACH_ITEM ? UserSelected.Each_item_price
//                     : forField === FOR_ALL_ITEM ? UserSelected.All_items_price : 0
//     var discountValue = 0
//     console.log(`Price before for ${forField} - ${voucher.name}: ${currentPrice}`)
//     if (voucher.by_percent) {
//         // UserSelected[tmp] = UserSelected[tmp] - (UserSelected[tmp] * voucher.value / 100)
//         discountValue = currentPrice * voucher.value / 100
//     } else {
//         // UserSelected[tmp] -= voucher.value
//         discountValue = voucher.value
//     }
//     console.log('discountValue :>> ', discountValue);
//     UserSelected.Discount[forField] += discountValue

//     sumVoucherElement.appendChild(createPairContainerElement('Applied', voucher.name))
// }


// function onAdditionalOptionsSelection(event, type){
//     const target = event.target
//     const choice = target.value === "1" ? true : false
//     const checkboxGroup = target.closest('.product-option').querySelector('.checkbox-group')
//     if (choice) {
//         checkboxGroup.style.display = 'block'
//         UserSelected[`Additional_${type}`].selected = true
//     } else {
//         checkboxGroup.style.display = 'none'
//         UserSelected[`Additional_${type}`].selected = false
//     }
// };

// function onSizeSelection(event){
//     UserSelected.Size.id = event.target.value
//     UserSelected.Size.title = event.target.querySelector(`option[value="${event.target.value}"]`).textContent
//     update()
// }



// additionalPositionSelectElement.onchange = e => onAdditionalOptionsSelection(e, 'position')
// sizeSelectElement.onchange = onSizeSelection
// additionalNameSelectElement.onchange = function (event){
//     const target = event.target
//     const choice = target.value === "1" ? true : false
//     var setDisplay = 'none'
//     const checkboxGroup = target.closest('.product-option').querySelector('.checkbox-group')
//     const formGroup = target.closest('.product-option').querySelector('.form-group-wrapper')
//     if (choice) {
//         setDisplay = 'block'
//         // checkboxGroup.style.display = 'block'
//         UserSelected[`Additional_name`].selected = true
//     } else {
//         // checkboxGroup.style.display = 'none'
//         UserSelected[`Additional_name`].selected = false
//     }
//     checkboxGroup.style.display = setDisplay
//     formGroup.style.display = setDisplay
// };


// // Show logo/text on "Additional logo/text" select
// logoTextSelectElements.forEach(e => {
//     e.onchange = function(event) {
//         const target = event.target
//         const value = event.target.value
//         const root = target.closest('.product-option')
//         const selectedOptionElement = target.querySelector(`option[value="${value}"]`)
//         const positionOptionElement = root.querySelector('.position-option')
//         const logoOptionElement = root.querySelector('.options-container .logo-option')
//         const textOptionElement = root.querySelector('.options-container .text-option')
//         const type = root.dataset.type;
//         console.log('root :>> ', [logoOptionElement, textOptionElement, positionOptionElement]);
//         [logoOptionElement, textOptionElement, positionOptionElement].forEach(e => { e.style.display = 'none' })

//         if (value == '1') {
//             logoOptionElement.style.display = 'block'
//             positionOptionElement.style.display = 'block'
//             UserSelected[type].selected = 'logo'
//         } else if (value == '2') {

//             textOptionElement.style.display = 'block'
//             positionOptionElement.style.display = 'block'
//             UserSelected[type].selected = 'text'
//         } else {
//             UserSelected[type].selected = false
//         }

//         UserSelected[type].price = selectedOptionElement.dataset.price
//         update()
//     }
// })



// // On upload image event
// logoFileUploadElements.forEach( e => {
//     e.onchange = function(event) {
//         const target = event.target
//         const [file] = target.files
//         const root = target.closest('.product-option')
//         const logoFilePreviewElement = root.querySelector('.file-upload__preview')
//         const logoFileUploadLabelElement = root.querySelector('.custom-file-label')
//         const type = root.dataset.type

//         if (file && file['type'].split('/')[0] === 'image') {
//             // logoFileUploadLabelElement.textContent = file.name
//             var blob = URL.createObjectURL(file)
//             logoFilePreviewElement.src = blob
//             logoFilePreviewElement.style.display = 'block'

//             UserSelected[type].image_id = false
//             UserSelected[type].file = file
//             UserSelected[type].image_src = blob
//         }
//     }
// })


// //   Avoid duplicate position option
// mainPositionSelectElement.onchange = function(event) {
//     const target = event.target

//     UserSelected.Position = Object.fromEntries( Object.entries(UserSelected.Position).filter(e => {return e[1].type !== 'main'}) )
//     UserSelected.Position[target.value] = {
//         type: 'main',
//         title: target.querySelector(`option[value="${target.value}"]`).dataset.title,
//         additionalPrice: target.querySelector(`option[value="${target.value}"]`).dataset.price
//     }

//     const allCheckBox = document.querySelectorAll(`.position-checkbox[name]`)
//     const allSameCheckboxValue = document.querySelectorAll(`.position-checkbox[name='${target.value}']`)
//     allCheckBox.forEach(e => {
//         const checkboxContainer = e.closest('.checkbox-container')
//         checkboxContainer.style.display = 'block'
//     })
//     allSameCheckboxValue.forEach(e => {
//         const checkboxContainer = e.closest('.checkbox-container')
//         checkboxContainer.style.display = 'none'
//     })

//     update()
// }
// positionCheckboxElements.forEach(e => {
//     e.onchange = function(event) {
//         const target = event.target
//         const allSameCheckboxValue = document.querySelectorAll(`.position-checkbox[name='${target.name}']`)
//         const checkedElements = [... allSameCheckboxValue].filter (e => { return e !== target  &&  e.checked})
//         const type = target.closest('.product-option').dataset.type
//         console.log('type :>> ', type);
//         if (checkedElements.length === 0) {
//             if (target.checked) {
//                 dataCheckedPositionElement.dataset[target.name.toLowerCase()] = target.dataset.price
//                 // UserSelected.Position = Object.fromEntries( Object.entries(UserSelected.Position).filter(e => {return !e[1] === type}) )
//                 // console.log('target.name :>> ', target.name);
//                 // UserSelected.Position[target.name] = type
//                 // if (UserSelected.Position[target.name] === undefined) {
//                 //     UserSelected.Position[target.name] = [type]
//                 // } else {
//                 //     UserSelected.Position[target.name].pus
//                 // }
//             } else {
//                 dataCheckedPositionElement.dataset[target.name.toLowerCase()] = '0'
//             }
//         } else {
//             checkedElements.forEach(e => { e.checked = false })
//         }

//         if (target.checked) {
//             console.log('target :>> ', target);
//             UserSelected.Position[target.name] = {
//                 type,
//                 title: target.dataset.title,
//                 additionalPrice: target.dataset.price
//             }
//         } else {
//             delete UserSelected.Position[target.name]
//         }
        
//         update()
//     }
// })
// additionalNamePositionCheckboxElements.forEach(e => {
//     e.onchange = function(event) {
//         const target = event.target

//         if (target.checked) {
//             console.log('target :>> ', target);
//             UserSelected.Additional_name.positions[target.name] = {
//                 // type,
//                 title: target.dataset.title,
//                 additionalPrice: target.dataset.price
//             }
//         } else {
//             delete UserSelected.Additional_name.positions[target.name]
//         }
//         update()
//     }
// })



// hasDataPriceElements.forEach(e => {
//     // const parentProductOptionElement = e.closest('.product-option')
//     var price = e.dataset.price

//     if (parseFloat(price) !== 0) {
//         e.textContent += ` (${price}£)`
//     }
// })


// // Validate
// function validateSubmit() {
    
// }
// // On submit
// const addToCartButton = document.querySelector(`button#add-to-cart`)
// const addToCartUrl = '/cart/add_cart/12/'
// addToCartButton.onclick = function(e){
//     if (UserSelected.Additional_name.selected) {
//         UserSelected.Additional_name.name = document.getElementById('input__additional-name').value
//     }
//     if (UserSelected.Require_logo_text.is_require && UserSelected.Require_logo_text.selected === 'text') {
//         UserSelected.Require_logo_text.text = requireTextOptionInputElement.value
//         UserSelected.Require_logo_text.font = requireTextOptionInputElement.parentNode.querySelector('.font-input').value
//         UserSelected.Require_logo_text.color = requireTextOptionInputElement.parentNode.querySelector('.color-input').value
//     }
//     if (UserSelected.Additional_logo_text.selected === 'text') {
//         UserSelected.Additional_logo_text.text = additionalTextOptionInputElement.value // change to additional_text_option__input
//         UserSelected.Additional_logo_text.font = additionalTextOptionInputElement.parentNode.querySelector('.font-input').value 
//         UserSelected.Additional_logo_text.color = additionalTextOptionInputElement.parentNode.querySelector('.color-input').value 
//     }
//     UserSelected.Quantity = document.querySelector(`input[name="quantity"]`).value

//     var formData = new FormData();
//     formData.append("csrfmiddlewaretoken", csrfmiddlewaretoken);
//     flatData = flattenObject(UserSelected)
//     for ( var key in flatData ) {
//         formData.append(key, flatData[key]);
//     }
//     // formData.append('Each_item_price', UserSelected.getEachItemPrice())
//     // formData.append('All_items_price', UserSelected.getAllItemPrice())


//     $.ajax({
//         url: addToCartUrl,
//         data: formData,
//         processData: false,
//         contentType: false,
//         type: 'POST',
//         success: function(data){
//             alert("Post thành công")
//         },
//         error: function(XMLHttpRequest, textStatus, errorThrown) { 
//             alert("Status: " + textStatus); alert("Error: " + errorThrown); 
//         }   

//     });
// };


// // Util
// function getPositionByType(type) {
//     return Object.keys(UserSelected.Position).filter(key => UserSelected.Position[key].type === type);
// }








// // no idea how to name it
// function clickLeftThumb() {
//     var imgSrc = document.querySelector(`.color-option input[value="${UserSelected.Variant.id}"] ~ a img`).getAttribute('src')
//     document.querySelector(`.product__thumb.nice-scroll .pt img[src="${imgSrc}"]`).click()
// }







// // Update color
// $(document).on('change', '#post-form',function(e){
//     e.preventDefault();
//     $.ajax({
//         type:'POST',
//         url:"/shop/ajaxcolour/",
//         data:{
//             productid:$('#productid').val(),
//             size:$('#size_select').val(),
//             color: colourId,
//             csrfmiddlewaretoken: csrfmiddlewaretoken,
//             action: 'post'
//         },
//         data_type : 'html',
//         success: function (data) {
//             console.log("success")
//             console.log('data :>> ', data);
//             updateColor(data)
//             // console.log('data.rendered_table :>> ', data.rendered_table);;
//             // $('#appendHere').html(data.rendered_table);
//             // console.log('data :>> ', data);
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             alert("Status: " + textStatus); alert("Error: " + errorThrown); 
//         }
//     });
// });

// function updateColor(data) {
//     // Get variant
//     var newVariant = data.find(e => {
//         return e.colour.toString() === UserSelected.Colour.id && e.size.toString() === UserSelected.Size.id
//     }) || data[0]

//     UserSelected.Variant.title = newVariant.title
//     UserSelected.Variant.id = newVariant.variant_id
//     UserSelected.Variant.price = parseFloat(newVariant.price)
//     UserSelected.Colour.title = newVariant.colour_title
//     UserSelected.Colour.id = newVariant.colour
//     productPrice = parseFloat(newVariant.price)

//     const colorOption = document.querySelector(`ul.color-option`)
//     colorOption.innerHTML = `<span class="text-uppercase">Colour:</span>`
//     data.forEach(e => {
//         label = document.createElement('label')
//         input = document.createElement('input')
//         a = document.createElement('a')
//         img = document.createElement('img')
//         label.style = "border-color: black transparent transparent transparent;"
//         label.title = e.colour_title

//         input.type = 'radio'
//         if (variantid == e.variant_id.toString()) {
//             input.setAttribute('checked', '')
//             a.class = "active"
//         }
//         input.name = "variantid"
//         // input.id = "variantid"
//         input.value = e.variant_id
//         input.setAttribute("onchange",  "this.form.submit();")

//         img.src = e.image
//         img.style = "height: 50px"

//         a.appendChild(img)
//         label.appendChild(input)
//         label.appendChild(a)

//         colorOption.appendChild(label)
//     })

//     // Click left thumb
//     clickLeftThumb()

//     update()
// }


// // Logo suggest
// const showUploadedLogoButtonElements = document.querySelectorAll('.btn_show-uploaded-logo')
// const uploadedLogoSelectElements = document.querySelectorAll('.uploaded-logo-select')
// const overlayElement = document.querySelector('.overlay')

// setTimeout(() => {
//     document.querySelectorAll('.overlay img').forEach(e => {
//         e.style.height = e.width + 'px'
//     }); 
// }, 1000)

// showUploadedLogoButtonElements.forEach(e => {
//     e.onclick = function(event) {
//         const target = event.target
//         const root = target.closest('.product-option')
//         const type = root.dataset.type
//         if (overlayElement.classList.contains('hide')) {
//             overlayElement.classList.remove('hide')
//             document.querySelectorAll('.overlay img').forEach(e => {
//                 e.style.height = e.width + 'px'
//             }); 
//         }
//         overlayElement.dataset.type = type
//     }
// })

// uploadedLogoSelectElements.forEach(e => {  
//     e.onclick = function(event) {
//         const target = event.target
//         const root = target.closest('.product-option')
//         const type = root.dataset.type
//         // const logoFilePreviewElement = document.querySelector(`.product-option[data-type="${overlayElement.dataset.type}"] .file-upload__preview`)
//         const logoFilePreviewElement = root.querySelector(`.file-upload__preview`)
//         const isChecked = e.classList.contains('checked')
//         const isLogoOrdered = e.dataset.ordered === '0' ? false : true

//         document.querySelectorAll('.uploaded-logo-select.checked').forEach(e => {
//             e.classList.remove('checked')
//             checkmark = e.querySelector('span.checkmark.checked')
//             if (checkmark) {
//                 checkmark.classList.remove('checked')
//             }
//         })
//         // if (!isChecked) {
//         //     e.classList.add('checked')
//         //     e.querySelector('span.checkmark').classList.add('checked')
//         logoFilePreviewElement.src = e.querySelector('img').src
//         logoFilePreviewElement.style.display = 'block'

//         UserSelected[type].image_id = e.dataset.value
//         UserSelected[type].image_src = e.querySelector('img').src
//         UserSelected[type].file = false
//         if (isLogoOrdered) {
//             UserSelected[type].price = 0
//         }
//         // }

//         if (!overlayElement.classList.contains('hide')) {
//             overlayElement.classList.add('hide')
//         }

//         update()
//     }

//     // make uploaded logo square
//     img = e.querySelector('img')

//     setTimeout(() => {
//         img.height = img.width
//     }, 1000)
// }); 



// quantityInputElement.onchange = function(event) {
//     event.preventDefault()
//     update()
// };

// [requireTextOptionInputElement, additionalTextOptionInputElement].forEach(e => {
//     e.onfocusout = function() {
//         const container = e.closest('.product-option')
//         const type = container.dataset.type
//         UserSelected[type].text = e.value
//         document.querySelector(`#sum_${type.replaceAll('_', '-').toLowerCase()} .value`).textContent = `  ${e.value}  `
//     }
// })

// fontInputElements.forEach(e => {
//     e.onfocusout = function() {
//         const container = e.closest('.product-option')
//         const type = container.dataset.type
//         UserSelected[type].font = e.value
//     }
// })

// colorInputElements.forEach(e => {
//     e.onchange = function() {
//         const container = e.closest('.product-option')
//         const type = container.dataset.type
//         UserSelected[type].font = e.value

//         textInputElement = container.querySelector('.text-input')
        
//         textInputElement.style.color = e.value
//         textInputElement.style.backgroundColor = contrastingColor(e.value)
//         // document.querySelector(`#sum_${type.replaceAll('_', '-').toLowerCase()} .value`).style.color = e.value
//         // document.querySelector(`#sum_${type.replaceAll('_', '-').toLowerCase()} .value`).style.backgroundColor = invertColor(e.value)
//     }
// })



