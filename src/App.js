import React, { Component } from "react";
import "./App.css"; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";

class App extends Component {
    /* mandatory */
    mapHandler = (event) => {
        alert(event.target.dataset.name);
    };

    /* optional customization of filling per state and calling custom callbacks per state */
    statesCustomConfig = () => {
        return {
            NJ: {
                fill: "navy",
                clickHandler: (event) =>
                    console.log("Custom handler for NJ", event.target.dataset),
            },
            NY: {
                fill: "#CC0000",
            },
        };
    };

    render() {
        return (
            <div className="App">
                <USAMap
                    customize={this.statesCustomConfig()}
                    onClick={this.mapHandler}
                />
            </div>
        );
    }
}

export default App;
