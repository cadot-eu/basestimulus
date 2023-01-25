import { Controller } from '@hotwired/stimulus';


export default class extends Controller {
    static values = {
        target: String,
        stripekey: String
    }
    static targets = ['bouton', 'token', 'form']
    async connect() {
        let { loadStripe } = await import('@stripe/stripe-js');
        //creation des éléments de paiement
        this.stripe = await loadStripe(this.stripekeyValue);
        const appearance = {
            theme: 'stripe',

            variables: {
                colorPrimary: '#0570de',
                colorBackground: '#ffffff',
                colorText: '#30313d',
                colorDanger: '#df1b41',
                fontFamily: 'Ideal Sans, system-ui, sans-serif',
                spacingUnit: '2px',
                borderRadius: '4px',
                // See all possible variables below
            }
        };

        let elements = this.stripe.elements(appearance);
        this.cardElement = elements.create('card');
        this.cardElement.mount('#card-element');

    }
    createToken() {
        //retour du bouton de paiement
        this.boutonTarget.disabled = true;
        let tokenT = this.tokenTarget;
        let formT = this.formTarget;
        let boutonT = this.boutonTarget;
        this.stripe.createToken(this.cardElement).then(function (result) {

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
