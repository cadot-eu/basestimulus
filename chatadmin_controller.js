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
        person: String,
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
        let cards = '';
        let persons = '';
        let cardseul = '';
        //si on a dans l'url un id de chat*
        //on récupère le dernier nombre dans l'url
        const url = window.location.href;
        let id = url.split('/').pop();
        //si id est un nombre
        if (!isNaN(id)) {
            id = parseInt(id);
        }
        else {
            id = null
        }
        //on boucle sur les chats
        chatsJson.forEach(chat => {
            let card = '';
            //on boucle sur les messages
            chat.messages.forEach(message => {
                if (message.type == 'réponse')
                    card += this.reponseValue.replaceAll('REPONSE', message.texte).replaceAll('DATE', message.created_in)
                else
                    card += this.questionValue.replaceAll('QUESTION', message.texte).replaceAll('DATE', message.created_in)
            })
            //cards += this.cardValue.replaceAll('CARD', card).replaceAll('CHAT', chat.id).replaceAll('DATE', chat.updated_in).replaceAll('CSRF', csrf[chat.id]).replaceAll('TOKEN', chat.user);
            if (id == chat.id) {
                cardseul = this.cardValue.replaceAll('CARD', card).replaceAll('CHAT', chat.id).replaceAll('DATE', chat.updated_in).replaceAll('CSRF', csrf[chat.id]).replaceAll('TOKEN', chat.user);
            }
            persons += this.personValue.replaceAll('DATE', chat.updated_in).replaceAll('LASTMESSAGE', chat.messages[0].texte).replaceAll('CHAT', chat.id).replaceAll('CSRF', csrf[chat.id]).replaceAll('TOKEN', chat.user).replaceAll('TYPE', chat.messages[0].type);
        });

        this.destinationTarget.innerHTML = this.cardsValue.replaceAll('CARD', cardseul).replaceAll('PERSONS', persons);

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
