//stimulus qui renvoie de l'html donné par une url par ajax.

import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and use                              */
    /* -------------------------------------------------------------------------- */
    static values = {
        stop: Boolean,
        destination: String,
        card: String,
        cards: String,
        token: String,
        reponse: String,
        question: String,
        csrf: String
    }
    static targets = ["destination", "message"]
    /* -------------------------------------------------------------------------- */
    /*                                    code                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        this.seek();
        this.startRefreshing()
    }
    async seek() {
        const csrf = JSON.parse(this.csrfValue);
        const chats = await fetch(`/admin/chatGet`);
        const chatsJson = await chats.json();
        let retour = this.cardsValue;
        let cards = '';
        chatsJson.forEach(chat => {
            let card = '';
            //on boucle sur les messages
            chat.messages.forEach(message => {
                if (message.type == 'réponse')
                    card += this.reponseValue.replaceAll('REPONSE', message.texte).replaceAll('DATE', message.created_in)
                else
                    card += this.questionValue.replaceAll('QUESTION', message.texte).replaceAll('DATE', message.created_in)
            })
            cards += this.cardValue.replaceAll('CARD', card).replaceAll('CHAT', chat.id).replaceAll('DATE', chat.updated_in).replaceAll('CSRF', csrf[chat.id]).replaceAll('TOKEN', chat.user);
        });
        retour = this.cardsValue.replaceAll('CARDS', cards)
        this.destinationTarget.innerHTML = retour;
    }
    pause() {
        this.stopValue = true;
    }
    startRefreshing() {

        setInterval(() => {
            if (this.stopValue == false) this.seek();
        }, 5000)
    }



    async send(e) {
        this.stopValue = false;
        //on récupère la reponse
        try {
            const response = await fetch(`/chatSend/${e.target.dataset.token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: document.getElementById('chat_message' + e.target.dataset.token).value,
                    type: "réponse"
                })
            })

        } catch (error) {
            console.log(error)
        }
        document.getElementById('chat_message' + e.target.dataset.token).value = '';
        this.seek();
    }

}
