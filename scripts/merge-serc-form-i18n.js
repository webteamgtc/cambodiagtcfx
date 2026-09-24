const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const patch = JSON.parse(
  fs.readFileSync(path.join(root, "scripts/serc-form-i18n.json"), "utf8")
);

const enPath = path.join(root, "src/translation/en.json");
const kmPath = path.join(root, "src/translation/km.json");

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
en.liveAccountApplicationPage.sercForm = patch.en;
fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`);

const km = JSON.parse(fs.readFileSync(kmPath, "utf8"));
km.liveAccountApplicationPage.sercForm = patch.km;
fs.writeFileSync(kmPath, `${JSON.stringify(km, null, 2)}\n`);

console.log("Merged liveAccountApplicationPage.sercForm into en.json and km.json");
