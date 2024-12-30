import React from 'react';
import { useGetMeQuery } from '@/redux/api/userApi';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Shield, UserCheck, Settings } from 'lucide-react';

const Profile = () => {
  const { data: user, isLoading, error } = useGetMeQuery();

  if (isLoading) return <div className="text-center text-light">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading profile</div>;

  const profileFields = [
    { label: 'Full Name', value: user?.name, icon: <User className="w-5 h-5" /> },
    { label: 'Username', value: user?.username, icon: <UserCheck className="w-5 h-5" /> },
    { label: 'Email', value: user?.email, icon: <Mail className="w-5 h-5" /> },
    { label: 'Contact Number', value: user?.contact_number, icon: <Phone className="w-5 h-5" /> },
    { 
      label: 'Account Status', 
      value: user?.is_verified ? (
        <span className="text-green-500">Verified</span>
      ) : (
        <span className="text-red-500">Not Verified</span>
      ),
      icon: <Shield className="w-5 h-5" />
    },
    { 
      label: 'Role', 
      value: <span className="capitalize">{user?.role}</span>,
      icon: <UserCheck className="w-5 h-5" />
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-light tracking-tight">
          My Profile
        </h1>
        <p className="text-gray-200/70 text-md">
          Manage your account information
        </p>
      </div>

      <Card className="bg-darkBrand border-none">
        <CardContent className="p-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center">
                {user?.profile_picture?.url ? (
                  <img
                    src={user.profile_picture.url}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-blue-500">{user?.name?.[0]?.toUpperCase()}</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-light">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>
            <Link
              to="/settings"
              className="bg-blue-600/10 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600/20 transition duration-200 flex items-center gap-2"
            >
              <Settings size={18} />
              Change Password
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {profileFields.map((field, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  {field.icon}
                  <label className="text-sm">{field.label}</label>
                </div>
                <p className="text-lg font-medium text-light pl-7">{field.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;