import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from "@chakra-ui/react";


export const NumInput = ({label, initialNumber, onChange}) => {
  return (
    <div className={'content-center'}>
      <Text align={'left'}>{label}</Text>
      <NumberInput size={'md'} step={5} defaultValue={initialNumber} min={5}>
        <NumberInputField onChange={onChange}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </div>
  )
}