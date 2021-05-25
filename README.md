# Time-series Chart 📈

## 🏁 How to run

    yarn start

## ⚒️ Technologies

Project is created with:

- React (React hooks)
- HTML5
- SCSS

#

## 🗂 Directory

    src
    ├── app.jsx
    ├── components
    │   ├── ChartList.jsx
    │   ├── ColorItem.jsx
    │   ├── DownloadBtn.jsx
    │   ├── Header.jsx
    │   └── ListTitle.jsx
    ├── data
    │   ├── colors.js
    │   ├── data-1.json
    │   └── options.js
    ├── hooks
    │   └── state.js
    ├── index.js
    └── styles
        ├── app.scss
        ├── chartList.scss
        ├── colors.scss
        ├── common.scss
        └── index.scss

## 🔥 Features

- **_Chart table_** with average, deviation, minum/maximum value
- Checkbox for each **_chart visibility_**
- Multiple Y axes
- Checkbox for **_Y-axis selection_** (left axis or right axis)
- Control each chart setting
- **_Color palette_** for changing chart color
- **_Download CSV_** file
- **_Responsive interface_**

#

## 📑 Descriptions

- Split a component into ***smaller components*** (e.g. Header, DownloadBtn, ListTitle...)
- Apply Y axis depends on each chart's maximum value (less than 100 and greater than 100)
- Use **_modules/exporting_** and **_modules/export-data_** for exporting CSV file (highcharts)
- State management with hooks folder
- Manage Highcharts options with options.js

- used libraries
  - [Highcharts](https://www.highcharts.com/)
  - [Fontawesome](https://fontawesome.com/)
