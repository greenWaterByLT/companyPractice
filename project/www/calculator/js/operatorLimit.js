/**
 * Created by litian on 2016/1/5.
 */

$(".num").attr('onclick', 'cinNum(this)');
$(".limitOperator").attr('onclick', 'cinLimitOperator(this)');
$(".unaryOperator").attr('onclick', 'cinUnaryOperator(this)');
$(".binaryOperator").attr('onclick', 'cinBinaryOperator(this)');

//输入非0数字
function cinNum($this)
{
    var num = $($this).text(),
        formulaText = $(".formula").text();
    if(formulaText != "0")
    {
        $(".formula").text(formulaText + num);
    }
    else
    {
        $(".formula").text(num);
    }
}

//输入0
$("#num0").click(function(){
    var formulaText = $(".formula").text();
    if(formulaText != "0") {
        $(".formula").text(formulaText + "0");
    }
});

//输入小数点
$("#numPoint").click(function(){
    var numPoint = $("#numPoint").text(),
        formulaText = $(".formula").text(),
        lastOperator = $(".formula").attr('data-lastOperator');
    //判断运算公式中是否含有运算符+-*/(√
    if(!lastOperator) {
        if (formulaText.indexOf(".") == -1) {
            $(".formula").text(formulaText + numPoint);
        }
    }else{
        var strArr = formulaText.split(lastOperator);//以最后一个运算符分割运算公式字符串
        var count = appearCount(formulaText, lastOperator);
        //判断输入运算符后是否输入了数字
        if(strArr.length > count) {
            var number = strArr[strArr.length - 1];//获取数组最后一个元素，并赋值给数字
            if (number.indexOf(".") == -1) {
                $(".formula").text(formulaText + numPoint);
            }
        }else{
            $(".formula").text(formulaText + "0" + numPoint);
        }
    }
});

//计算运算符号在运算公式中出现的次数
function appearCount(str, operator)
{
    str = $.trim(str);//去掉首尾空字符
    if(str){
        var i = 0,
            count = 0;
        for(; i < str.length; i++)
        {
            var string = str.substr(i);
            var time = string.indexOf(operator);
            if(time > -1){
                count++;
                i += time;
            }else{
                break;
            }
        }
        return count;
    }
}

//输入运算符
function cinLimitOperator($this)
{
    //限制符（）
    var formulaText = $(".formula").text(),
        operator = $($this).text();
    //没输入任何字符的话可以输入左括号
    if(formulaText == "0"){
        if(operator == "("){
            $(".formula").text(operator);
            //将后面可以接数字的运算符存起来
            $(".formula").attr('data-lastOperator', '(')
        }
    }else{
        //根据最后一个字符判断能否输入括号
        var last = formulaText.substr(formulaText.length-1),
            flag1 = "+-*/√",
            flag2 = "0123456789%";
        if(operator == "(") {
            if (flag1.indexOf(last) > -1) {
                $(".formula").text(formulaText + operator);
                $(".formula").attr('data-lastOperator', '(')
            }
        }else{
            //必须在左括号的个数大于右括号的个数时，才能输入右括号
            var leftCount = appearCount(formulaText, "("),
                rightCount = appearCount(formulaText, ")");

            if(leftCount > rightCount) {
                if (flag2.indexOf(last) > -1) {
                    $(".formula").text(formulaText + operator);
                }
            }
        }
    }
}

function cinUnaryOperator($this)
{
    //单元运算符X^2、（-）、%、√
    var formulaText = $(".formula").text(),
        operator = $($this).text();
    if(formulaText == "0") {
        if (operator == $("#minus").text() || operator == $("#radical").text()) {
            $(".formula").text(operator);
        }
    }else{
        var last = formulaText.substr(formulaText.length-1),
            flag1 = "0123456789)",
            flag2 = "+-*/(";
        if (operator == $("#minus").text() || operator == $("#radical").text()) {
            if (flag2.indexOf(last) > -1) {
                $(".formula").text(formulaText + operator);
                if(operator == $("#radical").text()){
                    $(".formula").attr('data-lastOperator', '√');
                }
            }
        }else{
            var last3 = formulaText.substr(formulaText.length-3);
            if(last3 != "(-)") {
                if (flag1.indexOf(last) > -1) {
                    $(".formula").text(formulaText + operator);
                }
            }
        }
    }
}

function cinBinaryOperator($this)
{
    //多元运算符+-*/
    var formulaText = $(".formula").text(),
        operator = $($this).text(),
        flag = "0123456789)%",
        last = formulaText.substr(formulaText.length-1),
        last3 = formulaText.substr(formulaText.length-3);
    if(formulaText != "0" && last3 != "(-)"){
        if (flag.indexOf(last) > -1) {
            $(".formula").text(formulaText + operator);
        }
    }
}