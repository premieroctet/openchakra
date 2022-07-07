import React, {useState} from 'react'
import {Switch} from '@headlessui/react'
import styled from 'styled-components'

const CPF = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <StyledCPF>
      <p>Cette formation est éligible au CPF.</p>
      <Switch.Group>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
    enabled ? 'bg-blue-600' : 'bg-gray-200'
  } relative inline-flex h-6 w-11 items-center rounded-full`}>
          <span id="infocpf"
            className={`${
      enabled ? 'translate-x-6' : 'translate-x-1'
    } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch> <Switch.Label>Je souhaite réserver et payer avec mon CPF </Switch.Label>
      </Switch.Group>
    </StyledCPF>)
}

const StyledCPF = styled.div`

  margin-block: var(--spc-8);

  p {
    margin-bottom: var(--spc-2);
  }

  button {
    width: var(--spc-11);
    height: var(--spc-6);
    border-radius: var(--rounded-full);
    background-color: transparent;
    border: 1px solid gray;
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0;
  }
  
  button span {
    display: inline-block;
    border-radius: var(--rounded-full);
    background-color: gray;
    width: var(--spc-4);
    height: var(--spc-4);
    transform: translateX(var(--spc-1));
    transition: transform var(--delayIn) ease-in-out, background-color var(--delayIn) ease-in-out;
  }
  
  [aria-checked="true"] span {
    transform: translateX(var(--spc-6));
    background-color: var(--brand-color);
  }
`

export default CPF
