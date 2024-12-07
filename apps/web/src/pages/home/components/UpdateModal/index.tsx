import React, { FC, useEffect } from 'react';
import { Button, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { vacancyUpdateSchema } from 'schemas';
import { Vacancy, VacancyUpdate } from 'types';

interface UpdateModalProps {
  type?: string;
  opened: boolean;
  onClose: () => void;
  onSubmit: (vacancy: VacancyUpdate) => void;
  editedVacancy?: Vacancy;
}

const UpdateModal: FC<UpdateModalProps> = ({ opened, onClose, onSubmit, editedVacancy }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<VacancyUpdate>({
    resolver: zodResolver(vacancyUpdateSchema),
  });

  useEffect(() => {
    reset();
  }, [opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Update Vacancy" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={32}>
          <Stack gap={20}>
            <input type="hidden" {...register('id')} value={editedVacancy?._id ?? ''} />
            <TextInput
              {...register('vacancy')}
              label="Enter vacancy"
              placeholder="Vacancy"
              maxLength={30}
              required={false}
              error={errors.vacancy?.message}
              defaultValue={editedVacancy?.vacancy ?? ''}
            />

            <TextInput
              {...register('company')}
              label="Enter company"
              placeholder="Company"
              maxLength={30}
              required={false}
              error={errors.company?.message}
              defaultValue={editedVacancy?.company ?? ''}
            />

            <TextInput
              {...register('salary')}
              label="Enter salary"
              placeholder="Salary"
              maxLength={15}
              required={false}
              error={errors.salary?.message}
              defaultValue={editedVacancy?.salary ?? ''}
            />

            <TextInput
              {...register('status')}
              label="Enter status"
              placeholder="Status"
              maxLength={15}
              required={false}
              error={errors.status?.message}
              defaultValue={editedVacancy?.status ?? ''}
            />

            <Textarea
              {...register('notes')}
              label="Enter notes"
              placeholder="Notes"
              error={errors.notes?.message}
              maxLength={50}
              defaultValue={editedVacancy?.notes ?? ''}
            />
          </Stack>

          <Button type="submit" disabled={!isDirty}>
            Update Vacancy
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
export default UpdateModal;
