<?php
    //递归函数
    function demo($count){
        if($count>0){
            demo($count-1);
        }
        echo $count."<br>";
    }

    demo(10);