import * as React from 'react';
// import { Editor } from 'draft-js';
// import { useEditorApi } from './context';
import cn from 'clsx';
// https://www.draft-js-plugins.com/plugin/image !!!
import {useEditorApi} from "./context";
// import Editor from '@draft-js-plugins/editor';

// import { convertFromRaw, EditorState } from 'draft-js';

import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createVideoPlugin from '@draft-js-plugins/video';
import createImagePlugin from '@draft-js-plugins/image';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createHashtagPlugin from '@draft-js-plugins/hashtag';

import createMentionPlugin from '@draft-js-plugins/mention';
import createAlignmentPlugin from '@draft-js-plugins/alignment';

// import mentions from '@draft-js-plugins/mention';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
} from '@draft-js-plugins/buttons';

// import createAlignmentPlugin from '@draft-js-plugins/alignment';

import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import {BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP} from "./config";
import {useCallback, useMemo, useRef, useState} from "react";


// import styles
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '@draft-js-plugins/side-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import {useEditor} from "./useEditor";
import ButtonAddImage from "./interactiveElements/ButtonAddImage";
import ButtonSlideSidebar from "./interactiveElements/ButtonSlideSidebar";
import ToolPanel from "./ToolPanel";


const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [BoldButton, ItalicButton, UnderlineButton, linkPlugin.LinkButton],
});

const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
// const sideToolbarPlugin = createSideToolbarPlugin({position:'left'});
// const sideToolbarPlugin = createSideToolbarPlugin(
//     {position:'left',structure: [BoldButton, ItalicButton, UnderlineButton, linkPlugin.LinkButton],}
// );
const { InlineToolbar } = inlineToolbarPlugin;
// const { SideToolbar } = sideToolbarPlugin;


const sideToolbarPlugin = createSideToolbarPlugin({
    // кнопка леввое сайд  меню всплавашка
    sideToolbarButtonComponent:()=><ButtonSlideSidebar/>,
        // theme:{
        //     buttonStyles:"bsClass",
        //     toolbarStyles:"bsToolClass",
        //     blockTypeSelectStyles:"bsTypeClass",
        // }
}
);
const { SideToolbar } = sideToolbarPlugin;


const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

// const plugins = [sideToolbarPlugin];


// import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';

// import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
// import editorStyles from './editorStyles.module.css';
// import mockUpload from './mockUpload';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const videoPlugin = createVideoPlugin();

const { types } = videoPlugin;

// const blockDndPlugin = createBlockDndPlugin();
// const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    // alignmentPlugin.decorator,
    focusPlugin.decorator,
    // blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });
const hashtagPlugin = createHashtagPlugin();

// import createImagePlugin from '@draft-js-plugins/image';
// import createResizeablePlugin from '@draft-js-plugins/resizeable';
// import createFocusPlugin from '@draft-js-plugins/focus';
//
// import {BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP} from "./config";
// import {CompositeDecorator} from "draft-js";
// import composeDecorators from "@draft-js-plugins/editor";
//
// // import createFocusPlugin from "draft-js-focus-plugin";
// // import useEditor from "./useEditor";g
// // import './TextEditor.scss';
// // const imagePlugin = createImagePlugin();
// const resizeablePlugin = createResizeablePlugin();
// const focusPlugin = createFocusPlugin();
// export type TextEditorProps = {
//     className?: string;
// }
// const focusPlugin = createFocusPlugin();

// const decorator = composeDecorators(
//     resizeablePlugin.decorator,
//     focusPlugin.decorator
// );

/* Объединям декораторы в один */
// const decorator = composeDecorators(
//     resizeablePlugin.decorator,
//     // alignmentPlugin.decorator,
//     focusPlugin.decorator,
//     // blockDndPlugin.decorator
// );
//
const mentionPlugin = createMentionPlugin();
// eslint-disable-next-line no-shadow
const { MentionSuggestions } = mentionPlugin;
// eslint-disable-next-line no-shadow
// const plugins = [mentionPlugin];


// const imagePlugin = createImagePlugin({ decorator });

const pluginsList = [
    imagePlugin, focusPlugin, resizeablePlugin,
    videoPlugin,
    // SideToolbar,
    inlineToolbarPlugin,
    linkPlugin,
    sideToolbarPlugin,
    emojiPlugin,
    hashtagPlugin,

    mentionPlugin,

    alignmentPlugin,
];

const TextEditor= ({ className }) => {
    // возврат контекста
    const { state, onChange,    isMentionOpen,
        onOpenMentionChange,suggestionsList,onSuggestionsSearchChange,
        addMentionCallback } = useEditorApi();
    const editorRef=useRef(null);


    return (
        <div className={cn("text-editor", className)}>
            <ToolPanel emojiSuggestions={<EmojiSuggestions />} emojiSelect={ <EmojiSelect />}  />
            <Editor
                customStyleMap={CUSTOM_STYLE_MAP}
                blockRenderMap={BLOCK_RENDER_MAP}
                placeholder="Введите ваш текст"
                editorState={state}
                onChange={onChange}
                plugins={pluginsList}
                ref={(editor) => (editorRef.current = editor)}


                // open={open}
                // onOpenChange={onOpenChange}
                // suggestions={suggestions}
                // onSearchChange={onSearchChange}
                // onAddMention={() => {
                //     // get the mention object selected
                // }}
                // editorKey={'editor'}
            />

            <InlineToolbar>
                {
                    // may be use React.Fragment instead of div to improve perfomance after React 16
                    (externalProps) => (
                        <div>
                            <BoldButton {...externalProps} />
                            <ItalicButton {...externalProps} />
                            <UnderlineButton {...externalProps} />
                            <linkPlugin.LinkButton {...externalProps} />
                            <EmojiSuggestions />
                            <EmojiSelect />

                        </div>
                    )
                }
            </InlineToolbar>
            <SideToolbar  >
                    {
                    // may be use React.Fragment instead of div to improve perfomance after React 16
                    (externalProps) => {
                        // console.log("externalProps",externalProps)
                        return(    <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <linkPlugin.LinkButton {...externalProps} />
                                <ButtonAddImage  {...externalProps} />
                                <EmojiSuggestions />
                                <EmojiSelect />

                            </div>
                        )
                    }

                    }
            </SideToolbar>

            <MentionSuggestions
                open={isMentionOpen}
                onOpenChange={onOpenMentionChange}
                suggestions={suggestionsList}
                onSearchChange={onSuggestionsSearchChange}
                onAddMention={addMentionCallback}
            />
        </div>
    );
}








export default TextEditor;