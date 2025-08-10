/** @type {import("prettier").Config} */
const config = {
    singleQuote: true,
    trailingComma: "all",
    printWidth: 100,
    plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;