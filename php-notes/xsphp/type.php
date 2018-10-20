<?php
    $var=10;
    echo "<pre>";
        var_dump($var);
    echo "</pre>";
    echo "-------------<br>";


    $var=true;
    echo "<pre>";
        var_dump($var);
    echo "</pre>";
    echo "-------------<br>";

    $str="符合东方红";
    echo "<pre>";
        var_dump($str);
    echo "</pre>";
    echo "-------------<br>";


    $var=[1,2,3,4];
    echo "<pre>";
        var_dump($var);
    echo "</pre>";
    echo "-------------<br>";

    $var=null;
    echo "<pre>";
        var_dump($var);
    echo "</pre>";
    echo "-------------<br>";

    $var=0xff;
    echo "<pre>";
        var_dump($var);
    echo "</pre>";
    echo "-------------<br>";



    $str=<<<hello
        "ffd"fkafj;;aj;fjas发发货啦舒服好犯法 <br>
        $var
hello;
echo $str;
    