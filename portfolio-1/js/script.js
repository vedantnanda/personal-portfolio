let didScroll = false;
const changeHeaderOn = 200;

const ids = ['#home', '#about', '#skills', '#blogs', '#contact'];

$(function () {
    $("body").tooltip({ selector: '[data-bs-toggle=tooltip]' });


    $(".dropdown-menu li a").on('click', function () {
        const text = $(this).text();
        const classname = text.substring(0, 2).toLowerCase();

        $('#dropdown-value').text(text);

        $('.' + (classname === 'en' ? 'ta' : 'en')).css('display', 'none');
        $('.' + classname).css('display', 'inline-block');
    });

    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#menu',
    })

    if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
        $("#wrapper").toggleClass("toggled");
    }

    $(window).on('load', function () {
        $('.loader-wrapper').hide(1000);
        setInterval(function (timestamp) {
            $('.loader-wrapper').css('z-index', -1)
            document.getElementsByClassName('loader-wrapper')[0].innerHTML = ''
        }, 1200);
    });

    $("#menu-toggle").on(
        'click',
        function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });


    $('.sidebar-heading').on(
        'click',
        function (e) {
            e.preventDefault();
            $('#wrapper').toggleClass("toggled");
        });

    $('.navbar-brand').on(
        'click',
        function (e) {
            const id = this.href.split('#')[1];
            addNavBg('#' + id);
            $('#wrapper').toggleClass("toggled");
        });

    let curr = 0;

    $('body').on('keydown', function (e) {
        if (e.code === 'ArrowDown') {
            curr += 1;
            if (curr >= ids.length) curr = ids.length - 1;
        } else if (e.code === 'ArrowUp') {
            curr -= 1;
            if (curr < 0) curr = 0;
        } else if (e.code === 'Escape') {
            $('#wrapper').toggleClass("toggled");
        }

        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
            addNavBg(ids[curr]);
            $('html, body').animate({
                scrollTop: $(ids[curr]).offset().top
            }, 100, 'easeOutBounce');
        }

    });

    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            const hash = this.hash;

            addNavBg(hash);

            $('body').animate({
                scrollTop: $(hash).offset().top
            }, 100, 'swing', function () {
                window.location.hash = hash;
            });

            $('#wrapper').toggleClass("toggled");
            $(hash + '-nav').addClass('active');
        }
    });

    window.addEventListener('scroll', function (event) {
        if (!didScroll) {
            didScroll = true;
            setTimeout(scrollPage, 250);
        }
    }, false);
});

const addNavBg = function (id) {
    if (id === '#home') {
        $('.navbar').removeClass('navbar-bg')
    } else {
        $('.navbar').addClass('navbar-bg')
    }
}

function scrollPage() {
    const sy = scrollY();
    if (sy >= changeHeaderOn) {
        $('.navbar').addClass('navbar-bg');
    } else {
        $('.navbar').removeClass('navbar-bg');
    }
    didScroll = false;
}

function scrollY() {
    return window.pageYOffset || document.documentElement.scrollTop;
}
