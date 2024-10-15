$(function() {

    //전방지도 - 탭
    $('.side-tab .tab-list button').on('click',function(){
       var thisIdx = $(this).parent().index();

       $(this).parent().addClass('active').siblings().removeClass('active');
       $('.side-panel .panel').eq(thisIdx).addClass('active').siblings().removeClass('active');
    });

    //전방지도 - 목록 클릭시
    $('.side-panel .panel-item a').on('click',function(){
        $('.side').addClass('side-open');
    });

    //전방지도 - 상세 - 닫기 클릭시
    $('.detail-close').on('click',function(){
        $('.side').removeClass('side-open');
    });

    //공통 - 공유
    $('.share-btn').on('click',function(){
        $('.share-list').toggleClass('active');
    });
    $('.share-list a, .share-list button').on('click',function(){
        $('.share-list').removeClass('active');
    });

    //공통 - 파일 업로드
    $('.type-file input[type="file"]').on('change',function(){
        if($(this).val()){
            $(this).siblings('.file-text').addClass('hidden');
        }
    });

    //사이드 메뉴
    $('.side-btn').on('click',function(){
        if($('.side').hasClass('active')){
            $('.side').removeClass('active');
            $('body').removeClass('side-open');
        }else{
            $('.side').addClass('active');
            $('body').addClass('side-open');
        }
    });

});