/* A Stimulus controller that is used to debounce the input of a form and send the form if is modified. */
import { Controller } from '@hotwired/stimulus'


export default class extends Controller {
    static values = {
        max: String
    }

    connect() {
        let that = this;
        let twig = '';
        //on ajoute les étoiles à cliquer
        let div = document.createElement('div');
        for (let index = 0; index < this.maxValue; index++) {
            let i = document.createElement('i');
            i.classList.add('bi');
            if (this.element.value > index)
                i.classList.add('bi-star-fill');
            else
                i.classList.add('bi-star');
            i.classList.add('starsTwigFilled');
            i.addEventListener('click', function () {
                that.element.value = index + 1;
                //on met à jour les étoiles
                let stars = that.element.parentNode.querySelectorAll('.starsTwigFilled');
                stars.forEach(function (star) {
                    star.classList.remove('bi-star-fill');
                    star.classList.add('bi-star');
                }
                );
                for (let index = 0; index < that.element.value; index++) {
                    stars[index].classList.remove('bi-star');
                    stars[index].classList.add('bi-star-fill');
                }

            });

            div.appendChild(i);
        }
        //on ajoute le div après l'input
        this.element.parentNode.appendChild(div);
    }




}

