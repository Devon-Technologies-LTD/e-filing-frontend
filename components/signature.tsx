import React from 'react';
interface SignatureProps {
    title?: string; // Optional dynamic text
}

const Signature: React.FC<SignatureProps> = ({
    title = "SIGNATURE",
}) => {
    return (
        <div className='space-y-2'>
            <p>{title}</p>
            <div className="bg-white p-4 w-full h-20">
                <div className="text-app-primary text-center w-48 border-2 p-2 border-app-primary">Upload e-Signature</div>
            </div>
        </div>
    );
};

export default Signature;
