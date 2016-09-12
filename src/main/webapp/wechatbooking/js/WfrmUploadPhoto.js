window.onload = function(){
	init();
}
function init(){
	initData();
}
function initData(){
	var roomName = getRoomName(getCookie("roomType"));
	$("#roomName").html(roomName);
}
jQuery(function(){
	var $ = jQuery,
    $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,
        // 缩略图大小
    thumbnailWidth = 100 * ratio,
    thumbnailHeight = 100 * ratio,

    // Web Uploader实例
    uploader;
    var requestPath = getRequestPath(); //获取请求路径
    //初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: '../api/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: requestPath+'uploadPhoto/addPhoto',

        // 选择文件的按钮
        pick: '#filePicker',
        
		//指明使用二进制方式上传文件
//		sendAsBinary:true,
		
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });
    
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $(
        '<li id="' + file.id + '"><a>' +
            '<img  class="am-img">' +
            '<div id="df' + file.id + '"  class="gallery-title">' + file.name + '</div>' +
        '</a></li>'
        ),
    $img = $li.find('img');

        $list.append($li);

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
    var $li = $('#' + file.id),
    $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
            .appendTo($li)
            .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
        $('#df' + file.id).text("上传成功");
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
    var $li = $('#' + file.id),
    $error = $li.find('div.error');
        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }
        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });
});  
