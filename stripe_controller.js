import { Controller } from '@hotwired/stimulus';
import { loadStripe } from '@stripe/stripe-js';


let stripe, elements, cardElement;

export default class extends Controller {
    static values = {
        target: String,
        stripekey: String
    }
    static targets = ['bouton', 'token', 'form']
    async connect() {
        //creation des éléments de paiement
        stripe = await loadStripe(this.stripekeyValue);
        elements = stripe.elements();
        cardElement = elements.create('card');
        cardElement.mount('#card-element');

    }
    createToken() {
        //retour du bouton de paiement
        this.boutonTarget.disabled = true;
        let tokenT = this.tokenTarget;
        let formT = this.formTarget;
        let boutonT = this.boutonTarget;
        stripe.createToken(cardElement).then(function (result) {

            if (typeof result.error != 'undefined') {
                boutonT.disabled = false;
                alert(result.error.message);
            }

            // creating token success
            if (typeof result.token != 'undefined') {
                tokenT.value = result.token.id;
                formT.submit();
            }
        });
    }
}
