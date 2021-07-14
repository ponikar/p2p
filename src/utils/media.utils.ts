export const getUserMedia = (
  props: MediaStreamConstraints,
  successCallback: NavigatorUserMediaSuccessCallback,
  errorCallback: NavigatorUserMediaErrorCallback
) => {
  if (navigator) {
    navigator.getUserMedia(props, successCallback, errorCallback);
  }
};
