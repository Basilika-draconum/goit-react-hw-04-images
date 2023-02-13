import React from 'react';
// import PropTypes from 'prop-types';

export const ModalDetails = ({ modalDetails }) => {
  return <img src={modalDetails.largeImageURL} alt={modalDetails.tags} />;
};

// ModalDetails.propTypes = {
//   modalDetails: PropTypes.objectOf(
//     PropTypes.shape({
//       tags: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     })
//   ),
// };
