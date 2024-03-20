import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

interface ImgProps {
  uploadedImg: string;
}

const Img: React.FC<ImgProps> = ({ uploadedImg }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dybu7hmwe"
    }
  });
  const myImg = cld.image(uploadedImg);

  return (
    <>
      <AdvancedImage cldImg={myImg} />
    </>
  );
};

export default Img;
