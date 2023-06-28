"use client"

import React from "react"
import { useFieldArray, useForm } from "react-hook-form"

const LABEL_CLASS_NAME = "block font-semibold my-1"
const INPUT_CLASS_NAME = "text-black dark:text-white bg-neutral-300 dark:bg-neutral-600 p-2 rounded"

function TenureSection({
  form,
  removeTenure,
  tenureIndex
}: {
  form: any,
  removeTenure: (idx: number) => void,
  tenureIndex: number
}) {
  const { register, control } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tenures.${tenureIndex}.distributions`
  })

  return (
    <div>
      <div className="flex gap-2">
        <div>
          <label className={LABEL_CLASS_NAME} htmlFor={`tenures.${tenureIndex}.occupied_at`}>Occupied</label>
          <input type="date" className={INPUT_CLASS_NAME} {...register(`tenures.${tenureIndex}.occupied_at`)} />
        </div>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 my-4">
          <div>
            <label className={LABEL_CLASS_NAME} htmlFor={`tenures.${tenureIndex}.distributions.${index}.classification_id`}>Classification</label>
            <input className={INPUT_CLASS_NAME} {...register(`tenures.${tenureIndex}.distributions.${index}.classification_id`)} />
          </div>
          <div>
            <label className={LABEL_CLASS_NAME} htmlFor={`tenures.${tenureIndex}.distributions.${index}.coverage`}>Coverage</label>
            <input className={INPUT_CLASS_NAME} {...register(`tenures.${tenureIndex}.distributions.${index}.coverage`)} />
          </div>
          <button onClick={() => remove(index)} type="button" className="block text-sm p-2 text-red-500">Remove Distribution</button>
        </div>
      ))}
      <button
        className="inline-block text-sm px-3 py-1 bg-neutral-400 text-black dark:bg-neutral-600 dark:text-white rounded"
        type="button"
        onClick={() => append({ coverage: null, "classification.id": null })}
      >
        Add Distribution
      </button>
      <button className="block text-sm px-3 py-1 bg-neutral-400 text-black dark:bg-neutral-600 dark:text-white rounded" type="button" onClick={() => removeTenure(tenureIndex)}>Remove Tenure</button>
    </div>
  )
}

export default function BlockTenures({
  block
}: {
  block: {
    id: string,
    tenures: {
      occupied_at?: string,
      distributions: {
        coverage: number,
        classification: { id: string }
      }[]
    }[]
  }
}) {
  const defaultValues = {
    tenures: block.tenures.map(({
      distributions, occupied_at
    }: {
      distributions: { classification: { id: string }, coverage: number }[],
      occupied_at?: string
    }) => ({
      occupied_at,
      distributions: distributions.map(({
        classification: { id },
        coverage
      }: {
        classification: { id: string },
        coverage: number
      }) => ({
        classification_id: id,
        coverage
      }))
    }))
  }

  const form = useForm({ defaultValues })
  const { control, handleSubmit } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenures"
  })

  const onSubmit = (data: any) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blocks/${block.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        block: {
          tenures: data.tenures
        }
      })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => <TenureSection removeTenure={remove} form={form} tenureIndex={index} key={field.id} />)}
      <button type="button" onClick={() => append({distributions: [], occupied_at: undefined })}>Add Tenure</button>
      <button type="submit">Save</button>
    </form>
  )
}
