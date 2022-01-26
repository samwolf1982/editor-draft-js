import {AtomicBlockUtils, CompositeDecorator, EditorState, RichUtils} from 'draft-js';
import * as React from 'react';
import {BlockType, EntityType} from "./config";
import LinkDecorator from "./decorators/LinkDecorator";
// import createVideoPlugin from "@draft-js-plugins/video";
import {
    // DraftailEditor,
    // createEditorStateFromRaw,
    serialiseEditorStateToRaw
} from "draftail";
import {useCallback, useState} from "react";
export const EditorApi = {
    state: EditorState,
    onChange: state => state,
    toggleBlockType: blockType => blockType,
    currentBlockType: BlockType,
    toggleInlineStyle: inlineStyle => inlineStyle,
    hasInlineStyle: inlineStyle => inlineStyle,
}

/* Объединям декораторы в один */
const decorator = new CompositeDecorator([LinkDecorator]);

export const useEditor = (initJsonState) => {
    const [state, setState] = React.useState(EditorState.createEmpty(decorator));
    // const [state, setState] = React.useState(EditorState.createEmpty());


    // console.log('state:',state)
    console.log('state:',JSON.stringify(serialiseEditorStateToRaw(state), 0, 2))
    // console.log('state:',JSON.stringify((state), 0, 2))

    // тип блока start
    // toggleBlockType — функция переключения ТИПА блока; смена стейта
    const toggleBlockType = React.useCallback((blockType) => {
        setState((currentState) => RichUtils.toggleBlockType(currentState, blockType))
    }, []);
    // currentBlockType — переменная со значением текущего типа блока, с помощью которой можно будет добавить элементу активное состояние.
    const currentBlockType = React.useMemo(() => {
    // const currentBlockType = React.useCallback(() => {
        /* Шаг 1 */
        const selection = state.getSelection();
        /* Шаг 2 */
        const content = state.getCurrentContent();
        /* Шаг 3 */
        const block = content.getBlockForKey(selection.getStartKey());
        /* Шаг 4 */
        return block.getType();
    }, [state]);
    // тип блока end


    // примененный стиль start
    // toggleInlineStyle — функция включения/выключения inline-cтиля;
    const toggleInlineStyle = React.useCallback((inlineStyle) => {
        setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle))
    }, []);

    // hasInlineStyle — функция, которая укажет, применен ли конкретный стиль для выделенного текста.
    const hasInlineStyle = React.useCallback((inlineStyle) => {
        /* Получаем иммутабельный Set с ключами стилей */
        const currentStyle = state.getCurrentInlineStyle();
        /* Проверяем содержится ли там переданный стиль */
        return currentStyle.has(inlineStyle);
    }, [state]);
    // примененный стиль end




    //функция для добавления и перезаписи ENTITIES start
    // const addEntity = React.useCallback((entityType: EntityType, data: Record<string, string>, mutability: DraftEntityMutability) => {
    const addEntity = React.useCallback((entityType, data, mutability) => {
        setState((currentState) => {
            /* Получаем текущий контент */
            const contentState = currentState.getCurrentContent();
            /* Создаем Entity с данными */
            const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
            /* Получаем уникальный ключ Entity */
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            /* Обьединяем текущее состояние с новым */
            const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
            /* Вставляем ссылку в указанное место */
            return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
        })
    }, [])

    const setEntityData = React.useCallback((entityKey, data) => {
        // debugger
        setState((currentState) => {
            /* Получаем текущий контент */
            const content = currentState.getCurrentContent();
            /* Объединяем текущие данные Entity с новыми */
            const contentStateUpdated = content.mergeEntityData(
                entityKey,
                data,
            )
            // debugger
            /* Обновляем состояние редактора с указанием типа изменения */
            return EditorState.push(currentState, contentStateUpdated, 'apply-entity');
        })
    }, []);
    //функция для добавления и перезаписи ENTITIES end


    // mentions упоминания об пользователе start
    const [isMentionOpen, setEsMentionOpen] = useState(false);
    const onOpenMentionChange = useCallback((_open) => {
        setEsMentionOpen(_open);
    }, []);
    const [suggestionsList, setSuggestionsList] = useState([  {
        id:1,
        name: 'Matthew Russell',
        link: 'https://twitter.com/mrussell247',
        avatar:
            'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
        {
            id:2,
            name: 'Julian Krispel-Samsel',
            link: 'https://twitter.com/juliandoesstuff',
            avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
        },
        {
            id:3,
            name: 'Jyoti Puri',
            link: 'https://twitter.com/jyopur',
            avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
        },
        {
            id:4,
            name: 'Max Stoiber',
            link: 'https://twitter.com/mxstbr',
            avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
        },
        {
            id:5,
            name: 'Nik Graf',
            link: 'https://twitter.com/nikgraf',
            avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
        },
        {
            id:6,
            name: 'Pascal Brandt',
            link: 'https://twitter.com/psbrandt',
            avatar:
                'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
        },]);
    const onSuggestionsSearchChange = useCallback(({ value }) => {
        // An import statment would break server-side rendering.
        // require('whatwg-fetch'); // eslint-disable-line global-require

        // while you normally would have a dynamic server that takes the value as
        // a workaround we use this workaround to show different results
        let url = '/data/mentionsA.json';
        if (value.length === 1) {
            url = '/data/mentionsB.json';
        } else if (value.length > 1) {
            url = '/data/mentionsC.json';
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSuggestionsList(data);
            });
    }, []);

    const addMentionCallback1=(data)=>{

    }
    const addMentionCallback=React.useCallback(data=>{
            // debugger
    },[])
    // mentions упоминания об пользователе end


    const addAtomicBlock= React.useCallback((entityType, data, mutability) => {
        setState((currentState) => {
            /* Получаем текущий контент */
            const contentState = currentState.getCurrentContent();
            /* Создаем Entity с данными */
            const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
            /* Получаем уникальный ключ Entity */
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            /* Обьединяем текущее состояние с новым */
            const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
            /* Вставляем ссылку в указанное место */
            const newEditorState = AtomicBlockUtils.insertAtomicBlock(
                newState,
                entityKey,
                ' '
            );
            return newEditorState

            /* Получаем уникальный ключ Entity */
            //  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            //  // debugger
            // /* Обьединяем текущее состояние с новым */
            // const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
            // return  newState
            // const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            //     editorState,
            //     entityKey,
            //     ' '
            // );
            // return newEditorState
            // return AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' ');
            // return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
        })
    }, [])



