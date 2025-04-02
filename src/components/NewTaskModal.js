"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { getAllGuests } from '@/libs/guest-utils';
import GuestSelection from './GuestSelection';

// notes
// you can make joincode and guest updates a prop in the event page to be passed down

const NewTaskModal = ({ isNewTaskModalOpen, setIsNewTaskModalOpen, guests, eventID, onTaskAdded }) => {
  const params = useParams();
  const joinCode = params.joincode;
  const [assignee, setAssignee] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleGuestSelect = (guestId) => {
    setAssignee(guestId || null);
  }
  
  
  function closeModal() {
    setIsNewTaskModalOpen(false);
    setTaskName("");
    setAssignee("");
    setError(null);
  }

  function openModal() {
    setIsNewTaskModalOpen(true);
  }

  const handleSubmit = () => {
    setLoading(true);
    setError(null)

    try {      
        createTask();
    } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Unknown error');
    } finally {
        setLoading(false);
        closeModal();         
    }
  }

  const createTask = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!taskName.trim()) {
        throw new Error("Task name is required");
      }

      const data = {
        eventID,
        taskName: taskName.trim(),
        assignee_id: assignee, 
        complete: false
      };

      // console.log("Sending task data:", data); 

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.statusText}`);
      }

      const result = await response.json();
      // console.log("Task created successfully:", result); 
      onTaskAdded();
      closeModal();
    } catch (error) {
      console.error('Error creating task:', error);
      setError(error.message || 'Failed to create task');
      setLoading(false);
    }
  };


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

      <Transition appear show={isNewTaskModalOpen} as={Fragment}>
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
                  <div className='m-2 space-y-4 text-md'>
                    {error && <p className="text-red-500">{error}</p>}
                    <p className="text-background font-bold">What&apos;s the task?</p>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit()
                      }}>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Throw the best party ever" 
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      />
                      <p className="text-background font-bold">Who&apos;s doing it? You can choose this later.</p>
                      <GuestSelection guests={guests} callback={handleGuestSelect}/>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 font-bold text-white hover:bg-primary-two disabled:opacity-50"
                      >
                        {loading ? 'Adding...' : 'Add'}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default NewTaskModal;