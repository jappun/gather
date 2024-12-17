"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { getEventByJoincode } from '@/libs/event-utils';
import { getAllGuests } from '@/libs/guest-utils';
import GuestSelection from './GuestSelection';

// notes
// you can make joincode and guest updates a prop in the event page to be passed down

const NewTaskModal = ({ isNewTaskModalOpen, setIsNewTaskModalOpen, guests, eventID }) => {
  const params = useParams();
  const joinCode = params.joincode;
  const [assignee, setAssignee] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);


  const handleGuestSelect = (guest) => {
    setAssignee(guest); // get the selected guest and make them the assignee
  }
  
  
  function closeModal() {
    setIsNewTaskModalOpen(false);
  }

  function openModal() {
    setIsNewTaskModalOpen(true);
  }

  const handleSubmit = () => {
    setLoading(true);

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

    try {
      const data = {
        eventID,
        taskName,
        assignee_id: assignee
      };

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

    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
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
                  <p className="text-background font-bold">What's the task?</p>
                    <form>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" placeholder="Throw the best party ever" 
                        onChange={(e) => setTaskName(e.target.value)}/>
                    {/* </form> */}
                    <p className="text-background font-bold ">Who's doing it? You can choose this later.</p>
                    {/* <form> */}
                        {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Assignee (Optional)" /> */}
                        <GuestSelection guests={guests} callback={handleGuestSelect}/>
                    </form>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 font-bold text-white hover:bg-primary-two"
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
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