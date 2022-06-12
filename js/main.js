// 菜单
$(".menu-switch").click(function () {
    if ($(this).hasClass('icon-menu-outline')) {
        $(this).removeClass(' icon-menu-outline ').addClass('icon-close-outline');
        $('.menu-container').css('opacity', '1').css('height', 'auto');
    } else {
        $(this).addClass(' icon-menu-outline ').removeClass('icon-close-outline');
        $('.menu-container').css('opacity', '0');

        var that = $(this);
        setTimeout(function () {that.hasClass('icon-menu-outline') && $('.menu-container').css('height', '0')}, 600)
    }
});

// 图片放大
$(".post-detail img").each(function() {
    var currentImage = $(this);
    currentImage.wrap("<a href='" + currentImage.attr("src") + "' data-fancybox='lightbox' data-caption='" + currentImage.attr("alt") + "'></a>");
});

// 代码复制
var $copyIcon = $('<i class="fa-solid fa-copy copy-code" title="复制代码"></i>');
$(".post-detail figure").append($copyIcon);
$(".post-detail pre[class*=language-] code").append($copyIcon);
$('.post-detail .copy-code').on('click', function () {
    var selection = window.getSelection();
    var range = document.createRange();
    var table = $(this).prev('table');
    if (table.length) {
        range.selectNodeContents($(this).prev('table').find('.code').find('pre')[0]);
    } else {
        console.log($(this).prev('code'));
        range.selectNodeContents($(this).parent('code')[0]);
    }

    selection.removeAllRanges();
    selection.addRange(range);
    var text = selection.toString();
    document.execCommand('copy');
    selection.removeAllRanges();

    $(this).html('<span class="copy-success"> 复制成功</span>');
    setTimeout(() => {
        $(this).html('');
    }, 2500)
});