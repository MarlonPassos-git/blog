'use client'

import type { JSX } from 'react'
import { Toaster } from 'react-hot-toast'
import { ModalBody } from './CBody'
import { CModal } from './CModal'
import { useContactModal } from './store'
import { useContactForm } from './useContactForm'

export const ContactModal = (): JSX.Element => {
  const contactModal = useContactModal()
  const {
    state,
    handleSubmit,
    name,
    email,
    message,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
    t,
  } = useContactForm()

  return (
    <>
      <CModal
        title={t('title')}
        isOpen={contactModal.isOpen}
        onClose={contactModal.onClose}
        body={
          <ModalBody
            state={state}
            handleSubmit={handleSubmit}
            name={name}
            email={email}
            message={message}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handleMessageChange={handleMessageChange}
            t={t}
          />
        }
      />
      <Toaster />
    </>
  )
}
