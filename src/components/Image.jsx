/* eslint-disable react/prop-types */

const Image = ({src,alt}) => {
    return (
        <>
            <img src={src} alt={alt} className="object-contain w-36 h-36" />
        </>
    )
}

export default Image