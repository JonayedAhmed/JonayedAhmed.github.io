/**
 *
 *  sticky navigation
 *
 */

let navbar = $(".navbar");

$(window).scroll(function () {
    // get the complete hight of window
    let oTop = $(".section-2").offset().top - window.innerHeight;
    if ($(window).scrollTop() > oTop) {
        navbar.addClass("sticky");
    } else {
        navbar.removeClass("sticky");
    }
});


/**
 *
 *  Counting Numbers Section
 *
 */


let nCount = selector => {
    $(selector).each(function () {
        $(this)
            .animate({
                Counter: $(this).text()
            }, {
                // A string or number determining how long the animation will run.
                duration: 4000,
                // A string indicating which easing function to use for the transition.
                easing: "swing",
                /**
                 * A function to be called for each animated property of each animated element. 
                 * This function provides an opportunity to
                 *  modify the Tween object to change the value of the property before it is set.
                 */
                step: function (value) {
                    $(this).text(Math.ceil(value));
                }
            });
    });
};

let a = 0;
$(window).scroll(function () {
    // The .offset() method allows us to retrieve the current position of an element  relative to the document
    let oTop = $(".numbers").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() >= oTop) {
        a++;
        nCount(".rect > h1");
    }
});



/**
 *
 *  Landing page
 *
 */

function init() {
    const slides = document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page");
    const backgrounds = [
        `radial-gradient(#2B3760, #0B1023)`,
        `radial-gradient(#4E3022, #161616)`,
        `radial-gradient(#4E4342, #161616)`
    ];
    //Tracker
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener("click", function () {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });

    function changeDots(dot) {
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }

    function nextSlide(pageNumber) {
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector(".hero .model-left");
        const nextRight = nextPage.querySelector(".hero .model-right");
        const currentLeft = currentPage.querySelector(".hero .model-left");
        const currentRight = currentPage.querySelector(".hero .model-right");
        const nextText = nextPage.querySelector(".details");
        const portofolio = document.querySelector(".portofolio");

        const tl = new TimelineMax({
            onStart: function () {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "none";
                });
            },
            onComplete: function () {
                slides.forEach(slide => {
                    slide.style.pointerEvents = "all";
                });
            }
        });

        tl.fromTo(currentLeft, 0.3, {
                y: "-10%"
            }, {
                y: "-100%"
            })
            .fromTo(currentRight, 0.3, {
                y: "10%"
            }, {
                y: "-100%"
            }, "-=0.2")
            .to(portofolio, 0.3, {
                backgroundImage: backgrounds[pageNumber]
            })
            .fromTo(
                currentPage,
                0.3, {
                    opacity: 1,
                    pointerEvents: "all"
                }, {
                    opacity: 0,
                    pointerEvents: "none"
                }
            )
            .fromTo(
                nextPage,
                0.3, {
                    opacity: 0,
                    pointerEvents: "none"
                }, {
                    opacity: 1,
                    pointerEvents: "all"
                },
                "-=0.6"
            )
            .fromTo(nextLeft, 0.3, {
                y: "-100%"
            }, {
                y: "-10%"
            }, "-=0.6")
            .fromTo(nextRight, 0.3, {
                y: "-100%"
            }, {
                y: "10%"
            }, "-=0.8")
            .fromTo(nextText, 0.3, {
                opacity: 0,
                y: 0
            }, {
                opacity: 1,
                y: 0
            })
            .set(nextLeft, {
                clearProps: "all"
            })
            .set(nextRight, {
                clearProps: "all"
            });

        current = pageNumber;
    }

    //OPTIONAL
    document.addEventListener("wheel", throttle(scrollChange, 1500));
    document.addEventListener("touchmove", throttle(scrollChange, 1500));

    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll(".slide")[dotNumber];
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        activeDot.classList.add("active");
    }

    function scrollChange(e) {
        if (e.deltaY > 0) {
            scrollSlide += 1;
        } else {
            scrollSlide -= 1;
        }

        if (scrollSlide > 2) {
            scrollSlide = 0;
        }
        if (scrollSlide < 0) {
            scrollSlide = 2;
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
        console.log(scrollSlide);
    }

    const hamburger = document.querySelector(".menu");
    const hamburgerLines = document.querySelectorAll(".menu line");
    const navOpen = document.querySelector(".nav-open");
    const contact = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");

    const tl = new TimelineMax({
        paused: true,
        reversed: true
    });

    tl.to(navOpen, 0.5, {
            y: 0
        })
        .fromTo(contact, 0.5, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0
        }, "-=0.1")
        .fromTo(social, 0.5, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0
        }, "-=0.5")
        .fromTo(logo, 0.2, {
            color: "white"
        }, {
            color: "black"
        }, "-=1")
        .fromTo(
            hamburgerLines,
            0.2, {
                stroke: "white"
            }, {
                stroke: "black"
            },
            "-=1"
        );

    hamburger.addEventListener("click", () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

init();