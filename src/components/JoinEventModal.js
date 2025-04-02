// "use client"
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useState } from 'react';
// import { getEventByJoincode } from '@/libs/event-utils';
// import { useRouter } from 'next/navigation';




// const JoinEventModal = ({ isJoinEventModalOpen, setIsJoinEventModalOpen }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);


//   function closeModal() {
//     setIsJoinEventModalOpen(false);
//   }

//   function openModal() {
//     setIsJoinEventModalOpen(true);
//   }

//   const handleJoin = () => {
//     setLoading(true);
//     setError(null);
//     const guestname = document.getElementById("guestname").value.trim();
//     const joincode = document.getElementById("joincode").value.trim();
//     if (!guestname || !joincode ) {
//       setError(true);
//       return;
//     }
//     try {
//       eventData = getEventByJoincode(joincode);
//       addGuest(guestname, eventData.id);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     finally {
//       setLoading(false);
//       closeModal();router.push('/event/', joincode);
//     }
//   }

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <button
//           type="button"
//           onClick={openModal}
//           className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
//         >
//           Open dialog
//         </button>
//       </div>

//       <Transition appear show={isJoinEventModalOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-secondary-two p-6 text-left align-middle shadow-xl transition-all">
//                   <div className='m-2 space-y-4'>
//                     <form className='m-2 space-y-4'>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="joincode" type="text" placeholder="Your Name" />
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="guestname" type="text" placeholder="Join Code" />
//                       </form>
//                     {error ? (<p className="text-sm font-bold text-red-500">Please enter your name and a valid join code.</p>) : (<p className="text-background text-sm">Don't have the code? Ask your friends for the 6-character code for their event.</p>)}
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary-two"
//                       onClick={handleJoin}
//                     >
//                       Join
//                     </button>
//                     </div>

//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }


// export default JoinEventModal;
"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { getEventByJoincode } from '@/libs/event-utils';
import { addGuest } from '@/libs/guest-utils';
import { useRouter } from 'next/navigation';

const JoinEventModal = ({ isJoinEventModalOpen, setIsJoinEventModalOpen }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

  function closeModal() {
    setIsJoinEventModalOpen(false);
  }

  function openModal() {
    setIsJoinEventModalOpen(true);
  }

  const handleJoin = async () => {
    setLoading(true);
    setError(null);
    
    // Get values from inputs
    const guestName = document.getElementById("guestname").value.trim();
    const joincode = document.getElementById("joincode").value.trim();
    
    // Validate inputs
    if (!guestName || !joincode) {
      setError("Please enter your name and a valid join code.");
      setLoading(false);
      return;
    }
    
    try {
      // Get event data from joincode
      const eventData = await getEventByJoincode(joincode);
      
      if (!eventData) {
        setError("Event not found. Please check your join code.");
        setLoading(false);
        return;
      }
      
      // Add guest to the event
      await addGuest(eventData.id, guestName);
      
      // Close modal and redirect to event page
      closeModal();
      router.push(`/event/${joincode}`);
    } catch (error) {
      console.error('Error:', error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  <div className='m-2 space-y-4'>
                    <form className='m-2 space-y-4' onSubmit={(e) => {
                      e.preventDefault();
                      handleJoin();
                    }}>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                          id="guestname" 
                          type="text" 
                          placeholder="Your Name" 
                        />
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                          id="joincode" 
                          type="text" 
                          placeholder="Join Code" 
                        />
                      </form>
                    
                    {error ? (
                      <p className="text-sm font-bold text-red-500">{error}</p>
                    ) : (
                      <p className="text-background text-sm">Don't have the code? Ask your friends for the 6-character code for their event.</p>
                    )}
                    
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary-two"
                      onClick={handleJoin}
                      disabled={loading}
                    >
                      {loading ? 'Joining...' : 'Join'}
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

export default JoinEventModal;