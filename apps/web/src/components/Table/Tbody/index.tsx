import React from 'react';
import { Button, Group, Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { flexRender, RowData } from '@tanstack/react-table';
import cx from 'clsx';

import { useTableContext } from 'contexts';

import classes from './index.module.css';

interface TbodyProps<T> {
  onRowClick?: (value: T) => void;
  onDelete?: (vacancy: T) => void;
  onEdit?: (vacancy: T) => void;
}

const Tbody = <T extends RowData>({ onRowClick, onDelete, onEdit }: TbodyProps<T>) => {
  const table = useTableContext<T>();

  if (!table) return null;

  const { rows } = table.getRowModel();

  return (
    <Table.Tbody>
      {rows.map((row) => (
        <Table.Tr
          key={row.id}
          onClick={() => onRowClick && onRowClick(row.original)}
          className={cx({
            [classes.tr]: !!onRowClick,
          })}
        >
          {row.getVisibleCells().map((cell) => (
            <Table.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>
          ))}
          <Table.Td key={`${row.id}-buttons`}>
            <Group miw={200} justify="flex-end">
              <Button onClick={() => onEdit && onEdit(row.original)}>
                <IconPencil size={24} />
              </Button>
              <Button onClick={() => onDelete && onDelete(row.original)}>
                <IconTrash size={24} />
              </Button>
            </Group>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};

export default Tbody;
