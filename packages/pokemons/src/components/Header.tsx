import React from 'react';
export default function Header({ title, onAction }: any) {
    return (
        <header style={{ padding: 12, background: '#eee' }}>
            <h1>{title}</h1>
            <button onClick={onAction}>Do</button>
        </header>
    );
}