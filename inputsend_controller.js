import { Controller } from '@hotwired/stimulus'
import { useDebounce } from 'stimulus-use'

export default class extends Controller {
    static debounces = ['submit']
    static values = {
        temps: String
    }



    connect() {
        this.element.focus();
        this.element.setSelectionRange(-1, -1)
        let that = this.element;
        this.element.addEventListener('input', function (e) {
            clearTimeout(this.timer)
            this.timer = setTimeout(function () {
                that.form.requestSubmit()
            }, this.tempsValue);
        })

    }



}

