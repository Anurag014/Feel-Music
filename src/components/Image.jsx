/* eslint-disable react/prop-types */

const Image = ({src,alt,className}) => {
    return (
        <>
            <img src={src} alt={alt} className={`object-contain w-36 h-36 ${className}`} />
        </>
    )
}

export default Image