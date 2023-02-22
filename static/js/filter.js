// Util
var getQueryArray = () => {
    var qs = location.search.slice(1);
    var arr = qs.split('&');
    arr = arr.filter(item => item);
    return [...new Set(arr)];
}
var getUrlFromQueryStringArray = (url, qsArray) => {
    url += '?'
    qsArray.forEach(e => {
        if ( e.includes('=') ) {
            [key, value] = e.split('=')
            url += `&${key}=${value}`
        }
    })
    url = url.replace('&', '')
    return url
}

var qsArray = getQueryArray();

(() => {
    // Checkmark all input that filtered
    qsArray.forEach(e => {
        if ( e.includes('=') ) {
            [key, value] = e.split('=')
            try {
                document.querySelector(`input.filter.${key}[value='${value}']`).checked = true
            } catch (error) {
                console.log('error :>> ', error);
            }
        }
    })
})();


$('.filter').on('click', event => {
    var element = event.target
    var elementClasslist = element.classList

    var filterBy = elementClasslist.contains('gender') ? 'gender'
    : elementClasslist.contains('size') ? 'size'
    : elementClasslist.contains('colour') ? 'colour' : false
    if (!filterBy) { return }

    var filterValue = element.value

    var newQueryString = `${filterBy}=${filterValue}`
    if( !qsArray.includes(newQueryString) ) {
        qsArray.push(newQueryString)
    } else {
        qsArray = qsArray.filter(e => e !== newQueryString);
    }

    url = getUrlFromQueryStringArray('/shop/', qsArray);
    location.href = url
})

$('#filter-price-btn').on('click', event => {
    minPrice = $('#minamount').val().replace('$', '')
    maxPrice = $('#maxamount').val().replace('$', '')

    console.log('qsArray before: ', qsArray)
    qsArray = qsArray.filter(e => { return e.includes('min_price') ? false : true })
    qsArray = qsArray.filter(e => { return e.includes('max_price') ? false : true })

    qsArray.push(`min_price=${minPrice}`)
    qsArray.push(`max_price=${maxPrice}`)

    url = getUrlFromQueryStringArray('/shop/', qsArray)
    console.log('minPrice :>> ', minPrice);
    console.log('maxPrice :>> ', maxPrice);
    console.log('url :>> ', url);

    location.href = url
})