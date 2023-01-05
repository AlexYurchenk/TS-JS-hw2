"use strict";
const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const galleryItems = [
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];
const galleryItemMarkup = (image) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${image.original}
  >
    <img
      class="gallery__image"
      src=${image.preview}
      data-source=${image.original}
      alt=${image.description}
    />
  </a>
</li>`;
};
const markup = galleryItems.map((image) => galleryItemMarkup(image)).join(' ');
const findImage = (list) => {
    var _a;
    return (_a = list.find((e) => e.classList.contains('lightbox__content'))) === null || _a === void 0 ? void 0 : _a.children[0];
};
const findIndexOfImage = () => {
    const src = findImage([...modal.children]).src;
    const currentImage = galleryItems.find((e) => e.original === src);
    return galleryItems.indexOf(currentImage);
};
const closeModal = () => {
    findImage([...modal.children]).src = '';
    modal.classList.remove('is-open');
};
const openModel = (target) => {
    modal.classList.add('is-open');
    const image = findImage([...modal.children]);
    if (target.dataset.source) {
        image.src = target.dataset.source;
    }
};
const onClickClose = (e) => {
    const target = e.target;
    if (target.nodeName !== 'IMG') {
        closeModal();
    }
    window.removeEventListener('keydown', onESCClose);
    window.removeEventListener('keydown', onArrowRightClick);
    window.removeEventListener('keydown', onArrowLeftClick);
};
const onESCClose = (e) => {
    if (e.code === 'Escape') {
        closeModal();
    }
};
const onArrowRightClick = (e) => {
    if (e.code === 'ArrowRight') {
        const index = findIndexOfImage();
        const original = findImage([...modal.children]);
        if (index === galleryItems.length - 1 || isNaN(index)) {
            return;
        }
        original.src = galleryItems[index + 1].original;
    }
};
const onArrowLeftClick = (e) => {
    if (e.code === 'ArrowLeft') {
        const index = findIndexOfImage();
        const original = findImage([...modal.children]);
        if (index === 0 || isNaN(index)) {
            return;
        }
        original.src = galleryItems[index - 1].original;
    }
};
gallery.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.nodeName !== 'IMG') {
        return;
    }
    openModel(target);
    window.addEventListener('keydown', onESCClose);
    window.addEventListener('keydown', onArrowRightClick);
    window.addEventListener('keydown', onArrowLeftClick);
});
modal.addEventListener('click', onClickClose);
gallery.insertAdjacentHTML('beforeend', markup);
