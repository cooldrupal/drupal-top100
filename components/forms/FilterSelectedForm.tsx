'use client'

import { useState } from 'react'
import Form from 'next/form';
import type { Taxonomy } from "@/lib/taxonomy"

type SelectConfig = {
  name: string,
  optionsKey: string,
  placeholder: string,
};

type FilterSelectedFormProps = {
  slug: string,
  fields: Record<string, string>,
  options: Record<string, Taxonomy[] | null>,
  selects: SelectConfig[],
};

export function FilterSelectedForm({ slug, fields, options, selects }: FilterSelectedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 300)
  }

  return (
    <Form action={`/${slug}`} onSubmit={handleSubmit}> {}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-8 items-stretch sm:items-center">
        {selects.map((select) => {
          const selectOptions = options[select.optionsKey as keyof typeof options];
          return (
            <select
              key={select.name}
              name={select.name}
              defaultValue={fields[select.name as keyof typeof fields]}
              disabled={isSubmitting}
              className={`min-w-[150px] px-3 py-2 text-gray-600 border border-blue-600 bg-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">{select.placeholder}</option>
              {selectOptions?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} // ← ИЗМЕНЕНО: добавлен стиль для disabled
        >
          Apply
        </button>
      </div>
    </Form>
  );
}
