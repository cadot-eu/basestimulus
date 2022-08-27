import { Controller } from '@hotwired/stimulus'
import BuildEditor from '/assets/ckeditor/build/ckeditor';



/* ---------------- transformation des textareas en fckeditor --------------- */
// à copier dans assets/controllers et à modifier pour le site

export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */
    // for choice template of toolbar

    static values = {
        toolbar: String,
        upload: { type: String, default: 'simpleimage' }
    }


    connect() {
        if (this.toolbarValue == 'full')
            this.editor = full(this);
        else if (this.toolbarValue == 'simplelanguage')
            this.editor = simplelanguage(this);
        else if (this.toolbarValue == 'vide')
            this.editor = vide(this);
        else if (this.toolbarValue == 'normal')
            this.editor = normal(this);
        else if (this.toolbarValue == 'simple')
            this.editor = simple(this);
        else this.editor = vide(this)
        //protection contre le problème required sur un champ display none qui cré l'erreur is not focusable 

    }

    disconnect() {

    }
}


function vide(e) {
    return BuildEditor.create(e.element,
        {
            restrictedEditing: {
                allowedCommands: ['highlight',
                    'specialCharacters',],
                allowedAttributes: ['highlight',
                    'specialCharacters']
            },
            toolbar: {
                items: [

                ]
            }
        })
        .then(editor => {
            editor.setData(e.element.value)
            editor.editing.view.document.on('clipboardInput', (evt, data) => {
                data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
            });
            editor.model.document.on('change:data', () => {
                e.element.value = editor.getData();//.replace(/<p>+/, "").replace(/<\/p>+$/, "");
            });
        })
        .catch(error => {
            console.error(error.stack);
        });
}
function simple(e) {
    return BuildEditor.create(e.element,
        {
            restrictedEditing: {
                allowedCommands: ['highlight',
                    'specialCharacters',],
                allowedAttributes: ['highlight',
                    'specialCharacters']
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                ]
            },
            highlight: {
                options: [
                    {
                        model: 'Marker',
                        class: '',
                        title: 'Marqueur',
                        type: 'marker'
                    }
                ]
            },
            toolbar: {
                items: [
                    'highlight',
                    'specialCharacters',
                    'alignment',
                    'bulletedList',
                    'numberedList',
                    'horizontalLine',
                    '|',
                    'outdent',
                    'indent',
                ]
            }
        })
        .then(editor => {
            editor.setData(e.element.value)
            editor.editing.view.document.on('clipboardInput', (evt, data) => {
                data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
            });
            editor.model.document.on('change:data', () => {
                e.element.value = editor.getData();//.replace(/<p>+/, "").replace(/<\/p>+$/, "");
            });
        })
        .catch(error => {
            console.error(error.stack);
        });
}
function simplelanguage(e) {
    return BuildEditor.create(e.element,
        {
            restrictedEditing: {
                allowedCommands: ['highlight',
                    'specialCharacters',],
                allowedAttributes: ['highlight',
                    'specialCharacters']
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                ]
            },
            highlight: {
                options: [
                    {
                        model: 'Marker',
                        class: 'MotClefLienInterne',
                        title: 'Mot clef pour lien interne',
                        type: 'marker'
                    }

                ]
            },
            toolbar: {
                items: [
                    'highlight',
                    'specialCharacters',
                    'textPartLanguage',
                    'alignment',
                    'bulletedList',
                    'numberedList',
                    'horizontalLine',
                    '|',
                    'outdent',
                    'indent',
                ]
            },
            language: {
                textPartLanguage: [
                    { title: 'French', languageCode: 'fr' },
                    { title: 'Anglais', languageCode: 'en' }
                ]
            },
        })
        .then(editor => {
            editor.setData(e.element.value)
            editor.editing.view.document.on('clipboardInput', (evt, data) => {
                data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
            });
            editor.model.document.on('change:data', () => {
                e.element.value = editor.getData();//.replace(/<p>+/, "").replace(/<\/p>+$/, "");
            });
        })
        .catch(error => {
            console.error(error.stack);
        });
}
function normal(e) {
    return BuildEditor.create(e.element,
        {
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                ]
            },
            highlight: {
                options: [
                    {
                        model: 'Marker',
                        class: '',
                        title: 'Marqueur',
                        type: 'marker'
                    },

                ]
            },
            bulletedList: {
                options: [
                    {

                    }
                ]
            },
            toolbar: {
                items: [
                    'simplebox',
                    'placeholder',
                    'heading',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'alignment',
                    'pageBreak',
                    'bulletedList',
                    'numberedList',
                    'horizontalLine',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'highlight',
                    'imageUpload',
                    'blockQuote',
                    'insertTable',
                    'mediaEmbed',
                    'link',
                    'todoList',
                    'undo',
                    'redo',
                    '|',
                    'removeFormat',
                    'specialCharacters',
                    'strikethrough',
                    'subscript',
                    'superscript',
                    'textPartLanguage',
                    '|'
                ]
            },
            mediaEmbed: {
                // configuration...
            },
            simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl: "/upload/" + e.uploadValue,
                // Enable the XMLHttpRequest.withCredentials property if required.
                withCredentials: false,

                // Headers sent along with the XMLHttpRequest to the upload server.
                headers: {
                    "X-CSRF-TOKEN": "CSFR-Token",
                    Authorization: "Bearer [JSON Web Token]"
                },
            },
            language: {
                textPartLanguage: [
                    { title: 'French', languageCode: 'fr' },
                    { title: 'Anglais', languageCode: 'en' }
                ]
            },
        })

        .then(editor => {
            editor.setData(e.element.value)
            // editor.editing.view.document.on('clipboardInput', (evt, data) => {
            //     data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
            // });
            editor.model.document.on('change:data', () => {
                e.element.value = editor.getData();//.replace(/<p>+/, "").replace(/<\/p>+$/, "");
            });

            toolbar(editor)
            editor.on('clipboardInput', (evt, data) => {
                console.log(evt)
                const dataTransfer = data.dataTransfer;
                const rtfContent = dataTransfer.getData('application/rtf');

                // If no RTF was pasted, abort and let the clipboard feature handle the input.
                if (!rtfContent) {
                    return;
                }

                // Convert an RTF raw string to a view document fragment.
                const viewContent = convertRtfStringToView(rtfContent);

                // Pass the view fragment to the default clipboard input handler
                // to allow further processing of the content.
                data.content = viewContent;
            });
        })
        .catch(error => {
            console.error(error.stack);
        });
}
function full(e) {
    return BuildEditor.create(this.element, {
        language: {
            textPartLanguage: [
                { title: 'French', languageCode: 'fr' },
                { title: 'Anglais', languageCode: 'en' }
            ]
        },
        simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: "/upload/" + e.uploadValue,
            // Enable the XMLHttpRequest.withCredentials property if required.
            withCredentials: false,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
                "X-CSRF-TOKEN": "CSFR-Token",
                Authorization: "Bearer [JSON Web Token]"
            },
        },
    })
        .then(editor => {
            editor.setData(e.element.value)
            // editor.editing.view.document.on('clipboardInput', (evt, data) => {
            //     data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
            // });
            editor.model.document.on('change:data', () => {
                e.element.value = editor.getData();//.replace(/<p>+/, "").replace(/<\/p>+$/, "");
            });
            toolbar(editor)
        })
        .catch(error => {
            console.error(error.stack);
        });

}
function toolbar(editor) {
    if (editor.sourceElement.getAttribute('classEditor')) {
        var toolbarfixed = document.createElement('div')
        toolbarfixed.classList.add(editor.sourceElement.getAttribute('classEditor'))
        toolbarfixed.appendChild(editor.ui.view.toolbar.element)
        document.body.appendChild(toolbarfixed)
        document.body.classList.add('pb-5')
        var sub = document.createElement('button')
        sub.type = "submit"
        sub.classList.add('btn', 'btn-primary', 'mt-5', 'fixed-top', 'w-25', 'ms-auto')
        sub.textContent = "Envoyer"
        document.getElementsByTagName('form')[0].appendChild(sub)

    }
}

