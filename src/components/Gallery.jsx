import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { getGallery } from '../services/galleryService';
import css from './Button/button.module.scss';
import { ColorRing } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import { ModalDetails } from './Modal/ModalDetails';

export default class Gallery extends Component {
  state = {
    gallery: [],
    isLoading: false,
    error: null,
    page: 1,
    q: '',
    totalPages: 1,
    per_page: 12,
    showModal: false,
    modalDetails: null,
  };

  // componentDidMount() {
  //   this.fetchGallery();
  // }
  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
      this.fetchGallery();
    }
    return;
  }

  fetchGallery = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await getGallery({
        params: {
          page: this.state.page,
          q: this.state.q,
        },
      });
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...res.hits],
        totalPages: Math.ceil(res.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChangeQuery = q => {
    this.setState({ q, page: 1, gallery: [] });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  showImage = ({ tags, largeImageURL }) => {
    this.setState({
      modalDetails: { tags, largeImageURL },
      showModal: true,
    });
  };
  closeImage = () => {
    this.setState({
      modalDetails: null,
      showModal: false,
    });
  };

  render() {
    const { gallery, isLoading, showModal, modalDetails } = this.state;
    const page = this.state.totalPages === this.state.page;
    return (
      <>
        <Searchbar onSubmit={this.handleChangeQuery} />
        <div>
          <ImageGallery gallery={gallery} showImage={this.showImage} />
        </div>
        {isLoading && <ColorRing />}
        {!page
          ? Boolean(gallery.length) && (
              <button
                onClick={this.handleLoadMore}
                type="button"
                className={css.button}
              >
                Load More
              </button>
            )
          : null}
        {showModal && (
          <Modal closeImage={this.closeImage}>
            <ModalDetails modalDetails={modalDetails} />
          </Modal>
        )}
      </>
    );
  }
}
