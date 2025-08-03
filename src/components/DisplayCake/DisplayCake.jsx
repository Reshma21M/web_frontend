import React, { useContext } from "react";
import './DisplayCake.css';
import CakeItem from "../CakeItem/CakeItem";
import { StoreContext } from "../../context/StoreContext";

const DisplayCake = ({ category }) => {
    const { cake_list } = useContext(StoreContext);

    return (
        <div className="display-cake" id="display-cake">
            <h2>Popular Cake Creations</h2>
            <div className="display-cake-list">
                {cake_list
                    .filter(item => category === "All" || category === item.category) // Filter first
                    .map((item) => (
                        <CakeItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
            </div>
        </div>
    );
};

export default DisplayCake;
