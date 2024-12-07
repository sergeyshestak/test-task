import React, { FC, useEffect } from 'react';
import { Button, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { vacancyCreateSchema } from 'schemas';
import { VacancyCreate } from 'types';

interface CreateModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (vacancy: VacancyCreate) => void;
}

const CreateModal: FC<CreateModalProps> = ({ opened, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<VacancyCreate>({
    resolver: zodResolver(vacancyCreateSchema),
  });

  useEffect(() => {
    reset();
  }, [opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Create Vacancy" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={32}>
          <Stack gap={20}>
            <TextInput
              {...register('vacancy')}
              label="Enter vacancy"
              placeholder="Vacancy"
              maxLength={30}
              required
              error={errors.vacancy?.message}
            />

            <TextInput
              {...register('company')}
              label="Enter company"
              placeholder="Company"
              maxLength={30}
              required
              error={errors.company?.message}
            />

            <TextInput
              {...register('salary')}
              label="Enter salary"
              placeholder="Salary"
              maxLength={15}
              required
              error={errors.salary?.message}
            />

            <TextInput
              {...register('status')}
              label="Enter status"
              placeholder="Status"
              maxLength={15}
              required
              error={errors.status?.message}
            />

            <Textarea
              {...register('notes')}
              label="Enter notes"
              placeholder="Notes"
              error={errors.notes?.message}
              maxLength={50}
            />
          </Stack>

          <Button type="submit" disabled={!isDirty}>
            Create Vacancy
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
export default CreateModal;
