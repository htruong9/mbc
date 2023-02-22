export const scrollToElement = function($element, timeout=600, padding=64) {
    
    $([document.documentElement, document.body]).animate({
        scrollTop: $element.offset().top - padding
    }, timeout);
}