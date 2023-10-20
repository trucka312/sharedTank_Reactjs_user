import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { Pagination, Skeleton } from 'antd';

import { getQueryParams } from '../../utils/index.js';
import { useBlogStore } from '../../store/blogStore.js';
import Loading from '../../components/loading';

const BlogStyle = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 20px;
  font-size: 14px;
  .category-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    background-color: #f5a3b7;
    padding: 20px 0;
    cursor: pointer;
    margin-bottom: 30px;
    @media (max-width: 576px) {
      margin-bottom: 16px;
      gap: 10px;
      padding:20px 16px;
      justify-content: start;
    }
    overflow-x: scroll;
    .category-item {
      padding: 10px 40px;
      border-radius: 70px;
      cursor: pointer;
      width: max-content;
      @media (max-width: 576px) {
        padding: 6px 10px;
        min-width: 100px;
        text-align: center;
      }
    }
  }
  .blog-container {
    width: 65%;
    margin: 0 auto;
    @media (max-width: 576px) {
      width: 100%;
      padding: 0 16px;
    }
    .blog-item:nth-child(odd) {
      display: flex;
      gap: 60px;
      @media (max-width: 576px) {
        gap: 20px;
      }
    }
    .blog-item:nth-child(even) {
      display: flex;
      gap: 60px;
      flex-direction: row-reverse;
      @media (max-width: 576px) {
        flex-direction: column;
        width: 100%;
        height: auto;
        gap: 20px;
      }
    }
    .blog-item {
      margin-bottom: 50px;
      height: 380px;
      @media (max-width: 576px) {
        flex-direction: column;
        width: 100%;
        height: auto;
        gap: 20px;
      }
      .blog-img {
        width: 50%;
        &__img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
          object-fit: contain;
        }
        @media (max-width: 576px) {
          width: 100%;
        }
      }
      .blog-content {
        height: 100%;
        width: 50%;
        @media (max-width: 576px) {
          width: 100%;
        }
      }
    }
  }
  a:hover {
    color: none;
  }
  .three-line-paragraph {
    display: block;
    display: -webkit-box;
    line-height: 24px;
    max-height: 74px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    visibility: visible;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 300px;
  }
  .Loading_white {
    .ant-spin-dot-item {
      background-color: #ffffff;
    }
  }
`;

export default function Blog() {
  const {
    getPost,
    blog,
    getPostCategories,
    blogCategory,
    blogListInfor,
    getPostsCategoryIds,
    loadingCategory,
    loadingPost,
    loadingPostByCategoryIds,
  } = useBlogStore((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getPostCategories();
    getPost(currentPage);
  }, []);

  useEffect(() => {
    if (category) {
      getPostsCategoryIds(category, currentPage);
    } else {
      getPost(currentPage);
    }
  }, [currentPage, category]);

  const convertDDMMYYYY = (date) => {
    const convertDate = moment(date, 'YYYY-MM-DD HH:mm:ss');
    return convertDate.format('DD/MM/YYYY');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <BlogStyle>
      <div className="category-container">
        <Link
          to="/blog"
          className="category-item"
          style={{
            backgroundColor: !category ? '#CF5763' : '#fff',
            color: !category ? '#fff' : '#000',
          }}
          onClick={() => setCategory('')}
        >
          Tất cả
        </Link>
        {loadingCategory ? (
          <div className="my-auto w-[36%] Loading_white">
            <Loading />
          </div>
        ) : (
          blogCategory?.map((item) => {
            return (
              <Link key={item.id} to={`/blog?category_id=${item.id}`} onClick={() => setCategory(item.id)}>
                <div
                  className="category-item"
                  style={{
                    backgroundColor: parseInt(category) === item.id ? '#CF5763' : '#fff',
                    color: parseInt(category) === item.id ? '#fff' : '#000',
                  }}
                >
                  {item.title}
                </div>
              </Link>
            );
          })
        )}
      </div>
      <div className="blog-container">
        {loadingPost || loadingPostByCategoryIds ? (
          <div className="mt-[20px] pb-[20px]">
            <div className="pb-[20px]">
              <Loading />
            </div>
            <div className="flex items-center align-middle">
              <Skeleton.Image active />
              <Skeleton active className="ml-[70px]" />
            </div>
          </div>
        ) : (
          blog?.data?.map((item) => {
            return (
              <div key={item.id} className="blog-item">
                <div className="blog-img">
                {item.image_url ? (
                  <img className="blog-img__img" src={item.image_url} alt="blog-img" />
                ) : (<Skeleton.Image active />)}
                </div>
                <div className="blog-content">
                  <div style={{ color: '#383838' }}>
                    {convertDDMMYYYY(item.updated_at ? item.updated_at : item.created_at)}
                  </div>
                  <div
                    style={{
                      fontSize: '20px',
                      fontWeight: '500',
                      margin: '10px 0 30px',
                    }}
                  >
                    {item.title}
                  </div>
                  <p className="h-[30%] three-line-paragraph">{item.summary}</p>
                  <div style={{ margin: '20px 0' }}>
                    {item?.categories?.map((categoryItem, key) => {
                      return (
                        <div
                          key={key}
                          style={{
                            backgroundColor: 'rgba(105, 122, 141, 0.1)',
                            width: 'max-content',
                            borderRadius: '70px',
                            padding: '5px 10px',
                          }}
                        >
                          # {categoryItem.title}
                        </div>
                      );
                    })}
                  </div>
                  <div className='xs:flex xs:justify-center'>
                  <Link
                    to={`/blog/${item.id}`}
                    style={{
                      padding: '10px 50px',
                      border: '1px solid #000',
                      width: 'max-content',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      display: 'block',
                      color: '#333333',
                    }}
                    className="hover:text-black"
                  >
                    Xem thêm
                  </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div className="mx-auto text-center">
          <Pagination
            defaultCurrent={blogListInfor?.data?.current_page || 1}
            total={blogListInfor?.data?.total}
            pageSize={blogListInfor?.data?.per_page || 20}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      </div>
    </BlogStyle>
  );
}
