import React, { useEffect, useState } from 'react';

interface BattleAnnouncerProps {
    message: string;
}

const BattleAnnouncer: React.FC<BattleAnnouncerProps> = ({ message }) => {
    const [displayedMessage, setDisplayedMessage] = useState<string>(message);

    useEffect(() => {
        setDisplayedMessage(message);
    }, [message]);

    return (
        <div className='bg-blue-700 rounded-2xl p-4'>
            <div className='w-max'>
                <div key={displayedMessage} className='animate-typing overflow-hidden whitespace-nowrap text-2xl font-bold  text-white '>{displayedMessage}</div>
            </div>
        </div>
    );
}

export default BattleAnnouncer;
