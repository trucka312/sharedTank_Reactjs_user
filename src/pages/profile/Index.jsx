import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { useUserStore } from "../../store/userStore";
import BasicInfo from "./child/BasicInfo";
import BillingInfomation from "./child/BillingInfomation";
import UserAvatar from '../../assets/images/zin/userIcon.svg'

const ProfileStyles = styled.div`
  .datepicker {
    width: 100%;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid #e7e7e7;
  }
  .profile {
    .datepicker {
      width: 100% !important;
    }
    .profile__information {
      margin-top: 20px;
      form {
        display: flex;
        justify-content: space-around;
      }
      .profile__item-img {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        .profile__item__avatar {
          position: relative;
          border-radius: 100%;
          width: 100px;
          height: 100px;
          padding: 5px;
          border: 1px dashed transparent;
          cursor: pointer;
          &:hover {
            .profile__item__icon-image {
              transform: translate(-50%, 30%) scale(1.1);
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
          }
          .profile__item__icon-image {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 30%);
            width: 32px;
            height: 32px;
            border-radius: 100%;
            box-shadow: 0 0 0 2px white;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #111d36;
            transition: all 0.5s;
            i {
              color: white;
              font-size: 12px;
            }
          }
        }
      }
      .profile__content {
        grid-template-columns: repeat(2, 1fr);
        row-gap: 15px;
        column-gap: 15px;
        width: 50%;
        .profile__item__error {
          color: #e74c3c;
          margin-top: 3px;
        }
      }
      .profile__itemBottom {
        margin-top: 15px;
      }
      .profile__item {
        display: flex;
        height: 45px;
        border-radius: 10px;

        .title {
          width: 100px;
          line-height: 40px;
          text-align: center;
        }
        .profile__item__gender {
          display: flex;
          align-items: center;
          column-gap: 20px;
          & > div {
            display: flex;
            align-items: center;
            column-gap: 5px;
          }
        }

        input {
          border: 1px solid rgba(0, 0, 0, 0.14);
          height: 40px;
          padding: 5px;
          width: 79%;
        }
        select {
          border: none !important;
          margin: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border-top-left-radius: initial !important;
          border-bottom-left-radius: initial !important;
          border-top-right-radius: inherit !important;
          border-bottom-right-radius: inherit !important;
        }
        #input-container {
          width: 100%;
          .r-input-group {
            height: 100%;
          }
        }
        .css-b62m3t-container {
          width: 100%;
          .css-1s2u09g-control {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            min-height: auto !important;
            border: none !important;
            height: 100%;
            box-shadow: none !important;
            &:hover {
              border: none;
            }
          }
          .css-1pahdxg-control {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            min-height: auto !important;
            height: 100%;
            border: none !important;
            box-shadow: none !important;
            &:hover {
              border: none !important;
            }
          }
        }
      }
      .profile__btn {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        column-gap: 15px;
        button {
          width: 170px;
          height: 45px;
          color: white;
          font-size: 18px;
          border-radius: 10px;
          font-weight: 500;
        }
      }
    }
  }
  @media screen and (max-width: 1400px) {
    .profile {
      width: 650px;
      .profile__information {
        .profile__content {
          row-gap: 10px;
        }
        .profile__itemBottom {
          margin-top: 10px;
        }
        .profile__item {
          height: 38px;
          .profile__item__icon {
            width: 38px;
            height: 38px;
          }
        }
        .profile__btn {
          button {
            height: 38px;
            font-size: 17px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    .profile {
      width: 100%;
    }
  }
`;

function ProfilePage() {
  const { profile } = useUserStore();
  const [information, setInformation] = useState({
    id: "",
    name: "",
    sex: 1,
    date_of_birth: null,
    email: null,
    avatar_image: null,
    phone_number: "",
  });

  useEffect(() => {
    return () => {
      information.avatar_image &&
        URL.revokeObjectURL(information.avatar_image.image);
    };
  }, [information.avatar_image]);

  useEffect(() => {
    if (Object.entries(profile).length > 0) {
      setInformation({
        id:profile.id,
        name: profile.name,
        date_of_birth: isNaN(Date.parse(profile.date_of_birth))
          ? null
          : new Date(profile.date_of_birth),
        sex: profile.sex,
        email: profile.email,
        avatar_image:profile.avatar_image ? {image:profile.avatar_image} : null,
        // avatar_image: {
        //   image: profile.avatar_image
        //     ? profile.avatar_image
        //     : "",
        // },
        phone_number: profile.phone_number ? profile.phone_number : "",
      });
    }
  }, [profile]);

  return (
    <React.Fragment>
        <ProfileStyles>
          <div>
            <div
              className="main"
              style={{ width: "100%", borderRadius: "6px" }}
            >
              <BasicInfo
                information={information}
                setInformation={setInformation}
                profile={profile}
              />
              <BillingInfomation />
            </div>
          </div>
        </ProfileStyles>
    </React.Fragment>
  );
}
export default ProfilePage;
