import React, { FC, useContext } from "react";
import { MemberProps } from "../../../types/members.types";
import { MeetingAreaContext } from "../meeting-area/meeting-area.component";
import { MeetingMemberItem } from "./meeting-member-item.component";
import "./meeting-members-list.style.css";
import waitingUrl from "../../../assets/imgs/waiting.svg";
import { ImgInfo } from "../../common/img-info/img-info.component";
type MemberListType = [key: string, member: MemberProps];
export const MeetingMembersList: FC = () => {
  const { members } = useContext(MeetingAreaContext);
  const totalMembers = Object.keys(members).length;

  return (
    <ul className="list-container">
      {totalMembers === 0 ? (
        <section className="center text-center flex-col w-full mx-auto h-screen">
          <ImgInfo src={waitingUrl} alt="P2P waiting!">
            <h2 className="mt-10">
              Your friends will be appear here. Once they joined the meeting!{" "}
            </h2>
          </ImgInfo>
        </section>
      ) : (
        Object.entries(members).map(([key, { user }]: MemberListType) => {
          return user && <MeetingMemberItem key={key} {...user} />;
        })
      )}
    </ul>
  );
};
