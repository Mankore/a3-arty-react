# About

Github Pages: https://mankore.github.io/a3-arty-react/

Web version of my [Arma 3 RHS Artillery Calculator](https://github.com/Mankore/A3_Artillery_Calculator_RHS) made with React and Typescript. Calculates solutions for both airFriction and non-airFriction artillery types and shells.

## Interface / Sidebar

Select Map/Shells/Artillery e.t.c. in the Sidebar.

Height difference: it's the difference of Target Z coordinate (height) and artillery height coordinate (```targetCoord.z - artilleryCoord.z```). It's important to set it to correct value before placing Target marker in order to calculate the most accurate solution.

### How to use / Controls
```
Shift + LMB: set artillery position
CTRL + LMB: set target position
ALT + LMB: set yellow circle (as a point of interest position)
```

Artillery position needs to be placed first. 

Artillery/Target Markers can be dragged, when Target Marker is dragged it will recalculate the solution with current settings.

Marker info is shown either on click or on hover over the Marker icon.

Markers can also be deleted when they are selected by pressing DELETE key on keyboard.

## Important Info

Always place your artillery **perfectly facing the current target** and on the **perfectly flat surface**. Any additional surface angle can cause your round to miss completely, especially when firing in a flat trajectory (< 45deg).

Why is it important to perfectly face your target? When you move the barrel of artillery piece on X axis you also change the vertical angle of your shot, but the in-game interface doesn't tell you that. The solutions of this calculator will be most accurate if you follow these 2 simple rules.

## Tools

Arma 3 map export: https://community.bistudio.com/wiki/diag_exportTerrainSVG

Map library: [React-leaflet](https://react-leaflet.js.org/)

Map tiles: [libvips](https://www.libvips.org/)

Terrain export: [Arma Terrain Export](https://github.com/Keithenneu/Beowulf.ArmaTerrainExport)