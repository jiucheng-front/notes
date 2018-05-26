function postDate(){
    $.post(
        domain+'v2/html/activity/photo/all_collection',
        {"HTTP_USER_TOKEN":token, "HTTP_USER_UID":pfid, "anchor_pfid":anchor_pfid },
        function(response) {
            // 转义DATA
            // var data=JSON.parse(response);
            if(data.ret_code=="0"){
                var totaldata=data.data.all_anchor_info;
                sortData(totaldata);
            }
        },
        "json"//这样就不需要JSON.parse()
    );
}

function ajaxDate(){
    $.ajax(
        type:"post",
        url:domain+'v2/html/activity/photo/all_collection',
        data:{
            "HTTP_USER_TOKEN":token,
            "HTTP_USER_UID":pfid,
            "anchor_pfid":anchor_pfid
        },
        cache:false,
        dataType:'json',
        success:function(response){
            if(data.ret_code=="0"){
            var totaldata=data.data.all_anchor_info;
                sortData(totaldata);
            }
        },
        error:function(){}
    );
}