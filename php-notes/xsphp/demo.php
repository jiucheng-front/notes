<?php
    define("HOST","192.168.0.1");
    $port=80;
    echo HOST.":".$port."<br>";

    // 输出当前文件的完整路径
    echo __FILE__."<br>";

    // 判断闰年
    // $year=2017;
    $year=2016;
    if(($year%4==0&&$year%100!=0)||$year%100==0){
        echo "是闰年 <br>";
    }else{
        echo "不是闰年 <br>";
    }

    // ++、--
    $a=10;
    $a++;   //$a=$a+1;  先用变量再自增1
    ++$a;   //$a=$a+1;  先自增1再用变量
    $a--;   //$a=$a-1;  先用变量再自减1
    --$a;   //$a=$a-1;  先自减1再用变量

    $a=10;
    $b=$a++;    //b=10 ,a=11
    // echo $b;
    $c=--$b;    //c=9, b=9
    // echo $c;

    $d=$c++ + ++$c;     //$c++:先用9，$c=10,++$c:先自增1再用，$c=11,d=9+11=20,
    $e=$d-- - --$d;     //$d--:d=19,--$d:d=18,e=20-18
    echo $e."<br>";