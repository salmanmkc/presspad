import React, { useState, useEffect, Component } from 'react';

const withSubscription = (WrappedComponent, isHook) =>
  isHook
    ? class extends Component {
        state = {
          windowWidth: window.innerWidth,
        };

        componentDidMount() {
          window.addEventListener('resize', this.updateWindowDimensions);
        }

        componentWillUnmount() {
          window.removeEventListener('resize', this.updateWindowDimensions);
        }

        updateWindowDimensions = () => {
          this.setState({
            windowWidth: window.innerWidth,
          });
        };

        render() {
          return (
            <WrappedComponent
              {...this.props}
              windowWidth={this.state.windowWidth}
            />
          );
        }
      }
    : props => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        useEffect(() => {
          const updateWindowDimensions = () =>
            setWindowWidth(window.innerWidth);

          window.addEventListener('resize', updateWindowDimensions);
          return () => {
            window.removeEventListener('resize', updateWindowDimensions);
          };
        }, []);

        return <WrappedComponent {...props} windowWidth={windowWidth} />;
      };

export default withSubscription;
