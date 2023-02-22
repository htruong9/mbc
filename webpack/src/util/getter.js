export const getCSRFmiddlewaretoken = function() {
    return document.querySelector(
        `input[name="csrfmiddlewaretoken"]`
    ).value;
}