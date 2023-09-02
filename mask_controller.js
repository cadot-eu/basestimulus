import { Controller } from '@hotwired/stimulus'
//exemple d'utilisation
/* ------------- pour un nombre ou on veut séparer les milliers ------------- */
// <input type="text" data-controller="mask" data-action="base--mask#update" data-base--mask-alias-value="number" data-base--base--mask-options-value='{"thousandsSeparator": " "}' >

/* ----------------- pour un pattern ----------------- */
// <input type="text" data-controller="base--mask" data-action="base--mask#update" data-base--mask-alias-value="pattern" data-base--mask-options-value='{"mask": "0000-0000-0000-0000"}' >



import IMask from 'imask';
export default class extends Controller {
    static values = {
        options: { type: Object, default: {} },
        alias: { type: String, default: "number" },
        blockSubmit: { type: Boolean, default: false }
    }

    connect() {
        this.update()
    }
    update() {
        if (this.aliasValue == "number") {
            IMask(this.element,
                {
                    mask: Number,  // enable number mask
                    thousandsSeparator: ' ',
                    ...this.optionsValue
                },
            );
        }
        if (this.aliasValue == "pattern") {
            IMask(this.element,
                this.optionsValue
            );
        }
        if (this.aliasValue == "telephone") {
            IMask(this.element,
                {
                    mask: '00.00.00.00.00',
                    ...this.optionsValue
                }
            );
        }
        if (this.aliasValue == "siret") {
            // dans optionsValue on peut passer des options pour le masque
            IMask(this.element,
                {
                    mask: '000 000 000 00000',
                    ...this.optionsValue
                }
            );
            //on lance une vérification par /admin.siret pour vérifier si le siret est valide
            this.element.addEventListener('input', (e) => {
                //on supprime les espaces
                const value = e.target.value.replace(/\s/g, '');
                if (value.length == 14) {
                    fetch('/admin/siret/' + value, {
                        method: 'GET',
                    })
                        .then(response => response.json())
                        .then(data => {
                            //on supprime le message d'erreur ou de succès s'il existe
                            if (e.target.parentNode.querySelector('.invalid-feedback')) {
                                e.target.parentNode.querySelector('.invalid-feedback').remove();
                            }
                            if (e.target.parentNode.querySelector('.valid-feedback')) {
                                e.target.parentNode.querySelector('.valid-feedback').remove();
                            }
                            //on réactive le submit
                            e.target.form.querySelector('#bouton_submit').disabled = false;
                            if (data.header.statut == "200") {
                                e.target.classList.remove('is-invalid');
                                e.target.classList.add('is-valid');

                                //on ajoute un message de succès avec le nom de l'entreprise
                                const success = document.createElement('div');
                                success.classList.add('valid-feedback');
                                success.innerHTML = 'Entreprise appartenant à ' + data.etablissement.uniteLegale.nomUniteLegale + ' ' + data.etablissement.uniteLegale.prenom1UniteLegale;
                                e.target.parentNode.appendChild(success);

                            } else {
                                e.target.classList.remove('is-valid');
                                e.target.classList.add('is-invalid');
                                //on ajoute un message d'erreur
                                const error = document.createElement('div');
                                error.classList.add('invalid-feedback');
                                error.innerHTML = data.header.message;
                                e.target.parentNode.appendChild(error);
                                //on bloque le submit si le siret n'est pas valide et si on a demandé à bloquer le submit
                                if (this.blockSubmitValue == true) {
                                    e.target.form.querySelector('#bouton_submit').disabled = true;
                                }
                                else {
                                    e.target.form.querySelector('#bouton_submit').disabled = false;
                                }
                            }
                        }
                        );
                }
            });

        }
    }


}
