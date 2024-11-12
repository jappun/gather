"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


const JoinEventModal = ({ isJoinEventModalOpen, setIsJoinEventModalOpen }) => {


  function closeModal() {
    setIsJoinEventModalOpen(false)
  }

  function openModal() {
    setIsJoinEventModalOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isJoinEventModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-secondary-two p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-background"
                  >
                    Join an event
                  </Dialog.Title> */}
                  <div className='m-2 space-y-4'>
                    <form>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="joincode" type="text" placeholder="Join Code" />
                        </form>
                    <p className="text-background text-sm">Some copy explaining join codes blah blah blah.</p>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary-two"
                      onClick={closeModal}
                    >
                      Join
                    </button>
                    </div>

                  {/* <div className="mt-4">
                    
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


export default JoinEventModal;