import { Controller } from '@hotwired/stimulus'
// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
export default class extends Controller {

    static values = {
        options: Object
    }
    /* -------------------------------------------------------------------------- */
    /*                              uses and variable                             */
    /* -------------------------------------------------------------------------- */

    connect() {
        this.swiper = new Swiper(this.element, {
            ...this.defaultOptions, // options de base
            ...this.optionsValue // écrase les options en ajoutant  data-loader-options-value
        })
    }
    open(event) {
        // console.log(event)

    }
    disconnect() {
        this.swiper.destroy()
        this.swiper = undefined
    }
    get defaultOptions() {
        return {
            lazy: true,
            preload: false,
            spaceBetween: 0,
            speed: 1500,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 2300,
                disableOnInteraction: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        }
    }

}
