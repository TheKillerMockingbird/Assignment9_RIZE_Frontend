import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});

  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticlesByUser[user.username] || [];
  };

  const getAllUserArticles = () => {
    return savedArticlesByUser;
  };

  const saveArticle = (article) => {
    if (!user) return;

    setSavedArticlesByUser((prev) => {
      const userArticles = prev[user.username] || [];
      if (userArticles.find((a) => a.url === article.url)) {
        return prev;
      }
      return {
        ...prev,
        [user.username]: [...userArticles, article],
      };
    });
  };

  const removeArticle = (url) => {
    if (!user) return;

    setSavedArticlesByUser((prev) => {
      const userArticles = prev[user.username] || [];
      return {
        ...prev,
        [user.username]: userArticles.filter((a) => a.url !== url),
      };
    });
  };

  const isArticleSaved = (url) => {
    if (!user) return false;
    const userArticles = savedArticlesByUser[user.username] || [];
    return userArticles.some((a) => a.url === url);
  };

  return (
    <ArticlesContext.Provider
      value={{
        getUserSavedArticles,
        getAllUserArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};