import { Controller } from '@hotwired/stimulus';
import { loadStripe } from '@stripe/stripe-js';

export default class extends Controller {
    static values = {
        target: String
    }
    static targets = ['tokenid']
    connect() {
    }
    createToken(e) {
        let bouton = e.target
        let tokenid = this.tokenidTarget
        bouton.disabled = true;
        stripe.createToken(cardElement).then(function (result) {
            if (typeof result.error != 'undefined') {
                bouton.disabled = false;
                alert(result.error.message);
            }

            // creating token success
            if (typeof result.token != 'undefined') {
                tokenid.value = result.token.id;
                this.element.form.requestSubmit()
            }
        });
    }
}
