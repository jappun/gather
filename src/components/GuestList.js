export default function GuestList({guests}) {

    return (
    <div className="border-primary border-4 p-4 rounded-lg shadow-lg text-secondary-two">
    <h2 className="text-lg text-secondary-two font-bold mb-4">Guests</h2>
    <ul className="space-y-2">
    {guests.map((guest) => (
        <li key={guest.id} className="flex items-center justify-between p-2 bg-white rounded">
        <span>{guest.name}</span>
        {guest.is_host && (
            <span className="text-sm bg-primary text-secondary-two px-2 py-1 rounded">Host</span>
        )}
        </li>
    ))}
    </ul>
    </div>
    );
}