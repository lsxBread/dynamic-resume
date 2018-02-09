function linkPreview() {
    let view = document.querySelector('#mySlides');

    let controller = {
        view: null,
        url: {
            navigation: {
                codeLink: 'https://github.com/lsxBread/navigation-keyboard',
                preiview: 'https://lsxbread.github.io/navigation-keyboard/'
            },
            canvas: {
                codeLink: 'https://github.com/lsxBread/canvas',
                preiview: 'https://lsxbread.github.io/canvas/'
            },
            appleSlides: {
                codeLink: 'https://github.com/lsxBread/apple-like-gallery',
                preiview: 'https://lsxbread.github.io/apple-like-gallery/'
            }   
        },
        init: function(view) {
            this.view = view;
            this.bindEvents();
        },
        getCurrentProjectName: function() {
            let index = getSwiperActiveIndex();
            let projectName = $(this.view).find('img').eq(index).attr('alt');
            return projectName;
        },
        bindEvents: function() {
            $(this.view).find('.swiper-container').hover(()=>{
                $(this.view).find('.swiper-container > .buttons').removeClass('zoomOut').addClass('animated flipInX');
            }, () => {
                $(this.view).find('.swiper-container > .buttons').removeClass('flipInX').addClass('zoomOut');
            });
        
            $(this.view).find('.swiper-container').on('tap', () => {
                $(this.view).find('.swiper-container > .buttons').removeClass('zoomOut').addClass('animated flipInX');
            });

            this.view.querySelector('#link').addEventListener('click', () => {
                let currentProjectName = this.getCurrentProjectName();
                let codeLink = this.url[currentProjectName].codeLink;
                window.open(codeLink, '_blank');
            });

            this.view.querySelector('#preview').addEventListener('click', () => {
                let currentProjectName = this.getCurrentProjectName();
                let preview = this.url[currentProjectName].preiview;
                window.open(preview, '_blank');
            });
        }
    };
    controller.init(view);
};