import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Metadata from "@/components/layout/Metadata/Metadata";
import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyState = ({ title, message }) => (
  <>
    <Metadata title={title} />
    <div className="container mx-auto px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-white bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent text-center mb-6">
        {title}
      </h1>
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg max-w-lg w-full">
        <CardContent className="p-10 flex flex-col items-center text-center">
          <div className="p-5 bg-gray-800 rounded-full shadow-md">
            <PackageX className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-300 text-lg mt-4">{message}</p>
          <Link to="/products">
            <Button
              variant="default"
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
            >
              Browse Products
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </>
);

export default EmptyState;