import { useEffect } from "react";
import { useTeamStore } from "../../../store/teamStore";
import defaultImage from "../../../assets/images/image-default.jpg";
import top1 from "../../../assets/zin/top1.svg";
import top2 from "../../../assets/zin/top2.svg";
import top3 from "../../../assets/zin/top3.svg";
import { formatNumber } from "../../../utils";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";

export default function TopTenGroup() {
  const { getTopGroupRevenue, topGroupRevenue } = useTeamStore();
  const { widthScreen } = useGetScreenWidth();
  useEffect(() => {
    getTopGroupRevenue();
  }, []);

  if (topGroupRevenue && topGroupRevenue.length === 0) return null;

  const renderAvatar = (size, position, avatar) => {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full relative"
      >
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-black absolute top-[4px] left-[4px]"
        ></div>
        <img
          src={avatar || defaultImage}
          alt="avatar"
          className="w-full h-full rounded-full relative object-cover"
        />
        <img
          src={position}
          alt="top"
          className="absolute top-[-10px] left-[-10px]"
        />
      </div>
    );
  };

  return (
    <div className="flex justify-between xs:flex-col xs:gap-3">
      <div className="w-[475px] xs:w-full shrink-0 flex justify-between relative h-[230px] xs:h-[180px] items-end">
        <div className="absolute top-0 left-[50%] translate-x-[-50%]">
          {renderAvatar(
            widthScreen > 576 ? 110 : 82,
            top1,
            topGroupRevenue[0].avatar_image
          )}
          <div className="flex flex-col">
            <p className="text-center mt-4 mb-1 text-[16px] xs:text-[10px] text-[#6C0D0F] font-semibold">
              {topGroupRevenue[0].name || "Khách"}
            </p>
            <p className="text-center text-[16px] xs:text-[10px] text-[#6C0D0F] font-semibold">
              {formatNumber(
                topGroupRevenue[0]
                  .order_collaborator_sum_total_after_pay_community || 0
              )}
            </p>
          </div>
        </div>
        <div>
          {renderAvatar(
            widthScreen > 576 ? 84 : 60,
            top2,
            topGroupRevenue[1].avatar_image
          )}
          <p className="text-center mt-4 mb-1 text-[16px] xs:text-[10px] text-[#6C0D0F] font-semibold">
            {topGroupRevenue[1].name || "Khách"}
          </p>
          <p className="text-center text-[16px] xs:text-[10px] text-[#6C0D0F] font-semibold">
            {formatNumber(
              topGroupRevenue[1]
                .order_collaborator_sum_total_after_pay_community || 0
            )}
          </p>
        </div>
        <div>
          {renderAvatar(
            widthScreen > 576 ? 84 : 60,
            top3,
            topGroupRevenue[2].avatar_image
          )}
          <p className="text-center mt-4 mb-1 text-[16px] xs:text-[10px] text-[#6C0D0F] font-semibold">
            {topGroupRevenue[2].name || "Khách"}
          </p>
          <p className="text-center text-[16px] xs:text-[10px] text-[#6C0D0F] font-semibold">
            {formatNumber(
              topGroupRevenue[2]
                .order_collaborator_sum_total_after_pay_community || 0
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between max-w-[660px] xs:w-full xs:gap-3">
        {topGroupRevenue && topGroupRevenue.length
          ? topGroupRevenue.slice(3).map((item, index) => (
              <div key={index} className="py-1 relative text-end">
                <div className="flex justify-between items-center">
                  <div className="flex items-center absolute">
                    <div
                      style={{
                        width: widthScreen > 576 ? "40px" : "28px",
                        height: widthScreen > 576 ? "40px" : "28px",
                      }}
                      className="rounded-full relative"
                    >
                      <div
                        style={{
                          width: widthScreen > 576 ? "40px" : "28px",
                          height: widthScreen > 576 ? "40px" : "28px",
                        }}
                        className="rounded-full bg-black absolute top-[4px] left-[4px] xs:top-[2px] xs:left-[2px]"
                      ></div>
                      <img
                        src={item.avatar_image || defaultImage}
                        alt="avatar"
                        className="w-full h-full rounded-full relative object-cover"
                      />
                      <p className="absolute text-[20px] xs:text-[14px]  text-[#6C0D0F] font-semibold top-[-12px] left-[-12px] xs:top-[-8px] xs:left-[-8px]">
                        {index + 4}
                      </p>
                    </div>
                  </div>

                  <div className="text-[12px] xs:text-[9px] text-[#6C0D0F] font-semibold w-[250px] h-[34px] xs:w-[150px] xs:h-[20px] bg-[#FFDEE6] rounded-full flex justify-between items-center pr-3 pl-14 xs:pl-9">
                    <p>{item.name || "Khách"}</p>
                    <p>
                      {item.order_collaborator_sum_total_after_pay_community ||
                        0}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
