
$(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    var parallax_triggers = gsap.utils.toArray("[parallax_trigger]");

    parallax_triggers.forEach((parallax_trigger, i) => {
        var parallax_section = parallax_trigger.querySelector("[parallax_section]");
        var image = parallax_trigger.querySelector(".angle");
        var second_section = parallax_trigger.querySelector("[second_section]");

        //초기 상태 이미지로 되어 있는 원형은 안보임, 
        //텍스트도 안보임
        gsap.set(image, {
            clipPath: "circle(0% at 50% 100%)"
        });
        gsap.set(second_section, {
            opacity: 0,
            y: 40
        });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: parallax_trigger,
                pin: true,
                start: "bottom bottom",
                end: "+=100%", // 전체 스크롤 길이
                scrub: 1.75,
            }
        });

        // ① 하단에서 → 중앙까지 (원의 윗부분이 중앙에 올 때)
        tl.to(image, {
            clipPath: "circle(55% at 50% 100%)",
            ease: "none",
            duration: 1
        });

        // ② ⏸ 정체 구간 (변화 없음)
        tl.to({}, { duration: 0.5 });

        tl.to(second_section, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "none"
        });

        // ③ 다시 스크롤 → 100% 완성
        tl.to(image, {
            clipPath: "circle(100% at 50% 100%)",
            ease: "none",
            duration: 1
        });


        tl.to(
            second_section,
            {
                x: 0

            },
            3
        );
    });

    //🌷포트폴리오 -> 도전 페이지 슬라이드
    var bullet = ['창원메가시티', 'f5nature [에프오네이처]', '스미스티', '트립비토즈', '비에메종'];

    var swiper = new Swiper(".challengeSwiper", {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '"><span>' + (bullet[index]) + '</span></div>';
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true
    });


    //포트폴리오 -> 실무 페이지 스크롤
    // gsap.registerPlugin(ScrollTrigger);

    /*  const lenis = new Lenis({
         lerp: 0.07
     }); */

    // lenis.on('scroll', ScrollTrigger.update);

    /*  gsap.ticker.add((time) => {
         lenis.raf(time * 1000)
     }) */

    // Images parallax
    gsap.utils.toArray('.img-container').forEach(container => {
        const img = container.querySelector('img');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                scrub: true,
                pin: false,
            }
        });

        tl.fromTo(img, {
            yPercent: -20,
            ease: 'none'
        }, {
            yPercent: 20,
            ease: 'none'
        });
    });






    if (window.matchMedia("(max-width: 1024px)").matches) {
        //화면 너비 1024px 이하일 때 특정 클래스 추가

    } else {
        // 화면의 크기가 1024px 이상 일 때 마우스 휠 가로 스크롤 진행
        history.scrollRestoration = "auto";
        //첫번째 section의 item 가로 스크롤

        // let itemW = $('#newItems .item').outerWidth(true);
        // let itemLength = $('#newItems .item').length;

        // $('#newItems').width(itemW * itemLength);

        const horTextAnimation = () => {
            // FOR RESPONSIVE
            /*  const triggers = ScrollTrigger.getAll();
             triggers.forEach((trigger) => trigger.kill()); 이 코드로 인해 스크롤 줌이 실행이 안됨*/
            // TARGET ELEMENT
            const horText = document.querySelector(".newItem .list_wrap");
            if (horText) {
                // ANIMAATION
                console.log(horText.offsetWidth)
                console.log(window.innerWidth)
                gsap.to(horText, {
                    x: () => -(horText.offsetWidth - window.innerWidth / 2),
                    ease: "linear",
                    scrollTrigger: {
                        trigger: ".newItem",
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        end: () => `+=${horText.offsetWidth - window.innerWidth / 2}`
                    },

                });



                // REFRESH
                ScrollTrigger.refresh();
            }
        };
        // RUN ANIMATION
        horTextAnimation();
        // RESPONSIVE
        window.addEventListener("resize", horTextAnimation);

    }



    //-------------------------------------------------
    //포트폴리오
    //스크롤하다가 해당 콘텐츠에 멈춤
    // Timeline with ScrollTrigger
    gsap.timeline({
        scrollTrigger: {
            trigger: ".has-audio",
            start: "top top",
            end: "bottom top+=20%",
            scrub: true,
            pin: true,
            toggleActions: "restart none none reset",
            fastScrollEnd: true,
        }
    });



    /* 그래픽디자인 스와이퍼 슬라이드 */
    var swiper = new Swiper(".graphic_swiper", {
        slidesPerView: 'auto',
        spaceBetween: 36,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        /* autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }, */
    });

    //포트폴리오 탭메뉴
    let portfolioMenu = document.querySelectorAll('.challenge .category li');
    let portfolioList = document.querySelectorAll('.challenge .list');

    for (let i = 0; i < portfolioMenu.length; i++) {
        portfolioMenu[i].addEventListener('click', () => {
            portfolioMenu.forEach(portfolioMenuIndex => {
                portfolioMenuIndex.classList.remove('active');
            });
            portfolioMenu[i].classList.add('active');
            portfolioList.forEach(portfolioListIndex => {
                portfolioListIndex.classList.remove('active');
            });

            portfolioList[i].classList.add('active');
        });
    };


    //팬시박스
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });


}) 