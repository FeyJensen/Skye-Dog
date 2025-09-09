import { useRef } from 'react';
import { PhaserGame } from './PhaserGame';

function App() {
    const phaserRef = useRef();

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        // You can handle scene changes here if needed
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    );
}

export default App;