import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getGallery } from '../services/galleryService';
import css from './Button/button.module.scss';
import { ColorRing } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import { ModalDetails } from './Modal/ModalDetails';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const res = await getGallery({
          params: {
            page: page,
            q: q,
          },
        });
        setGallery(prev => {
          return [...prev, ...res.hits];
        });
        setTotalPages(Math.ceil(res.totalHits / 12));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (q) fetchGallery();
  }, [q, page]);

  const handleChangeQuery = q => {
    setQ(q);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const showImage = ({ tags, largeImageURL }) => {
    setModalDetails({ tags, largeImageURL });
    setShowModal(true);
  };
  const closeImage = () => {
    setModalDetails(null);
    setShowModal(false);
  };

  const differencePage = totalPages === page;
  return (
    <>
      <Searchbar onSubmit={handleChangeQuery} />
      <ImageGallery gallery={gallery} showImage={showImage} />
      {isLoading && <ColorRing />}
      {!differencePage
        ? Boolean(gallery.length) && (
            <button
              onClick={handleLoadMore}
              type="button"
              className={css.button}
            >
              Load More
            </button>
          )
        : null}
      {showModal && (
        <Modal closeImage={closeImage}>
          <ModalDetails modalDetails={modalDetails} />
        </Modal>
      )}
    </>
  );
};

export default Gallery;
