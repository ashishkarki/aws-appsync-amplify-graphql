import React, { useCallback, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const ToastDisplayer = ({
  message = 'please check console',
  toastType = 'info',
}) => {
  const toastId = uuidv4()
  const toastElement = React.useRef(null)

  const showToast = useCallback(
    (message, toastType) => {
      if (!toastElement.current) {
        toastElement.current = toast(message, {
          type: toastType,
          toastId: toastId,
        })
      }
    },
    [toastId],
  )

  useEffect(() => {
    showToast(message, toastType)
  }, [showToast, message, toastType])

  return (
    <ToastContainer
      style={{
        float: 'right',
      }}
      autoClose={2000}
      hideProgressBar={false}
    />
  )
}

export default ToastDisplayer
