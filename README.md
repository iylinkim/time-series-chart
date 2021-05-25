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

- Data rearangement (Create a object which has **_key for category_** and **_value with data arrays_**)
<p><img width="400" alt="스크린샷 2021-05-25 오후 1 01 54" src="https://user-images.githubusercontent.com/66230563/119437662-92595880-bd59-11eb-8dbc-ae7224afbb9b.png"></p>

- Split a component into **_smaller components_** (e.g. Header, DownloadBtn, ListTitle...)
- Apply Y axis depends on each chart's maximum value (less than 100 and greater than 100)
- Use **_modules/exporting_** and **_modules/export-data_** for exporting CSV file (highcharts)
- State management with hooks folder
- Manage Highcharts options with options.js

- Used libraries
  - [Highcharts](https://www.highcharts.com/)
  - [Fontawesome](https://fontawesome.com/)
