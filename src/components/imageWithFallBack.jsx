import React, {Fragment, useEffect, useState} from 'react';
import Image from 'next/image';
import {Dialog, Transition} from "@headlessui/react";

const ImageWithFallback = (props) => {
    const {src, fallbackSrc, ...rest} = props;
    const [imgSrc, setImgSrc] = useState(src);

    let [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <>
            <Image
                {...rest}
                src={imgSrc}
                onError={() => {
                    setImgSrc(fallbackSrc);
                }}
                onClick={() => setIsOpen(true)}
            />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                <Dialog.Panel
                                    className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={imgSrc}
                                        onError={() => {
                                            setImgSrc(fallbackSrc);
                                        }}
                                        onClick={() => setIsOpen(true)}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ImageWithFallback;