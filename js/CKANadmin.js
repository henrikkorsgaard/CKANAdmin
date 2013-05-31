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

		var key = $('#apikey').val();
		var url = $('#ckan_url').val();
		var user = $('#ckan_user').val();
		verify_core(key, url, user);
	});

    $('#get_organisations').on('click', function(){
        var url = $('#ckan_url').val();
        organization_list(url, true, function(msg){

            if(msg.success){
                $('#get_output .output').append("Organisations: <br />");
                $.each(msg.message.result,function(key){
                    var name = msg.message.result[key].display_name;
                    var id = msg.message.result[key].id;
                    var packages = msg.message.result[key].packages;
                    var ref_name = msg.message.result[key].name;

                    var output = "Name: "+name+"<ul><li>Id: "+id+"</li><li>Packages no.: "+packages+"</li><li>Reference Name: "+ref_name+"</li></ul>";
                    $('#get_output .output').append(output);
                    console.log(msg.message.result[key]);
                });

            }
            else if(!msg.success){
                appendConsole("Error from organisation list");
            }
        });
    });

    $('#get_groups').on('click', function(){
        var url = $('#ckan_url').val();
         group_list(url, true, function(msg){
             if(msg.success){
                 $('#get_output .output').append("Groups: <br />");
                 $.each(msg.message.result,function(key){
                     var name = msg.message.result[key].display_name;
                     var id = msg.message.result[key].id;
                     var packages = msg.message.result[key].packages;


                     var output = "Name: "+name+"<ul><li>Id: "+id+"</li><li>Packages no.: "+packages+"</li></ul>";
                     $('#get_output .output').append(output);
                     console.log(msg.message.result[key]);
                 });

             }
             else if(!msg.success){
                 appendConsole("Error from group list");
             }
         });
    });
    //UNFINISHED
    $('#get_packages').on('click', function(){
        var url = $('#ckan_url').val();

        current_package_list_with_resources(url, function(msg){
            if(msg.success){
                $('#get_output .output').append("Packages: <br />");
                $.each(msg.message.result,function(key){
                    var name = msg.message.result[key].title;
                    var id = msg.message.result[key].id;
                    var recources = msg.message.result[key].resources.length;

                    var output = "Name: "+name+"<ul><li>Id: "+id+"</li><li>Resources no.: "+recources+"</li></ul>";
                    $('#get_output .output').append(output);

                });

            }
            else if(!msg.success){
                appendConsole("Error from package list");
            }
        });

    });

    $('#get_resources').on('click', function(){

    });

    $('#api_search').on('click', function(){

    });

    $('#create_package').on('click', function(){
        var key = $('#apikey').val();
        var url = $('#ckan_url').val();
        var name = $('#package_name').val();
        var author = $('#package_author').val();
        var org = $('#package_org').val();

        package_create(url, key, name, author, org, function(msg){
            console.log(msg);

            if(msg.success){
                var output = "Successfully created a new dataset: <br /> ";

                var name = msg.message.result.name
                var id = msg.message.result.id;

                output += "<ul><li>Name: "+name+"</li><li>Id: "+id+"</li></ul>";
                $('#create_output .output').append(output);

            }
            else if(!msg.success){
                if(msg.message.error.__type === "Validation Error"){
                    //USER ID IS NOT EXISTING
                    appendConsole("<p>ERROR: Unable to create ned ressource "+msg.message.error.name+"</p>");
                }
                else if(msg.message.error.__type === "Authorization Error"){
                    appendConsole("<p>ERROR: Api key is invalid!</p>");
                }
                else{
                    appendConsole("<p>ERROR: CKAN returned something unexpected. CKAN response: "+msg.message+"</p>");
                }
            }
        });

    });

    $('.clear').on('click', function(event){
        $(this).parent().find('.output').empty();

    });

    $('#minimize').on('click', function(){
        if($('#minimize').text() === "Minimize"){
            $('#floating_footer').animate({
                height: 30
            }, 500, function(){
                $('#minimize').text("Maximize");
            });
        }
        else if($('#minimize').text() === "Maximize"){
            $('#floating_footer').animate({
                height: 180
            }, 500, function(){
                $('#minimize').text("Minimize");
            });
        }

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
			appendConsole("<p>CKAN site responds ok. CKAN version: "+
                msg.message.result.ckan_version +". Available extensions: " +
           msg.message.result.extensions +".</p>");

            am_following_user(url, user, apikey, function(msg){

                if(msg.success){

                    organization_list_for_user(url, user, apikey,function(msg){
                        if(msg.success){

                            appendConsole("<p>User is valid. User can edit the following organisations: ");

                            $.each(msg.message, function(key){
                                if(key != 0){
                                    appendConsole(", "+msg.message[key].name);
                                }
                                else{
                                    appendConsole(msg.message[key].name);
                                }
                            });
                            appendConsole("</p>");
                        }
                        else{
                            appendConsole("<p>User is valid</p><p>Api key is valid</p>");
                        }

                    });
                    $('##output').append("<p>Api key is valid</p>");
                }
                else if(!msg.success){

                    if(msg.message.error.__type === "Validation Error"){
                        //USER ID IS NOT EXISTING
                        appendConsole("<p>ERROR: The provided username does not exist, and therefor it is impossible to validate api key</p>");
                    }
                    else if(msg.message.error.__type === "Authorization Error"){
                        appendConsole("<p>ERROR: Api key is invalid!</p>");

                        appendConsole("<p>ERROR: User is valid</p>");
                    }
                    else{
                        appendConsole("<p>ERROR: CKAN returned something unexpected. CKAN response: "+msg.message+"</p>");
                    }

                }
            });
		}
		else if(!msg.success){
			appendConsole("<p>ERROR: CKAN url does not respond properly. May the CKAN site is down or the url is invalid</p><p>Not possible to verify the user or api key</p>");
		}
	});
}

function get_user_details(apikey, url, user){

}

function appendConsole(msg){
    if($('#minimize').text() === "Maximize"){
        $('#minimize').click();
    }



    $('#console_output').append(msg);
    $('#console_output').scrollTop($('#console_output')[0].scrollHeight);
}
