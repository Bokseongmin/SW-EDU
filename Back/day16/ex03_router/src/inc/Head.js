import React, { useState, useEffect } from 'react';

function Header(props) {
    return (
        <>
            <h3>
                <p>
                    <a href="/">Home</a> |
                    <a href="/profile">Profile</a> |
                    <a href="/gallery">Gallery</a> |
                    <a href="/lecture">Lecture</a> |
                    <a href="/contact">Contact</a> |
                </p>
            </h3>
            <hr />
        </>
    )
}

export default Header;