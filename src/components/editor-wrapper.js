/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled from 'styled-components';
import { Icon, CodeBlock } from 'global-winery';
import Editor from './App';
import { fallbackConfig, isObjectEmpty } from '../utils/data-handler';

const defaultVSCodeColor = '#1d1d1d';
const secondaryCodeColor = '#868686';
const Wrapper = styled.div`
  background-color: ${defaultVSCodeColor};
  padding-top: 20px;
  padding-bottom: 60px;
  border-radius: 10px;
  height: ${(p) => (p.height + 200 ? p.height : 600)}px;
  width: ${(p) => (p.width ? p.width : 600)}px;
  z-index: 50;
`;
const Tab = styled.div`
  width: ${(p) => (p.width ? p.width / p.numberOfTabs : 600 / p.numberOfTabs)}px;
  height: ${(p) => (p.height ? p.height - 400 : 200)}px;
  background: ${(p) => (p.color ? p.color : defaultVSCodeColor)};
  float: right;
  border-radius: 10px 10px 0px 0px;
  left: ${(p) => parseInt(p.width, 10) / parseInt(p.order, 10)
    - parseInt(p.width, 10) / parseInt(p.numberOfTabs, 10)
    + 100}px;
  position: absolute;
  top: 0px;
`;
const E = styled.div`
  z-index: 1000;
`;
const IconWrapper = styled.div`
  transform: translateY(-30px) translateX(20px);
  outline: none;
`;

const GetTabs = ({ numberOfTabs, width }) => {
  const tabs = [];
  let colorAsProps;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfTabs; i++) {
    switch (i) {
      case 0:
        colorAsProps = defaultVSCodeColor;
        break;
      case 1:
        colorAsProps = secondaryCodeColor;
        break;
      case 2:
        colorAsProps = secondaryCodeColor;
        break;
      default:
        colorAsProps = defaultVSCodeColor;
        break;
    }
    tabs.push(<Tab order={i + 1} color={colorAsProps} numberOfTabs={numberOfTabs} width={width} />);
  }
  return tabs.map(() => <div>{tabs}</div>);
};
class EditorWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    const retrievedConfigFromLocalStorage = isObjectEmpty(
      window.Editor_getDataFromLocalStorage('config'),
    )
      ? fallbackConfig
      : window.Editor_getDataFromLocalStorage('config');
    this.state = {
      localConfig: retrievedConfigFromLocalStorage,
      numberOfTabs: 3,
    };
    window.Editor_dispatchDataEventToLocalStorage('config', fallbackConfig);
  }

  render() {
    const { localConfig } = this.state;
    const { width, height } = localConfig;
    const { numberOfTabs } = this.state;
    const children = <CodeBlock color="#ffffff" />;
    return (
      <div>
        <GetTabs numberOfTabs={numberOfTabs} width={width} />
        <Wrapper width={width} height={height}>
          <IconWrapper>
            <Icon type={children} />
          </IconWrapper>
          <E>
            <Editor />
          </E>
        </Wrapper>
      </div>
    );
  }
}

export default EditorWrapper;
