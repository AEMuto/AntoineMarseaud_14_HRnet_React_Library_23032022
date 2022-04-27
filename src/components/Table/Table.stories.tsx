import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from './Table';
import { employees as employees500 } from '../../mock/employees_500';
import { employees as employees50 } from '../../mock/employees_50';
import { categories } from '../../mock/categories';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'HRnet/Table',
  component: Table,
  argTypes: {
    primaryColor: { control: 'color' },
  },
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Entries500 = Template.bind({});
export const Entries50 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Entries500.args = {
  data: employees500,
  options: {
    heading: 'Employees',
    categories,
  },
};

Entries50.args = {
  data: employees50,
  options: {
    heading: 'Employees',
    categories,
  },
};
