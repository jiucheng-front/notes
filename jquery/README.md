### jQuery的Ajax

+ $post()

``` javascript
	
	function getDate(){
		$.post(domain+'v2/html/activity/photo/all_collection', {"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid, "anchor_pfid":anchor_pfid },
		 	function(response) {
				var data=JSON.parse(response);
			/*optional stuff to do after success */
				if(data.ret_code=="0"){
					var totaldata=data.data.all_anchor_info;
					sortData(totaldata);
				},
			
			},
			"json"//这样就不需要JSON.parse()
		);
	}
	

```