import galleryItems from "./app.js";

//==============================================================================================

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modalWindow: document.querySelector('.js-lightbox'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
    contentDiv: document.querySelector('.lightbox__content'),
    modalImg: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

//===============================================================================================

function makeGallery(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return ` <li class="gallery__item">
            <a class="gallery__link"
            href = "${original}">
            <img
            class="gallery__image"
            src = "${preview}"
            data-source = "${original}"
            alt = "${description}"
            />
            </a>
            </li>
            `;
        }).join('');
};
    
    const createGallery = makeGallery(galleryItems);
    refs.galleryList.insertAdjacentHTML('beforeend', createGallery);
    
//==================================================================================================
    
    refs.galleryList.addEventListener('click', openModal);
    refs.closeBtn.addEventListener('click', closeModal);
    refs.modalOverlay.addEventListener('click', closeModalOverlay);
    window.addEventListener('keydown', closeModalESC);
    window.addEventListener('keydown', clickBtnArrowRight);
    window.addEventListener('keydown', clickBtnArrowLeft);

//===================================================================================================

function openModal(event) {
    event.preventDefault();
    const target = event.target;
    if (target.nodeName !== "IMG") {
        return;
    }
    if (target.nodeName === "IMG") {
           
        refs.modalWindow.classList.add("is-open");
        refs.modalImg.src = target.dataset.source;
        refs.modalImg.alt = target.alt;
        refs.modalImg.dataset.index = event.target.dataset.index;
        
    }
};

//==================================================================================================

function closeModalESC(event) {
    if (event.key === 'Escape') {
        closeModal(event);
    }
};


function closeModalOverlay(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};


function closeModal(event) {
    refs.modalWindow.classList.remove("is-open");  
    e.preventDefault();
    
    refs.modalImg.src = "";
    refs.modalImg.alt = "";
    window.removeEventListener('keydown', closeModalESC);
    window.removeEventListener('keydown', clickBtnArrowRight);
    window.removeEventListener('keydown', clickBtnArrowLeft);
    
};

//============================================================================================================
let currentIndex = 0;

function clickBtnArrowRight() {
    if (event.code === "ArrowRight" && currentIndex < galleryItems.length - 1) {
        currentIndex += 1;
        refs.modalImg.src = galleryItems[currentIndex].original;
    }
  else if (event.code === "ArrowRight" && currentIndex === galleryItems.length - 1) {
      currentIndex = 0;
       refs.modalImg.src = galleryItems[currentIndex].original;
  }
    
};
  
   
function clickBtnArrowLeft() {
    if
    (event.code === "ArrowLeft" && currentIndex > 0) {
        currentIndex -= 1;
      refs.modalImg.src = galleryItems[currentIndex].original;
    }
    else if (event.code === "ArrowLeft" && currentIndex === 0) {
        currentIndex = galleryItems.length - 1;
        refs.modalImg.src = galleryItems[currentIndex].original;
    }
};
//===================================================================================================