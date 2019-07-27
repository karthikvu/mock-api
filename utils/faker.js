const faker = require('faker');


const fakerSchema = {
   "locales": [
      "az",
      "cz",
      "de",
      "de_AT",
      "de_CH",
      "en",
      "en_AU",
      "en_BORK",
      "en_CA",
      "en_GB",
      "en_IE",
      "en_IND",
      "en_US",
      "en_au_ocker",
      "es",
      "es_MX",
      "fa",
      "fr",
      "fr_CA",
      "ge",
      "id_ID",
      "it",
      "ja",
      "ko",
      "nb_NO",
      "nep",
      "nl",
      "pl",
      "pt_BR",
      "ru",
      "sk",
      "sv",
      "tr",
      "uk",
      "vi",
      "zh_CN",
      "zh_TW"
   ],
   "locale": [
      "0",
      "1"
   ],
   "localeFallback": [
      "0",
      "1"
   ],
   "definitions": [
      "name",
      "address",
      "company",
      "lorem",
      "hacker",
      "phone_number",
      "finance",
      "internet",
      "commerce",
      "database",
      "system",
      "date",
      "title",
      "separator"
   ],
   "fake": [

   ],
   "random": [
      "number",
      "arrayElement",
      "objectElement",
      "uuid",
      "boolean",
      "word",
      "words",
      "image",
      "locale",
      "alphaNumeric"
   ],
   "helpers": [
      "randomize",
      "slugify",
      "replaceSymbolWithNumber",
      "replaceSymbols",
      "shuffle",
      "mustache",
      "createCard",
      "contextualCard",
      "userCard",
      "createTransaction"
   ],
   "name": [
      "firstName",
      "lastName",
      "findName",
      "jobTitle",
      "prefix",
      "suffix",
      "title",
      "jobDescriptor",
      "jobArea",
      "jobType"
   ],
   "address": [
      "zipCode",
      "city",
      "cityPrefix",
      "citySuffix",
      "streetName",
      "streetAddress",
      "streetSuffix",
      "streetPrefix",
      "secondaryAddress",
      "county",
      "country",
      "countryCode",
      "state",
      "stateAbbr",
      "latitude",
      "longitude"
   ],
   "company": [
      "suffixes",
      "companyName",
      "companySuffix",
      "catchPhrase",
      "bs",
      "catchPhraseAdjective",
      "catchPhraseDescriptor",
      "catchPhraseNoun",
      "bsAdjective",
      "bsBuzz",
      "bsNoun"
   ],
   "finance": [
      "account",
      "accountName",
      "mask",
      "amount",
      "transactionType",
      "currencyCode",
      "currencyName",
      "currencySymbol",
      "bitcoinAddress",
      "iban",
      "bic"
   ],
   "image": [
      "image",
      "avatar",
      "imageUrl",
      "abstract",
      "animals",
      "business",
      "cats",
      "city",
      "food",
      "nightlife",
      "fashion",
      "people",
      "nature",
      "sports",
      "technics",
      "transport",
      "dataUri"
   ],
   "lorem": [
      "word",
      "words",
      "sentence",
      "slug",
      "sentences",
      "paragraph",
      "paragraphs",
      "text",
      "lines"
   ],
   "hacker": [
      "abbreviation",
      "adjective",
      "noun",
      "verb",
      "ingverb",
      "phrase"
   ],
   "internet": [
      "avatar",
      "email",
      "exampleEmail",
      "userName",
      "protocol",
      "url",
      "domainName",
      "domainSuffix",
      "domainWord",
      "ip",
      "ipv6",
      "userAgent",
      "color",
      "mac",
      "password"
   ],
   "database": [
      "column",
      "type",
      "collation",
      "engine"
   ],
   "phone": [
      "phoneNumber",
      "phoneNumberFormat",
      "phoneFormats"
   ],
   "date": [
      "past",
      "future",
      "between",
      "recent",
      "month",
      "weekday"
   ],
   "commerce": [
      "color",
      "department",
      "productName",
      "price",
      "productAdjective",
      "productMaterial",
      "product"
   ],
   "system": [
      "fileName",
      "commonFileName",
      "mimeType",
      "commonFileType",
      "commonFileExt",
      "fileType",
      "fileExt",
      "directoryPath",
      "filePath",
      "semver"
   ]
}

      const schema = {
         name: "commerce.productName",
         createdOn: "date.recent",
         isAdmin: "random.boolean",
         hardcode: "Some Hardcoded data",
         description: "lorem.paragraph"
      }

function schema2data(schema) {
   let mock = {}

   if (typeof schema === typeof true) {
      return  schema;
   }

   if (typeof schema === typeof 10) {
      return  schema;
   }

   if (Array.isArray(schema)) {
      return  schema.map(schema2data);
   }

   if (typeof schema === typeof "string") {
      try {
         return eval("faker." + schema.replace(/{{|}}/g, "") + "()")
      } catch (err) {
         return schema;
      }
   } 

   if( typeof schema == typeof {}){
      let mock = {}
      for (const key in schema) {
         if (schema.hasOwnProperty(key)) {
            const element = schema[key];
            mock[key] = schema2data(element);
         }
      }
      return mock;
   }

   return schema;
}

module.exports = { schema2data }
