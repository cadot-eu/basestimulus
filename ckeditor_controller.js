import { Controller } from '@hotwired/stimulus'
import BuildEditor from '/assets/ckeditor/build/ckeditor';
const { filetemplates } = require('/assets/simpleBoxTemplates.js').default;
let templates = JSON.parse(filetemplates);
let liipFilters;
let liipItems;

/* ---------------- transformation des textareas en fckeditor --------------- */

export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */
    // for choice template of toolbar

    static values = {
        toolbar: String,
        upload: { type: String, default: 'simpleimage' }
    }


    async connect() {
        // const response = await fetch('/admin/getLiipFilters');
        // const data = await response.json();
        // let tablo = [];
        // let tabloitem = [];
        // data.forEach(element => {
        //     if (!Number.isInteger(element) && element !== 'cache' && element !== 'label') {
        //         tablo.push({ name: element, title: element, label: element, className: element, modelElements: ['imageBlock'] });
        //         tabloitem.push('imageStyle:' + element);
        //     }
        // });
        // liipFilters = tablo;
        // liipItems = tabloitem;
        let tablo = [{
            name: 'resizeImage:original',
            value: null,
            label: 'Original'
        },];
        const data = ['carousel', 'bandeaufixe', 'petitbanderole', 'hd', 'moyencarree', 'petitcarree', 'minicarree', 'icone'];
        data.forEach(element => {
            if (!Number.isInteger(element) && element !== 'cache') {
                tablo.push({ name: element, value: element, label: element });
            }
        });
        liipFilters = tablo;

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
            mediaEmbed: { previewsInData: true },
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
                    // 'simpleBox',
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
            // simpleBox: {
            //     templates: templates,
            //     debug: "true"
            // },
            simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl: "/upload/" + e.uploadValue,
                // Enable the XMLHttpRequest.withCredentials property if required.
                withCredentials: true,

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
            image: {
                resizeOptions: liipFilters
                ,
                toolbar: ['imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'toggleImageCaption', 'imageStyle:linkImage', 'resizeImage'],
                styles: ['full', 'alignLeft', 'alignCenter', 'alignRight', 'toggleImageCaption', 'linkImage']
            }
            // styles: {
            //     // Defining custom styling options for the images.
            //     options: liipFilters
            //     //[{ "name": "carousel", "title": "carousel", "label": "carousel", "className": "carousel", "modelElements": ["imageInline"] },

            // },
            // toolbar: [{
            //     // Grouping the buttons for the icon-like image styling
            //     // into one drop-down.
            //     name: 'imageStyle:icons',
            //     label: 'Icons',
            //     items: liipItems,
            //     defaultItem: liipItems[0]
            // }
            //]
        },
        // image: {
        //     // resizeOptions: liipFilters
        //     // ,
        //     toolbar: [{
        //         // Grouping the buttons for the icon-like image styling
        //         // into one drop-down.
        //         name: 'imageStyle:icons',
        //         items: [liipItems],
        //         defaultItem: 'imageStyle:margin-left'
        //     }, '|', 'toggleImageCaption', 'linkImage'
        //     ],
        //     //toolbar: ['imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'toggleImageCaption', 'imageStyle:linkImage', 'resizeImage'],
        //     styles: { options: liipFilters }   //['full', 'alignLeft', 'alignCenter', 'alignRight', 'toggleImageCaption', 'linkImage']
        // },
        //}
    )
        .then(editor => {
            editor.setData(e.element.value)
            editor.model.document.on('change:data', (evt, data) => {
                e.element.value = editor.getData();
                //on remet les images en grande taille
                e.element.value = editor.getData().replace(/\media\/cache\/resolve\//g, 'media/cache/1920/');
                //.replace(/<p>+/, "").replace(/<\/p>+$/, "");
            });
            editor.plugins.get('FileRepository').loaders.on('add', (evt, loader) => {
                let barre = "<div id='progressUploadBar' class='progressWrapper fixed-top' style='z-index:100000;float: left; height:.3rem;width: 100%'><div id='progressUpload' class='progress' style='float: left; width: 0%; background-color: yellow'></div><div id='progressUploadText' class='progressText' style='float: left;></div></div>";
                let elem = document.createElement('div');
                elem.innerHTML = barre;
                document.body.appendChild(elem);
                loader.on('change:uploadedPercent', (evt, name, uploadedPercent) => {
                    document.getElementById('progressUpload').style.width = uploadedPercent + '%';
                    if (uploadedPercent == 100) {
                        document.getElementById('progressUploadBar').remove()
                    }
                });

                loader.on('change:status', (evt, name, status) => {
                    console.log(`Upload status: ${status}`);
                });
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
            editor.plugins.get('ImageResizeHandles').set('isEnabled', false);
            editor.commands.get('resizeImage').on('execute', (evt, loader) => {
                // console.log(evt)
                if (loader[0].width !== undefined) {
                    let width = loader[0].width.slice(0, -1);
                    if (isNaN(width)) {
                        let poswidth = editor.getData().indexOf('width:' + width + '%');
                        let possrc = editor.getData().indexOf('src="', poswidth);
                        let finsrc = editor.getData().indexOf('"', possrc + 5);
                        let src = editor.getData().slice(possrc, finsrc);
                        //on test si on est dans le cas d'une image liip
                        // <img class="image_resized" style="" src="http://localhost/media/cache/resolve/petitcarree/uploads/article/image_6380c7030fcc5.png" alt="image:image"></img>
                        if (src.indexOf('media/cache/') !== -1) {
                            let effect = src.split('/media/cache/')[1].split('/')[0];
                            if (effect == 'resolve') {
                                editor.setData(editor.getData().replace(src, src.replace(src.split('/media/cache/resolve/')[1].split('/')[0], width)));
                            }
                            else {
                                editor.setData(editor.getData().replace(src, src.replace(effect, width).replace('cache/', 'cache/resolve/')));
                            }
                        }
                        else {
                            editor.setData(editor.getData().replace(src, src.replace('src="', 'src="/media/cache/resolve/' + width)));
                        }
                    }
                }
            }
            );

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
        //mise en bas de la barre d'outil
        let toolbarfixed = document.createElement('div')
        toolbarfixed.classList.add(editor.sourceElement.getAttribute('classEditor'))
        toolbarfixed.appendChild(editor.ui.view.toolbar.element)
        toolbarfixed.classList.add('mb-5', 'pb-1')
        document.body.appendChild(toolbarfixed)
        document.body.classList.add('pb-5', 'mb-5')
        // création d'un bouton envoyer'
        let sub = document.createElement('button')
        sub.type = "submit"
        sub.classList.add('btn', 'btn-primary')
        sub.textContent = "Envoyer"
        sub.addEventListener('click', function (e) {
            document.getElementsByTagName('form')[0].submit()
        })
        //on affiche la navbar de tools
        document.getElementById('navtools').classList.remove('d-none')
        document.getElementById('navtools').appendChild(sub)

    }
}


