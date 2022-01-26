import React from 'react';
import {useEditorApi} from "../context";

const ButtonAddImage = props => {
    const {addImage} = useEditorApi();
    const handlerAddImage = () => {
        const img = prompt('IMG:');
        if (img) {
            addImage(img);
        }
    }
    return (
        <button onClick={handlerAddImage}>
            Добавить картинку
        </button>
    );
};

ButtonAddImage.propTypes = {

};

export default ButtonAddImage;