"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
exports.truncate = truncate;
function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}
function truncate(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "...";
}
//# sourceMappingURL=helpers.js.map