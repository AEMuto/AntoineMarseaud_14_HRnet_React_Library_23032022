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
Install the package in your project.

`npm i PACKAGE_NAME` where `PACKAGE_NAME` is for now : `antoinemarseaud_14_hrnet_react_library_23032022`.

Then you can import the components in your jsx/tsx files.

`import COMPONENT_NAME from 'PACKAGE_NAME'` where `COMPONENT_NAME` is one of the existing components.

Currently, `COMPONENT_NAME` has one possible value, which is `Table`, so it will actually look like this :

````jsx
import Table from 'antoinemarseaud_14_hrnet_react_library_23032022'

const MyAwesomeComponent = (data) => {
    return <Table data={data} />
}
````

### Dev

> **Publish Notes**\
> `PACKAGE_NAME` is defined in the `package.json` at the field `"name"`.\
> The field is currently `@AEMuto/antoinemarseaud_14_hrnet_react_library_23032022`.\
> It follows the syntax "@GITHUB_USERNAME/REPOSITORY_NAME".\
> Keep this in mind when you fork this repository.