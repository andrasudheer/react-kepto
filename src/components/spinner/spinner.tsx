import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import './spinner.scss';

const Spinner: React.FC = () => (
  <div className={"spinner-wrapper"}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
  </div>
);

export default Spinner;