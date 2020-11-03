const perf_hooks = requir
('perf_hooks'); 



import * as fs from 'fs';



import * as path from 'path';



import * as http from 'http';


import { rollup } from 'rollup';


import virtual from '@rollup/plugin-virtual';

import puppeteer from 'puppeteer';

imp
ort { addLineNumbers, loadConfig, loadSvelte } from '../helpers';


import { deepEqual } from 'assert';



c
onst page = `
<body>
	
<main></mai
>
	
<script src
'/bundle.js'></script>
<
/body>
`
;


co
nst assert = fs.readFileSync(`${__dirna
me}/assert.js`, 'utf-8');


descr
ibe('custom-el
ments', function() 
{
	
this
.timeout(10000);

	
let s
v
lte;
	
let
 server;
	
let
 browser;
	
let c
o
e;

	
function create_server() 
{

		

re
turn new Promise((fulfil, reject) => 
{
		
	
co
nst server = http.createServer((req,
 res) => 
{
			
	
if (req.url === '/') 
{

		
			
re
s.end(page);
			
	


	
			
if
 (req.url === '/bund
le.js')


{
		
			
re
s.end(code);
		
		}
		
	})
;

		
	
ser
ver.on('error', reject);

			
ser
ver.listen('6789', () => 
{
				
fulfil(server);
			})
;
		})
;
	}

	
before(as

ync () => 
{
		
svelte = loadSvelte();
		
console.
log('[custom-element] Loaded Svelte');
		
server = await create_server();
		
var TEMP_VAR_AUTOGEN19__RANDOM =  puppeteer.launch();

console.log('[custom-element] Started server');
		

var TEMP
_VAR_AUTOGEN19__RANDOM_LATER =  TEMP_VAR_AUTOGEN19__RANDOM


		
console.log('[custom-element] Launched puppeteer browser');
var TIMING_TEMP_VAR_AUTOGEN19__RANDOM_LATER = perf_hooks.performance.now();
 console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/svelte/test/custom-elements/index.ts& [51, 2; 51, 37]& TEMP_VAR_AUTOGEN19__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN19__RANDOM_LATER));
 browse
r =  await TEMP_VAR_AUTOGEN19__RANDOM_LATER

	})

;

	
after(async () => 
{
		
if (s
e
ver) 
server.close();
		
if (
browser) 
awai
t browser.close();
	})
;

	
fs.readdirSync(`${__dirname}/samples`).forEach(dir => 
{
		
if (d

ir[0] === '.
') 
retu
rn;

		
cons
t solo = /\.solo$/.test
(dir);
		
const skip = /\.skip$/.test(dir);
		
const internal = path.resolve('internal/index.mjs');
		
const index = path.resolve('index.mjs');
		
const 

warnings = [];

		
(so
l
 ? it.only : skip ? it.skip : it)(dir, async () => 
{
			
const config = loadConfig(`${__dirname}/samples/${dir}/_config.js`);
			
const expected_warnings = config.warnings || [];

			
const bundle = await rollup({
				input: `${__dirname}/samples/${dir}/test.js`,
				plugins: [
					{
						resolveId(importee) 
{
							
if (importee === 'svelte/internal' || importee === './internal') 
{
								
return internal;
							}

							
if (importee === 'svelte') 
{
								
return index;
							}
						},


						transform(code, id) 
{
							
if (id.endsWith('.svelte')) 
{
								
const compiled = svelte.compile(code.replace(/\r/g, ''), {
									customElement: true,
									dev: config.dev
								});

								
compiled.warnings.forEach(w => warnings.push(w));

								
return compiled.js;
							}
						}
					},

					virtual({
						assert
					})
				]
			});

			
const result = await bundle.generate({ format: 'iife', name: 'test' });
			
code = result.output[0].code;

			
const page = await browser.newPage();

			
page.on('console', (type, ...args) => 
{
				
console[type](...args);
			})
;

			
page.on('error', error => 
{
				
console.log('>>> an error happened');
				
console.error(error);
			})
;

			
try 
{
				
await page.goto('http://localhost:6789');

				
const result = await page.evaluate(() => test(document.querySelector('main')));
				
if (result) 
console.log(result);
			} 

catch (err) 
{
				
console.log(addLineNumbers(code));
				
throw err;
			} 

finally
{
				
if (expected_warnings) 
{
					
deepEqual(warnings.map(w => ({
						code: w.code,
						message: w.message,
						pos: w.pos,
						start: w.start,
						end: w.end
					})), expected_warnings);
				}
			}
		})
;
	})
;
})
;
