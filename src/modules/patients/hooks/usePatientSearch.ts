import { useState, type FormEvent } from 'react';

import { usePatientList } from './usePatientList';

export function usePatientSearch() {
  const list = usePatientList();
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