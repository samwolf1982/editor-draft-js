
import './App.css';
import {TextEditorProvider} from "./components/editor/context";
import ToolPanel from "./components/editor/ToolPanel";
import TextEditor from "./components/editor/TextEditor";


function App() {
    console.log('ddddd')
  return (
    <div className="App">
        <p>Editor</p>
        <TextEditorProvider >

            {/*<ToolPanel />*/}

            <TextEditor />

        </TextEditorProvider>
    </div>
  );
}

export default App;
