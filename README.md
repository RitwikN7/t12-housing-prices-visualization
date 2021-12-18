# t12-housing-prices-visualization

A single page JavaScript visualization to show state-wise housing prices through the years in the US.

## Housing Price Index (HPI)

The House Price Index (HPI) is a broad measure of the movement of single-family property prices in the United States. Aside from serving as an indicator of house price trends, it also functions as an analytical tool for estimating changes in the rates of mortgage defaults, prepayments, and housing affordability. The HPI is one of many economic indicators that investors use to keep a pulse on broader economic trends and potential shifts in the stock market. Hence, it is essential to study the variations and trends in HPI data over the years across the US states. We wanted to create a tool to simplify the process of studying this data using the US map as the base and a color gradient to indicate ranges of HPI. HPI values provide lots of information about current housing and stock market trends. Lower HPI values indicate lower average home prices, while higher HPI values indicate higher average home prices.

For more information about HPI:

[Investopedia](https://www.investopedia.com/terms/h/house-price-index-hpi.asp)

## About the Visualization

The visualization above shows the state-wise HPI for a given year based on a gradient. On hovering, a state will get highlighted and a popup text box will show its full name. On clicking on a state, an alert will show the HPI value for that state for the respective year.

## How to Use

### Map Component

The map component features a slider for the year. To change the year shown on the map, simply drag the slider to your desired year. The map only shows Q1 data - for exact values, please view the graph.

### Graph Component

The graph shows different HPI values by state. To change the state shown, press the dropdown tab and select your desired state. The values are according to year and quarter.

## Notes

### Year: 1980

When the user places the year to 1980, the entire map becomes one color. This is because the dataset we used normalized the values from the year 1980 to 100 for each state.

### Grey Dot Inside Maryland

Within Maryland lies a grey dot. This dot represents the capital of the United States of America, Washington D.C. This is a non-interactive element of the map component, and since the dataset doesn't contain data on D.C., it isn't colored and clicking doesn't produce an alert.

## Instructions

### From Source Files

Required software: npm 8.1.0 or above and Node version 16.13.0 or above.

1. Unzip files and set current working directory to `t12-housing-prices-visualization`.
2. Run command `npm install` in terminal to install dependencies.
3. Run command `npm start` to run localhost server.

### From github-pages dev dependency

1. Unzip files and set current working directory to `t12-housing-prices-visualization`.
2. Run command `npm install` in terminal to install dependencies.
3. Change `"homepage"` attribute in file `src/package.json` on line 5 to respective github-pages url. For more information, click [here](https://pages.github.com/). Project is already deployed at [ritwikn7.github.io/t12-housing-prices-visualization](http://ritwikn7.github.io/t12-housing-prices-visualization).
4. From terminal, run command `npm run deploy`.

## Collaborators

1. Patrick Loughran ([pat-loughran](https://github.com/pat-loughran))
2. Ritwik Prasad ([RitwikN7](https://github.com/ritwikn7))
3. Jeffrey Du ([jdu828](https://github.com/jdu828))
