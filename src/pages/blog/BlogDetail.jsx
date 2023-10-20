import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../../store/blogStore.js';
import Loading from '../../components/loading/Index.jsx';

// import icon
import bloomLeft from '../../assets/images/bloomLeft.svg';
import bloomRight from '../../assets/images/bloomRight.svg';
import fbIcon from '../../assets/zin/facebook-blog-icon.svg';
import pinteresIcon from '../../assets/zin/pinteres.svg';
import twitter from '../../assets/zin/twitter.svg';
import { Skeleton } from 'antd';

const BlogDetailStyle = styled.div`
  margin-top: 20px;
  .blog-detail {
    width: 70%;
    margin: 0 auto;
    @media (max-width: 576px) {
      width: 100%;
      padding: 0 16px;
    }
    .breadcrumb {
      span {
        color: #cf5763;
        margin-left: 7px;
      }
    }
    .blog-detail-container {
      margin-top: 30px;
      .social {
        margin-bottom: 30px;
        .share-text {
          margin-bottom: 7px;
        }
        .social-icons {
          display: flex;
          gap: 10px;
        }
      }
      .blog-wrapper {
        .blog-title {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 30px;
        }
        .blog-img {
          margin-bottom: 30px;
          img {
            width: 100%;
          }
        }
        .blog-content {
          line-height: 25px;
        }
      }
    }
  }
  .relate-blog {
    width: 80%;
    margin: 50px auto;
    @media (max-width: 576px) {
      width: 100%;
      padding: 0 16px;
    }
    .relate-blog-title {
      margin: 20px 0;
      text-align: center;
      span {
        font-size: 16px;
        font-weight: 600;
        margin: 0 7px;
      }
    }
    .relate-blog-container {
      display: flex;
      gap: 10px;
      .relate-blog-item {
        width: calc(100% * 0.33333);
      }
      @media (max-width: 576px) {
        flex-direction: column;
        width: 100%;
        gap: 20px;
        .relate-blog-item {
          width: 100%;
        }
      }
    }
  }
`;

export default function BlogDetail() {
  const {
    getPostById,
    blogDetail,
    getPostsCategoryIds,
    blog,
    loadingPostDetail,
    loadingPostByCategoryIds,
    loadingPost,
  } = useBlogStore();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getPostById(id);
  }, [navigate]);

  useEffect(() => {
    const listCategoriesId = blogDetail?.categories?.map((item) => item.id);
    if (listCategoriesId?.length > 0) {
      const paramToExport = listCategoriesId.join();
      getPostsCategoryIds(paramToExport);
    }
  }, [blogDetail]);

  return (
    <BlogDetailStyle>
      {loadingPostDetail ? (
        <Loading />
      ) : (
        <div className="blog-detail">
          <div className="breadcrumb">
            <div className="text-[16px]">
              Blog<span>{'>'}</span>
              <span>{blogDetail.title}</span>
            </div>
          </div>
          <div className="blog-detail-container">
            <div className="blog-wrapper">
              <div className="blog-title">{blogDetail.title}</div>
              <div className="social">
                <div className="share-text">Chia sẻ</div>
                <div className="social-icons">
                  <img src={fbIcon} alt="facebook-icon" />
                  <img src={pinteresIcon} alt="pinteres-icon" />
                  <img src={twitter} alt="twitter-icon" />
                </div>
              </div>
              <div className="blog-img">
              {!blogDetail.image_url ? (
                <Skeleton.Image active />
              ) : (<img src={blogDetail.image_url} alt="blog-img" />)}
              </div>
              <div className="relative " dangerouslySetInnerHTML={{ __html: blogDetail.content }}></div>
            </div>
          </div>
        </div>
      )}

      {loadingPostByCategoryIds ? (
        <Loading />
      ) : (
        <div className="relate-blog">
          <div className="relate-blog-title">
            <img src={bloomLeft} alt="bloom-left" className='xs:hidden' />
            <span>Các bài viết có liên quan</span>
            <img src={bloomRight} alt="bloom-left" className='xs:hidden' />
          </div>
          <div className="relate-blog-container">
            {loadingPost ? (
              <React.Fragment className='mt-[60px]'>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </React.Fragment>
            ) : (
              blog?.data?.slice(0, 3).map((item) => {
                return (
                  <Link
                    to={`/blog/${item.id}`}
                    key={item.id}
                    className="relate-blog-item text-[#333333] hover:text-[#333333]"
                  >
                    <div style={{ width: '100%' }}>
                      <img
                        style={{
                          width: '100%',
                          height: '220px',
                          objectFit: 'cover',
                        }}
                        src={item.image_url}
                        alt="blog-new"
                      />
                    </div>
                    <div style={{ padding: '0 5px 15px', backgroundColor: '#fff' }}>
                      <div style={{ padding: '7px 5px' }}>{item.summary}</div>
                      <div
                        style={{
                          padding: '0 5px',
                          color: '#CF5763',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Xem thêm
                        <i style={{ color: '#CF5763' }} className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}
    </BlogDetailStyle>
  );
}
