import React, { Component } from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Checkbox } from 'baseui/checkbox'

export function FormInput (props) {
  return (
    <FormControl
      label={() => props.label}
      caption={() => ''}
    >
      <Input
        value={props.value}
        onChange={(event) => props.onChange(event)}
      />
    </FormControl>
  );
}

export function FormCheckBox (props) {
  return (
    <Checkbox
      checked={props.checked}
      onChange={(event) => { props.onChange(event) }}
    >
      {props.text}
    </Checkbox>
  )
}
