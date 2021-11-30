// Setup support for envs
import dotenv from 'dotenv';
dotenv.config();

// Import WpeApi class
import WpeApi from '../index.js';

// Setup WpeApi class
const user = process.env.WPE_USER;
const pass = process.env.WPE_PASS;
const wpe = new WpeApi(user, pass);

// Test
const id = process.env.WPE_ID;

console.log(await wpe.name(id));
console.log(await wpe.domains(id));
console.log(await wpe.phpVersion(id));
console.log(await wpe.status(id));
console.log(await wpe.cname(id));
console.log(await wpe.environment(id));
console.log(await wpe.primaryDomain(id));
console.log(await wpe.isMultisite(id));
