"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';

const JoinEventModal = ({ isJoinEventModalOpen, setIsJoinEventModalOpen }) => {
  const [joincode, setJoincode] = useState('');
  const [guestName, setGuestName] = useState('');
  const [step, setStep] = useState(1); // 1 for joincode, 2 for name
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function closeModal() {
    setIsJoinEventModalOpen(false);
    setStep(1);
    setJoincode('');
    setGuestName('');
    setError('');
  }

  async function handleJoin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/guests/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          joincode,
          guestName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join event');
      }

      // Redirect to event page
      router.push(`/event/${joincode}`);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
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
                  <form onSubmit={handleJoin}>
                    {step === 1 ? (
                      <>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                          type="text" 
                          placeholder="Enter Join Code" 
                          value={joincode}
                          onChange={(e) => setJoincode(e.target.value.toUpperCase())}
                          required
                        />
                        <button
                          type="button"
                          className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary-two"
                          onClick={() => setStep(2)}
                          disabled={!joincode}
                        >
                          Next
                        </button>
                      </>
                    ) : (
                      <>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                          type="text" 
                          placeholder="Enter Your Name" 
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          required
                        />
                        <div className="mt-4 flex justify-between">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
                            onClick={() => setStep(1)}
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary-two"
                            disabled={loading || !guestName}
                          >
                            {loading ? 'Joining...' : 'Join Event'}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default JoinEventModal;