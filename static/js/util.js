const CurrencySymbol = '£'

function toMoneyString(num, is_include_currency_symbol = false) {
    return is_include_currency_symbol ? CurrencySymbol + (Math.round(num * 100) / 100).toFixed(2) : (Math.round(num * 100) / 100).toFixed(2)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function flattenObject(ob, is_remove_file = false) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if (typeof ob[i] === 'function') continue;

        if (i ===  'file') { toReturn[i] = ob[i]; continue; };
        if (i ===  'positions' || i === 'Position') { toReturn[i] = JSON.stringify(ob[i]); continue; };

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '__' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }

    if (is_remove_file) {
        delete toReturn['Require_logo_text__file']
        delete toReturn['Additional_logo_text__file']
    }
    return toReturn;
}

function clearAllChild(element) {
    element.innerHTML = ''
}

function contrastingColor(color) {
    color = color.replace('#', '')
    return (luma(color) >= 165) ? '#000' : '#fff';
}
function luma(color) { // color can be a hx string or an array of RGB values 0-255
    var rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
}
function hexToRGBArray(color) {
    if (color.length === 3)
        color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    else if (color.length !== 6)
        throw('Invalid hex color: ' + color);
    var rgb = [];
    for (var i = 0; i <= 2; i++)
        rgb[i] = parseInt(color.substr(i * 2, 2), 16);
    return rgb;
}

function addtionalPriceToText(price) { return price === '0' ? '' : ` (${CurrencySymbol}${price})` }

function createPairContainerElement(title, value, img) {
    const pairContainer = document.createElement('div')
    pairContainer.className = 'pair-container'
    const titleElement = document.createElement('div')
    const valueElement = document.createElement('div')
    titleElement.className = 'title'
    valueElement.className = 'value'
    titleElement.textContent = title

    if (value || value === '') {
        console.log('value :>> ', value);
        valueElement.textContent = value
        valueElement.setAttribute('style', '')
    } else if (img !== undefined) {
        console.log('img :>> ', img);
        imgElement = document.createElement('img')
        imgElement.onerror= function() { this.parentNode.style='color:red';this.parentNode.textContent='Please choose an image' }
        imgElement.style.width="64px"
        imgElement.src = img ? img : ''
        valueElement.appendChild(imgElement)
    }

    pairContainer.appendChild(titleElement)
    pairContainer.appendChild(valueElement)
    return pairContainer
}