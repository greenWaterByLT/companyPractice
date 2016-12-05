/**
 * Created by litian on 2016/1/7.
 */

/**
 * 将运算数组处理好：返回的是一个多维数组，每一个括号为一个数组
 * @param operator  字符串直接转换的数组
 * @returns {Array} 有括号就将括号内容整合成一个子数组的多维数组
 */
function dealArray(operator)
{
    var result = new Array(),
        resultF = 0, start = 0, end = 0,
        tempOperator = operator;
    //循环处理数组：处理成数组（便于运算的）
    for(var i = 0; i < operator.length; i++){
        //遇到左括号将括号内整合成一个数组作为最初数组的一个元素：此处判断是否是括号内部的字符，是就跳过继续下一个循环
        if(i > start && i <= end && end != 0){
            continue;
        }
        //判断该元素是否是数字
        if(/^\d+$/.test(operator[i])){
            result[resultF] = operator[i];
            resultF++;
        }else{
            if(operator[i] == '('){
                //获取括号内部的数组元素重新整合成一个数组，并返回数组与与之对应的右括号的位置
                var leaveArray = deleteSomeElement(tempOperator, i);
                start = i;
                //递归循环处理括号
                var tempArray = dealArray(leaveArray[0]);
                end = leaveArray[1];
                result[resultF] = tempArray;
            }else{
                result[resultF] = operator[i];
            }
            resultF++;
        }
    }

    return result;
}

/**
 * 删除首尾部分数组元素，取括号内的全部数据
 * @param array 包含括号的数组
 * @param i 左括号出现的位置
 * @returns {*} 获取括号内的内容
 */
function deleteSomeElement(array, i)
{
    var m = 0,
        n = 0,
        res = 0,
        result = new Array(),
        r = 0;
    $.each(array, function(f, value) {
        if (f >= i) {
            if (m > n) {
                result[r] = value;
                r++;
            }
            if (value == '(') {
                m++;
            } else if (value == ')') {
                n++;
                res = f;
            }
        }
    });
    //删除最后的右括号
    result.splice(result.length-1, 1);
    return Array(result, res);
}

/**
 * 对多维数组进行计算：先计算最里层的数组，并用其结果代替该位置的值，进入上一级数组内的计算（返回运算结果）
 * @param array 经字符串转换再处理得到的一维或多维数组
 * @returns {*}
 */
function getCalculatorOperator(array)
{
    var result = new Array(),
        res = 0;
    $.each(array, function(f1, value1){
        //是数组就计算，不是就原封不动
        if(value1.constructor == Array) {
            result[res] = (judgeIsMoreArray(value1)) ? getCalculatorOperator(value1) : calculator(value1);
        }else{
            result[res] = value1;
        }
        res++;
    });
    //判断上面所获得的数组是否是一维的否就递归循环，是就计算其值
    var sum = (judgeIsMoreArray(result)) ? getCalculatorOperator(result) : calculator(result);

    return sum;
}

/**
 * 计算+-/*的混合运算，也可添加其他运算
 * @param array 需计算的一维数组
 * @returns {*} 计算结果
 */
function calculator(array)
{
    var sign = 0,
        count = 0,
        result = new Array(),
        flag = 0;
    //这里可以加入其他的复杂运算符：按运算符优先级由上到下判断是否存在，并做标注
    if($.inArray("%", array) > -1){
        sign = 3;
    }else if($.inArray("*", array) > -1 || $.inArray("/", array) > -1)
    {
        sign = 1;
    }else if($.inArray("+", array) > -1 || $.inArray("-", array) > -1){
        sign = 2;
    }

    $.each(array, function (i, value) {
        switch (sign) {
            case 1:
                //判断是否是最后一个元素：是就要判断他的上一个元素是否是要求的运算符，否就原封不动，是就跳过
                if(array[i+1]) {
                    //跳过进行简单运算的元素后面的两个元素
                    if (flag == 1) {
                        flag++;
                        break;
                    } else if (flag == 2) {
                        flag = 0;
                        //因为此元素已经加入过计算处理，count要减一
                        count -= 1;
                        if (/^\d+$/.test(value)) {
                            value = result[count];
                        }
                    }
                    //与后两个元素进行简单运算并得出结果，非所要求的运算符就原封不动
                    if ("/*".indexOf(array[i + 1]) > -1) {
                        result[count] = simpleCalculator(value, array[i + 1], array[i + 2]);
                        flag = 1;
                        count++;
                    } else {
                        result[count] = value;
                        count++;
                    }
                }else{
                    if ("/*".indexOf(array[i - 1]) == -1) {
                        result[count] = value;
                    }
                    break;
                }
                break;
            case 2:
                //加减简单些，累计计算结果即可
                if(array[i+1]) {
                    if (flag == 1) {
                        flag++;
                        break;
                    } else if (flag != 0) {
                        flag = 0;
                        if (/^\d+$/.test(value)) {
                            value = result[count];
                        }
                    }
                    if ("+-".indexOf(array[i + 1]) > -1) {
                        result[count] = simpleCalculator(value, array[i + 1], array[i + 2]);
                        flag = 1;
                    }
                }
                break;
            case 3:
                //考虑了%连续
                if(flag == 1){
                    flag = 0;
                    count--;
                    value = result[count];
                }
                if(array[i + 1] && array[i + 1] == "%"){
                    result[count] = simpleCalculator(value, array[i + 1], false);
                    count++;
                    flag = 1;
                }else{
                    result[count] = value;
                    count++;
                }
                break;
            default :
                break;
        }
    });
    //判断上面获取的数组是否为单元素数组，是就计算结束，获得结果，否就在递归循环一遍
    var sum = (result.length > 1) ? calculator(result) : result[0];
    return sum;
}

/**
 * 简单运算，可以加入平方、开方、百分号等：运算前记得转换成浮点数进行计算
 * @param a 首个数字
 * @param f 运算符号
 * @param b 次个数字
 * @returns {number}    计算结果
 */
function simpleCalculator(a, f, b)
{
    var sum = 0;
    switch (f) {
        case "+":
            sum = Decimal(a).add(b).toNumber();//也可以Decimal.add(a, b).toNumber();下面同此
            break;
        case "-":
            sum = Decimal(a).sub(b).toNumber();
            break;
        case "*":
            sum = Decimal(a).mul(b).toNumber();
            break;
        case "/":
            sum = Decimal(a).div(b).toNumber();
            break;
        case "%":
            sum = Decimal(a).div(100).toNumber();
            break;
        default :
            break;
    }
    return sum;
}

/**
 * 判断数组是否是多维数组
 * @param array
 * @returns {boolean}
 */
function judgeIsMoreArray(array)
{
    var flag = false;
    for(var i = 0; i < array.length; i++)
    {
        if(array[i].constructor == Array){
            flag = true;
            break;
        }
    }
    return flag;
}

/**
 * 初始化下标
 * @param array
 * @returns {*}
 */
function delUndefined(array)
{
    var result = Array(),
        res = 0;
    $.each(array, function(f, value){   //each循环遍历，初始下标为4，遍历却从0开始
        if(value) {
            result[res] = value;
            res++;
        }
    });
    return result;
}

/**
 * 去除数组首尾元素
 * @param array
 * @returns {*}
 */
function dealLeftAndRight(array)
{
    array.splice(0, 1);
    array.splice(array.length-1, 1);
    return array;
}