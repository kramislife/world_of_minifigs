import { User } from "lucide-react";

const CustomerInfo = ({ user, email }) => {
  return (
    <div className="bg-brand/80 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-white">Customer</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Name</p>
          <p className="font-medium mt-1 text-white">{user?.name || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="font-medium mt-1 text-white">{email || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;