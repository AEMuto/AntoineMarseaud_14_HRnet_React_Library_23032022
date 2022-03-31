import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from './Table';

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
  data: [{
    id: "dac01764-2e1c-4d7d-b7b1-5fc455d843d7",
    firstName: "Casimir",
    lastName: "Orn",
    dateOfBirth: "07/27/1981",
    startDate: "12/17/2013",
    department: "Engineering",
    street: "5905 Lemuel Squares",
    city: "Redondo Beach",
    state: "Maine",
    zipCode: "59025"
  }],
  title: 'Employees'
};
