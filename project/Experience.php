<?php
/**
 * Created by PhpStorm.
 * User: litian
 * Date: 2016/5/5
 * Time: 18:10
 */

class Experience
{
    //考虑一些用户随心所欲的导入数据，例如：没标题；标题混乱，没按模版的顺序；
    private $field = array();//导入数据字段列表

    private $title = array(     //标题与数据库对应字段
        '' => '',
    );

    private $dataType = array(      //导入数据类型验证:标题 => array(数据类型，数据最大长度，是否为必须字段)
        '' => array('', '', '')
    );

    private function importDataDealWith($data)
    {
        //导入数据验证
        $title = $data[0];
        $dataType = $this->dataType;    //数据类型
        $dataIndex = $this->title;      //标题数据字段
        $dataMatch = array();          //字段与导入数据匹配 field => 0
        if(!empty($title)) {
            if($this->judgeHasTitle($title)){       //导入数据有标题，没有标题就与默认标题一一对应
                unset($data[0]);
                $dataTrans = array_flip($dataIndex);    //键值互换
                foreach($title as $key => $value)       //将导入的数据key值与数据库字段对应
                {
                    if(in_array($value, $dataIndex)){
                        $dataMatch[$dataTrans[$value]] = $key;
                    }
                }
            }else{
                $dataMatch = array_flip($this->field);
            }
            //获取所需数据
            $result = array();
            if(!empty($data)){
                $insertList = array();      //添加数据群
                $dataNumFalseInfo = array();//导入数据不符合添加数据规则的错误信息：一般不输出
                $dataMatchTrans = array_flip($dataMatch);   //0 => field
                foreach($data as $kData => $vData)
                {
                    if(!empty($vData)) {
                        foreach($vData as $k => $v)
                        {
                            if (in_array($k, $dataMatch)) {
                                //验证字段长度与是否必须
                                $v = empty($v) ? '' : $v;
                                $len = mb_strlen($v, 'utf-8');
                                if($dataType[$dataMatchTrans[$k]][0] == 'int' || $dataType[$dataMatchTrans[$k]][0] == 'tinyInt')
                                    $v = intval($v);

                                if($len > $dataType[$dataMatchTrans[$k]][1]){
                                    $dataNumFalseInfo[] = "导入数据第" . $kData+1 . "条数据的" . $dataIndex[$dataMatchTrans[$k]] . "长度超过限制";
                                    $result = array();
                                    break;
                                }
                                if($dataType[$dataMatchTrans[$k]][2] == 1){      //必须字段
                                    if(empty($v)){
                                        $dataNumFalseInfo[] = "导入数据第" . $kData+1 . "条数据的" . $dataIndex[$dataMatchTrans[$k]] . "为空";
                                        $result = array();
                                        break;
                                    }
                                }
                                $result[$dataMatchTrans[$k]] = $v;
                            }
                        }
                        if(!empty($result))
                            $insertList[$kData] = $result;
                    }
                }
            }

            $insertNum = count($insertList);
            $falseInfo = $insertNum . "条数据导入成功";
            //向数据库插入数据：insertAll:批量添加数据

        }else{
            $falseInfo = '导入数据为空，数据验证失败！';
        }
        return $falseInfo;
    }

    /*
     * 判断导入数据是否有标题
     */
    private function judgeHasTitle($title)
    {
        if(empty($title) || !is_array($title)) {
            $titleIndex = $this->title;
            foreach ($titleIndex as $key => $value)
            {
                if (!in_array($key, $title)) {
                    return false;
                }
            }
        }else{
            return false;
        }
        return true;
    }

}