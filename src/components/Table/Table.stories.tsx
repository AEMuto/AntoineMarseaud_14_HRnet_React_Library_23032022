import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from './Table';
import { employees } from "../../mock/employees_500";
import { categories } from "../../mock/categories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const TableExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


TableExample.args = {
  data: employees,
  options: {
    heading: 'Employees',
    categories
  }
};
