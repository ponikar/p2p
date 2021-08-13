export const getUserMedia = (
  props: MediaStreamConstraints,
  successCallback: NavigatorUserMediaSuccessCallback,
  errorCallback: NavigatorUserMediaErrorCallback
) => {
  if (navigator) {
    navigator.getUserMedia(props, successCallback, errorCallback);
  }
};

export const getMedia = (constraints: MediaStreamConstraints) => {
  if (!navigator) throw new Error("You are still living in 90's");

  return navigator.mediaDevices.getUserMedia(constraints);
};

export const onBeforeUnload = () => {
  window.onbeforeunload = (e) => {
    return true;
  };
};

export const removeOnBeforeUnload = () => {
  window.onbeforeunload = null;
};
