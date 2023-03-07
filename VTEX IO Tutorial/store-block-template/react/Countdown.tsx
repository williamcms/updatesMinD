import React from 'react'
import { defineMessages } from 'react-intl'

interface CountdownProps {}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({}) => {
  return (
    <div>
      <h1>Countdown Test</h1>
    </div>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.countdown.title',
  },
  description: {
    id: 'admin/editor.countdown.description',
  },
})

Countdown.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {},
}

export default Countdown
