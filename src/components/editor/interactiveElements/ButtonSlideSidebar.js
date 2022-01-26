import React from 'react';
import {useEditorApi} from "../context";

const ButtonSlideSidebar = props => {
    // const {addImage} = useEditorApi();
    // const handlerAddImage = () => {
    //     const img = prompt('IMG:');
    //     if (img) {
    //         addImage(img);
    //     }
    // }
    return (
        <button onClick={(event => event.preventDefault())}>
           Go me
        </button>
    );
};

ButtonSlideSidebar.propTypes = {

};

export default ButtonSlideSidebar;