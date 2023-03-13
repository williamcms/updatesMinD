import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick, getTwoDaysFromNow } from './utils/time'
import { defineMessages } from 'react-intl'

const DEFAULT_TARGET_DATE = getTwoDaysFromNow()

interface CountdownProps {
  targetDate: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate = DEFAULT_TARGET_DATE,
}) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  tick(targetDate, setTime)

  return (
    <div>
      <h1>{`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}</h1>
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
  properties: {
    targetDate: {
      title: 'Data Final',
      description: 'Data final utilizada no contador',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
