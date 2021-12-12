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
        console.log("SCC called with: " + Year);
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

        
    }

    changeMap = () => {
        console.log("in changeMap");
        this.setState({});
        /*
        if (document.getElementById("myInput") === null){
            console.log("in null case");
            return this.statesCustomConfig(1975, 1);
        }
        console.log("made it past if statement");
        var input = document.getElementById("myInput").value;
        var year = parseInt(input);
        return this.statesCustomConfig(year, 1);
        */
        
        /*
        var input = document.getElementById("myInput").value;
        var year = parseInt(input);
        var div = document.getElementById("root");
        var innerDiv = div.childNodes[0];
        var innerinnerDiv = innerDiv.childNodes[3];
        var map = innerinnerDiv.childNodes[0];
        console.log(map);
        */
        
    }


    render() {
        var input = document.getElementById("myInput");
        var year;
        if (input === null){
            year = 1975;
        }
        else {
            var inputString = input.value;
            year = parseInt(inputString);
        }
        return (
            <div>
                <input type="text" id="myInput"/>
                <button type="button" onClick={() => this.changeMap()}>submit</button>
                <div className="App">
                    <USAMap
                        customize={this.statesCustomConfig(year, 1)}
                        onClick={this.mapHandler}
                    />
               
                </div>
            </div>
        );
    }
}

export default App;
