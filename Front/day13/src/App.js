import React, { useState, useEffect } from 'react';
// CSS는 App.css 파일을 만들어 스타일 적용 후 App.js에서 import하면 된다.

function Menu(props) {
    const [menuItems, setMenuItems] = useState(['HOME', 'PROFILE', 'GALLERY', 'LECTURE', 'GUEST']);
    return (
        <>
            <ul className="menu">
                {menuItems.map((item, i) => {
                    return <li key="i">item</li>;
                })}
            </ul>
        </>
    );
}

function App() {
    return (
        <>
            <h1>Comstudy SW Schools</h1>
            <Menu></Menu>
        </>
    );
}

export default App;
