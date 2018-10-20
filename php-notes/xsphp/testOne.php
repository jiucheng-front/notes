<html>
    <head>
        <title>測試PHP，類似html</title>
        <!--添加樣式-->
        <style>
            body{
                background:#72C586;
            };
        </style>
    </head>
    <body>
        <!--添加JS腳本-->
        <script>
            document.write(new Date());
        </script>
        <!--添加PHP腳本-->
        <div class="main">
            <!--会被服务器解析之后-->
            <?php
                for($i=0;$i<5;$i++)
                    echo "$i *****<br>";
            ?>
        </div>
        <!---->
        <div class="text" style='color:<?php echo "#e4393c"?>'>
            <?php
                $count=100;
                $str="我是PHP生成的！！";
                echo $str.$count;
            ?>
        </div>
    </body>
</html>