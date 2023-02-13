import React from 'react';
import css from './imageGallery.module.scss';
import PropTypes from 'prop-types';

const ImageGallery = ({ gallery, showImage }) => {
  return (
    <ul className={css.imageGallery}>
      {gallery.map((item, i) => {
        return (
          <li
            onClick={() =>
              showImage({
                tags: item.tags,
                largeImageURL: item.largeImageURL,
              })
            }
            key={item.id + i}
            className={css.imageGalleryItem}
          >
            <img
              className={css.imageGalleryItem_image}
              src={item.webformatURL}
              alt={item.tags}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  showImage: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
