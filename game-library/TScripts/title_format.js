
function formatTitleAsTag(tp, includeHash = false) {
    title = tp.file.title;
    formattedTitle = title.replace(" ", "-").toLowerCase()
    if (includeHash) {
        formattedTitle = "#" + formattedTitle;
    }
    return formattedTitle
}

module.exports = {
    tagTextFormat: (tp) => formatTitleAsTag(tp),
    tagFormat: (tp) => formatTitleAsTag(tp, true),
}