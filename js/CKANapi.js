/*

 CKANapi.js

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
 The following functions aims at mirroring the CKAN api functions. The utilize the more general
 ajax functions in CKANajax.js

 */


/**
 * Calls the site_read funtion in the CKAN api
 * @param {String} base_url The base url of the CKAN instance.
 * @param {function} callback  A function used to provide the json object from the CKAN instance to the function caller.
 * @return {json}   Returns a json object through the provided callback function.
 */


function site_read(base_url, callback){
	action_get(base_url+"/api/3/action/site_read", "", callback);
}

/**
 * Calls the status_show funtion in the CKAN api
 * @param {String} base_url The base url of the CKAN instance.
 * @param {function} callback  A function used to provide the json object from the CKAN instance to the function caller.
 * @return {json}   Returns a json object through the provided callback function, with CKAN site information
 */

function status_show(base_url, callback){

    action_get(base_url+"/api/3/action/status_show", "", callback);
}

function user_show(base_url, user, callback){
    var json_data = {"id": user};
    action_get(base_url+"/api/3/action/user_show", json_data, callback);
}

function organization_list_for_user(base_url, user, apikey, callback){
    action_get_with_key(base_url+"/api/3/action/organization_list_for_user", "", apikey, callback);
}

function organization_list(base_url, full_info_boolean, callback){
    var json_data = {"all_fields":full_info_boolean}

    action_get(base_url+"/api/3/action/organization_list",json_data, callback);
}

function group_list(base_url, full_info_boolean, callback){
    var json_data = {"all_fields":full_info_boolean};

    action_get(base_url+"/api/3/action/group_list",json_data, callback);
}

function current_package_list_with_resources(base_url, callback){
    action_get(base_url+"/api/3/action/current_package_list_with_resources","", callback);
}

function licence_list(base_url, callback){
    action_get(base_url+"/api/3/action/licence_list","", callback);
}

function package_create(base_url, key, name, author, org,  callback){
    var json_data = {"name":name, "author":author, "owner_org":org};
    json_data = JSON.stringify(json_data);
    action_post(base_url+"/api/3/action/package_create", json_data, key, callback);
}

/**
 * Calls the am_following_user funtion in the CKAN api
 * @param {String} base_url The base url of the CKAN instance.
 * @param {String} user The CKAN user to check the following against.
 * @param {String} apikey The CKAN apikey need to call the API function.
 * @param {function} callback  A function used to provide the json object from the CKAN instance to the function caller.
 * @return {json}   Returns a json object through the provided callback function.
 */

function am_following_user(base_url, user, apikey, callback){
	var json_data = {"id": user};
	
	action_get_with_key(base_url+"/api/3/action/am_following_user", json_data, apikey, callback)
	
}


