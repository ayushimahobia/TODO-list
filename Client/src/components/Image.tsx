import React from 'react'

interface imageProps {
    imageUrl : string
}

const ImageUpload :React.FC<imageProps> = ({imageUrl}) => {
  return (
    <div className="modal mt-5" id="imageModal">
      <div className="modal-dialog" role="document"
    
      >
        <div className="modal-content">
          <div className="modal-body ">
          <img src={imageUrl} 
           alt="imagex"
           className='img-fluid'
          />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ImageUpload
