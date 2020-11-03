const perf_hooks = require('perf_hooks'); 

import send from '@polka/send';

import * as cookie from 'cookie';

import { secure } from './_config.js';

import { delete_session } from '../../utils/auth.js';


export 
async function get(req, res) 
{
	

var TIMING_TEMP_VAR_AUTOGEN1__RANDOM = perf_hooks.performance.now();
 await  delete_session(req.cookies.sid);
console.log("/home/ellen/Documents/ASJProj/TESTING_reordering/svelte/site/src/routes/auth/logout.js& [6, 1; 6, 39]& TEMP_VAR_AUTOGEN1__RANDOM& " + (perf_hooks.performance.now() - TIMING_TEMP_VAR_AUTOGEN1__RANDOM));
 

	
send(res, 200, '', {
		'Set-Cookie': cookie.serialize('sid', '', {
			maxAge: -1,
			path: '/',
			httpOnly: true,
			secure
		})
	});
}