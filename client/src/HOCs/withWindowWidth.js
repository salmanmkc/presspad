import React, { useState, useEffect, Component } from 'react';

const withWindowWidth = (WrappedComponent, isHook) =>
  !isHook
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
          const { windowWidth } = this.state;
          if (Math.abs(windowWidth - window.innerWidth) >= 20) return;

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
          const updateWindowDimensions = () => {
            if (Math.abs(windowWidth - window.innerWidth) >= 20) return;

            setWindowWidth(window.innerWidth);
          };

          window.addEventListener('resize', updateWindowDimensions);
          return () => {
            window.removeEventListener('resize', updateWindowDimensions);
          };
        }, [windowWidth]);

        return <WrappedComponent {...props} windowWidth={windowWidth} />;
      };

export default withWindowWidth;
