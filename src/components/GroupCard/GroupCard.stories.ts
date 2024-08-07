import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_EVENTS } from '@/stories/mocks';
import GroupCard from './GroupCard';

const meta = {
    title: 'Components/Cards/GroupCard',
    component: GroupCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        description: { control: 'text' },
        slug: { control: 'text' },
        type: { control: 'select', options: ['Discord', 'Regular', 'Other'] },
        url: { control: 'text' },
        events: { control: 'object' },
    },
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Group with a single event',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        slug: 'example-group',
        type: 'Regular',
        url: 'https://example.com/group',
        events: [MOCK_EVENTS[0]],
    },
};

export const MultipleEvents: Story = {
    args: {
        ...Default.args,
        name: 'Group with multiple events',
        events: MOCK_EVENTS,
    },
};

export const DiscordGroup: Story = {
    args: {
        ...Default.args,
        name: 'Group that organises over Discord',
        events: undefined,
        type: 'Discord',
        url: 'https://example.com/',
    },
};

export const AdHocGroup: Story = {
    args: {
        ...Default.args,
        name: 'Group that arranges ad-hoc events',
        events: undefined,
        type: 'Ad-hoc',
        url: 'https://example.com/',
    },
};
