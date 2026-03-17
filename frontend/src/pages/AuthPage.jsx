import customerImg from '../assets/login/customer-login.jpg';
import adminImg from '../assets/login/admin-login.jpg';

function AuthPage({ isAdmin }) {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img 
          src={isAdmin ? adminImg : customerImg} 
          alt={isAdmin ? "Admin Login" : "Customer Login"} 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-3/4 max-w-md">
          <h2 className="text-3xl font-bold mb-6">{isAdmin ? "Admin Login" : "Customer Login"}</h2>
          <form className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              );
            }
            
            export default AuthPage;