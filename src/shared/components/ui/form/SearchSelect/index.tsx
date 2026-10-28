import FieldLabel from '../FieldLabel';
import FieldHelp from '../FieldHelp';

import { useSearchSelect } from './useSearchSelect';
import { SearchSelectInput } from './SearchSelectInput';
import { SearchSelectDropdown } from './SearchSelectDropdown';
import type { SearchSelectProps, SearchOption } from './SearchSelect.types';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const SearchSelect = <T extends unknown>(props: SearchSelectProps<T>) => {
  const {
    label,
    required,
    optional,
    leftIcon: LeftIcon,
    help,
    error,
    id,
    options,
    value,
    onSelect,
    isLoading = false,
    emptyMessage = 'No se encontraron resultados',
    loadingMessage = 'Buscando...',
    onSearchChange,
    renderOption,
    placeholder = 'Buscar...',
    disabled = false,
  } = props;

  const {
    isOpen,
    query,
    floatingStyles,
    setReference,
    setFloating,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    handleInputChange,
    handleSelectOption,
    handleClear,
  } = useSearchSelect({ options, value, onSelect, onSearchChange, disabled });

  const messageId = id ? `${id}-message` : undefined;

  return (
    <div>
      {/* 1. Etiqueta del Campo */}
      {label && (
        <FieldLabel
          label={label}
          required={required}
          optional={optional}
          htmlFor={id}
        />
      )}

      {/* 2. Input + Controles */}
      <SearchSelectInput
        id={id ?? ''}
        value={query}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        isOpen={isOpen}
        isLoading={isLoading}
        leftIcon={LeftIcon}
        setReference={setReference}
        getReferenceProps={getReferenceProps}
        handleInputChange={handleInputChange}
        handleClear={handleClear}
      />

      {/* 3. Help / Error */}
      <FieldHelp help={help} error={error} id={messageId} />

      {/* 4. Dropdown Flotante */}
      <SearchSelectDropdown
        isOpen={isOpen}
        isLoading={isLoading}
        options={options as SearchOption<unknown>[]}
        value={value}
        loadingMessage={loadingMessage}
        emptyMessage={emptyMessage}
        floatingStyles={floatingStyles}
        getFloatingProps={getFloatingProps}
        setFloating={setFloating}
        getItemProps={getItemProps}
        handleSelectOption={
          handleSelectOption as (option: SearchOption<unknown>) => void
        }
        renderOption={
          renderOption as
            | ((
                option: SearchOption<unknown>,
                isSelected: boolean,
              ) => React.ReactNode)
            | undefined
        }
      />
    </div>
  );
};

export default SearchSelect;
