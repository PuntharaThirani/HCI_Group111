import Sidebar from './Sidebar';

const CustomerLayout = ({ children }) => (
  <div className="flex w-full min-h-screen bg-[#F5F0EA]">
    <Sidebar />
    <main className="ml-64 flex-1 min-h-screen bg-[#F5F0EA]">
      {children}
    </main>
  </div>
);

export default CustomerLayout;