$('.file-upload__input').on('change', function (event) {
    const val = $(this).val()
    const files = $(this).prop('files')
    if (files.length === 0) { return }
    const file = files[0]
    if (!file && file["type"].split("/")[0] !== "image") {
        alert('File is not type of image')
    }
    
    const root = $(this).closest('.logo-option')
    const filePreview = root.find('.file-preview')
    const img = filePreview.find('img')
    const blob = URL.createObjectURL(file);
    img.attr("src", blob)
    img.show()
    filePreview.show()
    
    root.find('input').prop('checked', true);
});