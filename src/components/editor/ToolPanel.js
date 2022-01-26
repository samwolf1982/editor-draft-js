import * as React from 'react';
// import { EditorApi } from '../useEditor';
import cn from "clsx";
import {BlockType, InlineStyle} from "./config";
import {useEditorApi} from "./context";
import ButtonAddImage from "./interactiveElements/ButtonAddImage";
// import {useEditorApi} from "./context";
// import {InlineStyle} from "./config";
// import useEditor from "./useEditor";
// import {useEditorApi} from "./context";
const INLINE_STYLES_CODES = Object.values(InlineStyle);
const INLINE_TYPE_CODES = Object.values(BlockType);

const ToolPanel = ({ className,emojiSuggestions,emojiSelect } ) => {

    const { toggleInlineStyle, hasInlineStyle,toggleBlockType,currentBlockType,
        addLink,addImage,addVideo
    } = useEditorApi();
    // const { addLink,addImage,addVideo } = useEditorApi();

    // const { toggleInlineStyle, hasInlineStyle } = useEditor();
    // const { toggleInlineStyle, hasInlineStyle } = useEditorApi();
    // const { addLink } = useEditor();

    const handlerAddLink = () => {
        const url = prompt('URL:');
        if (url) {
            addLink(url);
        }
    }
    const handlerAddImage = () => {
       const img = prompt('IMG:');
        if (img) {
            addImage(img);
        }
    }
    const handlerVideoLink = () => {
        const url = prompt('URL:');
        if (url) {
            addVideo(url);
        }
    }

    return (
        <div className={cn('tool-panel', className)}>
            {/* Здесь будет код для элементов управления */}
            <p>Panel instruments</p>
            {INLINE_TYPE_CODES.map((code,key) => {
                const onMouseDown = (e) => {
                    e.preventDefault();
                    toggleBlockType(code);
                };

                return (
                    <button
                        key={code}
                        className={cn(
                            "tool-panel__item",
                            //todo не рабоатает нужно изучить
                            // currentBlockType(code) && "tool-panel__item_active"
                        )}
                        onMouseDown={onMouseDown}
                    >
                        {code}
                    </button>

                );
            })}


            {INLINE_STYLES_CODES.map((code) => {
                const onMouseDown = (e) => {
                    e.preventDefault();
                    toggleInlineStyle(code);
                };

                return (
                    <button
                        key={code}
                        className={cn(
                            "tool-panel__item",
                            hasInlineStyle(code) && "tool-panel__item_active"
                        )}
                        onMouseDown={onMouseDown}
                    >
                        {code}
                    </button>

                );
            })}
            <button onClick={handlerAddLink}>
                Добавить ссылку
            </button>
            <ButtonAddImage/>
            {/*<button onClick={handlerAddImage}>*/}
            {/*    Добавить картинку*/}
            {/*</button>*/}
            <button onClick={handlerVideoLink}>
                Добавить video
            </button>
            {emojiSuggestions}
            {emojiSelect}

        </div>
    );
}

export default ToolPanel;