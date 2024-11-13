"use client"
import { useRouter } from 'next/navigation';


const StartPlanning = () => {
    const router = useRouter();
    
    return (
    <button onClick={() => router.push('/newevent')} className="rounded-full p-4 font-semibold bg-primary hover:bg-primary-two text-white hover:text-secondary-two">Start Planning</button>
    );
}

export default StartPlanning;

