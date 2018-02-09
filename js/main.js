!function() {
    var step = 5;
    function writeCSS(prefix, css, callback) {
        let counter = 0;
        let domCode = document.querySelector('pre.code');
        let wrapper = document.querySelector('div.editor');
        let styleTag = document.querySelector('style.cssStyle');
        let timer = setInterval(() => {
            counter += step;
            domCode.innerHTML = Prism.highlight(prefix + css.substring(0, counter), Prism.languages.css);
            styleTag.innerHTML = prefix + css.substring(0, counter);
            wrapper.scrollTop = wrapper.scrollHeight;
            if (counter >= css.length) {
                window.clearInterval(timer);
                callback && callback();
            };
        }, 10);
    };

    function createResume(callback) {
        let paper = document.createElement('div');
        paper.id = 'paper';
        let content = document.createElement('pre');
        content.id = 'content';
        paper.appendChild(content);
        document.body.appendChild(paper);
        callback && callback.call();
    };

    function writeResume(html, callback) {
        let wrapper = document.querySelector('div#paper');
        wrapper.innerHTML = html.substring(0, html.length);
        callback && callback();
    };

    function createBtn(callback) {
        let wrapper = document.createElement('div');
        wrapper.id = 'tool';
        let btn_skip = document.createElement('button');
        btn_skip.id = 'skip';
        let btn_plus = document.createElement('button');
        btn_plus.id = 'plus';
        let btn_minus = document.createElement('button');
        btn_minus.id = 'minus';
        btn_skip.innerHTML = 'SKIP ANIMATION'
        btn_plus.innerHTML = '+ Speed';
        btn_minus.innerHTML = '- Speed';
        wrapper.appendChild(btn_minus);
        wrapper.appendChild(btn_skip);
        wrapper.appendChild(btn_plus);
        document.body.appendChild(wrapper);
        callback && callback.call();
    };

    function setEventListener() {
        let btn_skip = document.querySelector('button#skip');
        let btn_plus = document.querySelector('button#plus');
        let btn_minus = document.querySelector('button#minus');
        btn_skip.addEventListener('click', () => {
            step = 100000 ;
        });
        btn_plus.addEventListener('click', () => {
            step += 1 ;
        });
        btn_minus.addEventListener('click', () => {
            if (step <= 1) {
                step = 1;
            } else {
                step -= 1 ;
            }
        });
    }

    let css_code = `/*
    * Hello, Interviewer. I am Shixun Liu
    * It is too monotonous to introduce myself only in words
    * Let me do it by coding
    * /

    /* First add some basic style */
    ul, ol {
        list-style: none;
    }
    * {
        transition: all 0.3s;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Arial";
    }

    /* The default background is monotonous, I will add some color */
    html { 
        background: #eee;
    }

    /* Let me style this editor */
    div.editor {
        float:left;
        border: 1px solid #aaa;
        padding: 1em;
        margin: 1em;
        width: 45vw; 
        height: 90vh;  
        overflow: auto; 
    }

    pre.code {
        white-space: pre-wrap;
        word-break: break-all;
    }

    /* Let me add the breath animation */
    div.editor {
        animation: breath 0.5s infinite alternate-reverse;
    }

    @keyframes breath {
        0% {
            box-shadow: 0 0 10px rgba(0,0,0,1);
        }
        100% {
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
    }

    /* 3D animation is also fine */
    html{
        perspective: 1000px;
    }
    div.editor {
        -webkit-transform: rotateY(10deg) translateZ(-100px) ;
        transform: rotateY(10deg) translateZ(-100px) ;
    }

    /* Now it is ready write my resume */
    div#paper {
        float: right;
        border: 1px solid #aaa;
        padding: 1em;
        margin: 1em;
        width: 45vw; 
        height: 90vh;
        background-color:white;
        overflow: auto;
    }
    `;

    let css_btn = `
    /*
    * Now I will add a skip button, when you click it
    * the animation will stop and show the result
    */
    div#tool {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(50%);
    }

    button#plus,
    button#minus,
    button#skip {
        border: 0;
        background-color: #e6686a;
        color: white;
        outline: none;
        margin: 5px;
        height: 50px; 
    }

    button#plus,
    button#minus {
        width: 50px;
        border-radius: 50%;
       
    }

    button#skip {
        width: 100px;   
    }
    `;

    let css_resume = `
    /*
    * Now the content of resume is ready
    * I will convert it from markdown to HTML by using marked.js
    * also style the resume
    */

    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    div#paper {
        -webkit-transform: rotateY(-10deg) translateZ(-100px);
        transform: rotateY(-10deg) translateZ(-100px);
        border: 10px solid grey;
    }

    @font-face {
        font-family: selfIntroduction;
        src: url("https://fonts.gstatic.com/s/opensans/v15/DXI1ORHCpsQm3Vp6mXoaTRampu5_7CjHW5spxoeN3Vs.woff2");
    }   
    a, a:hover {
        text-decoration: none;
    }

    .clearfix::after {
        content: '';
        display: block;
        clear: both;
    }

    .usercard {
        max-width: 940px;
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.8);
    }

    .usercard .welcome {
        background-color: rgb(229, 92, 96);
        color: white;
        display: inline-block;
        padding: 4px 16px;
        line-height: 22px;
        position: relative;
        margin-bottom: 10px;
        font-family: "Arial Black";
    }

    .usercard .welcome .triangle {
        display: block;
        border: 10px solid transparent;
        width: 0px;
        border-left-color: rgb(229, 92, 96);
        border-top-width: 0px;
        position: absolute;
        left: 4px;
        top: 100%;
    }

    .usercard .pictureAndText {
        padding: 20px;
        position: relative;
    }

    .usercard .picture {
        position: absolute;
        right: 0;
        bottom: 10%;
        height: 120px;
    }

    .usercard .pictureAndText .picture img {
        height: 100%;
        width: auto
    }

    .usercard .text {
    position:relative;
    }

    .usercard .text h1 {
        margin-top: 18px;
    }

    .usercard .text h1 > span,
    .usercard .text p {
        font-family: selfIntroduction;
        font-weight: normal;
    }

    .usercard .text hr {
        margin: 20px 0;
    }

    .usercard dl dt,
    .usercard dl dd {
        float: left;
        padding: 5px 0;
        font-family: selfIntroduction;
    }

    .usercard dl dd:last-child {
        margin-bottom: 0px;
    }

    .usercard dl dt:last-child {
        margin-bottom: 0px;
    }

    .usercard dl dt {
        width: 30%;
        font-weight: bold;
    }

    .usercard dl dd {
        width: 70%;
        color: #9da0a7;
    }

    .usercard footer {
        display:flex;
        justify-content: space-around;
        flex-wrap: wrap;
        background-color: rgb(229, 92, 96);
        text-align: center;
    }

    .usercard footer a {
        border-radius: 50%;
        padding: 5px;
        margin: 5px;
        transition: all 0.3s;
    }

    .usercard svg {
        width: 30px;
        height: 30px;
        fill: white;
        vertical-align: top;
    }

    .usercard footer a:hover {
        background-color: #CF5D5F;
    }

    main .btn-download {
        font-size: 14px;
        line-height: 16px;
        padding: 21px 40px;
        border: 1px solid #CFCFD1;
        display: block;
        width: 60%;
        border-radius: 2px;
        font-weight: bold;
        color: #3d4451;
        margin: 32px auto;
        transition: box-shadow 0.2s;
        text-align: center;
    }

    main .btn-download:hover {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.8);
    }

    #selfIntroduction,
    #myInterests {
        max-width: 940px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-family: selfIntroduction;
        font-size: 20px;
    }

    .typed-cursor {
        display: none;
    }

    section.myInterest > .wrapper {
        background: white;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.8);
        padding: 10px;
    }

    section.myInterest > .wrapper > .interestList {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        flex-wrap: wrap;
    }

    section.myInterest > .wrapper > .interestList > li {
        margin: 10px;
        border: 1px solid rgb(179, 179, 179);
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 3px;
        text-align: center;
    }

    section.myInterest > .wrapper > .interestList > li:hover > span {
        z-index: 1;
        opacity: 1;
        visibility: visible;
        transition: all 0.35s;
        transform: translate3d(0, 0, 0);
    }

    section.myInterest > .wrapper > .interestList > li > svg {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    section.myInterest > .wrapper > .interestList > li > span{
        position: absolute;
        color: white;
        font-size: 11px;
        font-weight: 400;
        line-height: 1;
        background-color: #717171;
        padding: 5px 8px;
        white-space: nowrap;
        border-radius: 3px;
        top: 120%;
        left:0;
        right: 0;
        text-align: center;
        opacity: 0;
        visibility: hidden;
        transform: translate3d(0, -15px, 0);
    }

    section.portfolio > h2,
    section.myInterest > h2 {
        text-align: center;
        font-size: 34px;
        font-weight: 600;
        margin: 20px 0;
        font-weight: normal;
    }

    section.portfolio {
        text-align: center;
        max-width: 700px;
    }

    #mySlides > .swiper-container {
        width: 100%;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.8);
    }

    #mySlides > .swiper-container > .swiper-wrapper > .swiper-slide > img {
        width: 100%;
        vertical-align: top;
    }

    .swiper-button-prev {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23e6686a'%2F%3E%3C%2Fsvg%3E") !important;
    }

    .swiper-button-next {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23e6686a'%2F%3E%3C%2Fsvg%3E") !important;
    }

    .swiper-pagination-progressbar span.swiper-pagination-progressbar-fill {
        background: #e6686a;
    }

    #mySlides > .swiper-container > .buttons {
        z-index: 2;
        position: absolute;
        bottom: 1em;
        width: 100%;
        opacity: 0;
    }

    #mySlides > .swiper-container > .buttons.flipInX {
        opacity: 1;
    }

    #mySlides > .swiper-container > .buttons.zoomOut {
        opacity: 0;
    }

    #mySlides > .swiper-container > .buttons > div {
        display: inline-block;
        margin: 10px;
        border-radius: 3px;
        border: 1px solid rgb(133, 133, 133);
        padding: 5px;
        background-color :rgba(230,104,106, 0.5);
    }

    #mySlides > .swiper-container > .buttons > div > svg {
        width: 2em;
        height: 2em;
        fill: #e6686a;
    }

    #mySlides > .swiper-container > .buttons > div:hover {
        background-color: #e6686a;
        transition: all 0.5s;
    }
    `

    var html =`
    <main>
        <div class="usercard">
            <div class="pictureAndText clearfix">
                <div class="text">
                    <span class="welcome">
                        HELLO
                        <span class="triangle"></span>
                    </span>
                    <h1><span>I'm </span>Shixun Liu</h1>
                    <p>Actively looking for job of junior Frond End Developer</p>
                    <hr>
                    <dl>
                        <dt>EMAIL</dt>
                        <dd>shixun.liu1023@gmail.com</dd>
                        <dt>PHONE</dt>
                        <dd>0422045862</dd>
                        <dt>EDUCATION</dt>
                        <dd>Infomation Technology - Unimelbr Master</dd>
                        <dt>ADDRESS</dt>
                        <dd>211/5 Courtney St, North Melbourne</dd>
                    </dl>
                    <div class="picture">
                        <img src="./img/avatar.jpg" alt="avatar">
                    </div>
                </div>
            </div>
            <footer>
                <a class="social-icon" id="linkedin" href="https://www.linkedin.com/in/shixun-liu-b9794a86/" target="_blank">
                    <svg class="icon"aria-hidden="true">
                        <use xlink:href="#icon-linkedin"></use>
                    </svg>
                </a>
                <a class="social-icon" id="facebook" href="https://www.facebook.com/profile.php?id=100008735688171" target="_blank">
                    <svg class="icon"aria-hidden="true">
                        <use xlink:href="#icon-facebook"></use>
                    </svg>
                </a> 
                <a class="social-icon" id="github" href="https://github.com/lsxBread" target="_blank">
                    <svg class="icon"aria-hidden="true">
                        <use xlink:href="#icon-github"></use>
                    </svg>
                </a>
                <a class="social-icon" id="gmail" href="mailto:shixun.liu1023@gmail.com">
                    <svg class="icon"aria-hidden="true">
                        <use xlink:href="#icon-gmail"></use>
                    </svg>
                </a>
            </footer>
        </div>

        <div class="btn-download-wrapper">
            <a class="btn-download" href="./file/Resume.pdf" target="_blank" download>DOWNLOAD CV & RESUME</a>
        </div>

        <p id="selfIntroduction">
            Hello! I’m Shixun Liu. Looking for new positions for Junior Web Developer specializing in front end development. Well-versed in numerous tech including HTML5, CSS3, JavaScript, Bootstrap, jQuery, SQL, and Java.
        </p>
    </main>

    <section class="portfolio">
        <h2>Demo</h2>
        <!-- Slider main container -->
        <div id="mySlides">
            <div class="swiper-container">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                    <!-- Slides -->
                    <div class="swiper-slide">
                        <img src="./img/nav-keybord.jpg" alt="navigation" width="940px" height="auto">
                    </div>
                    <div class="swiper-slide">
                        <img src="./img/canvas.jpg" alt="canvas" width="940px" height="auto">
                    </div>
                    <div class="swiper-slide">
                        <img src="./img/apple-slides.png" alt="appleSlides" width="940px", height="auto">
                    </div>
                </div>
                <!-- If we need pagination -->
                <div class="swiper-pagination"></div>
                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            
                <div class="buttons">
                    <div>
                        <svg id="link" class="icon" aria-hidden="true">
                            <use xlink:href="#icon-link"></use>
                        </svg>
                    </div>
                    <div>
                        <svg id='preview' class="icon" aria-hidden="true">
                            <use xlink:href="#icon-preview"></use>
                        </svg>
                    </div>
                </div>
            </div> 
        </div> 
    </section>

    <section part-x class="myInterest" id="siteInterest">
        <h2>My Interests</h2>
        <div class="wrapper">
            <p id="myInterests">
                I'm interested in many activities. Hoping we can share happiness together!
            </p>
            <ul class="interestList">
                <li>
                    <i class="fas fa-film fa-2x" style="color: #e6686a"></i>
                    <span>Movie</span>
                </li>
                <li>
                    <i class="fas fa-bicycle fa-2x" style="color: #e6686a"></i>
                    <span>Bicycling</span>
                </li>
                <li>
                    <i class="fas fa-shopping-cart fa-2x" style="color: #e6686a"></i>
                    <span>Shopping</span>
                </li>
                <li>
                    <i class="fas fa-book fa-2x" style="color: #e6686a"></i>
                    <span>Reading</span>
                </li>
                <li>
                    <i class="fas fa-camera-retro fa-2x" style="color: #e6686a"></i>
                    <span>Camera</span>
                </li>
            </ul>
        </div>
    </section>
    `
    writeCSS('', css_code, () => {
        createBtn(() => {
            writeCSS(css_code, css_btn, () => {
                setEventListener();
                createResume(() => {
                    writeResume(html, () => {
                        writeCSS(css_code + css_btn, css_resume, () => {
                            initSwiper();
                            linkPreview();
                        });
                    });
                });
            });
        });
       
    });
}.call();
