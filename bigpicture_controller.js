import { Controller } from '@hotwired/stimulus'
import BigPicture from "bigpicture";
//example
//<div data-controller="base--bigpicture" data-base--bigpicture-options-value='{"ytSrc": "P2pny4Nvojw"}' >
//data-controller='base--bigpicture' data-base--bigpicture-options-value='{"imgSrc": "{{asset(Carousel.image)}}"}'

export default class extends Controller {

    static values = {
        options: Object,
        pointer: String
    }
    /* -------------------------------------------------------------------------- */
    /*                                     use                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        let options = this.optionsValue //data-base--bigpicture-options-value
        this.element.style.cursor = this.pointerValue ? this.pointerValue : "ne-resize"
        this.element.onclick = function () {
            BigPicture(
                {
                    ... { el: this },
                    ...options // écrase les options en ajoutant  data-base--bigpicture-options-value
                }
            );
        };

    }

}
