//exemple d'utilisation
{/* <div class="swiper sliderFeaturedPosts" data-base--carousel-options-value='{"navigation": {"nextEl":".custom-swiper-button-next","prevEl": ".custom-swiper-button-prev" }}' data-controller="base--carousel">
    <div class="swiper-wrapper">
        {% for item in carousels %}
            <div class="swiper-slide">
                <div class="swiper-lazy img-bg d-flex align-items-end" data-background="{{ asset(item.image)|imagine_filter('bandeaufixe') }}">
                    <div class="img-bg-inner bg-dark bg-opacity-50 p-3 ms-5">
                        <h2>{{ item.titre | raw }}</h2>
                        <p class="h4">{{ item.texte | raw }}</p>
                    </div>
                    <div class="swiper-lazy-preloader"></div>
                </div>
            </div>
        {% endfor %}
    </div>
    <div class="custom-swiper-button-next">
        <span class="bi-chevron-right"></span>
    </div>
    <div class="custom-swiper-button-prev">
        <span class="bi-chevron-left"></span>
    </div>
    <div class="swiper-pagination"></div>
</div> */}

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
