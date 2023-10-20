import ProfileSideBar from "./ProfileSideBar";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div className="bg-[#f7f8f9] pt-3">
      <div
        className="min-h-[100vh] xs:min-h-[calc(100vh-62px)] gap-[30px] w-[90%] mx-auto xs:w-[100vw] flex"
      >
        <div style={{ width: "20%",flexShrink:"0" }} className="xs:hidden">
          <ProfileSideBar />
        </div>
        <div className="w-[80%] xs:w-full"><Outlet /></div>
      </div>
    </div>
  );
}
