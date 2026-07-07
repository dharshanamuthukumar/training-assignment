"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const slug = (0, helpers_1.slugify)("Hello World");
const short = (0, helpers_1.truncate)("This is a long text", 10);
console.log(slug);
console.log(short);
//# sourceMappingURL=content.js.map