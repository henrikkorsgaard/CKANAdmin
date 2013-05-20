/*

 CKANadmin.js

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

 Using awesome libraries created by others- further credit:

 jQuery: http://jquery.com/

 Json 2: https://github.com/douglascrockford/JSON-js
*/


$(document).ready(function() {
	
	$('#core_verify').on('click', function(){
		$('#ckan_core_data p').remove();
		$('#ckan_core_err p').remove();
		var key = $('#apikey').val();
		var url = $('#ckan_url').val();
		var user = $('#ckan_user').val();
		verify_core(key, url, user);
	});

    $('#get_packages').on('click', function(){
        $('#ckan_get_data p').remove();
        $('#ckan_get_err p').remove();
    });

    $('#get_packages').on('click', function(){
        $('#ckan_get_data p').remove();
        $('#ckan_get_err p').remove();
    });

    $('#get_packages').on('click', function(){
        $('#ckan_get_data p').remove();
        $('#ckan_get_err p').remove();
    });

});

/**
 * Verifies the core CKAN information provided by the user.
 *
 * Note: The verfication relies on am_following_user api call.
 * This means that the provided user can not follow self.
 *
 * @param {String} apikey    The CKAN apikey for verification
 * @param {String} url    The CKAN base url for verification.
 * @param {String} user    The CKAN username for verification.
 */

function verify_core(apikey, url, user){

	status_show(url, function(msg){
		if(msg.success){
			$('#ckan_core_data').append("<p>CKAN site responds ok. CKAN version: "+
                msg.message.result.ckan_version +". Available extensions: " +
           msg.message.result.extensions +".</p>");

            am_following_user(url, user, apikey, function(msg){

                if(msg.success){

                    organization_list_for_user(url, user, apikey,function(msg){
                        if(msg.success){

                            $('#ckan_core_data').append("<p>User is valid. User can edit the following organisations: ");

                            $.each(msg.message, function(key){
                                if(key != 0){
                                    $('#ckan_core_data').append(", "+msg.message[key].name);
                                }
                                else{
                                    $('#ckan_core_data').append(msg.message[key].name);
                                }
                            });
                            $('#ckan_core_data').append("</p>");
                        }
                        else{
                            $('#ckan_core_data').append("<p>User is valid</p><p>Api key is valid</p>");
                        }

                    });
                    $('#ckan_core_data').append("<p>Api key is valid</p>");
                }
                else if(!msg.success){
                    if(msg.message.error.__type === "Validation Error"){
                        //USER ID IS NOT EXISTING
                        $('#ckan_core_err').append("<p>The provided username does not exist, and therefor it is impossible to validate api key</p>");
                    }
                    else if(msg.message.error.__type === "Authorization Error"){
                        $('#ckan_core_err').append("<p>Api key is invalid!</p>");
                        $('#ckan_core_data').append("<p>User is valid</p>");
                    }
                    else{
                        $('#ckan_core_err').append("<p>CKAN returned something unexpected. CKAN response: "+msg.message+"</p>");
                    }

                }
            });
		}
		else if(!msg.success){
			$('#ckan_core_err').append("<p>CKAN url does not respond properly. May the CKAN site is down or the url is invalid</p><p>No possible to verify the user or api key</p>");
		}
	});
}

function get_user_details(apikey, url, user){

}