<?php
//数组的声明
// 索引数组
    $use=[];
    $use[0]=1;
    $use[1]="张三";
    $use[2]=20;
    $use[3]="男";


// 关联数组
    $list=[];
    $list['id']=1;
    $list['name']="张三";
    $list['age']="20";
    $list["sex"]="男";



// 二维数组
    $users=[[1,"张三","20","男"],[2,"李四","25","女"],[3,"王五","30","男"]];
    // 多个成员用 , 隔开
    $userlists=array(
        array(1,"张三","10","男"),
        array(2,"李四","20","女"),
        array(3,"王五","30","男")
    );
    echo $userlists[1][1]."<br>";
    echo "--------------------------------------------------------- <br>";
// array函数
    $arr=array("id"=>1,"name"=>"张无忌","age"=>21,"sex"=>"男");    
    foreach($arr as $var){
        echo $var."<br>";
    }
    echo "--------------------------------------------------------- <br>";
    foreach($arr as $key=>$var){
        echo $key."=====>"."$var"."<br>";
    }
    echo "--------------------------------------------------------- <br>";
    echo "<pre>";
        print_r($use);
        print_r($list);
        print_r($users);
        print_r($arr);
        print_r($userlists);

    echo "</pre>";
    echo "--------------------------------------------------------- <br>";
    $userarr=array(
        "person"=>array(
            array(1,'张无忌','50'),
            array(2,"周芷若","30"),
            array(3,"周伯通",'40')
        ),
        "skill"=>array(
            array('点击','乾坤大挪移','九阴真经'),
            array('飞行','降龙十八掌','九阳真经'),
            array('奔跑','齐天大圣','九阴真经'),
        ),
        "address"=>array(
            array('光明顶','太极','武当'),
            array('峨眉山','峨眉派','峨眉'),
            array('丐帮','中神通','北丐')
        )
    );
    foreach($userarr as $tableName=>$table){
        echo '<table border=1 width="600" align="center" style="text-align:center;border-collapse:collapse;">';
        echo '<caption><h3>'.$tableName.'</h3></caption>';
            foreach($table as $row){
                echo '<tr>';
                    foreach($row as $col){
                        echo '<td>'.$col.'</td>';
                    }
                echo '</tr>';
            }
        echo '</table>';
    }

    echo "--------------------------------------------------------- <br>";