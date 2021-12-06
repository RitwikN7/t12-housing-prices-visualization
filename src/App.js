import React, { Component } from "react";
import "./App.css"; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import HPI from "./HPI.json";

class App extends Component {

    findQuintile = (Year) => {
        const HPIData = [];
        for (let i = 0; i < HPI.length; i++) {
            if (HPI[i].Year === Year) {
                HPIData.push(HPI[i].HPI);
            }
        }
        HPIData.sort();
        const Quintiles = [];
        var size = HPIData.length;
        var firstIndex = Math.floor(0.2 * (size + 1))
        var secondIndex = Math.floor(0.4 * (size + 1))
        var thirdIndex = Math.floor(0.6 * (size + 1))
        var fourthIndex = Math.floor(0.8 * (size + 1))

        var first = HPIData[firstIndex];
        var second = HPIData[secondIndex];
        var third = HPIData[thirdIndex];
        var fourth = HPIData[fourthIndex];

        Quintiles[0] = first;
        Quintiles[1] = second;
        Quintiles[2] = third;
        Quintiles[3] = fourth;

        return Quintiles;
        
    }

    findColor = (Quintiles, HPIValue) => {
        var color = "";
        if (HPIValue < Quintiles[0]) {
            color = "#008000";
        }
        else if (HPIValue < Quintiles[1]) {
            color = "#72AA00";
        }
        else if (HPIValue < Quintiles[2]) {
            color = "#C0C000";
        }
        else if (HPIValue < Quintiles[3]) {
            color = "#df7000";
        }
        else {
            color = "#EA0B00";
        }

        return color;

    }

    /* mandatory */
    mapHandler = (event) => {
        alert(event.target.dataset.name);
    };

    /* optional customization of filling per state and calling custom callbacks per state */
    statesCustomConfig = (Year, Quarter) => {
        //alert(HPI[0].State);
        const states = {};
        var Quintiles = this.findQuintile(Year);

        for (let i = 0; i < HPI.length; i++){
            if (HPI[i].Quarter === Quarter && HPI[i].Year === Year) {
                var element = {}
                var color = this.findColor(Quintiles, HPI[i].HPI)
                element.fill = color;
                states[HPI[i].State] = element;
            }

        }
        return states;
            /*NJ: {
                fill: "navy",
                clickHandler: (event) =>
                    console.log("Custom handler for NJ", event.target.dataset),
            },
            NY: {
                fill: "#CC0000",
            },
            */

        
    };

    render() {
        return (
            <div className="App">
                <USAMap
                    customize={this.statesCustomConfig(2000, 4)}
                    onClick={this.mapHandler}
                />
               
            </div>
        );
    }
}

export default App;
