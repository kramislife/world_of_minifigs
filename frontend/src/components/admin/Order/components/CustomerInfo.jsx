import { User } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const CustomerInfo = ({ user, email }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-background">
            Customer Details
          </h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-300">Name</p>
            <p className="font-medium mt-1 text-background">
              {user?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Email</p>
            <p className="font-medium mt-1 text-background">{email || "N/A"}</p>
          </div>
          {user?.contact_number && (
            <div>
              <p className="text-sm text-gray-300">Phone Number</p>
              <p className="font-medium mt-1 text-background">
                {user.contact_number}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfo;
