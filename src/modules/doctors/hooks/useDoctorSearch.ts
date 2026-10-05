import { useState, type FormEvent } from 'react';

import { useDoctorList } from './useDoctorList';

export function useDoctorSearch() {
  const list = useDoctorList();
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    list.applySearch(searchInput.trim());
  };

  const handleClear = () => {
    setSearchInput('');
    list.applySearch('');
  };

  return {
    ...list,
    searchInput,
    setSearchInput,
    handleSubmit,
    handleClear,
  };
}