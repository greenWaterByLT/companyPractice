{{include file = 'header.tpl'}} {{include file = "uploadify.tpl"}}
<link href="{{$static_domain}}/css/micro_site.css" rel="stylesheet"
      type="text/css" />
<script type="text/javascript"
        src="{{$baseUrl}}/www/common/uploadify/jquery.uploadify.min.js"></script>
<script src="{{$static_domain}}/js/jquery.Jcrop.js"
        type="text/javascript"></script>
<link rel="stylesheet" href="{{$static_domain}}/css/jquery.Jcrop.css"
      type="text/css" />
<link rel="stylesheet"
      href="{{$static_domain}}/common/uploadify/uploadify4.css" type="text/css" />
<link rel="stylesheet"
      href="{{$baseUrl}}/www/common/uploadify/uploadify5.css" type="text/css" />
<script type="text/javascript"
        src="{{$static_domain}}/js/alertbanner.js"></script>
<script type="text/javascript" src="{{$static_domain}}/js/common.js"></script>
<link href="{{$static_domain}}/css/shop.info.css" rel="stylesheet"
      type="text/css" />
<script type="text/javascript"
        src="{{$static_domain}}/js/wmall.cutimg.js"></script>
<script type="text/javascript"
        src="{{$static_domain}}/js/angular.min.js"></script>
<link rel="stylesheet" href="{{$static_domain}}/css/micro_shop_new.css"
      type="text/css" />
<link rel="stylesheet" href="{{$static_domain}}/css/micro_shop.css"
      type="text/css" />

<!-- 富媒体编辑框弹出层 -->
<link href="{{$static_domain}}/css/box.css" rel="stylesheet"
      type="text/css" />
<script type="text/javascript"
        src="{{$static_domain}}/js/jquery.artDialog.min.js"></script>
{{include file='publics_editor.tpl'}}
<!-- END -->

<div id="content" class="clr" ng-app="myApp">
    <!--主内容部分-->

    <div id="con-box" ng-controller="shopInfoController" style="display: none">
        <!-- 书写内容主体-李天 -->
    </div>

    <input type='hidden' id='sizeimghd' value='720*400' />
    <!--<input type='hidden' id='sizeimghd' value='400*400' />-->
    <input type='hidden' id='minsizehd' value='400*400' />
    <input type='hidden' id='bannerscale' value='1.77777777777' />
    <!--<input type='hidden' id='bannerscale' value='1' />-->
    <input type="hidden" id="uploadwidthbanner" value="" />
    <input type="hidden" id="picwidth" value="" />
    <input type="hidden" id="bannercount" value="{{$bannercount}}" />
    <input type="hidden" id="banneridhide" value="" />
    <input type="hidden" id="fileSizeLimit" value="" />


</div>

{{include file = 'footer.tpl'}}
<script type="text/javascript" src="{{$static_domain}}/js/queue.js"></script>
<script type="text/javascript">

</script>