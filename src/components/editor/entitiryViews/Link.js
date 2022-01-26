import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ContentState} from "draft-js";
import {useEditor} from "../useEditor";

const Link = ({ contentState, entityKey, children }) => {
    /* Получаем url с помощью уникального ключа Entity */
    const {setEntityData} =useEditor();
    const { url } = contentState.getEntity(entityKey).getData();

    const handlerClick=()=>{
        const newUrl = prompt('URL:');
        if (newUrl) {
            setEntityData(entityKey,{"url":newUrl});
        }
    }
    return (
        <a key={entityKey} href={url} onClick={handlerClick}>
            {children}
        </a>
    );
};

Link.propTypes = {
    children: React.ReactNode,
    contentState: ContentState,
    entityKey: PropTypes.string.isRequired
};

export default Link;