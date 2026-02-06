import { useRef } from 'react';
import { PhaserGame } from './PhaserGame';

function App() {
    const phaserRef = useRef();


    const currentScene = (scene) => {
        
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    );
}

export default App;