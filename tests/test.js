// Setup support for envs
import dotenv from 'dotenv';
dotenv.config();

// Import WpeApi class
import WpeApi from '../src/index.js';

// Setup WpeApi class
const user = process.env.WPE_USER;
const pass = process.env.WPE_PASS;
const wpe = new WpeApi(user, pass);

// Test
const id = process.env.WPE_ID;

setInterval(async () => console.log(await wpe.name(id)), 1000);
