import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import createVideoPlugin from "@draft-js-plugins/video";
const videoPlugin = createVideoPlugin();
const { types  } = videoPlugin;
// import {VIDEOTYPE} from "@draft-js-plugins/video/lib/video/constants"; //NOT WORK ??
// import { ENTITY_TYPE } from 'draft-js';


export  const BlockType= {
    /* Заголовки */
        h1 : 'header-one',
        h2 : 'header-two',
        h3 : 'header-three',
        h4 : 'header-four',
        h5 : 'header-five',
        h6 : 'header-six',
        /* Цитата */
        blockquote : 'blockquote',
        /* Блок с кодом */
        code : 'code-block',
        /* Список */
        list : 'unordered-list-item',
        /* Нумерованный список */
        orderList : 'ordered-list-item',
        /* Сноска */
        cite : 'cite',
        atomic : "atomic",
       default : 'unstyled'
}
export const  EntityType ={
    link: 'link',
    photo:'image',
    video:types.VIDEOTYPE
    // photo:'photo',

}
//
const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
        [BlockType.cite]: {
                element: 'cite',
        },
})
export  const InlineStyle = {
            BOLD : 'BOLD',
            ITALIC : 'ITALIC',
            UNDERLINE : 'UNDERLINE',
            ACCENT : 'ACCENT' // код нашего произвольного стиля
}
export const CUSTOM_STYLE_MAP = {
    [InlineStyle.ACCENT]: {
        backgroundColor: '#F7F6F3',
        color: '#A41E68',
    },
};

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(CUSTOM_BLOCK_RENDER_MAP);