import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from "@chakra-ui/react";


export const NumInput = ({label, initialNumber, onChange}) => {
  return (
    <HStack>
      <Text>{label}</Text>
      <NumberInput size={'md'} step={5} defaultValue={initialNumber} min={5}>
        <NumberInputField onChange={onChange}/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  )
}