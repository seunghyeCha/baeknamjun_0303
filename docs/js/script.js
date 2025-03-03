$(document).ready(function() {
  let currentIndex = 0;
  const slides = $('#slides .sld');
  const indicators = $('#indicator_wrap .indicator');
  const slideCount = slides.length;
  const slide = $('#slides');

  // 슬라이드를 자동으로 전환
  function changeSlide() {
    currentIndex++;
    if (currentIndex >= slideCount) {
        currentIndex = 0;
    }

    // 슬라이드 이동
   slide.css('transform', 'translateX(' + (-100 * currentIndex) + 'vw)');
    
    // 인디케이터 활성화
    indicators.removeClass('active');
    $(indicators[currentIndex]).addClass('active');
  }

  // 처음 인디케이터 활성화
  indicators.first().addClass('active').addClass('first');

  // 5초마다 슬라이드 변경
  let slideInterval = setInterval(changeSlide, 5000);

  // 인디케이터 클릭 시 슬라이드 이동
  indicators.click(function () {
    currentIndex = $(this).index();
    slide.removeClass().addClass('slide-' + currentIndex);
    indicators.removeClass('active');
    $(this).addClass('active');
    clearInterval(slideInterval);
    slideInterval = setInterval(changeSlide, 5000);
  });
  // indicators.click(function() {
  //     currentIndex = $(this).index();
  //     slide.css('transform', 'translateX(' + (-100 * currentIndex) + 'vw)');
  //     indicators.removeClass('active');
  //     $(this).addClass('active');
  // });

  // 2. 메뉴 글자 색상 변경 (로그인 아이콘 변경 필요)
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#head", {
    color: "#333333", 
    scrollTrigger: {
      trigger: "#ctt1", 
      start: "top center", 
      end: "bottom center", 
      toggleActions: "play none none none",
      scrub: true, 
    }
  });

  // 3. #exhibit부분 가로스크롤
  const exhibit = $('#exhibit');
  const indicator = $('#scroll-indicator span')
  
  
  function plusIndicator() {
    let scrollLeft = exhibit.scrollLeft();
    let maxScrollLeft =  exhibit[0].scrollWidth - exhibit[0].clientWidth;
    
    let scrollPercent = Math.min((scrollLeft / maxScrollLeft) * 100, 100);
    indicator.css('width', scrollPercent + '%');
  }

  exhibit.on('scroll', plusIndicator);

  exhibit.on('wheel',{passive: true}, function (event) {
    if ($(this).is(':hover')) {
      event.preventDefault();
      $(this).scrollLeft($(this).scrollLeft() + event.originalEvent.deltaY);
      plusIndicator();
    }
  });

});
