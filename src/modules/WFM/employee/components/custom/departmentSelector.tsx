import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useDepartmentStore } from "@/modules/WFM/department/store/useDepartmentStore";
import { useEffect, useState } from "react";
import Select from "react-select";

interface DepartmentModel {
  id: string;
  name: string;
}

interface Props {
  defaultValueId?: number;
  onChange: (selectedId: number) => void;
  error?: boolean;
  hint?: string;
}

export function DepartmentSelector({ defaultValueId, onChange, error, hint }: Props) {
  const [selectedId, setSelectedId] = useState<number>(defaultValueId ?? 1);

  const { departmentOptions, fetchDepartmentOptions } = useDepartmentStore();
  const { run } = useRequestAction();
  const options = departmentOptions?.items.map(d => ({
    value: d.id,
    label: d.name,
  }));

  const selectedOption = options?.find(o => o.value === selectedId) ?? null;

  useEffect(() => {
    run(async () => {
      await fetchDepartmentOptions();
    });
  }, []);

  useEffect(() => {
    setSelectedId(defaultValueId ?? 1);
  }, [defaultValueId]);

  useEffect(() => {
    const exists = departmentOptions?.items.some(d => d.id === selectedId);
    if (!exists) {
      setSelectedId(0);
      onChange(0);
    } else if (selectedId) {
      onChange(selectedId);
    }
  }, [departmentOptions]);

  const handleChange = (option: { value: number; label: string } | null) => {
    const id = option?.value ?? 0;
    setSelectedId(id);
    onChange(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <Select
        className="min-w-[250px]"
        isClearable
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Departman seçiniz..."
        styles={{
          control: base => ({
            ...base,
            borderColor: error ? "red" : base.borderColor,
          }),
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{hint}</p>}
    </div>
  );
}
