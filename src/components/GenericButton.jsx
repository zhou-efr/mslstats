const sizes = {
    small: {
        sizeClass: "rounded py-1 px-2 text-xs",
    },
    medium: {
        sizeClass: "rounded-md py-1.5 px-2.5 text-sm",
    },
    large: {
        sizeClass: "rounded-md py-2.5 px-3.5 text-sm",
    },
}

const variants = {
    primary: {
        variantClass: "bg-red-nekorporation-500 font-semibold text-white shadow-sm hover:bg-red-nekorporation-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-nekorporation-500",
    },
    secondary: {
        variantClass: "bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    },
}

export const GenericButton = ({ children, onClick, disabled, className, variant, size }) => {
    const { sizeClass } = sizes[size || "medium"];
    const { variantClass } = variants[variant || "primary"];

    const buttonClasses = `${sizeClass} ${variantClass} ${className} w-fit`;

    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
