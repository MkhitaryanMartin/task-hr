import React from 'react';
import "./style.scss"

const Menu = ({
    items,
    isVisible,
    handleVisible
}) => {
    return (
        <div className={isVisible ? "menu-container-active" : ""} >
            <ul className={isVisible ? "menu-block-active" : "menu-block"} onMouseEnter={(e) => {
                e.stopPropagation()
                handleVisible(true)
            }}
                onMouseLeave={(e) => {
                    e.stopPropagation()
                    handleVisible(false)
                }}
            >
                {
                    items && items.map((item) => {
                        return <li key={item.imgUrl}>
                            <img src={item.imgUrl} alt='icon' />
                            {
                                isVisible ? <span>{item.title}</span> : null
                            }
                        </li>
                    })
                }
            </ul>

        </div>
    );
};

export default Menu;