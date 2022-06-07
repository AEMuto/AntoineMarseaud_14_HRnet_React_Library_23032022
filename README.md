# HRnet react components library
This library contains for now a table component which is based on [this legacy jquery plugin](https://github.com/DataTables/DataTables/blob/master/media/js/jquery.dataTables.js) created by [DataTables](https://datatables.net/).

## Motivation
The internal web application used by our client HRnet was based on several jquery plugins.
At the era of frameworks like React, it represents a non-negligible technological debt.
Furthermore, there were several bugs.

> **Jquery plugins list present in the legacy HRnet web application**
> - [datetimepicker](https://github.com/xdan/datetimepicker)
> - [jquery-modal](https://github.com/kylefox/jquery-modal)
> - [jquery-ui/selectmenu](https://github.com/jquery/jquery-ui/blob/master/ui/widgets/selectmenu.js)
> - [datatables](https://github.com/DataTables/DataTables)

The idea is to convert this jquery web application to a more modern and more robust react application.
In order to reach this goal and bullet-proofing any further development, I created this library.
Thanks to [storybook](https://storybook.js.org/) we can easily see how our components look before building the library and publish it.
It also can improve our exchange with the design team.

## How it works
- This repository contains the source code of the components.
- Develop them with storybook.
- Build the npm package with rollup (src to dist) .
- Publish the package.

## How to use

### Users

#### Installing and using the package in your project.

At the root of your current project enter the following snippet in your cli.

````shell
npm i antoinemarseaud_14_hrnet_react_library
`````

Then you can import the components in your jsx/tsx files.

`import COMPONENT_NAME from 'PACKAGE_NAME'` where `COMPONENT_NAME` is one of the existing components.

Currently, `COMPONENT_NAME` has one possible value, which is `Table`, so it will actually look like this :

````jsx
import Table from 'antoinemarseaud_14_hrnet_react_library'
import data from './data.js'

const MyAwesomeTable = () => {
    return <Table data={data} />
}
````
---

#### Use case : The \<Table /> component

This component has the following props.


 1. `data` which is **required** and must be an array of objects. As of the following example:

````jsx
const companyVehicles = [
  {id: 1, type: 'car', color: 'red', driver: 'Patrick'},
  {id: 2, type: 'truck', color: 'blue', driver: 'Fiona'},
  {id: 3, type: 'car', color: 'green', driver: 'Bob'},
]

const VehiclesTable = () => {
    return <Table data={companyVehicles} />
}
````

 2. `options` which is optional and is an object containing the keys:
    - `categories`, an _array_ of category objects. There should be one category for each column that you have. These object should have the following keys:
      - `title`, a _string_, that will be displayed as the column heading.
      - `key`, the exact same _string_ as one of the keys existing in your objects' data.
      - `position`, a number or undefined. If you choose undefined as a value, the category will not be displayed. If you choose a number it will provide the index of that category. Each number should be different, and consequentially the category with the smallest number shall be displayed first and the largest shall be displayed last
    - `title`, a string to display as a title for your table.


````jsx
import companyVehicles from './companyVehicles.js'

const vehiclesTableOptions = {
  title: 'Vehicle Fleet',
  categories: [
    {title: 'Type', key: 'type', position: 2},
    {title: 'Color', key: 'color', position: 1},
    {title: 'Driver', key: 'driver', position: 0},
    {title: 'UUID', key: 'id', position: undefined},
  ]
}

const VehiclesTable = () => {
    return <Table data={companyVehicles}
                  options={vehiclesTableOptions}
    />
}
````

 3. `primaryColor`, a string that must be a valid ccs value for the color property.

````jsx
import companyVehicles from './companyVehicles.js'
import vehiclesTableOptions from './vehiclesTableOptions.js'

const VehiclesTable = () => {
    return <Table data={companyVehicles}
                  options={vehiclesTableOptions}
                  primaryColor="rgb(255, 0, 0)"
    />
}
````
---
### Dev

To participate in the development of this library you can do:

```shell
git clone "https://github.com/AEMuto/AntoineMarseaud_14_HRnet_React_Library_23032022"
cd AntoineMarseaud_14_HRnet_React_Library_23032022
nvm use 16
npm install
```

Once you have installed this project you will be able to run:
```shell
npm run storybook
```
Which will start the local dev server for storybook, where you can access and watch the components and their different versions.
You can use what has been already done as a model to develop more components.

Once you are satisfied with your progress `git push` to share your branch with the remote repository and open a pull request.

In the case you have forked this repository to develop your own library of react components, you will want to create your own package, which is possible with the following commands
```shell
# Compile the library from /src to /dist
npm run rollup
# Then publish it with your npmjs.org credentials
npm login
npm publish
```

The last npm script you should be aware of is `npm run test` which will launch jest and run the tests (provided you wrote them).