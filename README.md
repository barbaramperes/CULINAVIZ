# Culinaviz Project

## World's Best Restaurants Interactive Map

The World's Best Restaurants Interactive Map has been integrated into the Culinaviz project. This visualization shows the global distribution of the world's top-ranked restaurants from 2002 to 2023.

### Features

- Interactive timeline for exploring restaurant rankings by year
- Color-coded cuisines for easy identification
- Detailed tooltips showing restaurant information
- Country selection for focusing on specific regions
- Filterable cuisine types through the legend

### Technical Implementation

The visualization uses:
- D3.js v7 for data visualization
- TopoJSON for map data
- Restaurant data from `data-set/05_WorldsBestRestaurants_Updated.csv`

### Tooltip Fixes

The tooltip behavior has been enhanced through:
- Integration with D3 events
- CSS improvements for better visibility
- Manual DOM manipulation to ensure tooltips display correctly
- Custom JavaScript in `fix-maps.js` to handle edge cases

### Usage

- Use the year slider to explore different years
- Click the play button to animate through the timeline
- Click on a country to focus on that region
- Use the cuisine legend to filter by cuisine type
- Hover over restaurant points to see detailed information

### Credits

Data visualization created for the Culinaviz project by Group 7. # CULINAVIZ
