<?php
/**
 * Created by PhpStorm.
 * User: litian
 * Date: 2016/8/8
 * Time: 14:36
 */
class index
{
    const constvar='hello world';
    static $staticvar='hello world';
    function getStaticvar(){
        return self::$staticvar;
    }
}

$obj=new index();
echo index::constvar; //输出'hello world'
echo index::staticvar; //出错,staticvar 前必须加$才能访问，这是容易和类常量(per-class常量)容易混淆的地方之一
echo index::$staticvar; //输出'hello world'
$str='test';
echo $str::$staticvar; //出错，类名在这不能用变量动态化
echo $str::constvar; //出错原因同上

//在类名称存在一个变量中处于不确定（动态）状态时，只能以以下方式访问类变量
$obj2=new $str();
echo $obj2->getStaticvar();
?>