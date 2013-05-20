/**

 CKANajax.js

 The MIT License (MIT)

 Copyright (c) <2013> <Henrik Korsgaard>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Using awesome libraries created by others - further credit:

 jQuery: http://jquery.com/

 Json 2: https://github.com/douglascrockford/JSON-js

 Description


 */

/**
 * Calls a given CKAN action API through the GET method with a provided API key
 *
 * @param {String} full_url The full url for the CKAN instance and the provided API function.
 * @param {String} json_data The json data to send.
 * @param {String} apikey The CKAN apikey need to call the API function.
 * @param {function} callback  A function used to provide the json object from the CKAN instance to the function caller.
 * @return {json}   Returns a json object through the provided callback function.
 */

function action_get_with_key(full_url, json_data, apikey, callback){
	var ajax = $.ajax({
		url: full_url,
		type: "GET",
		beforeSend: function (request)
		            {
		                request.setRequestHeader("Authorization", apikey);
		            },
		contentType: "application/json",
		dataType: "json",
		data: json_data
	});
	
	ajax.done(function(msg) {
		response = {"success":true, "message":[msg]};
	
		callback(response);
	});
	
	ajax.fail(function(jqXHR) {
		
		response = {"success":false, "message":JSON.parse(jqXHR.responseText)};
		callback(response);
	});
}


/**
 * Calls a given CKAN action API through the POST method with a provided API key
 *
 * @param {String} full_url The full url for the CKAN instance and the provided API function.
 * @param {String} json_data The json data to send.
 * @param {String} apikey The CKAN apikey need to call the API function.
 * @param {function} callback  A function used to provide the json object from the CKAN instance to the function caller.
 * @return {json}   Returns a json object through the provided callback function.
 */


function action_post(full_url, json_data, apikey, callback){
	var ajax = $.ajax({
		url: full_url,
		type: "POST",
		beforeSend: function (request)
		            {
		                request.setRequestHeader("Authorization", apikey);
		            },
		contentType: "application/json",
		dataType: "json",
		data: json_data
	});
	
	ajax.done(function(msg) {
		response = {"success":true, "message":[msg]};
	
		callback(response);
	});
	
	ajax.fail(function(jqXHR) {
		
		response = {"success":false, "message":JSON.parse(jqXHR.responseText)};
		callback(response);
	});
}

/**
 * Calls a given CKAN datastore API through the POST method with a provided API key
 *
 */

function datastore_post(){
	
}


/**
 * Calls a given CKAN action API through the GET method.
 *
 * @param {String} full_url The full url for the CKAN instance and the provided API function.
 * @param {String} json_data The json data to send.
 * @param {function} callback  A function used to provide the json object from the CKAN instance to the function caller.
 * @return {json}   Returns a json object through the provided callback function.
 */

function action_get(full_url, json_data, callback){
	
	var response;
	
	var ajax = $.ajax({
		url: full_url,
		type: "GET",
		contentType: "application/json",
		dataType: "json",
		data: json_data
	});
	
	ajax.done(function(msg) {
		response = {"success":true, "message":msg};
	
		callback(response);
	});
	
	ajax.fail(function(jqXHR) {

		response = {"success":false, "message": jqXHR.responseText};

		callback(response);
	});
	
	
}



/**
 * Calls a given CKAN datastore API through the GET method.
 *
 */


function datastore_get(){
	
}