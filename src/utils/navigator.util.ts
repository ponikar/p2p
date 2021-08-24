export const copyContext = (context: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(context);
  }
};

export const domainName = window.location.host;

export const getMeetingURL = (meetingId: string) => {
  return `${domainName}/${meetingId}`;
};
