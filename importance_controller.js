/* A Stimulus controller that is used to debounce the input of a form and send the form if is modified. */
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static values = {
        temps: { type: String, default: '800' },
        url: String
    }
    connect() {
        let that = this;
        this.element.addEventListener('input', function (e) {
            fetch(`${that.urlValue}/${this.value}`)
        })
    }




}

