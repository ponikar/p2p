import React from "react";
import { ImgInfo } from "../img-info/img-info.component";
import image from "../../../assets/imgs/401.svg";
import { SectionTitle } from "../typography/typography.component";
type PropTypes = unknown;
type StateType = { hasError: boolean; error: string };
export class ErrorBoundry extends React.Component<PropTypes, StateType, {}> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      // render fallback UI
      return (
        <section className="w-1/2 mx-auto flex-col text-highlight h-screen center">
          <SectionTitle title="Opps, Something went wrong!" />
          <ImgInfo alt="Hello App" src={image} message={this.state.error} />

          {error === "Permission denied" && (
            <p>
              Please give permisson to access video and audio in order to use
              Hello App.
            </p>
          )}
        </section>
      );
    }

    return this.props.children;
  }
}
