import { ColumnDef } from '@tanstack/react-table';

import { UsersListParams, UsersListSortParams } from 'resources/user';

import { Vacancy } from 'types';

export const DEFAULT_PAGE = 1;
export const PER_PAGE = 10;
export const EXTERNAL_SORT_FIELDS: Array<keyof UsersListSortParams> = ['createdOn'];

export const DEFAULT_PARAMS: UsersListParams = {
  page: DEFAULT_PAGE,
  searchValue: '',
  perPage: PER_PAGE,
  sort: {
    createdOn: 'desc',
  },
};

export const COLUMNS: ColumnDef<Vacancy>[] = [
  {
    accessorKey: 'vacancy',
    header: 'Vacancy',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: (info) => info.getValue(),
    enableSorting: true,
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: (info) => info.getValue(),
  },
];
