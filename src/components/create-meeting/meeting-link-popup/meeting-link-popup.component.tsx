import React, { FC, memo, useCallback, useContext } from "react";
import { Copy, X } from "react-feather";
import { useHistory } from "react-router-dom";
import { copyContext, domainName } from "../../../utils/navigator.util";
import { PrimaryButton } from "../../common/button.component";
import { ToastContext } from "../../common/toast/toast.context";
import { MeetingCreationContext } from "../meeting-creation/meeting-creation.context";

export const MeetingLinkPopup: FC = memo(() => {
  const { meetingID, setProps } = useContext(MeetingCreationContext);
  const { setToastProps } = useContext(ToastContext);
  const { push } = useHistory();
  const copyLink = useCallback(async () => {
    await copyContext(`Hey, join me at P2P! Here's the meeting link:${domainName}/${meetingID}
   `);
    setToastProps({ show: true, text: "Link has been copied" });
  }, [meetingID]);

  return (
    <section className="xl:w-3/12 w-4/12 shadow-lg text-highlight bg-secondryBack rounded-md p-5 fixed-center">
      <div className="flex items-center justify-between">
        <h2 className="text-lg"> Here is the meeting link! </h2>
        <X
          onClick={(_) => setProps({ showMeetingID: false })}
          className="text-primary cursor-pointer"
        />
      </div>
      <p className="text-sm mt-4">
        {" "}
        Copy the meeting link and share with people you want to meet it. Be sure
        to save it for later.{" "}
      </p>

      <div className="p-3 text-filter flex justify-between items-center rounded-md mt-4 bg-back">
        <p>
          {" "}
          {window.location.host}/{meetingID}{" "}
        </p>

        <Copy
          onClick={copyLink}
          className="text-primary hover:text-filter cursor-pointer"
        />
      </div>
      <div className="mt-2 text-sm text-filter"> OR </div>
      <PrimaryButton className="mt-2" onClick={(_) => push(`/${meetingID}`)}>
        Start Meeting
      </PrimaryButton>
    </section>
  );
});
