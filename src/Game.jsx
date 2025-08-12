import { useState } from "react";
import Color from "./Color";
import { nanoid } from "nanoid";

console.log(nanoid())

const baseColors = ["blue", "red", "black", "white", "green", "pink", "darkviolet", "khaki"];

function Game() {
    const [colorsArray, setColorsArray] = useState(() =>
        baseColors.map((color) => {
            return {
                id: nanoid(),
                colorValue: color,
                isHeld: false
            };
        })
    );

    //console.log(colorsArray)

    const colorBtns = colorsArray.map((color) => (
        <Color
            key={color.id}
            id={color.id}
            color={color.colorValue}
            isHeld={color.isHeld}
            hold={() => holdColor(color.id)}
        />
    ));

    function mixColors() {
        const mixedColors = colorsArray.map((color) => {
            const rI = Math.floor(Math.random() * baseColors.length);
            const randomColor = baseColors[rI];

            if (color.isHeld === false) {
                return {
                    ...color,
                    colorValue: randomColor,
                };
            } else {
                return color
            }
        });

        setColorsArray(mixedColors);
    }

    function holdColor(id) {
        setColorsArray((prev) =>
            prev.map(function (color) {
                return color.id === id
                    ? {
                          ...color,
                          isHeld: true
                      }
                    : color;
            })
        );
    }

    return (
        <article>
            <h2>Choose the same colors</h2>

            <div className="color-container">{colorBtns}</div>

            <button className="mix-button" onClick={mixColors}>
                Mix Colors
            </button>
        </article>
    );
}

export default Game;