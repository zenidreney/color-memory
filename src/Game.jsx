import { useState } from "react";
import Color from "./Color";
import { nanoid } from "nanoid";

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

    //console.log(colorsArray[0].colorValue)
    const gameWon =
        colorsArray.every(function (color) {
            return color.isHeld === true;
        }) &&
        colorsArray.every(function (color) {
            return color.colorValue === colorsArray[0].colorValue;
        });

    //console.log(gameWon)

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
                    colorValue: randomColor
                };
            } else {
                return color;
            }
        });

        setColorsArray(() => {
            if (gameWon) {
               return baseColors.map((color) => {
                    return {
                        id: nanoid(),
                        colorValue: color,
                        isHeld: false
                    };
                });
            } else {
                return mixedColors;
            }
        });
    }

    function holdColor(id) {
        setColorsArray((prev) =>
            prev.map(function (color) {
                return color.id === id
                    ? {
                          ...color,
                          isHeld: true // I kept it this way so there is no way to re-toggle as this is a memory game
                      }
                    : color;
            })
        );
    }

    return (
        <article>
            <h2>Choose the same colors</h2>
            {gameWon && <p aria-live="polite">Game Won</p>}

            <div className="color-container">{colorBtns}</div>

            <button className="mix-button" onClick={mixColors}>
                {gameWon ? "New Game" : "Mix Colors"}
            </button>
        </article>
    );
}

export default Game;
