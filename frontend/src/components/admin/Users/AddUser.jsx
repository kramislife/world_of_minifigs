// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Save, User, Mail, Phone, Shield } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Metadata from "@/components/layout/Metadata/Metadata";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import { useCreateUserMutation } from "@/redux/api/userApi";

// const AddUser = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const [createUser, { isLoading }] = useCreateUserMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const userData = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       username: formData.get("username"),
//       password: formData.get("password"),
//       contact_number: formData.get("contact_number"),
//       role: formData.get("role"),
//       created_by: user?._id,
//     };

//     try {
//       await createUser(userData).unwrap();
//       toast.success("User created successfully!");
//       navigate("/admin/users");
//     } catch (error) {
//       toast.error(error?.data?.message || "Failed to create user");
//     }
//   };

//   return (
//     <>
//       <Metadata title="Add User" />
//       <div className="mx-auto py-6">
//         <Card className="shadow-xl border-t-4 border-t-blue-500">
//           <CardHeader>
//             <CardTitle className="text-2xl">Add New User</CardTitle>
//           </CardHeader>

//           <CardContent className="p-6">
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-5">
//                 <div className="space-y-3">
//                   <Label
//                     htmlFor="email"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <Mail className="h-5 w-5 text-green-600" />
//                     Email Address
//                   </Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter email address"
//                     className="mt-1"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label
//                     htmlFor="name"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <User className="h-5 w-5 text-blue-600" />
//                     Full Name
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     placeholder="Enter full name"
//                     className="mt-1"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label
//                     htmlFor="username"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <User className="h-5 w-5 text-purple-600" />
//                     Username
//                   </Label>
//                   <Input
//                     id="username"
//                     name="username"
//                     placeholder="Enter username"
//                     className="mt-1"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label
//                     htmlFor="password"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <Shield className="h-5 w-5 text-red-600" />
//                     Password
//                   </Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Enter password"
//                     className="mt-1"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label
//                     htmlFor="contact_number"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <Phone className="h-5 w-5 text-orange-600" />
//                     Contact Number
//                   </Label>
//                   <Input
//                     id="contact_number"
//                     name="contact_number"
//                     placeholder="Enter contact number"
//                     className="mt-1"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <Label
//                     htmlFor="role"
//                     className="flex items-center gap-2 text-lg font-semibold"
//                   >
//                     <Shield className="h-5 w-5 text-indigo-600" />
//                     Role
//                   </Label>
//                   <Select name="role" required defaultValue="customer">
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="customer">Customer</SelectItem>
//                       <SelectItem value="employee">Employee</SelectItem>
//                       <SelectItem value="seller">Seller</SelectItem>
//                       {user?.role === "superAdmin" && (
//                         <SelectItem value="admin">Admin</SelectItem>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex justify-end space-x-4 pt-6">
//                   <Button
//                     type="submit"
//                     disabled={isLoading}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2 hover:from-blue-700 hover:to-purple-700"
//                   >
//                     {isLoading ? (
//                       <>Creating...</>
//                     ) : (
//                       <>
//                         <Save className="h-4 w-4" />
//                         Create User
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default AddUser;
