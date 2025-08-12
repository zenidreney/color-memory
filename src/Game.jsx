import { useState, useEffect, useRef } from "react";
import Color from "./Color";
import { nanoid } from "nanoid";

const baseColors = ["lightblue", "red", "darkblue", "salmon", "lightgreen", "pink", "darkviolet", "khaki"];

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
    const buttonRef = useRef(null);

    /*End Game Logic*/
    const gameWon =
        colorsArray.every(function (color) {
            return color.isHeld === true;
        }) &&
        colorsArray.every(function (color) {
            return color.colorValue === colorsArray[0].colorValue;
        });

    const heldColor = colorsArray
        .filter(function (color) {
            return color.isHeld;
        })
        .map(function (color) {
            return color.colorValue;
        });

    const gameLost = heldColor.some(function (color) {
        if (heldColor.length > 1) {
            return color !== heldColor[0];
        } else return;
    });

    //console.log(heldColor, heldColor[0], gameLost);

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
            if (gameWon || gameLost) {
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
                          isHeld: true // I kept it this boolean so there is no way to re-toggle as this is a memory game
                      }
                    : color;
            })
        );
    }

    /*Return the Focus on new game for accessability*/

    useEffect(
        function () {
            if (gameWon || gameLost) {
                buttonRef.current.focus();
            }
        },
        [gameWon, gameLost]
    );

    /*Components and HTML*/

    const colorBtns = colorsArray.map((color) => (
        <Color
            key={color.id}
            id={color.id}
            color={color.colorValue}
            isHeld={color.isHeld}
            hold={() => holdColor(color.id)}
        />
    ));

    return (
        <article>
            <h2>Choose the same colors</h2>
            <h3>Pick a color to start the game</h3>
            <p>Click on a color below and push the Mix Colors button. Choose the same color until no pads are left.</p>
            <div className="result">
                {gameWon && <p aria-live="polite">Game Won</p>}
                {gameLost && <p aria-live="polite">Game Lost</p>}
            </div>
            <button ref={buttonRef} className="mix-button" onClick={mixColors}>
                {gameWon || gameLost ? "New Game" : "Mix Colors"}
            </button>
            <div className="color-container">{colorBtns}</div>
        </article>
    );
}

export default Game;
