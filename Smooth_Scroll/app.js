function smoothScroll(target, duration){
    const targetEl = document.querySelector(target);
    const targetPosition = targetEl.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;
    
    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    //http://www.gizma.com/easing/ easing functions
    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    requestAnimationFrame(animation);
}

function scrollAppear(){
    const introText = document.querySelector('.intro-text');
    const introPosition = introText.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    if(introPosition < screenPosition ){
        introText.classList.add('intro-appear');
    }
}

window.addEventListener('scroll', scrollAppear)

const section1 = document.querySelector('.section1');
section1.addEventListener('click', function(){
    smoothScroll('.section2', 10000);
});