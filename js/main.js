document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initHeroAnimation();
    initScrollAnimations();
    initNavigation();
    initCursor();
});

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Only init if devices have cursor capability
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });

        // Hover Effect
        const links = document.querySelectorAll('a, button, .project');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-active');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-active');
            });
        });
    }
}

function initNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelectorAll('.nav__link');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
        });
    });
}

function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.from('.hero__line', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' // Review this depending on final CSS
    })
    .from('.hero__subtitle', {
        y: 20,
        opacity: 0,
        duration: 1
    }, '-=0.8')
    .from('.nav', {
        y: -50,
        opacity: 0,
        duration: 1
    }, '-=0.8');
}

function initScrollAnimations() {
    // Animate section titles
    gsap.utils.toArray('.section__title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate projects
    gsap.utils.toArray('.project').forEach((project, i) => {
        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: 'top 85%',
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.1 // Simple stagger logic for now
        });
    });

    // Animate About Section
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%',
        }
    });

    aboutTl.from('.about__headline', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.about__text', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.skill__item', {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // Animate Contact Section
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
        }
    });

    contactTl.from('.contact__subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.contact__email', {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.socials', {
        y: 20,
        opacity: 0,
        duration: 1
    }, '-=0.8');

    // Animate Progress Bars
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
            },
            width: bar.getAttribute('data-width'),
            duration: 1.5,
            ease: 'power2.out'
        });
    });
}
