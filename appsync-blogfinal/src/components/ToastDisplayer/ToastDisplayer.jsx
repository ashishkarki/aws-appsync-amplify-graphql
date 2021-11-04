import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastDisplayer = ({
  message = 'please check console',
  toastType = 'info',
}) => {
  useEffect(() => {
    toast(message, { type: toastType })
  }, [message, toastType])

  return (
    <ToastContainer
      style={{
        float: 'right',
      }}
    />
  )
}

export default ToastDisplayer