//////////////свой набор добавлений  Entity имеет три режима привязки к тексту:
    // MUTABLE — текст может быть изменен
    // IMMUTABLE — при изменении текста Entity будет удален
    // SEGMENTED — работает так же как IMMUTABLE, с той лишь разницей, что, если текст состоит из нескольких слов, то при удалении символа, удаляется слово, но оставшиеся слова остаются привязанными к Entity. (Пример: "Маша мы|ла раму" → [backspace] → "Маша раму")
    const addLink = React.useCallback((url) => {
         addEntity(EntityType.link, { url }, 'MUTABLE')
    }, [addEntity]);

    const addImage = React.useCallback((src) => {
        addAtomicBlock(EntityType.photo, { "src":src }, 'IMMUTABLE')

    }, [addAtomicBlock]);
    const addVideo = React.useCallback((src) => {
        // const videoPlugin = createVideoPlugin();
        // const { types } = videoPlugin;
        // debugger
        addAtomicBlock(EntityType.video, { "src":src }, 'IMMUTABLE')
        // addEntity(EntityType.photo, { src }, 'MUTABLE')
    }, [addAtomicBlock]);


    return React.useMemo(() => ({
        state,
        onChange: setState,


        toggleBlockType,
        currentBlockType,

        toggleInlineStyle,
        hasInlineStyle,

        addEntity,
        setEntityData,

        //mentions status
        isMentionOpen,
        // setEsMentionOpen,
        suggestionsList,
        onSuggestionsSearchChange,
        onOpenMentionChange,
        addMentionCallback,
        addMentionCallback1,

        addLink,
        addImage,
        addVideo,


    }), [state])
}