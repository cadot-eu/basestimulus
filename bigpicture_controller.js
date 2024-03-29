import { Controller } from '@hotwired/stimulus'
import BigPicture from "bigpicture";

//example
//<div data-controller="base--bigpicture" data-base--bigpicture-options-value='{"ytSrc": "P2pny4Nvojw"}' >
//data-controller='base--bigpicture' data-base--bigpicture-options-value='{"imgSrc": "{{imagine_filter("grand"))}}"}'

export default class extends Controller {

    static values = {
        options: Object,
        alias: String,
        pointer: String
    }
    /* -------------------------------------------------------------------------- */
    /*                                     use                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        let options = this.optionsValue //data-base--bigpicture-options-value
        this.element.style.cursor = this.pointerValue ? this.pointerValue : "pointer"
        /* ---------------------------------- alias --------------------------------- */
        if (this.aliasValue == "gallery")
            if (this.element.id != '')
                options = { gallery: "#" + this.element.id }
            else
                alert("Votre gallerie bigpicture ne comporte pas d'id")
        /* --------------------------------- onclick -------------------------------- */
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
