import { Controller } from '@hotwired/stimulus';
//https://stripe.com/docs/payments/quickstart
let stripe, elements, emailAddress;
export default class extends Controller {
    static values = {
        target: String,
        stripekey: String,
        fetch: String,
        email: String,
        iddossier: String,
    }
    static targets = ['bouton', 'token', 'form']
    async connect() {
        let stripefetch = this.fetchValue;
        let emailAddress = this.emailValue;
        let { loadStripe } = await import('@stripe/stripe-js');
        stripe = await loadStripe(this.stripekeyValue);

        //création du formulaire
        const { clientSecret } = await fetch(stripefetch, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).then((r) => r.json());
        elements = stripe.elements({ clientSecret }
        );
        //permet d'ajouter des fields
        //const linkAuthenticationElement = elements.create("linkAuthentication");
        //linkAuthenticationElement.mount("#link-authentication-element");

        const paymentElement = elements.create("payment");
        paymentElement.mount("#payment-element");

        checkStatus();






    }
    async submit() {

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: window.location.origin + "/paiement_dossier/" + this.iddossierValue,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            showMessage(error.message);
        } else {
            showMessage("An unexpected error occurred.");
        }

        setLoading(false);
    }
}




// Fetches the payment intent status after payment submission
async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );

    if (!clientSecret) {
        return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
        case "succeeded":
            showMessage("Payment succeeded!");
            break;
        case "processing":
            showMessage("Your payment is processing.");
            break;
        case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.");
            break;
        default:
            showMessage("Something went wrong.");
            break;
    }
}

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}