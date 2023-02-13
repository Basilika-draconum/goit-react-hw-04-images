import axios from 'axios';

const galleryService = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    q: '',
    page: 1,
    key: '32798686-213103188f3fa7636822d64bb',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getGallery = async params => {
  const { data } = await galleryService.get('', params);
  return data;
};
