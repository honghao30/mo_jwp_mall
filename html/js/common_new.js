// 탭
$(document).ready(function () {
    $(".tab-item").click(function () {
        // 부모 요소인 .tab-group 내에서만 검색
        var $tabGroup = $(this).closest('.tab-group');

        // 해당 탭 그룹 내에서만 'active' 클래스 제어
        $tabGroup.find(".tab-item").removeClass("active");
        $(this).addClass("active");

        // 해당 탭 그룹 내에서만 탭 내용 표시/숨김
        var index = $(this).index();
        $tabGroup.find(".tab-pane").hide();
        $tabGroup.find(".tab-pane:eq(" + index + ")").show();
    });

    // 페이지 로드시 각 탭 그룹의 첫 번째 탭 메뉴 항목과 탭 내용을 활성화
    $(".tab-group").each(function () {
        $(this).find(".tab-item:first").addClass("active");
        $(this).find(".tab-pane:first").show();
    });

   
    // 탭 안에 탭 .tab-itme1, .tab-pane1 로 다르게 작업
    
    $(".tab-item1").click(function () {
      // 부모 요소인 .tab-group 내에서만 검색
      var $tabGroup = $(this).closest('.tab-group');

      // 해당 탭 그룹 내에서만 'active' 클래스 제어
      $tabGroup.find(".tab-item1").removeClass("active");
      $(this).addClass("active");

      // 해당 탭 그룹 내에서만 탭 내용 표시/숨김
      var index = $(this).index();
      $tabGroup.find(".tab-pane1").hide();
      $tabGroup.find(".tab-pane1:eq(" + index + ")").show();
  });

  // 페이지 로드시 각 탭 그룹의 첫 번째 탭 메뉴 항목과 탭 내용을 활성화
  $(".tab-group").each(function () {
      $(this).find(".tab-item:first").addClass("active");
      $(this).find(".tab-pane1:first").show();
  });
});

// 카테고리 리스트
$(document).ready(function() {
  // link_wish 클래스가 있는 a 태그를 클릭했을 때
  $(".btn_list").click(function(e) {
    e.preventDefault(); // 기본 클릭 이벤트 방지

    // 클릭된 요소에 active 클래스 추가 및 제거
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active"); // 클릭된 요소에 active 클래스 추가
    }
  });

  // category_list 클래스 안의 a 태그를 클릭했을 때
  $(".category_list a").click(function(e) {
    e.preventDefault(); // 기본 클릭 이벤트 방지
    $(".btn_list").removeClass("active"); // btn_list에서 active 클래스 제거
  });
});

$(document).ready(function () {
  // Click event for .menu-item
  $(".category_list ul li").on("click", function () {
    // Remove 'on' class from all siblings
    $(this).siblings().removeClass("on");
    
    // Toggle 'on' class on the clicked element
    $(this).toggleClass("on");
  });
});