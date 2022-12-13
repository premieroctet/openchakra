import React, { memo } from 'react'
import { Input, RadioGroup, Radio, FormLabel, Select } from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'
import {
  unitList,
  unitListDisplay,
  currencyList,
  currencyListDisplay,
} from '~dependencies/utils/lists'

interface defaultNumberStyles {
  decimal: {
    style: string
    minimumFractionDigits: number
    maximumFractionDigits: number
  }
  percent: {
    style: string
  }
  unit: {
    style: string
    unit: string
    unitDisplay: string
  }
  currency: {
    style: string
    currency: string
    currencyDisplay: string
  }
}

const languages = ['fr-FR', 'de-DE', 'en-US', 'en-GB']

const NumberFormatPanel = () => {
  const { setValueFromEvent, setValue } = useForm()
  const lang = usePropsSelector('data-lang')
  const type = usePropsSelector('data-type')
  const format = usePropsSelector('data-format')
  const value = usePropsSelector('data-value')

  const defaultNumberStyleOptions: defaultNumberStyles = {
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
    },
    unit: {
      style: 'unit',
      unit: 'liter',
      unitDisplay: 'short',
    },
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
    },
  }

  const changeNumberFormat = (numberFormat: string) => {
    setValue('data-type', numberFormat)
    // @ts-ignore
    setValue('data-format', defaultNumberStyleOptions?.[numberFormat])
  }

  const changeNumberLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setValue('data-lang', value)
  }

  const handleSignificantDigits = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    let newgame = format
    newgame[name] = +value
    if (
      newgame['minimumFractionDigits'] >= 0 &&
      newgame['maximumFractionDigits'] >= newgame['minimumFractionDigits']
    ) {
      setValue('data-format', newgame)
    }
  }

  const handleParamsNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    let newgame = format
    newgame[name] = value
    setValue('data-format', newgame)
  }

  return (
    <>
      <FormControl label="language" htmlFor="language">
        <Select name="unit" id="unit" size="sm" onChange={changeNumberLang}>
          {languages.map((elem, i) => (
            <option key={`langList${i}`} value={elem} selected={lang === elem}>
              {elem}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormLabel mb={2}>
        {'Number Type'}
        <RadioGroup
          display={'flex'}
          flexDirection="column"
          size={'sm'}
          defaultValue={type}
          onChange={changeNumberFormat}
        >
          {Object.keys(defaultNumberStyleOptions).map((key, i) => (
            <Radio key={i} value={key}>
              {key}
            </Radio>
          ))}
        </RadioGroup>
      </FormLabel>

      {type === 'decimal' && (
        <div>
          <FormControl
            label="minimum Fraction Digits"
            htmlFor="minimumFractionDigits"
          >
            <Input
              name="minimumFractionDigits"
              id="minimumFractionDigits"
              type="number"
              min={0}
              step={'1'}
              value={format.minimumFractionDigits}
              size="sm"
              onChange={handleSignificantDigits}
            />
          </FormControl>

          <FormControl
            label="maximum Fraction Digits"
            htmlFor="maximumFractionDigits"
          >
            <Input
              name="maximumFractionDigits"
              id="maximumFractionDigits"
              type="number"
              step={'1'}
              max={'20'}
              value={format.maximumFractionDigits}
              size="sm"
              onChange={handleSignificantDigits}
            />
          </FormControl>
        </div>
      )}

      {type === 'unit' && (
        <div>
          <FormControl label="unit" htmlFor="unit">
            <Select
              name="unit"
              id="unit"
              size="sm"
              onChange={handleParamsNumber}
            >
              {unitList.map((elem, i) => (
                <option
                  key={`unitList${i}`}
                  value={elem}
                  selected={format.unit === elem}
                >
                  {elem}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl label="unit display" htmlFor="unitDisplay">
            <Select
              name="unitDisplay"
              id="unitDisplay"
              value={format.unitDisplay}
              size="sm"
              onChange={handleParamsNumber}
            >
              {unitListDisplay.map((elem, i) => (
                <option
                  key={`unitListD${i}`}
                  value={elem}
                  selected={format.unitDisplay === elem}
                >
                  {elem}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {type === 'currency' && (
        <div>
          <FormControl label="currency" htmlFor="currency">
            <Select
              name="currency"
              id="currency"
              size="sm"
              onChange={handleParamsNumber}
            >
              {currencyList.map((elem, i) => (
                <option
                  key={`currencyList${i}`}
                  value={elem}
                  selected={format.currency === elem}
                >
                  {elem}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl label="currency display" htmlFor="currencyDisplay">
            <Select
              name="currencyDisplay"
              id="currencyDisplay"
              value={format.currencyDisplay}
              size="sm"
              onChange={handleParamsNumber}
            >
              {currencyListDisplay.map((elem, i) => (
                <option
                  key={`currencyListD${i}`}
                  value={elem}
                  selected={format.currencyDisplay === elem}
                >
                  {elem}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      <FormControl label="Example" htmlFor="datavalue">
        <Input
          id="datavalue"
          type="number"
          value={value || ''}
          size="sm"
          name="data-value"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  )
}

export default memo(NumberFormatPanel)
