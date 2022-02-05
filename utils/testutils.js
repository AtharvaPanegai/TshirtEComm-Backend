/** @format */

// revision of JS
// we've to use the mongoDB queries like gte lte gt lt ne etc
// but we've to replace the only gte with $gte to run the query
// for this we use .replace method

const p = "gte lte gte";
// we've to replace the above string values with

const regex = /\b{gte}|{lte}\b/g;
// we've added boundry to the words so that if anyword containing lte or gte should not be converted into $gte
// \b implies the boundry and which matches the whole and then replaces 

// g means global means in all variables

console.log(p.replace(regex, (m) => `$${m}`));

// we get this output : $gte $lte $gte
