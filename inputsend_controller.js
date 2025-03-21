/* A Stimulus controller that is used to debounce the input of a form and send the form if is modified. */
import { Controller } from '@hotwired/stimulus';
//example
// <input data-controller="base--inputsend" data-base--inputsend-temps-value="500" data-action="input->base--inputsend#submit">
export default class extends Controller {
  static debounces = ['submit']
  static values = {
    temps: String,
    focus: String
  }

  connect() {
    useDebounce(this, { wait: this.tempsValue })
    // if (this.focusValue) {
    //     this.element.focus();
    //     this.element.setSelectionRange(-1, -1)
    // }
    let that = this.element;
    this.element.addEventListener('input', function (e) {
      clearTimeout(this.timer)
      that.form.requestSubmit()
    })
  }




}

