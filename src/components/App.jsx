import { fetchArticlesWithQuery } from '../services/services';
import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import css from './app.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [webformatURL, setWebformatURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  const сlickOnSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setArticles([]);
    setError(false);
  };

  const clickOnImg = img => {
    setWebformatURL(img);
    setShowModal(true);
  };

  const closeModal = closeKey => {
    if ('modal_Overlay__hpzKM' || 'close') {
      setShowModal(false);
    }
  };

  const сlickOnButton = evt => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchApi = async (searchQuery, page) => {
      setIsLoading(true);

      try {
        await fetchArticlesWithQuery(searchQuery, page).then(res => {
          const { hits, totalHits } = res.data;
          if (hits.length > 0) {
            setArticles(prev => [...prev, ...hits]);
            setLoadMore(page < Math.ceil(totalHits / 12));
          } else {
            setArticles([]);
            setLoadMore(false);
            return Notiflix.Notify.failure(
              '🤔 Sorry, the search did not find anything. Please try again'
            );
          }
        });
      } catch ({ error }) {
        setError(true);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchApi(searchQuery, page);
    }
  }, [page, searchQuery]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={сlickOnSubmit} />
      {isLoading && <Loader />}
      {error && Notiflix.Notify.failure('Error!!!')}
      {articles.length > 0 && (
        <ImageGallery articles={articles} clickOnImg={clickOnImg} />
      )}
      {showModal && <Modal img={webformatURL} closeModal={closeModal} />}

      {loadMore && <Button onClick={сlickOnButton} />}
    </div>
  );
};
