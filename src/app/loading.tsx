import { Spin } from "antd";

const Loading = () => {
  return (
    <Spin tip="Loading" size="large" className="loading_spin">
      <div className="content" />
    </Spin>
  );
};

export default Loading;
