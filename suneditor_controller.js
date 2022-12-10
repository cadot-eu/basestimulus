import { Controller } from '@hotwired/stimulus'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import fr from 'suneditor/src/lang/fr.js'
<<<<<<< HEAD
const { filetemplates } = require('/assets/js/suneditor/templates.js').default;
=======
const { filetemplates } = require('/assets/jssite/suneditor/templates.js').default;
>>>>>>> eaebe8fb5c8765c8aefa3842bcf8c90a953a3103
let templates = JSON.parse(filetemplates);
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


    connect() {
        console.log(this.toolbarValue)
        const e = this.element;
        let editor;
        const init = suneditor.init({
            lang: fr,
            height: 600,
            iframeCSSFileName: "/build/app.css",
            plugins: plugins,
            imageUploadUrl: "/simplegallery/" + this.uploadValue,
            imageUploadSizeLimit: "5000000",
            imageUploadHeader: null,
            imageAccept: ".jpg, .png, .jpeg, .gif, .bmp, .webp",
            templates: templates,


        })

        if (this.toolbarValue == 'full')
            editor = init.create(this.element.id)
        else if (this.toolbarValue == 'simplelanguage')
            editor = suneditor.create(this.element.id,
                {
                    height: '2rem',
                    buttonList: [
                        ['undo', 'redo', 'textStyle'],
                        ['removeFormat'],
                    ]
                }

            )
        else if (this.toolbarValue == 'normal') {
            editor = init.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo'],
                        ['formatBlock', 'textStyle'],
                        ['paragraphStyle', 'blockquote'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['removeFormat'],
                        // '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                        /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                        ['fullScreen'],//, 'codeView', 'showBlocks'],//, 'showBlocks', 'codeView'
                        ['template'],//'preview',
                        /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                    ],
                    formats: ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', {
                        tag: 'div', // Tag name
                        name: 'page_break' || null, // default: tag name
                        command: 'replace' || 'range' || 'free', // default: "replace"
                        class: '__se__format__replace_page_break' || '__se__format__range_page_break' || '__se__format__free_page_break' || '__se__format__free__closure_page_break',
                        style: 'page-break-after: always;' || null
                    }]
                }

            )
            //<div class="page-break"

            let emt = this.element
            editor.onChange = function (contents, core) {
                emt.value = contents
            }
            setInterval(function () {
                for (let numimage in editor.getFilesInfo('image')) {
                    let image = editor.getFilesInfo('image')[numimage]
                    if ((image.element.dataset.liip !== undefined && image.element.src.split('/uploads/')[1] !== undefined)) {
                        image.element.src = '/media/cache/resolve/' + image.element.dataset.liip + '/uploads/' + image.element.src.split('/uploads/')[1]
                        emt.value = editor.getContents()
                    }
                    if (['hd', 'grand', 'moyen', 'petit', 'mini', 'icone', 'bande', 'bandeaufixe', 'petitbandeau', 'petitbanderole', 'moyencarree', 'petitcarree', 'minicarree'].includes(image.element.alt)) {
                        image.element.src = '/media/cache/resolve/' + image.element.alt + '/uploads/' + image.element.src.split('/uploads/')[1]
                        emt.value = editor.getContents()
                    }
                }
            }
                , 1000)



        }
        else if (this.toolbarValue == 'simple')
            editor = suneditor.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo', 'textStyle'],
                        ['removeFormat'],
                    ]
                }

            )
        else
            editor = suneditor.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo', 'removeFormat']
                    ]
                }

            )
    }

    disconnect() {

    }
}

