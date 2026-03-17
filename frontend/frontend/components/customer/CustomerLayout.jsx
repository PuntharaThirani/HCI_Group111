import Sidebar from './Sidebar';
import { C } from '../../constants/styles';

const CustomerLayout = ({ children }) => (
  <div style={{ display: "flex", width: "100%" }}>
    <Sidebar />
    <div style={{ marginLeft: "230px", flex: 1, minHeight: "calc(100vh - 42px)", background: C.bg }}>
      {children}
    </div>
  </div>
);

export default CustomerLayout;
