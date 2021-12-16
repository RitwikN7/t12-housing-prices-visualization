import React, { Component } from "react";
import "./App.css"; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import HPI from "./HPI.json";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { Year: 1975 };
    }
    findQuintile = (Year) => {
        const HPIData = [];
        for (let i = 0; i < HPI.length; i++) {
            if (HPI[i].Year === Year && HPI[i].Quarter === 1) {
                HPIData.push(HPI[i].HPI);
            }
        }
        HPIData.sort(function (a, b) {
            return a - b;
        });
        var lowest = HPIData[1];
        var highest = HPIData[HPIData.length - 1];
        const Quintiles = [];
        var size = HPIData.length;
        var firstIndex = Math.floor(0.2 * (size + 1));
        var secondIndex = Math.floor(0.4 * (size + 1));
        var thirdIndex = Math.floor(0.6 * (size + 1));
        var fourthIndex = Math.floor(0.8 * (size + 1));

        var first = HPIData[firstIndex];
        var second = HPIData[secondIndex];
        var third = HPIData[thirdIndex];
        var fourth = HPIData[fourthIndex];

        Quintiles[0] = first;
        Quintiles[1] = second;
        Quintiles[2] = third;
        Quintiles[3] = fourth;
        Quintiles[4] = lowest;
        Quintiles[5] = highest;
        return Quintiles;
    };

    findColor = (Quintiles, HPIValue) => {
        var color = "";
        if (HPIValue < Quintiles[0]) {
            color = "#008000";
        } else if (HPIValue < Quintiles[1]) {
            color = "#72AA00";
        } else if (HPIValue < Quintiles[2]) {
            color = "#C0C000";
        } else if (HPIValue < Quintiles[3]) {
            color = "#df7000";
        } else {
            color = "#EA0B00";
        }

        return color;
    };

    /* mandatory */
    mapHandler = (event) => {
        var name = event.target.dataset.name;
        if (name !== "DC") {
            for (let i = 0; i < HPI.length; i++) {
                if (HPI[i].Year === this.state.Year && HPI[i].State === name) {
                    var message =
                        "The HPI for " +
                        name +
                        " in the year " +
                        this.state.Year +
                        " is: " +
                        HPI[i].HPI;
                    alert(message);
                }
            }
        }
        //alert(event.target.dataset.name);
    };

    /* optional customization of filling per state and calling custom callbacks per state */
    statesCustomConfig = (Year, Quarter) => {
        //alert(HPI[0].State);
        console.log("SCC called with: " + Year);
        const states = {};
        var Quintiles = this.findQuintile(Year);

        for (let i = 0; i < HPI.length; i++) {
            if (HPI[i].Quarter === Quarter && HPI[i].Year === Year) {
                var element = {};
                var color = this.findColor(Quintiles, HPI[i].HPI);
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

    changeMap = () => {
        console.log("in changeMap");
        var year = 1975;
        var rangeInput = document.getElementById("rangeInput");
        if (rangeInput != null) {
            year = rangeInput.value;
            year = parseInt(year);
        }
        document.getElementById("currentYear").innerHTML = year;
        var quintiles = this.findQuintile(year);
        let dashString = "-";

        let twentyLow = quintiles[4];
        twentyLow = parseInt(twentyLow);
        twentyLow = twentyLow.toString();
        let twentyHigh = quintiles[0];
        twentyHigh = parseInt(twentyHigh);
        twentyHigh = twentyHigh.toString();
        let twentyStr = twentyLow.concat(dashString);
        twentyStr = twentyStr.concat(twentyHigh);
        document.getElementById("textTwenty").innerHTML = twentyStr;

        let fourtyLow = quintiles[0];
        fourtyLow = parseInt(fourtyLow) + 1;
        fourtyLow = fourtyLow.toString();
        let fourtyHigh = quintiles[1];
        fourtyHigh = parseInt(fourtyHigh);
        fourtyHigh = fourtyHigh.toString();
        let fourtyStr = fourtyLow.concat(dashString);
        fourtyStr = fourtyStr.concat(fourtyHigh);
        document.getElementById("textFourty").innerHTML = fourtyStr;

        let sixtyLow = quintiles[1];
        sixtyLow = parseInt(sixtyLow) + 1;
        sixtyLow = sixtyLow.toString();
        let sixtyHigh = quintiles[2];
        sixtyHigh = parseInt(sixtyHigh);
        sixtyHigh = sixtyHigh.toString();
        let sixtyStr = sixtyLow.concat(dashString);
        sixtyStr = sixtyStr.concat(sixtyHigh);
        document.getElementById("textSixty").innerHTML = sixtyStr;

        let eightyLow = quintiles[2];
        eightyLow = parseInt(eightyLow) + 1;
        eightyLow = eightyLow.toString();
        let eightyHigh = quintiles[3];
        eightyHigh = parseInt(eightyHigh);
        eightyHigh = eightyHigh.toString();
        let eightyStr = eightyLow.concat(dashString);
        eightyStr = eightyStr.concat(eightyHigh);
        document.getElementById("textEighty").innerHTML = eightyStr;

        let oneHundoLow = quintiles[3];
        oneHundoLow = parseInt(oneHundoLow) + 1;
        oneHundoLow = oneHundoLow.toString();
        let oneHundoHigh = quintiles[5];
        oneHundoHigh = parseInt(oneHundoHigh);
        oneHundoHigh = oneHundoHigh.toString();
        let oneHundoStr = oneHundoLow.concat(dashString);
        oneHundoStr = oneHundoStr.concat(oneHundoHigh);
        document.getElementById("textOneHundo").innerHTML = oneHundoStr;
        this.setState({ Year: year });
    };

    render() {
        //var input = document.getElementById("myInput");
        var rangeInput = document.getElementById("rangeInput");
        var year;
        if (rangeInput === null) {
            year = 1975;
        } else {
            var inputString = rangeInput.value;
            year = parseInt(inputString);
        }
        return (
            <div id="parent">
                <h1 id="currentYear">1975</h1>
                <input
                    type="range"
                    min="1975"
                    max="2021"
                    defaultValue="1975"
                    step="1"
                    id="rangeInput"
                    onChange={() => this.changeMap()}
                />
                {/* <button type="button" onClick={() => this.changeMap()}>submit</button> */}
                <div id="rectangle">
                    <h2>Legend</h2>
                    <div className="bullet" id="twenty">
                        <h3 className="legendNum" id="textTwenty">
                            0-55{" "}
                        </h3>
                    </div>
                    <div className="bullet" id="fourty">
                        <h3 className="legendNum" id="textFourty">
                            55-62
                        </h3>
                    </div>
                    <div className="bullet" id="sixty">
                        <h3 className="legendNum" id="textSixty">
                            62-66
                        </h3>
                    </div>
                    <div className="bullet" id="eighty">
                        <h3 className="legendNum" id="textEighty">
                            66-70
                        </h3>
                    </div>
                    <div className="bullet" id="onehundo">
                        <h3 className="legendNum" id="textOneHundo">
                            70-80
                        </h3>
                    </div>
                </div>
                <div className="App" id="App">
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
