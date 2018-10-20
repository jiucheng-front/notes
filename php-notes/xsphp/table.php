<?php

$arr=[1,2,3,4,5,6,7,8,9];
$length=count($arr);
echo '<table border=1 width="600" align="center" style="text-align:center;border-collapse:collapse;">';
echo '<caption><h3>表名</h3></caption>';
for($i=0;$i<$length;$i++){
    echo '<tr>';
        for($j=0;$j<$arr[$i];$j++){
            echo '<td>'.($i*10+$j+1).'</td>';
        }
    echo '</tr>';
}

echo '</table>';

function test($a,$b,$c=10){
    echo ($a+$b+$c)."<br>";
}
test(10,20);