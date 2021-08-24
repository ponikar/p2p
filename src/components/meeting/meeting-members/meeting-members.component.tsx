import React, { FC, memo, useContext } from "react";
import { useParams } from "react-router-dom";
import { MemberType } from "../../../types/members.types";
import { copyContext, getMeetingURL } from "../../../utils/navigator.util";
import { MeetingControl } from "../meeting-control/meeting-control.component";
import { MeetingMember } from "../meeting-member/meeting-member.component";
import lobby from "../../../assets/imgs/lobby.svg";
import { ToastContext } from "../../common/toast/toast.context";
import { ImgInfo } from "../../common/img-info/img-info.component";
import { MeetingAreaParamsType } from "../../../types/params.types";
interface MeetingMembersProps {
  members: MemberType;
}

export const MeetingMembers: FC<MeetingMembersProps> = memo(({ members }) => {
  const totalMembers = Object.keys(members).length;
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const { setToastProps } = useContext(ToastContext);

  const copyMeetingUrl = () => {
    copyContext(getMeetingURL(meetingId));
    setToastProps({ show: true, text: "Meeting link has been copied" });
  };

  return (
    <section
      className={`container relative col-span-9 ${
        totalMembers <= 4 && "items-center"
      } flex justify-center flex-wrap text-center text-highlight max-h-screen overflow-y-auto h-screen`}
    >
      {totalMembers === 0 ? (
        <section className="w-6/12">
          <ImgInfo alt="p2p-lobby" src={lobby}>
            <h2 className="text-2xl mt-5">No member has been joined yet!</h2>
            <div>
              Copy this URL and share with them
              <a
                onClick={copyMeetingUrl}
                className="underline cursor-pointer text-primary"
              >
                Copy
              </a>
            </div>
          </ImgInfo>
        </section>
      ) : (
        Object.entries(members).map((m) => (
          <MeetingMember {...m[1]} membersLength={totalMembers} key={m[0]} />
        ))
      )}
      <MeetingControl />
    </section>
  );
});
